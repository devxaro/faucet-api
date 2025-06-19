import {z} from 'zod';

export const DocsSchema = z.object({
  docs: z.array(z.any()),
  count: z.number()
});

export type TDocs = z.infer<typeof DocsSchema>;
