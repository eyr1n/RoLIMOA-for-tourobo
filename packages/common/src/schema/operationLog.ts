import { z } from 'zod';

const ScoreUpdateType = z.object({
  type: z.literal('ScoreUpdate'),
  field: z.literal('blue').or(z.literal('red')).or(z.literal('global')),
  obj: z.string(),
  value: z.number(),
  cmd: z.string().optional(), // e.g. "+1", "=0"
});

const PhaseChangeType = z.object({
  type: z.literal('PhaseChange'),
  phase: z.string(),
  isAuto: z.boolean().optional(),
});

export const OperationLog = z.object({
  id: z.string(),
  op: ScoreUpdateType.or(PhaseChangeType),
  at: z.number().optional(),
  by: z.string().optional(),
});

export type OperationLog = z.infer<typeof OperationLog>;
