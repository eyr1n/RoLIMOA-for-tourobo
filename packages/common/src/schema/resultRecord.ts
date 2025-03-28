import { z } from 'zod';
import { MatchState } from './matchState.js';
import { ScoreState } from './scoreState.js';

export const ResultRecord = z.object({
  match: MatchState, // 対戦チーム
  finalScore: ScoreState, // 最終的な試合状況

  comment: z.string().optional(), // 備考
  confirmedScore: z.object({
    blue: z.number(),
    red: z.number(),
  }), // 確定した点数（基本的にはfinalScoreで算出されるスコアと同じになる）
  confirmedBy: z.string().optional(), // 結果を確定したユーザ名
  confirmedAt: z.number().optional(), // 結果を確定した時刻
});

export type ResultRecord = z.infer<typeof ResultRecord>;
