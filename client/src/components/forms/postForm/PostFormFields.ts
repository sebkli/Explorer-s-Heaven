import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.any(),
  userID: z.string().optional(),
});

export type PostFormFields = z.infer<typeof postFormSchema>;
