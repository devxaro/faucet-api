import {z} from 'zod';

export const AccountSchema = z.object({
  address: z.string(),
  balance: z.number().optional(),
  lockedBalance: z.number().optional(),
  pendingBalance: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type TAccount = z.infer<typeof AccountSchema>;
