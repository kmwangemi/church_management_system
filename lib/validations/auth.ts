import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone_number: z
      .string()
      .min(8, 'Phone number must be at least 8 characters'),
    company_name: z
      .string()
      .min(2, 'Company name must be at least 2 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const emailResetCodeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type EmailResetCodeFormValues = z.infer<typeof emailResetCodeSchema>;

export const verificationSchema = z.object({
  code: z.string().min(4, 'Verification code must be at least 4 characters'),
});

export const passwordResetSchema = z
  .object({
    email: z.string().optional(),
    reset_code: z.string().optional(),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.new_password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
