import { combineSlices } from '@reduxjs/toolkit';

import {
  connectedDevicesStateSlice,
  matchStateSlice,
  operationLogsStateSlice,
  phaseStateSlice,
  resultRecordsStateSlice,
  scoreStateSlice,
  streamingInterfaceSlice,
} from './slice/index.js';

export const rootReducer = combineSlices(
  connectedDevicesStateSlice,
  matchStateSlice,
  operationLogsStateSlice,
  phaseStateSlice,
  resultRecordsStateSlice,
  scoreStateSlice,
  streamingInterfaceSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export * from '@reduxjs/toolkit';
export * from './slice/index.js';
