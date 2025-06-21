"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, MapPin, Users, Building2, UserCheck } from "lucide-react"

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const branches = [
    {
      id: 1,
      name: "Main Campus",
      location: "123 Church Street, Downtown",
      pastor: "Pastor John Smith",
      members: 850,
      departments: 8,
      status: "Active",
      established: "1995",
    },
    {
      id: 2,
      name: "North Branch",
      location: "456 Oak Avenue, North District",
      pastor: "Pastor Sarah Johnson",
      members: 320,
      departments: 5,
      status: "Active",
      established: "2010",
    },
    {
      id: 3,
      name: "Youth Campus",
      location: "789 Pine Road, University Area",
      pastor: "Pastor Mike Wilson",
      members: 180,
      departments: 4,
      status: "Active",
      established: "2018",
    },
  ]

  const departments = [
    {
      id: 1,
      name: "Choir Ministry",
      branch: "Main Campus",
      leader: "Mary Johnson",
      members: 45,
      meetingDay: "Wednesday",
      meetingTime: "7:00 PM",
      status: "Active",
    },
    {
      id: 2,
      name: "Youth Ministry",
      branch: "All Branches",
      leader: "David Brown",
      members: 120,
      meetingDay: "Friday",
      meetingTime: "6:00 PM",
      status: "Active",
    },
    {
      id: 3,
      name: "Ushering Team",
      branch: "Main Campus",
      leader: "Robert Davis",
      members: 32,
      meetingDay: "Sunday",
      meetingTime: "8:00 AM",
      status: "Active",
    },
    {
      id: 4,
      name: "Women's Ministry",
      branch: "North Branch",
      leader: "Linda Wilson",
      members: 65,
      meetingDay: "Saturday",
      meetingTime: "10:00 AM",
      status: "Active",
    },
    {
      id: 5,
      name: "Men's Fellowship",
      branch: "Main Campus",
      leader: "James Miller",
      members: 78,
      meetingDay: "Saturday",
      meetingTime: "7:00 AM",
      status: "Active",
    },
  ]

  const filteredBranches = branches.filter((branch) => branch.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredDepartments = departments.filter((dept) => dept.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branches & Departments</h1>
          <p className="text-muted-foreground">Manage church locations and ministry departments</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>Create a new church branch location.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branchName" className="text-right">
                    Name
                  </Label>
                  <Input id="branchName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pastor" className="text-right">
                    Pastor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select pastor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pastor1">Pastor John Smith</SelectItem>
                      <SelectItem value="pastor2">Pastor Sarah Johnson</SelectItem>
                      <SelectItem value="pastor3">Pastor Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="established" className="text-right">
                    Established
                  </Label>
                  <Input id="established" type="date" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Branch</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>Create a new ministry department.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deptName" className="text-right">
                    Name
                  </Label>
                  <Input id="deptName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">
                    Branch
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Campus</SelectItem>
                      <SelectItem value="north">North Branch</SelectItem>
                      <SelectItem value="youth">Youth Campus</SelectItem>
                      <SelectItem value="all">All Branches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leader" className="text-right">
                    Leader
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select leader" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mary">Mary Johnson</SelectItem>
                      <SelectItem value="david">David Brown</SelectItem>
                      <SelectItem value="robert">Robert Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meetingDay" className="text-right">
                    Meeting Day
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="meetingTime" className="text-right">
                    Meeting Time
                  </Label>
                  <Input id="meetingTime" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Department</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Ministry departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,350</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department Leaders</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active leaders</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="branches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Church Branches</CardTitle>
              <CardDescription>Manage all church branch locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search branches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredBranches.map((branch) => (
                  <Card key={branch.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{branch.name}</h3>
                          <Badge variant="secondary">{branch.status}</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {branch.location}
                          </div>
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-2" />
                            {branch.pastor}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {branch.members} members
                          </div>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            {branch.departments} departments
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">Established: {branch.established}</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ministry Departments</CardTitle>
              <CardDescription>Manage all ministry departments across branches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Meeting Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.branch}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {dept.leader
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{dept.leader}</span>
                        </div>
                      </TableCell>
                      <TableCell>{dept.members}</TableCell>
                      <TableCell>
                        {dept.meetingDay} {dept.meetingTime}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{dept.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
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

        <TabsContent value="hierarchy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Hierarchy</CardTitle>
              <CardDescription>Visual representation of church structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {branches.map((branch) => (
                  <div key={branch.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">{branch.name}</h3>
                          <p className="text-sm text-muted-foreground">{branch.pastor}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{branch.members} members</Badge>
                    </div>
                    <div className="ml-9 space-y-2">
                      {departments
                        .filter((dept) => dept.branch === branch.name || dept.branch === "All Branches")
                        .map((dept) => (
                          <div key={dept.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{dept.name}</span>
                              <span className="text-sm text-muted-foreground">- {dept.leader}</span>
                            </div>
                            <Badge variant="secondary">{dept.members} members</Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
