import {z} from 'zod';

const ErrorSchema = z.object({
  errorCode: z.string(),
  errorMessage: z.string(),
  tips: z.object({
    supportId: z.string()
  })
});

export const CustomErrorSchema = z.object({
  errors: z.array(ErrorSchema)
});

export type TCustomErrorSchema = z.infer<typeof CustomErrorSchema>;
