import { type AnyAction, createStore } from "redux";
import { rootReducer } from "./features/index.js";
import { connectedDevicesStateSlice } from "./features/connectedDevices.js";
import crypt from "crypto";
import { loadFromFile, saveToFile } from "./backup.js";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createNodeWebSocket } from "@hono/node-ws";
import type { WSContext } from "hono/ws";

const app = new Hono();
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });
const wsClients = new Set<WSContext<WebSocket>>();

const wsToSessionId = new WeakMap();

const store = createStore(rootReducer, loadFromFile("./save"));

app.get(
  "/ws",
  upgradeWebSocket((c) => ({
    onOpen: (event, ws) => {
      const sessionId = crypt.randomUUID();
      console.log(`connected (sid: ${sessionId})`);

      wsClients.add(ws);
      wsToSessionId.set(ws, sessionId);

      // 初回接続したクライアントに、現在の試合状況を送信する
      ws.send(
        JSON.stringify({
          type: "welcome",
          sid: sessionId,
          time: Date.now(),
          state: store.getState(),
        })
      );
    },
    onMessage: async (event, ws) => {
      const sessionId = wsToSessionId.get(ws);
      const body = JSON.parse(event.data.toString());
      const type = body?.type;
      console.log(`on message: `, body);

      if (type === "dispatch" || type === "dispatch_all") {
        const clientActions = body?.actions;
        const actions = clientActions.map((action: AnyAction) => {
          if (action.type === "operationLogs/addLog") {
            return {
              ...action,
              payload: {
                ...action.payload,
                at: Date.now(),
                by: sessionId,
              },
            };
          }
          return action;
        });

        actions.forEach((action) => {
          store.dispatch(action);
        });

        wsClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type, actions }));
          }
        });
      }
      if (type === "save_store") {
        await saveToFile("./save", store);
      }
    },
    onClose: (event, ws) => {
      const sessionId = wsToSessionId.get(ws);
      wsClients.delete(ws);
      console.log(
        `disconnect (sid: ${sessionId}): ${event.code} ${event.reason}`
      );

      const action = connectedDevicesStateSlice.actions.removeDevice({
        sockId: sessionId,
      });
      store.dispatch(action);
      wsClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "dispatch",
              actions: [action],
            })
          );
        }
      });
    },
  }))
);

/**
 * ストアの状態をHTTPで簡単に取得するAPI
 *
 * - `/api/state`
 *     - ストアの全状態を取得(数十KBのJSON)
 * - `/api/state?q=score.fields.blue.tasks.TASK_ID`
 *     - 青コートのタスク"TASK_ID"の値を取得(整数値)
 * - `/api/state?q=connectedDevices`
 *     - 接続中のデバイス一覧を取得(JSON)
 */
app.get("/api/state", (c) => {
  const query = c.req.query("q")?.toString();
  const state = store.getState();
  let result = state;
  if (query) {
    query.split(".").forEach((key) => {
      if (result[key] === undefined) {
        c.status(404);
        return c.text("Not Found");
      }
      result = result[key];
    });
  }
  return c.json(result);
});

injectWebSocket(
  serve(
    {
      fetch: app.fetch,
      port: 8000,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    }
  )
);
