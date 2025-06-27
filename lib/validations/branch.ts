import * as z from 'zod';

export const addBranchSchema = z.object({
  branchName: z.string().min(1, 'Branch name is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().min(1, 'Physical address is required'),
  // pastorId: z.string().min(1, 'Pastor name is required'),
  establishedDate: z.string().min(1, 'Established date is required'),
});

export type AddBranchFormValues = z.infer<typeof addBranchSchema>;
