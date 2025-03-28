import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CurrentPhaseState, PhaseState } from '../../schema/index.js';

// `startTime`から経過した現在の秒数を取得する
export function calculateElapsedSecond(
  startTime: number,
  nowUnixtime: number | undefined = undefined,
  pausedTime: number | undefined = undefined,
): number {
  const now = nowUnixtime ?? Date.now();
  return Math.floor((pausedTime ?? now - startTime) / 1000);
}

export const phaseStateSlice = createSlice({
  name: 'phase',
  initialState: {
    current: {
      id: 'default',
      startTime: Date.now(),
      pausedTime: undefined,
    },
    elapsedSecond: 0,
  } as PhaseState,
  reducers: {
    setState: (state, action: PayloadAction<CurrentPhaseState>) => {
      state.elapsedSecond = calculateElapsedSecond(
        action.payload.startTime,
        action.payload.pausedTime,
      );
      state.current = action.payload;
    },
    setElapsedSecond: (
      state,
      action: PayloadAction<{ newElapsedSecond: number }>,
    ) => {
      state.elapsedSecond = action.payload.newElapsedSecond;
    },
    setPause: (state, action: PayloadAction<{ pausedTime?: number }>) => {
      state.current.pausedTime = action.payload.pausedTime;
    },
  },
});
