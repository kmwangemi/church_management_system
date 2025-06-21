"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"

export default function ReportsPage() {
  const attendanceData = [
    { month: "Jan", attendance: 420, target: 450 },
    { month: "Feb", attendance: 445, target: 450 },
    { month: "Mar", attendance: 380, target: 450 },
    { month: "Apr", attendance: 465, target: 450 },
    { month: "May", attendance: 490, target: 450 },
    { month: "Jun", attendance: 520, target: 450 },
    { month: "Jul", attendance: 485, target: 450 },
    { month: "Aug", attendance: 510, target: 450 },
    { month: "Sep", attendance: 475, target: 450 },
    { month: "Oct", attendance: 495, target: 450 },
    { month: "Nov", attendance: 525, target: 450 },
    { month: "Dec", attendance: 550, target: 450 },
  ]

  const givingTrends = [
    { month: "Jan", amount: 17000 },
    { month: "Feb", amount: 18800 },
    { month: "Mar", amount: 15600 },
    { month: "Apr", amount: 20200 },
    { month: "May", amount: 21600 },
    { month: "Jun", amount: 18400 },
    { month: "Jul", amount: 19800 },
    { month: "Aug", amount: 22100 },
    { month: "Sep", amount: 20500 },
    { month: "Oct", amount: 23200 },
    { month: "Nov", amount: 24800 },
    { month: "Dec", amount: 26500 },
  ]

  const membershipGrowth = [
    { month: "Jan", members: 1180, newMembers: 15, leftMembers: 8 },
    { month: "Feb", members: 1195, newMembers: 18, leftMembers: 3 },
    { month: "Mar", members: 1205, newMembers: 12, leftMembers: 2 },
    { month: "Apr", members: 1218, newMembers: 16, leftMembers: 3 },
    { month: "May", members: 1232, newMembers: 19, leftMembers: 5 },
    { month: "Jun", members: 1247, newMembers: 20, leftMembers: 5 },
  ]

  const departmentStats = [
    { name: "Choir", members: 45, active: 42, color: "#8884d8" },
    { name: "Youth", members: 85, active: 78, color: "#82ca9d" },
    { name: "Ushering", members: 32, active: 30, color: "#ffc658" },
    { name: "Finance", members: 8, active: 8, color: "#ff7300" },
    { name: "Leadership", members: 12, active: 12, color: "#00ff00" },
  ]

  const eventAttendance = [
    { event: "Sunday Service", avgAttendance: 485, capacity: 600 },
    { event: "Bible Study", avgAttendance: 120, capacity: 150 },
    { event: "Youth Meeting", avgAttendance: 78, capacity: 100 },
    { event: "Prayer Meeting", avgAttendance: 65, capacity: 80 },
    { event: "Choir Practice", avgAttendance: 42, capacity: 50 },
  ]

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your church operations</p>
        </div>
        <Link href="/reports/view">
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            View All Reports
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">485</div>
              <p className="text-xs text-muted-foreground">+8% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Giving</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$248,500</div>
              <p className="text-xs text-muted-foreground">+15% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+67</div>
              <p className="text-xs text-muted-foreground">New members this year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Held</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="giving">Giving</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Trends</CardTitle>
                  <CardDescription>Attendance vs target over the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      attendance: { label: "Attendance", color: "#8884d8" },
                      target: { label: "Target", color: "#82ca9d" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Attendance Rates</CardTitle>
                  <CardDescription>Average attendance by event type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      attendance: { label: "Attendance", color: "#8884d8" },
                      capacity: { label: "Capacity", color: "#82ca9d" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={eventAttendance} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="event" type="category" width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="avgAttendance" fill="#8884d8" />
                        <Bar dataKey="capacity" fill="#82ca9d" opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="giving" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Giving Trends</CardTitle>
                <CardDescription>Monthly giving patterns throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: { label: "Amount", color: "#8884d8" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={givingTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth</CardTitle>
                <CardDescription>Member additions and departures over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    members: { label: "Total Members", color: "#8884d8" },
                    newMembers: { label: "New Members", color: "#82ca9d" },
                    leftMembers: { label: "Left Members", color: "#ffc658" },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={membershipGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="newMembers" fill="#82ca9d" />
                      <Bar dataKey="leftMembers" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department Membership</CardTitle>
                  <CardDescription>Total members by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      members: { label: "Members", color: "#8884d8" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="members"
                          label={({ name, members }) => `${name}: ${members}`}
                        >
                          {departmentStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Activity</CardTitle>
                  <CardDescription>Active vs total members by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      members: { label: "Total Members", color: "#8884d8" },
                      active: { label: "Active Members", color: "#82ca9d" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="members" fill="#8884d8" />
                        <Bar dataKey="active" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
                <CardDescription>Attendance rates across different event types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventAttendance.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{event.event}</span>
                        <span className="text-sm text-muted-foreground">
                          {event.avgAttendance}/{event.capacity} (
                          {Math.round((event.avgAttendance / event.capacity) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(event.avgAttendance / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
