import { z } from 'zod';
import { CustomControlPanel } from './controlPanel.js';
import { TaskObject } from './taskObject.js';

const VGoalCondition = z.union([
  z.object({
    type: z.literal('manual'),
    required: z.object({
      tasks: z.array(
        z.object({
          id: z.string(),
          count: z.number(),
        }),
      ),
    }),
  }),
  z.object({
    type: z.literal('alwaysOk'),
  }),
  z.object({
    type: z.literal('disabled'),
  }),
  z.object({
    type: z.literal('implement'),
  }),
]);

export const TimeFormat = z.enum(['mm:ss', 'm:ss', 'ss', 's']);

export const TimeProgress = z.object({
  id: z.string(),
  type: z.enum(['default', 'ready', 'count']),
  time: z.number().optional(),
  description: z.string(),
  isAutoTransition: z.boolean().optional(),
  style: z
    .object({
      timerFormat: TimeFormat.optional(),
      timerType: z.string().optional(),
    })
    .optional(),
  custom: z
    .array(
      z.object({
        elapsedTime: z.number(),
        displayText: z.string().optional(),
        sound: z.string().optional(),
      }),
    )
    .optional(),
});

export const Config = z.object({
  contest_info: z.object({
    name: z.string(),
  }),
  rule: z.object({
    global_objects: z.array(TaskObject),
    task_objects: z.array(TaskObject),
    score: z.union([
      z.object({
        format: z.literal('simple'),
        expression: z.array(
          z.object({
            id: z.string(),
            coefficient: z.number(),
          }),
        ),
      }),
      z.object({
        format: z.literal('formulaExpression'),
        expression: z.any(), // 再帰構造を含むのでとりあえずany
      }),
      z.object({
        format: z.literal('implement'),
      }),
    ]),
    vgoal: z.object({
      name: z.string(),
      condition: VGoalCondition,
    }),
    control_panel: z.union([
      z.object({
        type: z.literal('default'),
      }),
      z.object({
        type: z.literal('custom'),
        panels: z.array(CustomControlPanel).optional(),
      }),
    ]),
  }),
  time_progress: z.array(TimeProgress),
  teams_info: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      school: z.string(),
      short: z.string(),
    }),
  ),
  client: z.object({
    standalone_mode: z.boolean(),
  }),
});

export type TimeFormat = z.infer<typeof TimeFormat>;
export type TimeProgress = z.infer<typeof TimeProgress>;
export type Config = z.infer<typeof Config>;
