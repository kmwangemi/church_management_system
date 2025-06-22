"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, MapPin, Users, Plus, Bell } from "lucide-react"

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Service",
      date: "2024-12-22",
      time: "9:00 AM",
      location: "Main Sanctuary",
      attendees: 450,
      rsvps: 380,
      type: "Service",
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Youth Meeting",
      date: "2024-12-23",
      time: "6:00 PM",
      location: "Youth Hall",
      attendees: 85,
      rsvps: 72,
      type: "Meeting",
      status: "Confirmed",
    },
    {
      id: 3,
      title: "Christmas Service",
      date: "2024-12-25",
      time: "10:00 AM",
      location: "Main Sanctuary",
      attendees: 600,
      rsvps: 520,
      type: "Special",
      status: "Confirmed",
    },
    {
      id: 4,
      title: "New Year Prayer",
      date: "2024-12-31",
      time: "11:00 PM",
      location: "Main Sanctuary",
      attendees: 300,
      rsvps: 180,
      type: "Prayer",
      status: "Planning",
    },
  ]

  const eventTypes = [
    { name: "Sunday Services", count: 52, color: "bg-blue-100 text-blue-800" },
    { name: "Prayer Meetings", count: 24, color: "bg-purple-100 text-purple-800" },
    { name: "Youth Events", count: 18, color: "bg-green-100 text-green-800" },
    { name: "Special Events", count: 12, color: "bg-orange-100 text-orange-800" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Service":
        return "bg-blue-100 text-blue-800"
      case "Meeting":
        return "bg-purple-100 text-purple-800"
      case "Special":
        return "bg-orange-100 text-orange-800"
      case "Prayer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Management</h1>
          <p className="text-muted-foreground">Manage church events, services, and meetings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Add a new event to the church calendar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="special">Special Event</SelectItem>
                    <SelectItem value="prayer">Prayer Meeting</SelectItem>
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
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {eventTypes.map((type, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{type.name}</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{type.count}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="rsvp">RSVP Management</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.rsvps}/{event.attendees} RSVPs
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Events for {date?.toDateString()}</CardTitle>
                <CardDescription>Events scheduled for the selected date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents
                    .filter((event) => new Date(event.date).toDateString() === date?.toDateString())
                    .map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.time} at {event.location}
                          </p>
                        </div>
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                    ))}
                  {upcomingEvents.filter((event) => new Date(event.date).toDateString() === date?.toDateString())
                    .length === 0 && (
                    <p className="text-muted-foreground text-center py-8">No events scheduled for this date</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rsvp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RSVP Management</CardTitle>
              <CardDescription>Track event RSVPs and send reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm">
                          <span className="font-medium">{event.rsvps}</span> confirmed out of{" "}
                          <span className="font-medium">{event.attendees}</span> expected
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(event.rsvps / event.attendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View RSVPs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
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
