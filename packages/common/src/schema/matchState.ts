import { z } from 'zod';

export const TeamType = z.object({
  shortName: z.string(), // 表示名
  id: z.string().optional(),
  name: z.string().optional(),
  school: z.string().optional(),
});

export const MatchState = z.object({
  name: z.string(), // 試合名
  teams: z.object({
    blue: TeamType.or(z.undefined()),
    red: TeamType.or(z.undefined()),
  }), // 各チームの情報
  isConfirmed: z.boolean(), // 試合の結果が確定したかどうか
});

export type TeamType = z.infer<typeof TeamType>;
export type MatchState = z.infer<typeof MatchState>;
