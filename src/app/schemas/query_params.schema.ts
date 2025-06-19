import {z} from 'zod';

export const QueryParamsSchema = z.object({
  p: z.number().optional(),
  l: z.number().optional(),
  s: z.union([z.array(z.string()), z.string()]).optional(),
  f: z.union([z.array(z.string()), z.string()]).optional()
});

export type TQueryParams = z.infer<typeof QueryParamsSchema>;
