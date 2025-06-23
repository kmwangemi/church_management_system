import LoginForm from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Church } from 'lucide-react';

export default function LoginPage() {
  return (
    <>
      <div className='text-center mb-8'>
        <div className='inline-flex items-center space-x-2 mb-4'>
          <Church className='h-8 w-8 text-blue-600' />
          <span className='text-2xl font-bold text-gray-900'>
            ChurchManager
          </span>
        </div>
        <h1 className='text-2xl font-bold text-gray-900'>Welcome Back</h1>
        <p className='text-gray-600'>Sign in to your church account</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}
