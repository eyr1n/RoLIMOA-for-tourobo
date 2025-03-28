import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StreamingInterface } from '../../schema/index.js';

export const streamingInterfaceSlice = createSlice({
  name: 'streamingInterface',
  initialState: {
    showMainHud: true,
    showScoreBoard: true,
  } as StreamingInterface,
  reducers: {
    setState: (_, action: PayloadAction<StreamingInterface>) => action.payload,
    setShowMainHud: (cur, action: PayloadAction<boolean>) => {
      cur.showMainHud = action.payload;
    },
    setShowScoreBoard: (cur, action: PayloadAction<boolean>) => {
      cur.showScoreBoard = action.payload;
    },
  },
});
