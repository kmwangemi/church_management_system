'use client';

import RenderApiError from '@/components/errors/apierror';
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
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/lib/hooks/auth/use-forgot-password';
import { successToastStyle } from '@/lib/toast-styles';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Church, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    mutateAsync: forgotPasswordMutation,
    isPending,
    isError,
    error,
  } = useForgotPassword();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const { reset, watch } = form;
  const watchEmailValue = watch('email');
  // Handle form submission
  const onSubmit = async (payload: ForgotPasswordFormValues) => {
    await forgotPasswordMutation(payload);
    setIsSubmitted(true);
    toast.success(`We've sent a verification code to ${payload.email}`, {
      style: successToastStyle,
    });
    reset();
  };
  return (
    <>
      <div className='text-center mb-8'>
        <div className='inline-flex items-center space-x-2 mb-4'>
          <Church className='h-8 w-8 text-blue-600' />
          <span className='text-2xl font-bold text-gray-900'>
            ChurchManager
          </span>
        </div>
        <h1 className='text-2xl font-bold text-gray-900'>Forgot Password</h1>
        <p className='text-gray-600'>
          {isSubmitted
            ? 'Check your email for reset instructions'
            : 'Enter your email to reset your password'}
        </p>
      </div>
      <Card>
        {!isSubmitted ? (
          <>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                We'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isError && <RenderApiError error={error} />}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <div className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder='you@example.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={!watchEmailValue || isPending}
                  >
                    {isPending ? (
                      'Sending reset link...'
                    ) : (
                      <>
                        Send Reset Link
                        <Mail className='ml-2 h-4 w-4' />
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
                <Mail className='h-6 w-6 text-green-600' />
              </div>
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We've sent a password reset link to{' '}
                <strong>{watchEmailValue}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-sm text-gray-600 space-y-2'>
                <p>If you don't see the email in your inbox:</p>
                <ul className='list-disc list-inside space-y-1 ml-4'>
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email address</li>
                  <li>Wait a few minutes for the email to arrive</li>
                </ul>
              </div>
              <div className='flex flex-col space-y-2'>
                <Button
                  variant='outline'
                  onClick={() => setIsSubmitted(false)}
                  className='w-full'
                >
                  Try Different Email
                </Button>
                <Link href='/login'>
                  <Button variant='ghost' className='w-full'>
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}
