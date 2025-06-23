// import apiClient from '@/lib/api-client';
// import type { ResendVerificationType, VerifyEmailType } from '@/lib/types';
// import type { SignupFormValues } from '@/lib/validations/auth';
// import { useMutation } from '@tanstack/react-query';

// export function useRegister() {
//   return useMutation({
//     mutationFn: async (payload: SignupFormValues) => {
//       const { data } = await apiClient.post('/registration', payload, {});
//       return data;
//     },
//   });
// }

// export function useVerifyEmail() {
//   return useMutation({
//     mutationFn: async (payload: VerifyEmailType) => {
//       const { data } = await apiClient.post('/verify-email', payload, {});
//       return data;
//     },
//   });
// }

// export function useResendVerifyEmail() {
//   return useMutation({
//     mutationFn: async (payload: ResendVerificationType) => {
//       const { data } = await apiClient.post(
//         '/resend-verification',
//         payload,
//         {},
//       );
//       return data;
//     },
//   });
// }
