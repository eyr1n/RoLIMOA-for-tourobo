import { combineReducers } from '@reduxjs/toolkit';
import { scoreStateSlice } from './score.js';
import { phaseStateSlice } from './phase.js';
import { matchStateSlice } from './match.js';
import { resultRecordsStateSlice } from './resultRecord.js';
import { connectedDevicesStateSlice } from './connectedDevices.js';
import { streamingInterfaceSlice } from './streamingInterface.js';
import { operationLogsStateSlice } from './operationLogs.js';

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
