import { z } from 'zod';

export const CurrentPhaseState = z.object({
  id: z.string(), // 現在のフェーズID
  startTime: z.number(), // フェーズの開始時刻(Unix時間)
  pausedTime: z.number().optional(), // フェーズの一時停止時刻(Unix時間)
});

export const PhaseState = z.object({
  current: CurrentPhaseState, // sever-sync: 現在のフェーズ
  elapsedSecond: z.number(), // client-only:フェーズ移行後の経過秒数
});

export type CurrentPhaseState = z.infer<typeof CurrentPhaseState>;
export type PhaseState = z.infer<typeof PhaseState>;
