'use client';

import RenderApiError from '@/components/errors/apierror';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useResetPassword } from '@/lib/hooks/auth/use-reset-password';
import { successToastStyle } from '@/lib/toast-styles';
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, CheckCircle, Church } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token') || null;
  const token = null;
  const [isReset, setIsReset] = useState(false);
  const {
    mutateAsync: resetPasswordMutation,
    isPending,
    isError,
    error,
  } = useResetPassword();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });
  const { watch, reset } = form;
  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  // Handle form submission
  const onSubmit = async (payload: ResetPasswordFormValues) => {
    await resetPasswordMutation({
      ...payload,
      token: token ?? undefined,
    });
    setIsReset(true);
    toast.success('Please check your email for a reset password link.', {
      style: successToastStyle,
    });
    reset();
  };
  const passwordRequirements = [
    { text: 'At least 8 characters', met: watchPassword.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(watchPassword) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(watchPassword) },
    { text: 'Contains number', met: /\d/.test(watchPassword) },
    {
      text: 'Contains special character',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(watchPassword),
    },
  ];
  return (
    <>
      <div className='text-center mb-8'>
        <div className='inline-flex items-center space-x-2 mb-4'>
          <Church className='h-8 w-8 text-blue-600' />
          <span className='text-2xl font-bold text-gray-900'>
            ChurchManager
          </span>
        </div>
        <h1 className='text-2xl font-bold text-gray-900'>Reset Password</h1>
        <p className='text-gray-600'>
          {isReset
            ? 'Your password has been reset successfully'
            : 'Create a new password for your account'}
        </p>
      </div>
      <Card>
        {!isReset ? (
          <>
            <CardHeader>
              <CardTitle>Create New Password</CardTitle>
              <CardDescription>
                Choose a strong password to secure your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isError && <RenderApiError error={error} />}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder='Enter new password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder='Confirm new password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Password Requirements */}
                  {watchPassword && (
                    <div className='space-y-2'>
                      <FormLabel className='text-sm font-medium'>
                        Password Requirements:
                      </FormLabel>
                      <div className='space-y-1'>
                        {passwordRequirements.map((req, index) => (
                          <div
                            key={index}
                            className='flex items-center space-x-2 text-xs'
                          >
                            <CheckCircle
                              className={`h-3 w-3 ${
                                req.met ? 'text-green-500' : 'text-gray-300'
                              }`}
                            />
                            <span
                              className={
                                req.met ? 'text-green-700' : 'text-gray-500'
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Password Match Indicator */}
                  {watchConfirmPassword && (
                    <div className='flex items-center space-x-2 text-xs'>
                      <CheckCircle
                        className={`h-3 w-3 ${
                          watchPassword === watchConfirmPassword
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      />
                      <span
                        className={
                          watchPassword === watchConfirmPassword
                            ? 'text-green-700'
                            : 'text-red-500'
                        }
                      >
                        {watchPassword === watchConfirmPassword
                          ? 'Passwords match'
                          : "Passwords don't match"}
                      </span>
                    </div>
                  )}
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={!form.formState.isValid || isPending}
                  >
                    {isPending ? (
                      'Resetting password...'
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              <div className='mt-6 text-center'>
                <Link
                  href='/login'
                  className='inline-flex items-center text-sm text-blue-600 hover:underline'
                >
                  <ArrowLeft className='mr-1 h-4 w-4' />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className='text-center'>
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                <CheckCircle className='h-6 w-6 text-green-600' />
              </div>
              <CardTitle>Password Reset Successful</CardTitle>
              <CardDescription>
                Your password has been updated successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href='/login'>
                <Button className='w-full'>Sign In with New Password</Button>
              </Link>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
