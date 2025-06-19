import {z} from 'zod';

export const PingSchema = z.object({
  message: z.string()
});
export type TPing = z.infer<typeof PingSchema>;
