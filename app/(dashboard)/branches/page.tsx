'use client';

import { CountrySelect } from '@/components/country-list-input';
import { CustomSelect } from '@/components/custom-select';
import { DatePicker } from '@/components/date-picker';
import RenderApiError from '@/components/errors/apierror';
import { MultiSelect } from '@/components/multi-select';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  useFetchBranches,
  useRegisterBranch,
} from '@/lib/hooks/branch/use-branch';
import {
  useFetchDepartments,
  useRegisterDepartment,
} from '@/lib/hooks/department/use-department';
import {
  capitalizeFirstLetterOfEachWord,
  formatToNewDate,
  MEETING_DAY_OPTIONS,
} from '@/lib/utils';
import { AddBranchFormValues, addBranchSchema } from '@/lib/validations/branch';
import {
  AddDepartmentFormValues,
  addDepartmentSchema,
} from '@/lib/validations/department';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Building2,
  Loader2,
  MapPin,
  Plus,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// const branches = [
//   {
//     id: 1,
//     name: 'Main Campus',
//     location: '123 Church Street, Downtown',
//     pastor: 'Pastor John Smith',
//     members: 850,
//     departments: 8,
//     status: 'Active',
//     established: '1995',
//   },
//   {
//     id: 2,
//     name: 'North Branch',
//     location: '456 Oak Avenue, North District',
//     pastor: 'Pastor Sarah Johnson',
//     members: 320,
//     departments: 5,
//     status: 'Active',
//     established: '2010',
//   },
//   {
//     id: 3,
//     name: 'Youth Campus',
//     location: '789 Pine Road, University Area',
//     pastor: 'Pastor Mike Wilson',
//     members: 180,
//     departments: 4,
//     status: 'Active',
//     established: '2018',
//   },
// ];

// const departments = [
//   {
//     id: 1,
//     name: 'Choir Ministry',
//     branch: 'Main Campus',
//     leader: 'Mary Johnson',
//     members: 45,
//     meetingDay: 'Wednesday',
//     meetingTime: '7:00 PM',
//     status: 'Active',
//   },
//   {
//     id: 2,
//     name: 'Youth Ministry',
//     branch: 'All Branches',
//     leader: 'David Brown',
//     members: 120,
//     meetingDay: 'Friday',
//     meetingTime: '6:00 PM',
//     status: 'Active',
//   },
//   {
//     id: 3,
//     name: 'Ushering Team',
//     branch: 'Main Campus',
//     leader: 'Robert Davis',
//     members: 32,
//     meetingDay: 'Sunday',
//     meetingTime: '8:00 AM',
//     status: 'Active',
//   },
//   {
//     id: 4,
//     name: "Women's Ministry",
//     branch: 'North Branch',
//     leader: 'Linda Wilson',
//     members: 65,
//     meetingDay: 'Saturday',
//     meetingTime: '10:00 AM',
//     status: 'Active',
//   },
//   {
//     id: 5,
//     name: "Men's Fellowship",
//     branch: 'Main Campus',
//     leader: 'James Miller',
//     members: 78,
//     meetingDay: 'Saturday',
//     meetingTime: '7:00 AM',
//     status: 'Active',
//   },
// ];

export default function BranchesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const page = Number.parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('query') || '';
  const {
    register,
    reset: resetSearchInput,
    handleSubmit,
  } = useForm({
    defaultValues: {
      query: searchQuery,
    },
  });
  const {
    data: branches,
    isLoading: isLoadingBranches,
    isError: isErrorBranches,
    error: errorBranches,
  } = useFetchBranches(page, searchQuery);
  const {
    mutateAsync: registerBranchMutation,
    isPending: isPendingBranch,
    isError: isErrorBranch,
    error: errorBranch,
  } = useRegisterBranch();
  const {
    data: departments,
    isLoading: isLoadingDepartments,
    isError: isErrorDepartments,
    error: errorDepartments,
  } = useFetchDepartments(page, searchQuery);
  console.log('departments--->', JSON.stringify(departments));
  const {
    mutateAsync: registerDepartmentMutation,
    isPending: isPendingDepartment,
    isError: isErrorDepartment,
    error: errorDepartment,
  } = useRegisterDepartment();
  const branchForm = useForm<AddBranchFormValues>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      branchName: '',
      country: '',
      capacity: '',
      address: '',
      // pastorId: '',
      establishedDate: '',
    },
  });
  const departmentForm = useForm<AddDepartmentFormValues>({
    resolver: zodResolver(addDepartmentSchema),
    defaultValues: {
      departmentName: '',
      branchId: '',
      // leaderId: '',
      meetingDay: [],
      meetingTime: '',
      description: '',
    },
  });
  const { reset: resetBranchForm } = branchForm;
  const { reset: resetDepartmentForm } = departmentForm;
  // Handle form submission
  const onSubmitBranchForm = async (payload: AddBranchFormValues) => {
    await registerBranchMutation(payload);
    setIsBranchDialogOpen(false);
    resetBranchForm();
  };
  const onSubmitDepartmentForm = async (payload: AddDepartmentFormValues) => {
    await registerDepartmentMutation(payload);
    setIsDepartmentDialogOpen(false);
    resetDepartmentForm();
  };
  const handleCancelBranch = () => {
    setIsBranchDialogOpen(false);
    resetBranchForm();
  };
  const handleCancelDepartment = () => {
    setIsDepartmentDialogOpen(false);
    resetDepartmentForm();
  };
  const handleResetQueries = () => {
    resetSearchInput();
    router.push(pathname);
  };
  const handleOpenDepartmentDialog = () => {
    setIsDepartmentDialogOpen(true);
    handleResetQueries();
  };
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Branches & Departments
          </h1>
          <p className='text-muted-foreground'>
            Manage church locations and ministry departments
          </p>
        </div>
        <div className='flex space-x-2'>
          <Dialog
            open={isBranchDialogOpen}
            onOpenChange={setIsBranchDialogOpen}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setIsBranchDialogOpen(true)}>
                <Plus className='h-4 w-4 mr-2' />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>
                  Add a new branch to the church database.
                </DialogDescription>
              </DialogHeader>
              {isErrorBranch && <RenderApiError error={errorBranch} />}
              <Form {...branchForm}>
                <form
                  onSubmit={branchForm.handleSubmit(onSubmitBranchForm)}
                  className='space-y-4'
                >
                  <FormField
                    control={branchForm.control}
                    name='branchName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Branch Name <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Kibra' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={branchForm.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <CountrySelect
                            value={field.value}
                            onChange={field.onChange}
                            placeholder='Select country'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={branchForm.control}
                    name='capacity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Capacity <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          {/* <Input type='number' placeholder='300' {...field} /> */}
                          <Input
                            type='text'
                            inputMode='numeric'
                            placeholder='Enter capacity number'
                            {...field}
                            onChange={e => {
                              const value = e.target.value.replace(
                                /[^0-9.]/g,
                                '',
                              );
                              field.onChange(value);
                            }}
                            onKeyDown={e => {
                              // Disable arrow keys
                              if (
                                e.key === 'ArrowUp' ||
                                e.key === 'ArrowDown'
                              ) {
                                e.preventDefault();
                              }
                              // Allow only numbers, backspace, delete, etc.
                              const allowedKeys = [
                                'Backspace',
                                'Delete',
                                'Tab',
                                'ArrowLeft',
                                'ArrowRight',
                              ];
                              if (
                                !allowedKeys.includes(e.key) &&
                                !/[0-9.]/.test(e.key)
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={branchForm.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Physical Address{' '}
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Kawangware 46' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={branchForm.control}
                    name='establishedDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Established Date{' '}
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={date =>
                              field.onChange(date ? date.toISOString() : '')
                            }
                            placeholder='Select established date'
                            format='long'
                            maxDate={new Date()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-end space-x-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleCancelBranch}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={
                        !branchForm.formState.isValid || isPendingBranch
                      }
                    >
                      {isPendingBranch ? 'Adding branch...' : 'Add Branch'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isDepartmentDialogOpen}
            onOpenChange={setIsDepartmentDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant='outline' onClick={handleOpenDepartmentDialog}>
                <Plus className='h-4 w-4 mr-2' />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Add a new department to the church database.
                </DialogDescription>
              </DialogHeader>
              {isErrorDepartment && <RenderApiError error={errorDepartment} />}
              <Form {...departmentForm}>
                <form
                  onSubmit={departmentForm.handleSubmit(onSubmitDepartmentForm)}
                  className='space-y-4'
                >
                  <FormField
                    control={departmentForm.control}
                    name='departmentName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Department Name{' '}
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder='Choir' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={departmentForm.control}
                    name='branchId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Church Branch
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='cursor-pointer'>
                              <SelectValue placeholder='Select church branch' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='max-h-[400px] overflow-y-auto'>
                            {branches?.branches?.map(option => (
                              <SelectItem
                                key={option._id}
                                value={option._id}
                                className='cursor-pointer'
                              >
                                {capitalizeFirstLetterOfEachWord(
                                  option.branchName,
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={departmentForm.control}
                    name='branchId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Church Branch
                          <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <CustomSelect
                            options={
                              branches?.branches?.map(branch => ({
                                value: branch._id,
                                label: capitalizeFirstLetterOfEachWord(
                                  branch.branchName,
                                ),
                              })) || []
                            }
                            selected={field.value || ''}
                            onChange={field.onChange}
                            placeholder='Select church branch'
                            className='cursor-pointer'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={departmentForm.control}
                    name='meetingDay'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Meeting day(s) <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={MEETING_DAY_OPTIONS}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder='Select meeting day(s)'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={departmentForm.control}
                    name='meetingTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Meeting Time <span className='text-red-500'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={departmentForm.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='description' className='text-right'>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id='description'
                            className='col-span-3'
                            placeholder='Enter department description...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-start-2 col-span-3' />
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-end space-x-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleCancelDepartment}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={
                        !departmentForm.formState.isValid || isPendingDepartment
                      }
                    >
                      {isPendingDepartment
                        ? 'Adding department...'
                        : 'Add Department'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Overview Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Branches
            </CardTitle>
            <Building2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3</div>
            <p className='text-xs text-muted-foreground'>Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Departments
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>
              Ministry departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Members</CardTitle>
            <UserCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,350</div>
            <p className='text-xs text-muted-foreground'>Across all branches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Department Leaders
            </CardTitle>
            <UserCheck className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>Active leaders</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue='branches' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='branches' onClick={handleResetQueries}>
            Branches
          </TabsTrigger>
          <TabsTrigger value='departments' onClick={handleResetQueries}>
            Departments
          </TabsTrigger>
          <TabsTrigger value='hierarchy' onClick={handleResetQueries}>
            Hierarchy
          </TabsTrigger>
        </TabsList>
        <TabsContent value='branches' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Church Branches</CardTitle>
              <CardDescription>
                Manage all church branch locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-4'>
                <SearchInput
                  register={register}
                  handleSubmit={handleSubmit}
                  placeholder='Search branches...'
                />
              </div>
              {isErrorBranches && <RenderApiError error={errorBranches} />}
              {isLoadingBranches ? (
                <div className='flex items-center justify-center py-8'>
                  <Loader2 className='mr-2 h-6 w-6 animate-spin' />
                  <span className='text-muted-foreground'>
                    Loading branches...
                  </span>
                </div>
              ) : (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {branches?.branches?.map(branch => (
                    <Card key={branch._id}>
                      <CardContent className='p-6'>
                        <div className='space-y-4'>
                          <div className='flex items-center justify-between'>
                            <h3 className='font-semibold text-lg'>
                              {capitalizeFirstLetterOfEachWord(
                                branch.branchName,
                              )}
                            </h3>
                            <Badge variant='secondary'>
                              {branch.isActive === true ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className='space-y-2 text-sm text-muted-foreground'>
                            <div className='flex items-center'>
                              <MapPin className='h-4 w-4 mr-2' />
                              {capitalizeFirstLetterOfEachWord(branch.address)}
                              {' - '}
                              {capitalizeFirstLetterOfEachWord(branch.country)}
                            </div>
                            {/* <div className='flex items-center'>
                          <UserCheck className='h-4 w-4 mr-2' />
                          {branch.pastor}
                        </div> */}
                            {/* <div className='flex items-center'>
                          <Users className='h-4 w-4 mr-2' />
                          {branch.members} members
                        </div> */}
                            {/* <div className='flex items-center'>
                          <Building2 className='h-4 w-4 mr-2' />
                          {branch.departments} departments
                        </div> */}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            Established:{' '}
                            {formatToNewDate(new Date(branch.establishedDate))}
                          </div>
                          <div className='flex'>
                            <Button
                              variant='outline'
                              size='sm'
                              className='flex-1'
                              onClick={() =>
                                router.push(`/branches/${branch._id}`)
                              }
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <div className='mx-6 mb-6'>
              {branches?.branches != null &&
                branches?.branches !== undefined &&
                Array.isArray(branches?.branches) &&
                branches?.branches.length > 0 &&
                branches?.pagination?.pages > 1 && (
                  <Pagination totalPages={branches?.pagination?.pages} />
                )}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value='departments' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Ministry Departments</CardTitle>
              <CardDescription>
                Manage all ministry departments across branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-4'>
                <SearchInput
                  register={register}
                  handleSubmit={handleSubmit}
                  placeholder='Search departments...'
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    {/* <TableHead>Branch</TableHead> */}
                    {/* <TableHead>Leader</TableHead> */}
                    {/* <TableHead>Members</TableHead> */}
                    <TableHead>Meeting Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments?.departments.map(dept => (
                    <TableRow key={dept._id}>
                      <TableCell className='font-medium'>
                        {dept.departmentName}
                      </TableCell>
                      {/* <TableCell>{dept.branch}</TableCell> */}
                      {/* <TableCell>
                        <div className='flex items-center space-x-2'>
                          <Avatar className='h-6 w-6'>
                            <AvatarImage src='/placeholder.svg' />
                            <AvatarFallback>
                              {dept.leader
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{dept.leader}</span>
                        </div>
                      </TableCell> */}
                      {/* <TableCell>{dept.members}</TableCell> */}
                      <TableCell>
                        {dept.meetingDay} {dept.meetingTime}
                      </TableCell>
                      <TableCell>
                        <Badge variant='secondary'>
                          {dept.isActive === true ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex space-x-2'>
                          <Button variant='ghost' size='sm'>
                            View
                          </Button>
                          <Button variant='ghost' size='sm'>
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='hierarchy' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Organizational Hierarchy</CardTitle>
              <CardDescription>
                Visual representation of church structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {branches?.branches.map(branch => (
                  <div key={branch._id} className='border rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center space-x-3'>
                        <Building2 className='h-6 w-6 text-primary' />
                        <div>
                          <h3 className='font-semibold'>
                            {branch?.branchName}
                          </h3>
                          {/* <p className='text-sm text-muted-foreground'>
                            {branch.pastor}
                          </p> */}
                        </div>
                      </div>
                      {/* <Badge variant='outline'>{branch.members} members</Badge> */}
                    </div>
                    {/* <div className='ml-9 space-y-2'>
                      {departments
                        .filter(
                          dept =>
                            dept.branch === branch.branchName ||
                            dept.branch === 'All Branches',
                        )
                        .map(dept => (
                          <div
                            key={dept.id}
                            className='flex items-center justify-between p-2 bg-muted rounded'
                          >
                            <div className='flex items-center space-x-2'>
                              <Users className='h-4 w-4 text-muted-foreground' />
                              <span className='font-medium'>{dept.name}</span>
                              <span className='text-sm text-muted-foreground'>
                                - {dept.leader}
                              </span>
                            </div>
                            <Badge variant='secondary'>
                              {dept.members} members
                            </Badge>
                          </div>
                        ))}
                    </div> */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
