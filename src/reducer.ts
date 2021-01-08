import { Reducer } from 'redux';
import produce, {  } from "immer";
import { TaskUpdateActionType, ActionType } from './actions';
import config from './config.json';

export type FieldSideType = "blue" | "red";
export type TaskObjectsType = { [objectId: string]: number; };
export type WholeTaskState = { blue: TaskObjectsType, red: TaskObjectsType };

export type GlobalState = {
  isConnect: boolean;
  taskObjects: WholeTaskState;
};

export const initialState: GlobalState = {
  isConnect: false,
  taskObjects: {
    blue: Object.fromEntries(config.rule.task_objects.map(taskObj => [taskObj.id, taskObj.initialValue ?? 0])),
    red: Object.fromEntries(config.rule.task_objects.map(taskObj => [taskObj.id, taskObj.initialValue ?? 0])),
  },
};

export const taskObjectsReducer: Reducer<GlobalState, ActionType> = (
  state: GlobalState = initialState,
  action: ActionType,
): GlobalState => {
  switch (action.type) {
    case (TaskUpdateActionType.CONNECT_SET):
      return {
        ...state,
        isConnect: action.payload.currentState,
      };

    case (TaskUpdateActionType.TASK_UPDATE):
      return produce(state, (draftState) => {
        draftState.taskObjects[action.payload.fieldSide][action.payload.taskObjectId] = action.payload.afterValue;
      });

    case (TaskUpdateActionType.TASK_SET_STATE):
      return {
        ...state,
        taskObjects: {
          ...action.payload,
        }
      };

    default:
      return state;
  }
};
