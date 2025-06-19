import {z} from 'zod';

export const TransactionSchema = z.object({
  amount: z.number(),
  status: z.string(),
  txHash: z.string().optional(),
  account: z.any().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type TTransaction = z.infer<typeof TransactionSchema>;
