import type { FC } from 'react';
import type {
  CustomControlPanel,
  FieldSideType,
  TaskObject,
} from '@rolimoa/common/schema';
import { GlobalObjectContainer } from './GlobalObjectContainer';
import { TaskObjectContainer } from './TaskObjectContainer';
import config from '@rolimoa/common/config';
import { ErrorObject } from './ErrorObject';

type TaskType = 'global' | 'task';

function parseTaskId(taskId: string): { type: TaskType; id: string } {
  if (taskId.startsWith('@')) {
    const splited = taskId.slice(1).split('/');
    if (splited.length !== 2) {
      console.error(`task ID parse error: ${taskId}`);
    }

    if (splited[0] === 'global') {
      return { type: 'global', id: splited[1] };
    }
    if (splited[0] === 'task') {
      return { type: 'task', id: splited[1] };
    }
  }

  return { type: 'task', id: taskId };
}

function findTaskObjectConfig(type: TaskType, id: string) {
  if (type === 'global') {
    return config.rule.global_objects.find((obj) => obj.id === id);
  }
  if (type === 'task') {
    return config.rule.task_objects.find((obj) => obj.id === id);
  }
  return undefined;
}

type ScoreInputControlProps = {
  fieldSide: FieldSideType;
  taskObjectConfig?: TaskObject;
  controlPanelConfig?: CustomControlPanel;
};

export const ScoreInputControl: FC<ScoreInputControlProps> = ({
  fieldSide,
  taskObjectConfig,
  controlPanelConfig,
}) => {
  if (taskObjectConfig === undefined && controlPanelConfig === undefined) {
    console.error('ふぇぇ…taskObjectConfigとcontrolPanelConfigがundefinedです');
    return <></>;
  }

  const { type, id } = parseTaskId(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    taskObjectConfig?.id ?? controlPanelConfig!.id,
  );
  if (taskObjectConfig === undefined) {
    taskObjectConfig = findTaskObjectConfig(type, id);
  }

  if (taskObjectConfig === undefined) {
    return <ErrorObject description={controlPanelConfig?.id ?? ''} />;
  }
  if (type === 'global') {
    return (
      <GlobalObjectContainer
        taskConfig={taskObjectConfig}
        controlConfig={controlPanelConfig}
      />
    );
  }
  if (type === 'task') {
    return (
      <TaskObjectContainer
        fieldSide={fieldSide}
        taskConfig={taskObjectConfig}
        controlConfig={controlPanelConfig}
      />
    );
  }
  return <></>;
};
