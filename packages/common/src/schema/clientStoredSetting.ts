import { z } from 'zod';

export const settingSchema = z.object({
  deviceName: z.string(),
  timeOffset: z.number(),
});

export type SettingType = z.infer<typeof settingSchema>;
