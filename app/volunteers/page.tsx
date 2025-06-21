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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, UserCheck, Calendar, Clock, AlertCircle, Users } from "lucide-react"

export default function VolunteersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const volunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1234567890",
      skills: ["Music", "Teaching", "Administration"],
      availability: ["Sunday Morning", "Wednesday Evening"],
      currentRoles: ["Choir Member", "Sunday School Teacher"],
      joinDate: "2023-01-15",
      status: "Active",
      hoursThisMonth: 24,
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael@email.com",
      phone: "+1234567891",
      skills: ["Technical", "Sound", "Video"],
      availability: ["Sunday Morning", "Friday Evening"],
      currentRoles: ["Sound Technician"],
      joinDate: "2022-08-20",
      status: "Active",
      hoursThisMonth: 16,
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@email.com",
      phone: "+1234567892",
      skills: ["Hospitality", "Cooking", "Event Planning"],
      availability: ["Saturday", "Sunday"],
      currentRoles: ["Event Coordinator", "Kitchen Helper"],
      joinDate: "2023-03-10",
      status: "Active",
      hoursThisMonth: 32,
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@email.com",
      phone: "+1234567893",
      skills: ["Security", "Ushering", "Parking"],
      availability: ["Sunday Morning"],
      currentRoles: ["Head Usher"],
      joinDate: "2021-11-05",
      status: "Inactive",
      hoursThisMonth: 0,
    },
  ]

  const volunteerRoles = [
    {
      id: 1,
      title: "Sunday School Teacher",
      department: "Children's Ministry",
      requiredSkills: ["Teaching", "Patience", "Child Care"],
      timeCommitment: "2 hours/week",
      currentVolunteers: 8,
      neededVolunteers: 2,
      priority: "High",
      description: "Teach children ages 6-12 during Sunday morning service",
    },
    {
      id: 2,
      title: "Sound Technician",
      department: "Technical Ministry",
      requiredSkills: ["Technical", "Sound", "Equipment"],
      timeCommitment: "3 hours/week",
      currentVolunteers: 4,
      neededVolunteers: 2,
      priority: "Medium",
      description: "Operate sound equipment during services and events",
    },
    {
      id: 3,
      title: "Parking Attendant",
      department: "Hospitality",
      requiredSkills: ["Customer Service", "Organization"],
      timeCommitment: "2 hours/week",
      currentVolunteers: 6,
      neededVolunteers: 4,
      priority: "High",
      description: "Direct traffic and assist with parking during services",
    },
    {
      id: 4,
      title: "Kitchen Helper",
      department: "Hospitality",
      requiredSkills: ["Cooking", "Food Safety", "Teamwork"],
      timeCommitment: "4 hours/month",
      currentVolunteers: 12,
      neededVolunteers: 0,
      priority: "Low",
      description: "Assist with meal preparation for church events",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Christmas Service Setup",
      date: "2024-12-24",
      time: "8:00 AM",
      assignedVolunteers: ["Sarah Johnson", "Michael Brown", "Emily Davis"],
      requiredVolunteers: 8,
      status: "Scheduled",
      priority: "High",
    },
    {
      id: 2,
      title: "Youth Event Cleanup",
      date: "2024-12-23",
      time: "9:00 PM",
      assignedVolunteers: ["David Wilson"],
      requiredVolunteers: 4,
      status: "Needs Volunteers",
      priority: "Medium",
    },
    {
      id: 3,
      title: "New Year Service Preparation",
      date: "2024-12-31",
      time: "6:00 PM",
      assignedVolunteers: [],
      requiredVolunteers: 6,
      status: "Open",
      priority: "Medium",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Needs Volunteers":
        return "bg-yellow-100 text-yellow-800"
      case "Open":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Volunteer & Service Management</h1>
          <p className="text-muted-foreground">Manage volunteers, roles, and service scheduling</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Volunteer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Volunteer</DialogTitle>
                <DialogDescription>Register a new volunteer and their skills.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="volunteerName" className="text-right">
                    Name
                  </Label>
                  <Input id="volunteerName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="volunteerEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="volunteerEmail" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="volunteerPhone" className="text-right">
                    Phone
                  </Label>
                  <Input id="volunteerPhone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Skills</Label>
                  <div className="col-span-3 space-y-2">
                    {["Music", "Teaching", "Technical", "Hospitality", "Administration", "Security"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox id={skill} />
                        <Label htmlFor={skill} className="text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Availability</Label>
                  <div className="col-span-3 space-y-2">
                    {["Sunday Morning", "Sunday Evening", "Wednesday Evening", "Friday Evening", "Saturday"].map(
                      (time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox id={time} />
                          <Label htmlFor={time} className="text-sm">
                            {time}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="volunteerNotes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="volunteerNotes" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Volunteer</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Volunteer Task</DialogTitle>
                <DialogDescription>Schedule a new task or service opportunity.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskTitle" className="text-right">
                    Title
                  </Label>
                  <Input id="taskTitle" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskDate" className="text-right">
                    Date
                  </Label>
                  <Input id="taskDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskTime" className="text-right">
                    Time
                  </Label>
                  <Input id="taskTime" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requiredVolunteers" className="text-right">
                    Volunteers Needed
                  </Label>
                  <Input id="requiredVolunteers" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskPriority" className="text-right">
                    Priority
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taskDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea id="taskDescription" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Volunteer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours This Month</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Need volunteers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="roles">Volunteer Roles</TabsTrigger>
          <TabsTrigger value="tasks">Tasks & Scheduling</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Directory</CardTitle>
              <CardDescription>Manage volunteer information and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search volunteers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Current Roles</TableHead>
                    <TableHead>Hours This Month</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {volunteer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{volunteer.name}</span>
                            <div className="text-xs text-muted-foreground">Joined {volunteer.joinDate}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{volunteer.email}</div>
                          <div className="text-muted-foreground">{volunteer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {volunteer.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{volunteer.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {volunteer.currentRoles.map((role) => (
                            <div key={role} className="text-sm">
                              {role}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{volunteer.hoursThisMonth}h</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(volunteer.status)}>{volunteer.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            Assign
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

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Roles</CardTitle>
              <CardDescription>Manage volunteer positions and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerRoles.map((role) => (
                  <Card key={role.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{role.title}</h3>
                            <Badge variant="outline">{role.department}</Badge>
                            <Badge className={getPriorityColor(role.priority)}>{role.priority}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Time: {role.timeCommitment}</span>
                            <span>
                              Volunteers: {role.currentVolunteers}/{role.currentVolunteers + role.neededVolunteers}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {role.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {role.neededVolunteers > 0 && (
                            <Button variant="outline" size="sm">
                              Find Volunteers
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Edit Role
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

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Schedule and assign volunteer tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {task.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {task.time}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {task.assignedVolunteers.length}/{task.requiredVolunteers} volunteers
                            </div>
                          </div>
                          {task.assignedVolunteers.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-sm font-medium">Assigned Volunteers:</span>
                              <div className="flex flex-wrap gap-1">
                                {task.assignedVolunteers.map((volunteer) => (
                                  <Badge key={volunteer} variant="secondary" className="text-xs">
                                    {volunteer}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Assign Volunteers
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit Task
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

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Statistics</CardTitle>
                <CardDescription>Overview of volunteer engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Registered Volunteers</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active This Month</span>
                    <span className="font-bold">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Hours This Month</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Hours per Volunteer</span>
                    <span className="font-bold">8.8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Volunteer Retention Rate</span>
                    <span className="font-bold">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Volunteers</CardTitle>
                <CardDescription>Most active volunteers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers
                    .sort((a, b) => b.hoursThisMonth - a.hoursThisMonth)
                    .slice(0, 5)
                    .map((volunteer, index) => (
                      <div key={volunteer.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-sm text-muted-foreground">{volunteer.currentRoles.join(", ")}</p>
                          </div>
                        </div>
                        <span className="font-bold">{volunteer.hoursThisMonth}h</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
