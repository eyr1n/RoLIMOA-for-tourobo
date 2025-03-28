import { z } from 'zod';

export const ConnectedDevice = z.object({
  deviceName: z.string(),
  sockId: z.string(),
  currentPath: z.string(),
});

export type ConnectedDevice = z.infer<typeof ConnectedDevice>;
