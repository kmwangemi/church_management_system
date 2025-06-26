import apiClient from '@/lib/api-client';
import { AddMemberFormValues } from '@/lib/validations/members';
import { useMutation } from '@tanstack/react-query';

export function useRegisterMember() {
  return useMutation({
    mutationFn: async (payload: AddMemberFormValues) => {
      const { data } = await apiClient.post('/members', payload, {});
      return data;
    },
  });
}
