import {z} from 'zod';

export const AppConfigSchema = z.object({
  jobs: z.any()
});
export type TAppConfig = z.infer<typeof AppConfigSchema>;
