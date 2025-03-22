import type { AppType } from "./app.js";
import { hc } from "hono/client";

const client = hc<AppType>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<AppType>(...args);
