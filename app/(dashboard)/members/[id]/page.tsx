"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  DollarSign,
  Users,
  BookOpen,
  Award,
  Clock,
  UserCheck,
  MessageSquare,
  Gift,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
  // Mock member data - in real app, fetch based on params.id
  const member = {
    id: params.id,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    birthDate: "June 15, 1985",
    joinDate: "March 10, 2020",
    membershipStatus: "Active",
    membershipType: "Full Member",
    maritalStatus: "Married",
    occupation: "Teacher",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    ministries: ["Children's Ministry", "Worship Team"],
    skills: ["Music", "Teaching", "Administration"],
    notes: "Very active in children's ministry. Has leadership potential.",
    baptized: true,
    confirmed: true,
    smallGroup: "Young Adults Group",
    servingAreas: ["Sunday School", "Choir"],
    totalGiving: 3250,
    averageAttendance: 85,
    volunteerHours: 120,
  }

  const attendanceData = [
    { month: "Jan", attendance: 4, services: 4 },
    { month: "Feb", attendance: 3, services: 4 },
    { month: "Mar", attendance: 4, services: 5 },
    { month: "Apr", attendance: 4, services: 4 },
    { month: "May", attendance: 3, services: 4 },
    { month: "Jun", attendance: 4, services: 4 },
  ]

  const givingData = [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 450 },
    { month: "Mar", amount: 600 },
    { month: "Apr", amount: 500 },
    { month: "May", amount: 550 },
    { month: "Jun", amount: 650 },
  ]

  const involvementData = [
    { name: "Worship", hours: 40, color: "#8884d8" },
    { name: "Children's Ministry", hours: 60, color: "#82ca9d" },
    { name: "Administration", hours: 20, color: "#ffc658" },
  ]

  const recentActivities = [
    { date: "2024-12-20", activity: "Attended Sunday Service", type: "Attendance" },
    { date: "2024-12-18", activity: "Volunteered at Food Drive", type: "Service" },
    { date: "2024-12-15", activity: "Donated $250 (Tithe)", type: "Giving" },
    { date: "2024-12-12", activity: "Led Children's Bible Study", type: "Ministry" },
    { date: "2024-12-10", activity: "Attended Prayer Meeting", type: "Attendance" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Attendance":
        return <UserCheck className="h-4 w-4 text-blue-500" />
      case "Service":
        return <Heart className="h-4 w-4 text-red-500" />
      case "Giving":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "Ministry":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/members">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Members
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{member.name}</h1>
            <p className="text-muted-foreground">Member profile and analytics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Link href={`/members/edit/${member.id}`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Member Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={member.name} />
              <AvatarFallback className="text-lg">SJ</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.membershipType}</p>
              <Badge className="mt-2" variant="default">
                {member.membershipStatus}
              </Badge>
            </div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs">{member.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {member.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="md:col-span-3 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Giving</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${member.totalGiving.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{member.averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{member.volunteerHours}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="giving">Giving</TabsTrigger>
          <TabsTrigger value="involvement">Involvement</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic member details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Birth Date</Label>
                    <p className="text-sm text-muted-foreground">{member.birthDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Marital Status</Label>
                    <p className="text-sm text-muted-foreground">{member.maritalStatus}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Occupation</Label>
                    <p className="text-sm text-muted-foreground">{member.occupation}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Small Group</Label>
                    <p className="text-sm text-muted-foreground">{member.smallGroup}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Emergency Contact</Label>
                  <p className="text-sm text-muted-foreground">{member.emergencyContact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Status */}
            <Card>
              <CardHeader>
                <CardTitle>Spiritual Status</CardTitle>
                <CardDescription>Baptism and confirmation status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Baptized</span>
                  <Badge variant={member.baptized ? "default" : "secondary"}>{member.baptized ? "Yes" : "No"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confirmed</span>
                  <Badge variant={member.confirmed ? "default" : "secondary"}>{member.confirmed ? "Yes" : "No"}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Member Since</Label>
                  <p className="text-sm text-muted-foreground">{member.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Membership Type</Label>
                  <p className="text-sm text-muted-foreground">{member.membershipType}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Ministry Involvement */}
            <Card>
              <CardHeader>
                <CardTitle>Ministry Involvement</CardTitle>
                <CardDescription>Current ministry participation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Active Ministries</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.ministries.map((ministry, index) => (
                      <Badge key={index} variant="default">
                        {ministry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Serving Areas</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.servingAreas.map((area, index) => (
                      <Badge key={index} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Notes</CardTitle>
                <CardDescription>Member skills and additional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{member.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Analytics</CardTitle>
              <CardDescription>Monthly attendance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#8884d8" name="Attended" />
                  <Bar dataKey="services" fill="#82ca9d" name="Total Services" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
                <CardDescription>Overall attendance statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Attendance</span>
                  <span className="text-2xl font-bold">{member.averageAttendance}%</span>
                </div>
                <Progress value={member.averageAttendance} className="w-full" />
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Services Attended</span>
                    <span>22/26</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consecutive Weeks</span>
                    <span>4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Month</span>
                    <span>March (100%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Preferences</CardTitle>
                <CardDescription>Most attended service types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sunday Morning Service</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={95} className="w-20" />
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bible Study</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-20" />
                      <span className="text-sm font-medium">80%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prayer Meeting</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-20" />
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Youth Service</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={40} className="w-20" />
                      <span className="text-sm font-medium">40%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="giving" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Giving History</CardTitle>
              <CardDescription>Monthly giving patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={givingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Giving</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${member.totalGiving.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">+15% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Monthly</CardTitle>
                <CardDescription>Regular giving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${Math.round(member.totalGiving / 6).toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Giving Consistency</CardTitle>
                <CardDescription>Regular contributor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">100%</div>
                <p className="text-sm text-muted-foreground">6/6 months</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="involvement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ministry Hours Distribution</CardTitle>
                <CardDescription>Time spent in different ministries</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={involvementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {involvementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leadership & Recognition</CardTitle>
                <CardDescription>Achievements and leadership roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-medium">Volunteer of the Month</h4>
                    <p className="text-sm text-muted-foreground">March 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Children's Ministry Leader</h4>
                    <p className="text-sm text-muted-foreground">Since January 2023</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">Faithful Giver</h4>
                    <p className="text-sm text-muted-foreground">12 consecutive months</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <h4 className="font-medium">Small Group Coordinator</h4>
                    <p className="text-sm text-muted-foreground">Young Adults Group</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest member activities and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.activity}</h4>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
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

function Label({
  className,
  children,
  ...props
}: { className?: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  )
}
