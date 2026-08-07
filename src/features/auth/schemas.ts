import { z } from 'zod';

/** Field rules for the sign-up form — the only credential surface that remains. */
const email = z.email('Enter a valid email address');

const password = z
  .string()
  .min(10, 'Use at least 10 characters')
  .regex(/[a-z]/, 'Include a lowercase letter')
  .regex(/[A-Z]/, 'Include an uppercase letter')
  .regex(/[0-9]/, 'Include a number');

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name').max(80, 'That is too long'),
    email,
    password,
    confirm: z.string(),
    terms: z.boolean().refine((value) => value, 'Accept the terms to continue'),
  })
  .refine((values) => values.password === values.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
