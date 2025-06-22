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
import { Users, Plus, Search, Calendar, MapPin, UserPlus, Activity } from "lucide-react"
import Link from "next/link"

// Mock data for small groups
const smallGroups = [
  {
    id: 1,
    name: "Young Adults Fellowship",
    leader: "Sarah Johnson",
    members: 24,
    maxCapacity: 30,
    meetingDay: "Wednesday",
    meetingTime: "7:00 PM",
    location: "Room A",
    category: "Age Group",
    status: "Active",
    description: "A vibrant community for young adults aged 18-30",
    attendance: 85,
  },
  {
    id: 2,
    name: "Men's Bible Study",
    leader: "David Wilson",
    members: 18,
    maxCapacity: 25,
    meetingDay: "Saturday",
    meetingTime: "8:00 AM",
    location: "Conference Room",
    category: "Bible Study",
    status: "Active",
    description: "Deep dive into God's word for men of all ages",
    attendance: 92,
  },
  {
    id: 3,
    name: "Women's Prayer Circle",
    leader: "Mary Davis",
    members: 32,
    maxCapacity: 35,
    meetingDay: "Tuesday",
    meetingTime: "10:00 AM",
    location: "Prayer Room",
    category: "Prayer",
    status: "Active",
    description: "Intercession and fellowship for women",
    attendance: 78,
  },
  {
    id: 4,
    name: "Youth Ministry Team",
    leader: "Michael Brown",
    members: 15,
    maxCapacity: 20,
    meetingDay: "Friday",
    meetingTime: "6:30 PM",
    location: "Youth Hall",
    category: "Ministry",
    status: "Active",
    description: "Serving and mentoring the next generation",
    attendance: 88,
  },
]

const groupStats = {
  totalGroups: 12,
  totalMembers: 156,
  averageAttendance: 86,
  activeGroups: 11,
  newMembersThisMonth: 8,
  groupsNeedingLeaders: 2,
}

export default function SmallGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredGroups = smallGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.leader.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Small Groups & Teams</h1>
          <p className="text-muted-foreground">Manage your church's small groups and ministry teams</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>Add a new small group or ministry team</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leader" className="text-right">
                  Leader
                </Label>
                <Input id="leader" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="prayer">Prayer</SelectItem>
                    <SelectItem value="ministry">Ministry</SelectItem>
                    <SelectItem value="age-group">Age Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupStats.totalGroups}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupStats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">+{groupStats.newMembersThisMonth} new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="groups">All Groups</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="leaders">Leaders</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups or leaders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Bible Study">Bible Study</SelectItem>
                <SelectItem value="Prayer">Prayer</SelectItem>
                <SelectItem value="Ministry">Ministry</SelectItem>
                <SelectItem value="Age Group">Age Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Groups Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    <Badge variant={group.status === "Active" ? "default" : "secondary"}>{group.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>
                        {group.leader
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{group.leader}</p>
                      <p className="text-xs text-muted-foreground">Group Leader</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Members</span>
                      <span>
                        {group.members}/{group.maxCapacity}
                      </span>
                    </div>
                    <Progress value={(group.members / group.maxCapacity) * 100} className="h-2" />
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {group.meetingDay} at {group.meetingTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{group.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline">{group.category}</Badge>
                    <Link href={`/groups/${group.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Group Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Groups This Year</span>
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Member Growth</span>
                    <span className="font-bold text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Group Size</span>
                    <span className="font-bold">13 members</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smallGroups.slice(0, 4).map((group) => (
                    <div key={group.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{group.name}</span>
                        <span>{group.attendance}%</span>
                      </div>
                      <Progress value={group.attendance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Leaders</CardTitle>
              <CardDescription>Manage and track group leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leader</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {smallGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>
                              {group.leader
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{group.leader}</span>
                        </div>
                      </TableCell>
                      <TableCell>{group.name}</TableCell>
                      <TableCell>{group.members}</TableCell>
                      <TableCell>{group.attendance}%</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
