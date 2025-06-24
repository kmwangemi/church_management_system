import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const churchSchema = z.object({
  churchName: z.string().min(1, 'Church name is required'),
  denomination: z.string().min(1, 'Church denomination is required'),
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Please enter a valid email address'),
  website: z.string().optional(),
  foundedYear: z.string().min(1, 'Founded year is required'),
  description: z.string().optional(),
});

export type ChurchFormValues = z.infer<typeof churchSchema>;

export const userSchema = z
  .object({
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
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

  export type UserFormValues = z.infer<typeof userSchema>;

// export const signupSchema = z
//   .object({
//     first_name: z.string().min(2, 'First name must be at least 2 characters'),
//     last_name: z.string().min(2, 'Last name must be at least 2 characters'),
//     email: z.string().email('Please enter a valid email address'),
//     phone_number: z
//       .string()
//       .min(8, 'Phone number must be at least 8 characters'),
//     company_name: z
//       .string()
//       .min(2, 'Company name must be at least 2 characters'),
//     country: z.string().min(2, 'Country must be at least 2 characters'),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
//     confirmPassword: z.string(),
//   })
//   .refine(data => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword'],
//   });

// export type SignupFormValues = z.infer<typeof signupSchema>;

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
