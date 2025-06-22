"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  UserPlus,
  MessageSquare,
  Activity,
  Clock,
  Target,
  TrendingUp,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock data for group details
const groupDetails = {
  id: 1,
  name: "Young Adults Fellowship",
  leader: {
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    joinDate: "2022-03-15",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  description:
    "A vibrant community for young adults aged 18-30 focused on building meaningful relationships, studying God's word, and serving our community together.",
  members: 24,
  maxCapacity: 30,
  meetingDay: "Wednesday",
  meetingTime: "7:00 PM",
  location: "Room A - Main Building",
  category: "Age Group",
  status: "Active",
  startDate: "2022-01-10",
  averageAttendance: 85,
  goals: [
    "Increase membership to 30 by end of year",
    "Complete community service project",
    "Host monthly social events",
  ],
}

const groupMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-01-15",
    attendance: 92,
    role: "Member",
    status: "Active",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-02-20",
    attendance: 88,
    role: "Assistant Leader",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-03-10",
    attendance: 76,
    role: "Member",
    status: "Active",
  },
  {
    id: 4,
    name: "Lisa Wilson",
    email: "lisa.wilson@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-04-05",
    attendance: 94,
    role: "Secretary",
    status: "Active",
  },
]

const attendanceHistory = [
  { date: "2024-01-24", present: 22, total: 24, percentage: 92 },
  { date: "2024-01-17", present: 20, total: 24, percentage: 83 },
  { date: "2024-01-10", present: 21, total: 24, percentage: 88 },
  { date: "2024-01-03", present: 19, total: 24, percentage: 79 },
  { date: "2023-12-27", present: 18, total: 24, percentage: 75 },
  { date: "2023-12-20", present: 23, total: 24, percentage: 96 },
]

const activities = [
  {
    id: 1,
    type: "Meeting",
    title: "Weekly Bible Study",
    date: "2024-01-24",
    description: "Study on Romans Chapter 8",
    attendance: 22,
  },
  {
    id: 2,
    type: "Event",
    title: "Community Service",
    date: "2024-01-20",
    description: "Food bank volunteering",
    attendance: 18,
  },
  {
    id: 3,
    type: "Social",
    title: "Game Night",
    date: "2024-01-15",
    description: "Fellowship and fun activities",
    attendance: 20,
  },
]

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = groupMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/groups">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Groups
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{groupDetails.name}</h1>
            <p className="text-muted-foreground">{groupDetails.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Group Details</DialogTitle>
                <DialogDescription>Update group information</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue={groupDetails.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">
                    Capacity
                  </Label>
                  <Input id="capacity" type="number" defaultValue={groupDetails.maxCapacity} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" defaultValue={groupDetails.description} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>Add a member to this group</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="member-name" className="text-right">
                    Name
                  </Label>
                  <Input id="member-name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="member-email" className="text-right">
                    Email
                  </Label>
                  <Input id="member-email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="member-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="member-phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="member-role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="assistant">Assistant Leader</SelectItem>
                      <SelectItem value="secretary">Secretary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupDetails.members}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>of {groupDetails.maxCapacity} capacity</span>
            </div>
            <Progress value={(groupDetails.members / groupDetails.maxCapacity) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupDetails.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">Last 6 meetings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Schedule</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{groupDetails.meetingDay}</div>
            <p className="text-xs text-muted-foreground">{groupDetails.meetingTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Age</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Years active</p>
          </CardContent>
        </Card>
      </div>

      {/* Group Information */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Group Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Badge variant="outline">{groupDetails.category}</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant={groupDetails.status === "Active" ? "default" : "secondary"}>
                  {groupDetails.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Meeting Location</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{groupDetails.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Date</Label>
                <span className="text-sm">{new Date(groupDetails.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Group Goals</Label>
              <ul className="space-y-1">
                {groupDetails.goals.map((goal, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Leader</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={groupDetails.leader.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {groupDetails.leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{groupDetails.leader.name}</h3>
                <p className="text-sm text-muted-foreground">Group Leader</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{groupDetails.leader.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{groupDetails.leader.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Leading since {new Date(groupDetails.leader.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Group Members</CardTitle>
                  <CardDescription>Manage group membership and roles</CardDescription>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.role === "Member" ? "outline" : "default"}>{member.role}</Badge>
                      </TableCell>
                      <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{member.attendance}%</span>
                          <Progress value={member.attendance} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
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

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Track meeting attendance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record, index) => (
                    <TableRow key={record.date}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{record.present}</TableCell>
                      <TableCell>{record.total}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{record.percentage}%</span>
                          <Progress value={record.percentage} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        {index > 0 && (
                          <div className="flex items-center">
                            <TrendingUp
                              className={`h-4 w-4 ${
                                record.percentage > attendanceHistory[index - 1].percentage
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Group meetings, events, and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                        <span>{activity.attendance} attendees</span>
                      </div>
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
