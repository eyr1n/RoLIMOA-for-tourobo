import { type FC, useCallback } from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Typography,
} from '@mui/material';
import type {
  TaskObject,
  TaskObjectToggleButton,
} from '@rolimoa/common/schema';

interface ToggleButtonControlProps {
  taskConfig: TaskObject;
  currentValue: number;
  stateUpdate: (value: number, cmd: string) => void;
  controlConfig: TaskObjectToggleButton;
}

export const ToggleButtonControl: FC<ToggleButtonControlProps> = ({
  taskConfig,
  currentValue,
  stateUpdate,
  controlConfig,
}) => {
  const { description } = taskConfig;
  const option = controlConfig.option;

  const onChange = useCallback(
    (_: React.MouseEvent<HTMLElement, MouseEvent>, value: number) => {
      stateUpdate(value, `=${value}`);
    },
    [stateUpdate],
  );

  return (
    <Paper sx={{ p: '1em', userSelect: 'none' }}>
      <Typography component="h2" variant="h6" gutterBottom>
        {description}
      </Typography>

      <ToggleButtonGroup
        sx={{ pt: 0.5 }}
        onChange={onChange}
        exclusive
        orientation={option.vertical ? 'vertical' : 'horizontal'}
      >
        {option.buttons.map(({ value, label, style }) => (
          <ToggleButton
            key={value}
            value={value}
            selected={value === currentValue}
            color={style?.color ?? 'standard'}
          >
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};
