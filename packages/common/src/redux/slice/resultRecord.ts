import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ResultRecord } from '../../schema/index.js';

export const resultRecordsStateSlice = createSlice({
  name: 'resultRecords',
  initialState: [] as ResultRecord[],
  reducers: {
    setState: (_, action: PayloadAction<ResultRecord[]>) => action.payload,
    addResult: (cur, action: PayloadAction<ResultRecord>) => {
      cur.push(action.payload);
    },
  },
});
