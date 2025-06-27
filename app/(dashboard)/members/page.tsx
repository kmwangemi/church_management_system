'use client';

import RenderApiError from '@/components/errors/apierror';
import { MultiSelect } from '@/components/multi-select';
import { PhoneInput } from '@/components/phone-number-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useRegisterMember } from '@/lib/hooks/members/use-register-member';
import { successToastStyle } from '@/lib/toast-styles';
import { CHURCH_BRANCH_OPTIONS, CHURCH_DEPARTMENT_OPTIONS, MEMBER_SIGNUP_ROLE_OPTIONS } from '@/lib/utils';
import {
  AddMemberFormValues,
  addMemberSchema,
} from '@/lib/validations/members';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Edit,
  Eye,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1234567890',
    role: 'Member',
    department: 'Choir',
    joinDate: '2023-01-15',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael@email.com',
    phone: '+1234567891',
    role: 'Finance Officer',
    department: 'Finance',
    joinDate: '2022-06-20',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@email.com',
    phone: '+1234567892',
    role: 'Pastor',
    department: 'Leadership',
    joinDate: '2020-03-10',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david@email.com',
    phone: '+1234567893',
    role: 'Member',
    department: 'Youth',
    joinDate: '2023-08-05',
    status: 'Active',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  { id: '5', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '6', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '7', name: 'Peter Jones', email: 'peter.jones@example.com' },
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    mutateAsync: registerMemberMutation,
    isPending,
    isError,
    error,
  } = useRegisterMember();
  const memberForm = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      // departments: [],
      branch: '',
      gender: '',
    },
  });
  const { reset } = memberForm;
  // Handle form submission
  const onSubmit = async (payload: AddMemberFormValues) => {
    await registerMemberMutation(payload);
    toast.success('Member account has been successfully created.', {
      style: successToastStyle,
    });
    setIsDialogOpen(false);
    reset();
  };
  // Function to close dialog and reset form
  const handleCancel = () => {
    setIsDialogOpen(false);
    reset(); // Optional: reset form when canceling
  };
  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Pastor':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Finance Officer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Member Management
          </h1>
          <p className='text-muted-foreground'>
            Manage church members, roles, and attendance
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className='h-4 w-4 mr-2' />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Add a new member to the church database.
              </DialogDescription>
            </DialogHeader>
            {isError && <RenderApiError error={error} />}
            <Form {...memberForm}>
              <form
                onSubmit={memberForm.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='grid gap-4 md:grid-cols-2'>
                  <FormField
                    control={memberForm.control}
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
                    control={memberForm.control}
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
                <FormField
                  control={memberForm.control}
                  name='email'
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
                  control={memberForm.control}
                  name='phoneNumber'
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
                  control={memberForm.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>
                        Gender<span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className='flex flex-col space-y-1'
                        >
                          {[
                            ['Male', 'male'],
                            ['Female', 'female'],
                          ].map((option, index) => (
                            <FormItem
                              className='flex items-center space-x-3 space-y-0'
                              key={index}
                            >
                              <FormControl>
                                <RadioGroupItem value={option[1]} />
                              </FormControl>
                              <FormLabel className='font-normal'>
                                {option[0]}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={memberForm.control}
                  name='role'
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
                          {MEMBER_SIGNUP_ROLE_OPTIONS.map(option => (
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
                  control={memberForm.control}
                  name='branch'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Branch <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='cursor-pointer'>
                            <SelectValue placeholder='Select branch' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='max-h-[400px] overflow-y-auto'>
                          {CHURCH_BRANCH_OPTIONS.map(option => (
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
                {/* <FormField
                  control={memberForm.control}
                  name='departments'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Department <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={CHURCH_DEPARTMENT_OPTIONS}
                          selected={field.value || []}
                          onChange={field.onChange}
                          placeholder='Select departments'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={memberForm.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='notes' className='text-right'>
                        Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id='notes'
                          className='col-span-3'
                          placeholder='Enter any additional notes...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-start-2 col-span-3' />
                    </FormItem>
                  )}
                /> */}
                <div className='flex justify-end space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={!memberForm.formState.isValid || isPending}
                  >
                    {isPending ? 'Adding member...' : 'Add Member'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Members</CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,247</div>
            <p className='text-xs text-muted-foreground'>
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Members
            </CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,189</div>
            <p className='text-xs text-muted-foreground'>95.3% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              New This Month
            </CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>23</div>
            <p className='text-xs text-muted-foreground'>+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Departments</CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>Active departments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members Directory</CardTitle>
          <CardDescription>View and manage all church members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-2 mb-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search members...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Button variant='outline'>
              <Filter className='h-4 w-4 mr-2' />
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarImage src={member.avatar || '/placeholder.svg'} />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{member.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className='space-y-1'>
                      <div className='flex items-center text-sm'>
                        <Mail className='h-3 w-3 mr-1' />
                        {member.email}
                      </div>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Phone className='h-3 w-3 mr-1' />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant='secondary'>{member.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex space-x-2'>
                      <Link href={`/members/${member.id}`}>
                        <Button variant='ghost' size='sm'>
                          <Eye className='h-4 w-4 mr-1' />
                          View
                        </Button>
                      </Link>
                      <Link href={`/members/edit/${member.id}`}>
                        <Button variant='outline' size='sm'>
                          <Edit className='h-4 w-4 mr-1' />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
