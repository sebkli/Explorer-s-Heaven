import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).trim(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  repeatPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  image: z.any(),
});

export type SignUpFormFields = z.infer<typeof signUpFormSchema>;
