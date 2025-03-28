import { z } from 'zod';

export const FieldSideType = z.literal('blue').or(z.literal('red'));

export const ObjectsStateType = z.record(z.number());

export const FieldScoreStateType = z.object({
  tasks: ObjectsStateType, // 各チームのタスクの進行状況
  enable: z.boolean(), // スコアの有効フラグ
  winner: z.boolean(), // 勝利フラグ
  vgoal: z.number().optional(), // Vゴールタイム
});

export const ScoreState = z.object({
  fields: z.object({
    blue: FieldScoreStateType,
    red: FieldScoreStateType,
  }),
  global: ObjectsStateType, // 青・赤共通のオブジェクト
});

export type FieldSideType = z.infer<typeof FieldSideType>;
export type ObjectsStateType = z.infer<typeof ObjectsStateType>;
export type FieldScoreStateType = z.infer<typeof FieldScoreStateType>;
export type ScoreState = z.infer<typeof ScoreState>;
