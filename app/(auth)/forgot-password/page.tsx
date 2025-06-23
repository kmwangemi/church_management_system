'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Church, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
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
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='pastor@church.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Send Reset Link
                </Button>
              </form>
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
                We've sent a password reset link to <strong>{email}</strong>
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
