import {z} from 'zod';

export const GameSchema = z.object({
  score: z.number(),
  highScore: z.number().optional(),
  account: z.any().optional()
});

export type TGame = z.infer<typeof GameSchema>;
