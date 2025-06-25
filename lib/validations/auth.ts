import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const churchSchema = z.object({
  churchData: z.object({
    churchName: z.string().min(1, 'Church name is required'),
    denomination: z.string().min(1, 'Church denomination is required'),
    address: z.string().min(1, 'Address is required'),
    country: z.string().min(1, 'Country is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Please enter a valid email address'),
    website: z.string().optional(),
    foundedYear: z.string().min(1, 'Founded year is required'),
    description: z.string().optional(),
  }),
});

export type ChurchFormValues = z.infer<typeof churchSchema>;

export const userSchema = z
  .object({
    adminData: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Please enter a valid email address'),
      phoneNumber: z.string().min(1, 'Phone number is required'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one special character',
        ),
      confirmPassword: z.string(),
      role: z.string().min(1, 'Role is required'),
      agreeToTerms: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    }),
  })
  .refine(data => data.adminData.password === data.adminData.confirmPassword, {
    message: "Passwords don't match",
    path: ['adminData', 'confirmPassword'],
  });

export type UserFormValues = z.infer<typeof userSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verificationSchema = z.object({
  code: z.string().min(4, 'Verification code must be at least 4 characters'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
