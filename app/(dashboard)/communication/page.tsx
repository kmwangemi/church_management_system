"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Mail, Phone, Send, Plus, Bell, CheckCircle } from "lucide-react"

export default function CommunicationPage() {
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  const announcements = [
    {
      id: 1,
      title: "Christmas Service Schedule",
      content:
        "Join us for our special Christmas services on December 25th at 10:00 AM. Special music and message planned.",
      author: "Pastor John",
      date: "2024-12-20",
      priority: "High",
      status: "Published",
      views: 245,
    },
    {
      id: 2,
      title: "Youth Meeting This Friday",
      content: "All youth are invited to our weekly meeting this Friday at 6:00 PM in the Youth Hall.",
      author: "Youth Pastor Sarah",
      date: "2024-12-19",
      priority: "Medium",
      status: "Published",
      views: 89,
    },
    {
      id: 3,
      title: "New Member Orientation",
      content: "New member orientation will be held next Sunday after the service. Please bring your family.",
      author: "Admin",
      date: "2024-12-18",
      priority: "Low",
      status: "Draft",
      views: 0,
    },
  ]

  const messageTemplates = [
    { id: 1, name: "Welcome New Member", category: "Welcome" },
    { id: 2, name: "Event Reminder", category: "Events" },
    { id: 3, name: "Donation Thank You", category: "Finance" },
    { id: 4, name: "Prayer Request Follow-up", category: "Pastoral" },
  ]

  const recentMessages = [
    {
      id: 1,
      type: "SMS",
      recipient: "All Members",
      subject: "Sunday Service Reminder",
      status: "Sent",
      date: "2024-12-20",
      delivered: 1247,
      failed: 3,
    },
    {
      id: 2,
      type: "Email",
      recipient: "Youth Group",
      subject: "Youth Meeting Tonight",
      status: "Sent",
      date: "2024-12-20",
      delivered: 85,
      failed: 0,
    },
    {
      id: 3,
      type: "SMS",
      recipient: "Finance Committee",
      subject: "Monthly Report Available",
      status: "Scheduled",
      date: "2024-12-21",
      delivered: 0,
      failed: 0,
    },
  ]

  const memberGroups = [
    { id: "all", name: "All Members", count: 1247 },
    { id: "youth", name: "Youth Group", count: 85 },
    { id: "choir", name: "Choir Members", count: 45 },
    { id: "finance", name: "Finance Committee", count: 8 },
    { id: "leadership", name: "Leadership Team", count: 12 },
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Sent":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication Center</h1>
          <p className="text-muted-foreground">Send messages, manage announcements, and communicate with members</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>Create a new announcement for the member notification board.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
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
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea id="content" className="col-span-3" rows={4} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Send Message</DialogTitle>
                <DialogDescription>Send SMS or email to church members.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="both">SMS & Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Recipients</Label>
                  <div className="col-span-3 space-y-2">
                    {memberGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={group.id}
                          checked={selectedRecipients.includes(group.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRecipients([...selectedRecipients, group.id])
                            } else {
                              setSelectedRecipients(selectedRecipients.filter((id) => id !== group.id))
                            }
                          }}
                        />
                        <Label htmlFor={group.id} className="text-sm">
                          {group.name} ({group.count} members)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input id="subject" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea id="message" className="col-span-3" rows={4} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Send now or schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Template</Button>
                <Button>Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Delivery Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Average delivery rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Delivery Rate</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">Average delivery rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Announcements</CardTitle>
              <CardDescription>Manage announcements displayed on the member notification board</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          <Badge className={getStatusColor(announcement.status)}>{announcement.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{announcement.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>By {announcement.author}</span>
                          <span>{announcement.date}</span>
                          <span>{announcement.views} views</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          {announcement.status === "Published" ? "Unpublish" : "Publish"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>View sent and scheduled messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{message.type}</Badge>
                        <span className="font-medium">{message.subject}</span>
                        <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        To: {message.recipient} • {message.date}
                      </div>
                      {message.status === "Sent" && (
                        <div className="text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 inline mr-1" />
                          {message.delivered} delivered
                          {message.failed > 0 && <span className="text-red-600 ml-2">{message.failed} failed</span>}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {message.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-written message templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {messageTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Use
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
                <CardDescription>Configure SMS service integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Twilio Integration</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="space-y-2">
                  <Label>Sender ID</Label>
                  <Input value="CHURCH" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>SMS Credits Remaining</Label>
                  <div className="text-2xl font-bold">2,847</div>
                </div>
                <Button className="w-full">Configure SMS Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email service integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>SendGrid Integration</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input value="noreply@church.com" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input value="Grace Community Church" readOnly />
                </div>
                <Button className="w-full">Configure Email Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
