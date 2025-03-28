import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  connectedDevicesStateSlice,
  matchStateSlice,
  operationLogsStateSlice,
  phaseStateSlice,
  resultRecordsStateSlice,
  scoreStateSlice,
  streamingInterfaceSlice,
} from './slice/index.js';

export const rootReducer = combineReducers({
  score: scoreStateSlice.reducer,
  phase: phaseStateSlice.reducer,
  match: matchStateSlice.reducer,
  operationLogs: operationLogsStateSlice.reducer,
  resultRecords: resultRecordsStateSlice.reducer,
  connectedDevices: connectedDevicesStateSlice.reducer,
  streamingInterface: streamingInterfaceSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureRoLIMOAStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    // devTools: process.env.NODE_ENV !== 'production',     // 今は prod でも開発ツールを有効に
  });
}

export type { UnknownAction, Dispatch } from '@reduxjs/toolkit';

export * from './slice/index.js';
