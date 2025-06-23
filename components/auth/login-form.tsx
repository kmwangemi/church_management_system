'use client';

import RenderApiError from '@/components/errors/apierror';
import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/lib/hooks/auth/use-login';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: loginMutation, isPending, isError, error } = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { reset, watch } = form;
  const watchAllValues = watch();
  // Handle form submission
  const onSubmit = async (payload: LoginFormValues) => {
    await loginMutation(payload);
    // Redirect after successful login
    const redirect = searchParams.get('redirect') || '/dashboard';
    router.push(redirect);
    reset();
  };
  return (
    <>
      {isError && <RenderApiError error={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='remember'
                checked={rememberMe}
                onCheckedChange={checked => setRememberMe(checked as boolean)}
              />
              <Label htmlFor='remember' className='text-sm'>
                Remember me
              </Label>
            </div>
            <Link
              href='/forgot-password'
              className='text-sm text-blue-600 hover:underline'
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type='submit'
            className='w-full'
            disabled={
              !Object.values(watchAllValues).every(value => !!value) ||
              isPending
            }
          >
            {isPending ? (
              'Signing in...'
            ) : (
              <>
                Sign In
                <LogIn className='ml-2 h-4 w-4' />
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link href='/signup' className='text-blue-600 hover:underline'>
            Sign up here
          </Link>
        </p>
      </div>
    </>
  );
}
