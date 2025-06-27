import apiClient from '@/lib/api-client';
import { AddDepartmentFormValues } from '@/lib/validations/department';
import { useMutation } from '@tanstack/react-query';

export function useRegisterDepartment() {
  return useMutation({
    mutationFn: async (payload: AddDepartmentFormValues) => {
      const { data } = await apiClient.post('/departments', payload, {});
      return data;
    },
  });
}
