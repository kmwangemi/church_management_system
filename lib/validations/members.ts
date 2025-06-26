import * as z from 'zod';

export const addMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  role: z.string().min(1, 'Role is required'),
  // departments: z.array(z.string()).min(1, 'At least one department is required'),
  // notes: z.string().optional(),
  gender: z.string(),
  branch: z.string()
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
