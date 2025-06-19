import {z} from 'zod';

export const CacheSchema = z.object({
  key: z.string(),
  value: z.any(),
  ttl: z.number()
});

export type TCache = z.infer<typeof CacheSchema>;
