"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Save,
  ArrowLeft,
  Edit,
  Plus,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building,
  Wifi,
  Car,
  Coffee,
  Music,
  Heart,
  UserPlus,
  Trash2,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function BranchDetailsPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)

  // Mock branch data - in real app, fetch based on params.id
  const branch = {
    id: params.id,
    name: "Downtown Campus",
    address: "456 Church Street, Downtown, ST 12345",
    phone: "+1 (555) 234-5678",
    email: "downtown@church.com",
    pastor: "Rev. Michael Davis",
    established: "2015-08-15",
    capacity: 300,
    currentMembers: 245,
    status: "Active",
    description:
      "Our downtown campus serves the urban community with contemporary worship and community outreach programs.",
    facilities: ["Sanctuary", "Fellowship Hall", "Children's Area", "Kitchen", "Parking", "Sound System", "WiFi"],
    serviceSchedule: [
      { day: "Sunday", time: "9:00 AM", service: "Morning Worship", attendance: 180 },
      { day: "Sunday", time: "11:00 AM", service: "Contemporary Service", attendance: 220 },
      { day: "Wednesday", time: "7:00 PM", service: "Bible Study", attendance: 65 },
      { day: "Friday", time: "7:00 PM", service: "Youth Meeting", attendance: 45 },
    ],
  }

  const departments = [
    {
      id: 1,
      name: "Worship Ministry",
      head: "Sarah Wilson",
      members: 12,
      description: "Leads worship services and music ministry",
      status: "Active",
    },
    {
      id: 2,
      name: "Children's Ministry",
      head: "Lisa Brown",
      members: 8,
      description: "Ministry focused on children's spiritual development",
      status: "Active",
    },
    {
      id: 3,
      name: "Youth Ministry",
      head: "David Johnson",
      members: 6,
      description: "Engaging teenagers in faith and community",
      status: "Active",
    },
    {
      id: 4,
      name: "Outreach Ministry",
      head: "Maria Garcia",
      members: 15,
      description: "Community outreach and evangelism programs",
      status: "Active",
    },
  ]

  const activities = [
    { date: "2024-12-20", activity: "Christmas Service Planning", participants: 25 },
    { date: "2024-12-18", activity: "Community Food Drive", participants: 40 },
    { date: "2024-12-15", activity: "Youth Christmas Party", participants: 35 },
    { date: "2024-12-12", activity: "Bible Study Leadership Training", participants: 12 },
  ]

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case "sanctuary":
        return <Building className="h-4 w-4" />
      case "fellowship hall":
        return <Users className="h-4 w-4" />
      case "children's area":
        return <Heart className="h-4 w-4" />
      case "kitchen":
        return <Coffee className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "sound system":
        return <Music className="h-4 w-4" />
      case "wifi":
        return <Wifi className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/branches">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Branches
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{branch.name}</h1>
            <p className="text-muted-foreground">Branch details and management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Branch Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branch.currentMembers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((branch.currentMembers / branch.capacity) * 100)}% capacity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Services</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branch.serviceSchedule.length}</div>
            <p className="text-xs text-muted-foreground">Regular services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                branch.serviceSchedule.reduce((sum, service) => sum + service.attendance, 0) /
                  branch.serviceSchedule.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per service</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Branch Information</CardTitle>
                <CardDescription>Basic details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input id="branchName" defaultValue={branch.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue={branch.address} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={branch.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={branch.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pastor">Pastor</Label>
                      <Input id="pastor" defaultValue={branch.pastor} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{branch.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{branch.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{branch.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Pastor: {branch.pastor}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Branch Status */}
            <Card>
              <CardHeader>
                <CardTitle>Branch Status</CardTitle>
                <CardDescription>Current status and capacity information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant="default">{branch.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Established</span>
                  <span className="text-sm text-muted-foreground">{branch.established}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Capacity</span>
                    <span className="text-sm text-muted-foreground">
                      {branch.currentMembers}/{branch.capacity}
                    </span>
                  </div>
                  <Progress value={(branch.currentMembers / branch.capacity) * 100} className="w-full" />
                </div>
                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" defaultValue={branch.capacity} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>Branch mission and overview</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea defaultValue={branch.description} rows={4} />
              ) : (
                <p className="text-sm text-muted-foreground">{branch.description}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Departments</h3>
              <p className="text-sm text-muted-foreground">Manage branch departments and leadership</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>Create a new department for this branch</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deptName">Department Name</Label>
                    <Input id="deptName" placeholder="Enter department name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deptHead">Department Head</Label>
                    <Input id="deptHead" placeholder="Enter department head name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deptDesc">Description</Label>
                    <Textarea id="deptDesc" placeholder="Enter department description" />
                  </div>
                  <Button className="w-full">Create Department</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {departments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <Badge variant="outline">{dept.status}</Badge>
                  </div>
                  <CardDescription>{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Department Head</span>
                      <span className="text-sm text-muted-foreground">{dept.head}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Members</span>
                      <span className="text-sm text-muted-foreground">{dept.members}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Service Schedule</h3>
              <p className="text-sm text-muted-foreground">Regular services and meeting times</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Avg. Attendance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branch.serviceSchedule.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{service.day}</TableCell>
                      <TableCell>{service.time}</TableCell>
                      <TableCell>{service.service}</TableCell>
                      <TableCell>{service.attendance}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="facilities" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Facilities & Amenities</h3>
              <p className="text-sm text-muted-foreground">Available facilities and resources</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {branch.facilities.map((facility, index) => (
              <Card key={index}>
                <CardContent className="flex items-center space-x-4 p-4">
                  <div className="flex-shrink-0">{getFacilityIcon(facility)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{facility}</h4>
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Recent Activities</h3>
              <p className="text-sm text-muted-foreground">Latest events and activities at this branch</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Activity
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.participants}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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
      </Tabs>
    </div>
  )
}
