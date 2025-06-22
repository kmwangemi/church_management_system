import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, DollarSign, TrendingUp, MessageSquare, UserCheck, Bell, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { title: "Total Members", value: "1,247", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "This Week's Attendance", value: "892", change: "+5%", icon: UserCheck, color: "text-green-600" },
    { title: "Monthly Giving", value: "$45,230", change: "+18%", icon: DollarSign, color: "text-emerald-600" },
    { title: "Active Events", value: "8", change: "+2", icon: Calendar, color: "text-purple-600" },
  ]

  const recentActivities = [
    { type: "New Member", description: "Sarah Johnson joined the church", time: "2 hours ago", badge: "Member" },
    { type: "Donation", description: "Anonymous donation of $500", time: "4 hours ago", badge: "Finance" },
    { type: "Event", description: "Youth Meeting scheduled for Friday", time: "6 hours ago", badge: "Event" },
    { type: "Prayer Request", description: "New prayer request submitted", time: "8 hours ago", badge: "Prayer" },
  ]

  const upcomingEvents = [
    { title: "Sunday Service", date: "Dec 22, 2024", time: "9:00 AM", attendees: 450 },
    { title: "Youth Meeting", date: "Dec 23, 2024", time: "6:00 PM", attendees: 85 },
    { title: "Bible Study", date: "Dec 24, 2024", time: "7:00 PM", attendees: 120 },
    { title: "Christmas Service", date: "Dec 25, 2024", time: "10:00 AM", attendees: 600 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Church Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your church.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/notifications">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </Link>
          <Link href="/reports/view">
            <Button size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your church community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{activity.badge}</Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next church activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <Badge variant="outline">{event.attendees} expected</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.date} at {event.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link href="/members">
              <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Members</span>
              </Button>
            </Link>
            <Link href="/finance">
              <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span>Finance</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span>Events</span>
              </Button>
            </Link>
            <Link href="/communication">
              <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                <MessageSquare className="h-6 w-6" />
                <span>Communication</span>
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
