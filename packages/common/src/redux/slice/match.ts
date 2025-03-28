import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatchState } from '../../schema/index.js';

export const matchStateSlice = createSlice({
  name: 'match',
  initialState: {
    name: '',
    teams: {
      blue: undefined,
      red: undefined,
    },
    isConfirmed: false,
  } as MatchState,
  reducers: {
    setState: (_, action: PayloadAction<MatchState>) => action.payload,
    setConfirmed: (cur, action: PayloadAction<boolean>) => {
      cur.isConfirmed = action.payload;
    },
  },
});
