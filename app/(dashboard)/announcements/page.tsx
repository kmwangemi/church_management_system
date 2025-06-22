"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Switch } from "@/components/ui/switch"
import { Megaphone, Plus, Search, Calendar, Eye, Users, Bell, Clock, Pin, Edit, Trash2 } from "lucide-react"

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: "Sunday Service Time Change",
    content:
      "Starting next Sunday, our morning service will begin at 10:00 AM instead of 9:30 AM. Please adjust your schedules accordingly.",
    author: "Pastor Johnson",
    category: "Service",
    priority: "High",
    status: "Published",
    publishDate: "2024-01-15",
    expiryDate: "2024-02-15",
    views: 245,
    isPinned: true,
    targetAudience: "All Members",
  },
  {
    id: 2,
    title: "Youth Camp Registration Open",
    content:
      "Registration is now open for our annual youth summer camp. Early bird pricing available until March 1st. Contact the youth ministry for more details.",
    author: "Sarah Wilson",
    category: "Youth",
    priority: "Medium",
    status: "Published",
    publishDate: "2024-01-12",
    expiryDate: "2024-03-01",
    views: 189,
    isPinned: false,
    targetAudience: "Youth & Parents",
  },
  {
    id: 3,
    title: "Building Fund Update",
    content:
      "We're excited to share that we've reached 75% of our building fund goal! Thank you for your generous contributions. Let's push forward to reach our target by Easter.",
    author: "Finance Committee",
    category: "Finance",
    priority: "Medium",
    status: "Published",
    publishDate: "2024-01-10",
    expiryDate: "2024-04-01",
    views: 312,
    isPinned: true,
    targetAudience: "All Members",
  },
  {
    id: 4,
    title: "New Small Group Starting",
    content:
      "A new small group for young professionals will be starting this Thursday at 7 PM. Join us for fellowship, Bible study, and community building.",
    author: "David Brown",
    category: "Small Groups",
    priority: "Low",
    status: "Draft",
    publishDate: "2024-01-20",
    expiryDate: "2024-02-20",
    views: 0,
    isPinned: false,
    targetAudience: "Young Adults",
  },
  {
    id: 5,
    title: "Volunteer Appreciation Dinner",
    content:
      "Join us for a special dinner to appreciate all our wonderful volunteers. Saturday, February 10th at 6 PM in the fellowship hall. RSVP required.",
    author: "Mary Davis",
    category: "Events",
    priority: "Medium",
    status: "Scheduled",
    publishDate: "2024-01-25",
    expiryDate: "2024-02-10",
    views: 156,
    isPinned: false,
    targetAudience: "Volunteers",
  },
]

const announcementStats = {
  totalAnnouncements: 24,
  publishedAnnouncements: 18,
  draftAnnouncements: 4,
  scheduledAnnouncements: 2,
  totalViews: 1247,
  averageViews: 69,
}

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || announcement.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage church announcements and communications</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Create a new announcement for your congregation</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-3" />
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
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="small-groups">Small Groups</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="audience" className="text-right">
                  Audience
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="youth">Youth & Parents</SelectItem>
                    <SelectItem value="adults">Adults</SelectItem>
                    <SelectItem value="volunteers">Volunteers</SelectItem>
                    <SelectItem value="leaders">Leaders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea id="content" className="col-span-3" rows={4} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry" className="text-right">
                  Expiry Date
                </Label>
                <Input id="expiry" type="date" className="col-span-3" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="pinned" />
                <Label htmlFor="pinned">Pin this announcement</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Save as Draft</Button>
              <Button type="submit">Publish Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementStats.totalAnnouncements}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementStats.publishedAnnouncements}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementStats.totalViews}</div>
            <p className="text-xs text-muted-foreground">Avg {announcementStats.averageViews} per announcement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementStats.draftAnnouncements}</div>
            <p className="text-xs text-muted-foreground">Pending publication</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
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
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Youth">Youth</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Small Groups">Small Groups</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pinned Announcements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Pin className="h-4 w-4" />
              Pinned Announcements
            </h3>
            <div className="grid gap-4">
              {filteredAnnouncements
                .filter((a) => a.isPinned)
                .map((announcement) => (
                  <Card key={announcement.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                              <AvatarFallback>
                                {announcement.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{announcement.author}</span>
                            <span>•</span>
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(announcement.publishDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              announcement.priority === "High"
                                ? "destructive"
                                : announcement.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline">{announcement.category}</Badge>
                          <Badge
                            variant={
                              announcement.status === "Published"
                                ? "default"
                                : announcement.status === "Draft"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {announcement.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{announcement.content}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{announcement.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{announcement.targetAudience}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Announcements Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Announcements</CardTitle>
              <CardDescription>Manage all your church announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {announcement.isPinned && <Pin className="h-4 w-4 text-primary" />}
                          <div>
                            <div className="font-medium">{announcement.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {announcement.content.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                            <AvatarFallback>
                              {announcement.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{announcement.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{announcement.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            announcement.status === "Published"
                              ? "default"
                              : announcement.status === "Draft"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{announcement.views}</TableCell>
                      <TableCell>{new Date(announcement.publishDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

        <TabsContent value="published" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Published Announcements</CardTitle>
              <CardDescription>Currently active announcements visible to your congregation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements
                  .filter((a) => a.status === "Published")
                  .map((announcement) => (
                    <div key={announcement.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">{announcement.views} views</p>
                      </div>
                      <Badge variant="default">Published</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Announcements</CardTitle>
              <CardDescription>Announcements that are not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements
                  .filter((a) => a.status === "Draft")
                  .map((announcement) => (
                    <div key={announcement.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">Created by {announcement.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Publish</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Announcements</CardTitle>
              <CardDescription>Announcements scheduled for future publication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements
                  .filter((a) => a.status === "Scheduled")
                  .map((announcement) => (
                    <div key={announcement.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Scheduled for {new Date(announcement.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
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
