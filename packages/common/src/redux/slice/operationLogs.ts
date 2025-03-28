import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OperationLog } from '../../schema/index.js';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const operationLogsStateSlice = createSlice({
  name: 'operationLogs',
  initialState: [] as OperationLog[],
  reducers: {
    setState: (_, action: PayloadAction<OperationLog[]>) => action.payload,
    addLog: (cur, action: PayloadAction<PartialBy<OperationLog, 'id'>>) => {
      const id = action.payload.id ?? Math.random().toString(36).slice(-8);

      cur.push({ id, ...action.payload });
    },
  },
});
