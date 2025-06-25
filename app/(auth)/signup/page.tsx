'use client';

import { CountrySelect } from '@/components/country-list-input';
import RenderApiError from '@/components/errors/apierror';
import { PasswordInput } from '@/components/password-input';
import { PhoneInput } from '@/components/phone-number-input';
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
import { useRegister } from '@/lib/hooks/auth/use-register';
import { successToastStyle } from '@/lib/toast-styles';
import { CHURCH_DENOMINATION_OPTIONS, SIGNUP_ROLE_OPTIONS } from '@/lib/utils';
import {
  ChurchFormValues,
  churchSchema,
  UserFormValues,
  userSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Church } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [churchData, setChurchData] = useState<ChurchFormValues | null>(null);
  const {
    mutateAsync: registerMutation,
    isPending,
    isError,
    error,
  } = useRegister();
  const churchForm = useForm<ChurchFormValues>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      churchData: {
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
    },
  });
  const adminForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      adminData: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: '',
        agreeToTerms: false,
      },
    },
  });
  const { reset: resetChurchValues } = churchForm;
  const { reset: resetAdminValues } = adminForm;
  const handleNextButtonClick = async (payload: ChurchFormValues) => {
    const isValid = await churchForm.trigger();
    if (isValid) {
      setChurchData(payload);
      setStep(2);
    }
  };
  // Handle form submission
  const onSubmit = async (payload: UserFormValues) => {
    if (!churchData) {
      return;
    }
    const registrationData = {
      churchData: churchData?.churchData,
      adminData: payload?.adminData,
    };
    await registerMutation(registrationData);
    // Redirect after successful registration
    router.push('/login');
    toast.success("Your account has been successfully created.", {
      style: successToastStyle,
    });
    resetChurchValues();
    resetAdminValues();
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
        {step === 1 && (
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
                  onSubmit={churchForm.handleSubmit(handleNextButtonClick)}
                  className='space-y-4'
                >
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={churchForm.control}
                      name='churchData.churchName'
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
                      name='churchData.denomination'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Denomination <span className='text-red-500'>*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className='cursor-pointer'>
                                <SelectValue placeholder='Select denomination' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className='max-h-[400px] overflow-y-auto'>
                              {CHURCH_DENOMINATION_OPTIONS.map(option => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className='cursor-pointer'
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={churchForm.control}
                    name='churchData.email'
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
                  <FormField
                    control={churchForm.control}
                    name='churchData.phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            defaultCountry='KE'
                            placeholder='Enter phone number'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={churchForm.control}
                    name='churchData.country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <CountrySelect
                            value={field.value}
                            onChange={field.onChange}
                            placeholder='Select your country'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={churchForm.control}
                    name='churchData.address'
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
                      name='churchData.website'
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
                      name='churchData.foundedYear'
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
                    name='churchData.description'
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
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={!churchForm.formState.isValid}
                  >
                    Continue to Admin Setup
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Admin Account Setup</CardTitle>
              <CardDescription>
                Create your administrator account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isError && <RenderApiError error={error} />}
              <Form {...adminForm}>
                <form
                  onSubmit={adminForm.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={adminForm.control}
                      name='adminData.firstName'
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
                      name='adminData.lastName'
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
                  <FormField
                    control={adminForm.control}
                    name='adminData.email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <span className='text-red-500'>*</span>
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
                    name='adminData.phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            defaultCountry='KE'
                            placeholder='Enter phone number'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name='adminData.role'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Role <span className='text-red-500'>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='cursor-pointer'>
                              <SelectValue placeholder='Select role' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='max-h-[400px] overflow-y-auto'>
                            {SIGNUP_ROLE_OPTIONS.map(option => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className='cursor-pointer'
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminForm.control}
                    name='adminData.password'
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
                    name='adminData.confirmPassword'
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
                    name='adminData.agreeToTerms'
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
                      disabled={!adminForm.formState.isValid || isPending}
                    >
                      {isPending ? (
                        'Creaing account...'
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </>
                      )}
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
