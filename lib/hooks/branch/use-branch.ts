import apiClient from '@/lib/api-client';
import { BranchListResponse } from '@/lib/types';
import { AddBranchFormValues } from '@/lib/validations/branch';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useRegisterBranch() {
  return useMutation({
    mutationFn: async (payload: AddBranchFormValues) => {
      const { data } = await apiClient.post('/branches', payload, {});
      return data;
    },
  });
}

// const createJob = async (payload: JobFormValues): Promise<Job> => {
//   const { data } = await apiClient.post('/jobs', payload);
//   return data;
// };

// export const useCreateJob = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createJob,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['jobs'] });
//       toast.success('Job created successfully.', {
//         style: successToastStyle,
//       });
//     },
//   });
// };

const fetchBranches = async (): Promise<BranchListResponse> => {
  const { data } = await apiClient.get('/branches');
  return data;
};

export const useFetchBranches = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });
};

// const fetchJobById = async (id: string): Promise<JobFetchByIdResponse> => {
//   const { data } = await apiClient.get(`/jobs/${id}`);
//   return data;
// };

// export const useFetchJobById = (id: string) => {
//   return useQuery({
//     queryKey: ['job', id],
//     queryFn: () => fetchJobById(id),
//     enabled: !!id,
//   });
// };

// const updateJob = async ({
//   id,
//   payload,
// }: {
//   id: string;
//   payload: JobFormValues;
// }): Promise<Job> => {
//   const { data } = await apiClient.patch(`/jobs/${id}`, payload);
//   return data;
// };

// export const useUpdateJob = (id: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateJob,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['jobs'] });
//       queryClient.invalidateQueries({ queryKey: ['job', id] });
//       toast.success('Job updated successfully.', {
//         style: successToastStyle,
//       });
//     },
//   });
// };

// const deleteJob = async (id: string): Promise<void> => {
//   await apiClient.delete(`/jobs/${id}`);
// };

// export const useDeleteJob = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteJob,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['jobs'] });
//       toast.success('Job deleted successfully.', {
//         style: successToastStyle,
//       });
//     },
//   });
// };

// const fetchSelectedJobSeekersByJobId = async (
//   id: string,
// ): Promise<JobSeekerFetchResponse> => {
//   const { data } = await apiClient.get(`/jobs/${id}/selected-jobseekers`);
//   return data;
// };

// export const useFetchSelectedJobSeekersByJobId = (id: string) => {
//   return useQuery({
//     queryKey: ['job-selected-jobseekers', id],
//     queryFn: () => fetchSelectedJobSeekersByJobId(id),
//     enabled: !!id,
//   });
// };
