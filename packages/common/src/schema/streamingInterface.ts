import { z } from 'zod';

export const StreamingInterface = z.object({
  showMainHud: z.boolean(),
  showScoreBoard: z.boolean(),
});

export type StreamingInterface = z.infer<typeof StreamingInterface>;
