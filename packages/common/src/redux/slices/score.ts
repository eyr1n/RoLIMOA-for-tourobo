import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import config from '../../config/index.js';
import type { FieldSideType, ScoreState } from '../../schema/index.js';

export const scoreInitialState: ScoreState = {
  fields: {
    blue: {
      tasks: Object.fromEntries(
        config.rule.task_objects.map((taskObj) => [
          taskObj.id,
          taskObj.initialValue ?? 0,
        ]),
      ),
      enable: true,
      winner: false,
      vgoal: undefined,
    },
    red: {
      tasks: Object.fromEntries(
        config.rule.task_objects.map((taskObj) => [
          taskObj.id,
          taskObj.initialValue ?? 0,
        ]),
      ),
      enable: true,
      winner: false,
      vgoal: undefined,
    },
  },
  global: Object.fromEntries(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    config.rule.global_objects.map((taskObj: any) => [
      taskObj.id,
      taskObj.initialValue ?? 0,
    ]),
  ),
};

type GloablUpdateActionPayload = {
  taskObjectId: string;
  afterValue: number;
};

type TaskUpdateActionPayload = {
  fieldSide: FieldSideType;
  taskObjectId: string;
  afterValue: number;
};

export const scoreStateSlice = createSlice({
  name: 'task',
  initialState: scoreInitialState,
  reducers: {
    setState: (_, action: PayloadAction<ScoreState>) => action.payload,
    setGloablUpdate: (
      state,
      action: PayloadAction<GloablUpdateActionPayload>,
    ) => {
      state.global[action.payload.taskObjectId] = action.payload.afterValue;
    },
    setTaskUpdate: (state, action: PayloadAction<TaskUpdateActionPayload>) => {
      state.fields[action.payload.fieldSide].tasks[
        action.payload.taskObjectId
      ] = action.payload.afterValue;
    },
    setScoreEnable: (
      state,
      action: PayloadAction<{ fieldSide: FieldSideType; enable: boolean }>,
    ) => {
      state.fields[action.payload.fieldSide].enable = action.payload.enable;
    },
    setWinnerFlag: (
      state,
      action: PayloadAction<{ fieldSide: FieldSideType; winner: boolean }>,
    ) => {
      state.fields[action.payload.fieldSide].winner = action.payload.winner;
    },
    setVgoalTime: (
      state,
      action: PayloadAction<{ fieldSide: FieldSideType; vgoalTime: number }>,
    ) => {
      state.fields[action.payload.fieldSide].vgoal = action.payload.vgoalTime;
    },
    unsetVgoalTime: (
      state,
      action: PayloadAction<{ fieldSide: FieldSideType }>,
    ) => {
      state.fields[action.payload.fieldSide].vgoal = undefined;
    },
  },
});
