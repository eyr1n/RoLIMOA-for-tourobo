import type { FC } from 'react';
import { Grid } from '@mui/material';
import type { CustomControlPanel, TaskObject } from '@rolimoa/common/schema';
import { ToggleSwitchControl } from './ToggleSwitchControl';
import { ToggleButtonControl } from './ToggleButtonControl';
import { MultiButtonControl } from './MultiButtonControl';
import { PluseMinuseButtonControl } from './PluseMinuseButtonControl';

interface BaseControlProps {
  taskConfig: TaskObject;
  controlConfig?: CustomControlPanel;
  currentValue: number;
  stateUpdate: (value: number, cmd: string) => void;
  color?: 'primary' | 'secondary';
}

export const BaseControl: FC<BaseControlProps> = ({
  taskConfig,
  controlConfig,
  currentValue,
  stateUpdate,
  color,
}) => {
  const style = controlConfig?.style;

  return (
    <Grid size={{ xs: 12, sm: style?.width ?? 6 }}>
      {controlConfig?.type === 'toggle_switch' ? (
        <ToggleSwitchControl
          color={color ?? 'default'}
          taskConfig={taskConfig}
          currentValue={currentValue}
          stateUpdate={stateUpdate}
          controlConfig={controlConfig}
        />
      ) : controlConfig?.type === 'toggle_button' ? (
        <ToggleButtonControl
          taskConfig={taskConfig}
          currentValue={currentValue}
          stateUpdate={stateUpdate}
          controlConfig={controlConfig}
        />
      ) : controlConfig?.type === 'multi_button' ? (
        <MultiButtonControl
          color={color ?? 'inherit'}
          taskConfig={taskConfig}
          currentValue={currentValue}
          stateUpdate={stateUpdate}
          controlConfig={controlConfig}
        />
      ) : (
        <PluseMinuseButtonControl
          color={color ?? 'inherit'}
          config={taskConfig}
          currentValue={currentValue}
          stateUpdate={stateUpdate}
        />
      )}
    </Grid>
  );
};
