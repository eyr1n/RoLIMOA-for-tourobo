import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState, TaskObjectsType } from './reducer';
import { ScoreBlockComponent } from './ScoreBlockComponent';
import config from './config.json';

function calcScore(rule: { coefficient: number; id: string; }[], taskState: TaskObjectsType): number {
  return rule.map(({coefficient, id}) => {
    const val = taskState[id];
    if (val === undefined) {
      return NaN; // error
    }
    return val * coefficient;
  }).reduce((acc, cur) => acc + cur, 0);
}

interface ScoreBlockContainerProps {
  fieldSide: "blue"|"red";
  focused?: boolean;
  verticalPadding?: string;
}

export const ScoreBlockContainer: FC<ScoreBlockContainerProps> = ({
  fieldSide,
  ...props
}) => {
  const taskState = useSelector<GlobalState, TaskObjectsType>((state) => state.taskObjects[fieldSide]);
  const score = calcScore(config.rule.score, taskState);

  return <ScoreBlockComponent score={score} fieldSide={fieldSide} {...props} />;
};
