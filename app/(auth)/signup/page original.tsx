'use client';

import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  ChurchFormValues,
  churchSchema,
  UserFormValues,
  userSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Church } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [churchData, setChurchData] = useState<ChurchFormValues | null>(null);
  const churchForm = useForm<ChurchFormValues>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      churchName: '',
      denomination: '',
      address: '',
      country: '',
      phoneNumber: '',
      email: '',
      website: '',
      foundedYear: '',
      description: '',
    },
  });
  const adminForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: '',
      agreeToTerms: false,
    },
  });
  const handleChurchSubmit = async (payload: ChurchFormValues) => {
    try {
      setChurchData(payload);
      setStep(2);
    } catch (error) {
      console.error('Church form submission failed:', error);
    }
  };
  const handleAdminSubmit = async (payload: UserFormValues) => {
    try {
      // Handle final registration
      console.log('Church Registration:', { churchData, adminData: payload });
      // Here you would typically make an API call to register the church and admin
    } catch (error) {
      console.error('Admin form submission failed:', error);
    }
  };
  const handleBackToStep1 = () => {
    setStep(1);
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
        <h1 className='text-2xl font-bold text-gray-900'>
          Create Your Church Account
        </h1>
        <p className='text-gray-600'>
          {step === 1
            ? 'Tell us about your church'
            : 'Set up your admin account'}
        </p>
      </div>
      {/* Progress Indicator */}
      <div className='flex items-center justify-center mb-8'>
        <div className='flex items-center space-x-4'>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            1
          </div>
          <div
            className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}
          />
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            2
          </div>
        </div>
      </div>
      <Card>
        {step === 1 ? (
          <>
            <CardHeader>
              <CardTitle>Church Information</CardTitle>
              <CardDescription>
                Provide details about your church organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...churchForm}>
                <form
                  onSubmit={churchForm.handleSubmit(handleChurchSubmit)}
                  className='space-y-4'
                >
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={churchForm.control}
                      name='churchName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Church Name <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Grace Community Church'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={churchForm.control}
                      name='denomination'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Denomination <span className='text-red-500'>*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select denomination' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='baptist'>Baptist</SelectItem>
                              <SelectItem value='methodist'>
                                Methodist
                              </SelectItem>
                              <SelectItem value='presbyterian'>
                                Presbyterian
                              </SelectItem>
                              <SelectItem value='pentecostal'>
                                Pentecostal
                              </SelectItem>
                              <SelectItem value='catholic'>Catholic</SelectItem>
                              <SelectItem value='episcopal'>
                                Episcopal
                              </SelectItem>
                              <SelectItem value='lutheran'>Lutheran</SelectItem>
                              <SelectItem value='non-denominational'>
                                Non-denominational
                              </SelectItem>
                              <SelectItem value='other'>Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={churchForm.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Phone Number <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder='(254) 123-4567'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={churchForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Church Email <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='info@gracechurch.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={churchForm.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Kenya' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={churchForm.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='123 Church Street' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={churchForm.control}
                      name='website'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='www.gracechurch.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={churchForm.control}
                      name='foundedYear'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Founded Year <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='1985'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={churchForm.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your church's mission and vision..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full'>
                    Continue to Admin Setup
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Admin Account Setup</CardTitle>
              <CardDescription>
                Create your administrator account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...adminForm}>
                <form
                  onSubmit={adminForm.handleSubmit(handleAdminSubmit)}
                  className='space-y-4'
                >
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={adminForm.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Name <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder='John' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder='Smith' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={adminForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email Address{' '}
                            <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='pastor@gracechurch.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name='phoneNumber'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Phone Number <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder='(555) 123-4567'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={adminForm.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Role <span className='text-red-500'>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Pastor'>Pastor</SelectItem>
                            <SelectItem value='Associate Pastor'>
                              Associate Pastor
                            </SelectItem>
                            <SelectItem value='Church Administrator'>
                              Church Administrator
                            </SelectItem>
                            <SelectItem value='Elder'>Elder</SelectItem>
                            <SelectItem value='Deacon'>Deacon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder='Create a strong password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirm Password{' '}
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder='Confirm your password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name='agreeToTerms'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel className='text-sm'>
                            I agree to the{' '}
                            <Link
                              href='/terms'
                              className='text-blue-600 hover:underline'
                            >
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              href='/privacy'
                              className='text-blue-600 hover:underline'
                            >
                              Privacy Policy
                            </Link>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className='flex gap-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleBackToStep1}
                      className='flex-1'
                    >
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back
                    </Button>
                    <Button
                      type='submit'
                      className='flex-1'
                      disabled={!adminForm.formState.isValid}
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <Link href='/login' className='text-blue-600 hover:underline'>
            Sign in here
          </Link>
        </p>
      </div>
    </>
  );
}
