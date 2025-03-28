import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatchState } from '../../schema/index.js';

const initialState: MatchState = {
  name: '',
  teams: {
    blue: undefined,
    red: undefined,
  },
  isConfirmed: false,
};

export const matchStateSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setState: (_, action: PayloadAction<MatchState>) => action.payload,
    setConfirmed: (cur, action: PayloadAction<boolean>) => {
      cur.isConfirmed = action.payload;
    },
  },
});
