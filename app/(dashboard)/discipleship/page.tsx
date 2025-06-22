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
import { Progress } from "@/components/ui/progress"
import { Plus, Search, UserPlus, BookOpen, Award, Calendar, Users } from "lucide-react"

export default function DiscipleshipPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const newConverts = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1234567890",
      conversionDate: "2024-12-01",
      assignedMentor: "Mary Wilson",
      status: "Active",
      followUpCount: 3,
      lastContact: "2024-12-18",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael@email.com",
      phone: "+1234567891",
      conversionDate: "2024-11-15",
      assignedMentor: "David Smith",
      status: "Active",
      followUpCount: 5,
      lastContact: "2024-12-20",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@email.com",
      phone: "+1234567892",
      conversionDate: "2024-10-20",
      assignedMentor: "Linda Johnson",
      status: "Graduated",
      followUpCount: 8,
      lastContact: "2024-12-15",
    },
  ]

  const discipleshipClasses = [
    {
      id: 1,
      name: "New Believers Class",
      instructor: "Pastor Sarah",
      level: "Beginner",
      duration: "8 weeks",
      currentStudents: 12,
      maxCapacity: 15,
      startDate: "2024-01-15",
      endDate: "2024-03-10",
      status: "Active",
      progress: 75,
    },
    {
      id: 2,
      name: "Growing in Faith",
      instructor: "Elder Mike",
      level: "Intermediate",
      duration: "12 weeks",
      currentStudents: 8,
      maxCapacity: 12,
      startDate: "2024-02-01",
      endDate: "2024-04-25",
      status: "Active",
      progress: 60,
    },
    {
      id: 3,
      name: "Leadership Development",
      instructor: "Pastor John",
      level: "Advanced",
      duration: "16 weeks",
      currentStudents: 6,
      maxCapacity: 10,
      startDate: "2024-03-01",
      endDate: "2024-06-20",
      status: "Active",
      progress: 40,
    },
    {
      id: 4,
      name: "Bible Study Foundations",
      instructor: "Teacher Anna",
      level: "Beginner",
      duration: "6 weeks",
      currentStudents: 0,
      maxCapacity: 20,
      startDate: "2025-01-15",
      endDate: "2025-02-25",
      status: "Scheduled",
      progress: 0,
    },
  ]

  const mentors = [
    {
      id: 1,
      name: "Mary Wilson",
      email: "mary@email.com",
      phone: "+1234567893",
      experience: "5 years",
      currentMentees: 3,
      maxCapacity: 5,
      specialization: "New Converts",
      status: "Active",
    },
    {
      id: 2,
      name: "David Smith",
      email: "david@email.com",
      phone: "+1234567894",
      experience: "8 years",
      currentMentees: 4,
      maxCapacity: 6,
      specialization: "Youth Ministry",
      status: "Active",
    },
    {
      id: 3,
      name: "Linda Johnson",
      email: "linda@email.com",
      phone: "+1234567895",
      experience: "3 years",
      currentMentees: 2,
      maxCapacity: 4,
      specialization: "Women's Ministry",
      status: "Active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Graduated":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
        return "bg-purple-100 text-purple-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discipleship & Follow-up</h1>
          <p className="text-muted-foreground">Track new converts and manage discipleship programs</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Convert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Convert</DialogTitle>
                <DialogDescription>Register a new convert for follow-up and discipleship.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="convertName" className="text-right">
                    Name
                  </Label>
                  <Input id="convertName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="convertEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="convertEmail" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="convertPhone" className="text-right">
                    Phone
                  </Label>
                  <Input id="convertPhone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="conversionDate" className="text-right">
                    Conversion Date
                  </Label>
                  <Input id="conversionDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mentor" className="text-right">
                    Assign Mentor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mary">Mary Wilson</SelectItem>
                      <SelectItem value="david">David Smith</SelectItem>
                      <SelectItem value="linda">Linda Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Convert</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Discipleship Class</DialogTitle>
                <DialogDescription>Set up a new discipleship class or program.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="className" className="text-right">
                    Class Name
                  </Label>
                  <Input id="className" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructor" className="text-right">
                    Instructor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pastor1">Pastor John</SelectItem>
                      <SelectItem value="pastor2">Pastor Sarah</SelectItem>
                      <SelectItem value="elder1">Elder Mike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Level
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input id="duration" placeholder="e.g., 8 weeks" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">
                    Max Capacity
                  </Label>
                  <Input id="capacity" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <Input id="startDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="classDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea id="classDescription" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Class</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Discipleship Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Converts</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Completed programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Available mentors</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="converts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="converts">New Converts</TabsTrigger>
          <TabsTrigger value="classes">Discipleship Classes</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="converts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Convert Tracking</CardTitle>
              <CardDescription>Monitor and follow up with new converts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search converts..."
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
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Conversion Date</TableHead>
                    <TableHead>Assigned Mentor</TableHead>
                    <TableHead>Follow-ups</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newConverts.map((convert) => (
                    <TableRow key={convert.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {convert.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{convert.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{convert.email}</div>
                          <div className="text-muted-foreground">{convert.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{convert.conversionDate}</TableCell>
                      <TableCell>{convert.assignedMentor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{convert.followUpCount} visits</Badge>
                      </TableCell>
                      <TableCell>{convert.lastContact}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(convert.status)}>{convert.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            Follow Up
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

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discipleship Classes</CardTitle>
              <CardDescription>Manage discipleship programs and class progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discipleshipClasses.map((classItem) => (
                  <Card key={classItem.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{classItem.name}</h3>
                            <Badge className={getLevelColor(classItem.level)}>{classItem.level}</Badge>
                            <Badge className={getStatusColor(classItem.status)}>{classItem.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Instructor: {classItem.instructor} • Duration: {classItem.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {classItem.currentStudents}/{classItem.maxCapacity} students
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {classItem.startDate} - {classItem.endDate}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{classItem.progress}%</span>
                        </div>
                        <Progress value={classItem.progress} className="h-2" />
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          View Students
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Management</CardTitle>
              <CardDescription>Manage mentors and their assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Current Load</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentors.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{mentor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{mentor.email}</div>
                          <div className="text-muted-foreground">{mentor.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{mentor.experience}</TableCell>
                      <TableCell>{mentor.specialization}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {mentor.currentMentees}/{mentor.maxCapacity} mentees
                          </div>
                          <Progress value={(mentor.currentMentees / mentor.maxCapacity) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(mentor.status)}>{mentor.status}</Badge>
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

        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Progress Overview</CardTitle>
                <CardDescription>Track progress across all discipleship classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discipleshipClasses
                    .filter((c) => c.status === "Active")
                    .map((classItem) => (
                      <div key={classItem.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{classItem.name}</span>
                          <span className="text-sm text-muted-foreground">{classItem.progress}%</span>
                        </div>
                        <Progress value={classItem.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {classItem.currentStudents} students • {classItem.instructor}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow-up Statistics</CardTitle>
                <CardDescription>New convert follow-up metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total New Converts</span>
                    <span className="font-bold">{newConverts.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Follow-ups</span>
                    <span className="font-bold">{newConverts.filter((c) => c.status === "Active").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Graduated</span>
                    <span className="font-bold">{newConverts.filter((c) => c.status === "Graduated").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Follow-ups</span>
                    <span className="font-bold">
                      {Math.round(newConverts.reduce((sum, c) => sum + c.followUpCount, 0) / newConverts.length)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mentor Utilization</span>
                    <span className="font-bold">
                      {Math.round(
                        (mentors.reduce((sum, m) => sum + m.currentMentees, 0) /
                          mentors.reduce((sum, m) => sum + m.maxCapacity, 0)) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
