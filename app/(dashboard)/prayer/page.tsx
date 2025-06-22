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
import { Plus, Search, Heart, User, Clock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function PrayerPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const prayerRequests = [
    {
      id: 1,
      title: "Healing for Family Member",
      requester: "Sarah Johnson",
      email: "sarah@email.com",
      category: "Health",
      priority: "High",
      status: "Active",
      isPrivate: false,
      dateSubmitted: "2024-12-18",
      assignedCounselor: "Pastor John",
      followUpDate: "2024-12-25",
      description: "Please pray for my mother who is undergoing surgery next week.",
    },
    {
      id: 2,
      title: "Job Search Guidance",
      requester: "Michael Brown",
      email: "michael@email.com",
      category: "Career",
      priority: "Medium",
      status: "In Progress",
      isPrivate: true,
      dateSubmitted: "2024-12-15",
      assignedCounselor: "Pastor Sarah",
      followUpDate: "2024-12-22",
      description: "Seeking God's direction in finding new employment opportunities.",
    },
    {
      id: 3,
      title: "Marriage Counseling",
      requester: "Anonymous",
      email: "anonymous@request.com",
      category: "Relationship",
      priority: "High",
      status: "Active",
      isPrivate: true,
      dateSubmitted: "2024-12-10",
      assignedCounselor: "Elder Mike",
      followUpDate: "2024-12-20",
      description: "Need prayer and guidance for marital difficulties.",
    },
    {
      id: 4,
      title: "Financial Breakthrough",
      requester: "Emily Davis",
      email: "emily@email.com",
      category: "Financial",
      priority: "Medium",
      status: "Answered",
      isPrivate: false,
      dateSubmitted: "2024-11-28",
      assignedCounselor: "Pastor John",
      followUpDate: "2024-12-15",
      description: "Praise God! The financial situation has been resolved.",
    },
  ]

  const counselors = [
    {
      id: 1,
      name: "Pastor John Smith",
      email: "pastor.john@church.com",
      phone: "+1234567890",
      specialization: ["General Counseling", "Marriage", "Family"],
      currentCases: 8,
      maxCapacity: 12,
      status: "Available",
      experience: "15 years",
    },
    {
      id: 2,
      name: "Pastor Sarah Johnson",
      email: "pastor.sarah@church.com",
      phone: "+1234567891",
      specialization: ["Youth Counseling", "Career Guidance", "Women's Issues"],
      currentCases: 6,
      maxCapacity: 10,
      status: "Available",
      experience: "8 years",
    },
    {
      id: 3,
      name: "Elder Mike Wilson",
      email: "elder.mike@church.com",
      phone: "+1234567892",
      specialization: ["Marriage Counseling", "Addiction Recovery", "Men's Issues"],
      currentCases: 10,
      maxCapacity: 10,
      status: "Full",
      experience: "12 years",
    },
  ]

  const prayerCategories = [
    { name: "Health", count: 15, color: "bg-red-100 text-red-800" },
    { name: "Financial", count: 8, color: "bg-green-100 text-green-800" },
    { name: "Relationship", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Career", count: 6, color: "bg-purple-100 text-purple-800" },
    { name: "Spiritual", count: 9, color: "bg-yellow-100 text-yellow-800" },
    { name: "Family", count: 11, color: "bg-pink-100 text-pink-800" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Answered":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      case "Available":
        return "bg-green-100 text-green-800"
      case "Full":
        return "bg-red-100 text-red-800"
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
          <h1 className="text-3xl font-bold tracking-tight">Prayer Requests & Counseling</h1>
          <p className="text-muted-foreground">Manage prayer requests and counseling assignments</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Counselor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Counselor</DialogTitle>
                <DialogDescription>Register a new counselor for prayer and guidance ministry.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="counselorName" className="text-right">
                    Name
                  </Label>
                  <Input id="counselorName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="counselorEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="counselorEmail" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="counselorPhone" className="text-right">
                    Phone
                  </Label>
                  <Input id="counselorPhone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialization" className="text-right">
                    Specialization
                  </Label>
                  <Input id="specialization" placeholder="e.g., Marriage, Youth" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxCapacity" className="text-right">
                    Max Cases
                  </Label>
                  <Input id="maxCapacity" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">
                    Experience
                  </Label>
                  <Input id="experience" placeholder="e.g., 5 years" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Counselor</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Prayer Request</DialogTitle>
                <DialogDescription>Submit a new prayer request for the church community.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requestTitle" className="text-right">
                    Title
                  </Label>
                  <Input id="requestTitle" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requesterName" className="text-right">
                    Name
                  </Label>
                  <Input id="requesterName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requesterEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="requesterEmail" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requestCategory" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="relationship">Relationship</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requestPriority" className="text-right">
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
                  <Label htmlFor="isPrivate" className="text-right">
                    Privacy
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select privacy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Share with prayer team</SelectItem>
                      <SelectItem value="private">Private - Counselor only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requestDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea id="requestDescription" className="col-span-3" rows={3} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit Request</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Prayer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Answered Prayers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Praise reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Counselors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Available for counseling</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Prayer Requests</TabsTrigger>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prayer Requests</CardTitle>
              <CardDescription>Manage and assign prayer requests to counselors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prayer requests..."
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
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prayerRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{request.title}</span>
                            {request.isPrivate && <EyeOff className="h-3 w-3 text-muted-foreground" />}
                            {!request.isPrivate && <Eye className="h-3 w-3 text-muted-foreground" />}
                          </div>
                          <div className="text-xs text-muted-foreground">Submitted: {request.dateSubmitted}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{request.requester}</div>
                          <div className="text-xs text-muted-foreground">{request.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      </TableCell>
                      <TableCell>{request.assignedCounselor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {request.followUpDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Assign
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

        <TabsContent value="counselors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Counselor Management</CardTitle>
              <CardDescription>Manage counselors and their case assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Counselor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Current Cases</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counselors.map((counselor) => (
                    <TableRow key={counselor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {counselor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{counselor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{counselor.email}</div>
                          <div className="text-muted-foreground">{counselor.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specialization.slice(0, 2).map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {counselor.specialization.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{counselor.specialization.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {counselor.currentCases}/{counselor.maxCapacity} cases
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-600 h-1 rounded-full"
                              style={{ width: `${(counselor.currentCases / counselor.maxCapacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{counselor.experience}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(counselor.status)}>{counselor.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            View Cases
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

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prayer Categories</CardTitle>
              <CardDescription>Overview of prayer request categories and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {prayerCategories.map((category) => (
                  <Card key={category.name}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">Prayer requests</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{category.count}</div>
                          <Badge className={category.color} variant="secondary">
                            Active
                          </Badge>
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
                <CardTitle>Prayer Request Statistics</CardTitle>
                <CardDescription>Overview of prayer ministry metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Requests This Year</span>
                    <span className="font-bold">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Currently Active</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Answered Prayers</span>
                    <span className="font-bold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Response Time</span>
                    <span className="font-bold">2.3 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Most Common Category</span>
                    <span className="font-bold">Health</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Counselor Workload</CardTitle>
                <CardDescription>Current case distribution among counselors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{counselor.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {counselor.currentCases}/{counselor.maxCapacity} cases
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(counselor.currentCases / counselor.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
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
