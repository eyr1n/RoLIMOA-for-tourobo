import { z } from 'zod';

export const TaskObject = z.object({
  id: z.string(),
  description: z.string(),
  initialValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export type TaskObject = z.infer<typeof TaskObject>;
