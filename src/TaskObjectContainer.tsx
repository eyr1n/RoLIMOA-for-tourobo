import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LyricalSocket } from './lyricalSocket';
import { TaskObjectsState, TaskObjectsType } from './reducer';
import * as actions from "./actions";
import { TaskObjectComponent } from "./TaskObjectComponent";

interface TaskObjectProps {
  id: string;
  description: string;
  fieldSide: "blue" | "red";
  min?: number;
  max?: number;
}

export const TaskObject: FC<TaskObjectProps> = ({
  id,
  description,
  fieldSide,
  min = 0,
  max = 524,
}) => {
  const taskObjects = useSelector<TaskObjectsState, TaskObjectsType>((state) => state.taskObjects);
  const dispatch = useDispatch();

  const currentValue = taskObjects[id];
  if (currentValue === undefined) {
    console.error("ふぇぇ！", taskObjects, id);
  }

  const decrement = useCallback(() => {
    const nextValue = currentValue - 1;
    dispatch(actions.setTaskObjectValue(id, nextValue));

    const socket = LyricalSocket.instance;
    socket.socket.emit("update", {
      taskObjectId: id,
      afterValue: nextValue,
    });
  }, [dispatch, id, currentValue]);

  const increment = useCallback(() => {
    const nextValue = currentValue + 1;
    dispatch(actions.setTaskObjectValue(id, nextValue));

    const socket = LyricalSocket.instance;
    socket.socket.emit("update", {
      taskObjectId: id,
      afterValue: nextValue,
    });
  }, [dispatch, id, currentValue]);

  return (
    <TaskObjectComponent
      description={description}
      currentValue={currentValue}
      min={min}
      max={max}
      fieldSide={fieldSide}
      decrement={decrement}
      increment={increment}
    />
  );
};
