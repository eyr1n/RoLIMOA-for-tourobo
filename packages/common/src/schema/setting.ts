import { z } from 'zod';

export const Setting = z.object({
  deviceName: z.string(),
  timeOffset: z.number(),
});

export type Setting = z.infer<typeof Setting>;
