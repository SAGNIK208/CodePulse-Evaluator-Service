import { z } from 'zod';

export type CreateSubmissionDTO = z.infer<typeof createSubmissionZodSchema>;

export const createSubmissionZodSchema = z.object({
  userId: z.string(),
  problemId: z.string(),
  code: z.string(),
  language: z.string(),
});
