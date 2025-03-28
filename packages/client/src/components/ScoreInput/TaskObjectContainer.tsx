import { type FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@rolimoa/common/redux';
import { scoreStateSlice } from '@rolimoa/common/redux';
import { ErrorObject } from './ErrorObject';
import { LyricalSocket } from '@/lyricalSocket';
import type {
  CustomControlPanel,
  FieldSideType,
  TaskObject,
} from '@rolimoa/common/schema';
import { BaseControl } from './BaseControl';
import { operationLogsStateSlice } from '@rolimoa/common/redux';

type TaskObjectContainerProps = {
  fieldSide: FieldSideType;
  taskConfig: TaskObject;
  controlConfig?: CustomControlPanel;
};

export const TaskObjectContainer: FC<TaskObjectContainerProps> = ({
  fieldSide,
  taskConfig,
  controlConfig,
}) => {
  const { id } = taskConfig;

  const currentValue = useSelector<RootState, number | undefined>(
    (state) => state.task.fields[fieldSide].tasks[id],
  );
  const dispatch = useDispatch();

  const stateUpdate = useCallback(
    (value: number, command = '') => {
      const actions = [
        scoreStateSlice.actions.setTaskUpdate({
          fieldSide,
          taskObjectId: id,
          afterValue: value,
        }),
        operationLogsStateSlice.actions.addLog({
          op: {
            type: 'ScoreUpdate',
            field: fieldSide,
            obj: id,
            value,
            cmd: command,
          },
        }),
      ];
      LyricalSocket.dispatch(actions, dispatch);
    },
    [dispatch, fieldSide, id],
  );

  const color = fieldSide === 'blue' ? 'primary' : 'secondary';

  if (currentValue === undefined) {
    console.error(`ふぇぇ！"${id}"のタスクオブジェクトが取得できないよぉ`);
    return <ErrorObject description={taskConfig.description} />;
  }

  return (
    <BaseControl
      taskConfig={taskConfig}
      controlConfig={controlConfig}
      currentValue={currentValue}
      stateUpdate={stateUpdate}
      color={color}
    />
  );
};
