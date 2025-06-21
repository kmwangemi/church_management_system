"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, BookOpen, FileText, Video, Music, Upload, Download, Play, Eye } from "lucide-react"

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const sermons = [
    {
      id: 1,
      title: "Walking in Faith",
      pastor: "Pastor John Smith",
      date: "2024-12-15",
      series: "Faith Series",
      duration: "45 min",
      views: 245,
      downloads: 89,
      type: "Video",
      status: "Published",
    },
    {
      id: 2,
      title: "The Power of Prayer",
      pastor: "Pastor Sarah Johnson",
      date: "2024-12-08",
      series: "Prayer Life",
      duration: "38 min",
      views: 189,
      downloads: 67,
      type: "Audio",
      status: "Published",
    },
    {
      id: 3,
      title: "Love Your Neighbor",
      pastor: "Pastor Mike Wilson",
      date: "2024-12-01",
      series: "Love Series",
      duration: "42 min",
      views: 312,
      downloads: 124,
      type: "Video",
      status: "Published",
    },
    {
      id: 4,
      title: "Christmas Message",
      pastor: "Pastor John Smith",
      date: "2024-12-25",
      series: "Christmas Special",
      duration: "50 min",
      views: 0,
      downloads: 0,
      type: "Video",
      status: "Scheduled",
    },
  ]

  const bulletins = [
    {
      id: 1,
      title: "Weekly Bulletin - December 22, 2024",
      date: "2024-12-22",
      author: "Admin",
      downloads: 156,
      status: "Published",
    },
    {
      id: 2,
      title: "Weekly Bulletin - December 15, 2024",
      date: "2024-12-15",
      author: "Admin",
      downloads: 142,
      status: "Published",
    },
    {
      id: 3,
      title: "Christmas Service Bulletin",
      date: "2024-12-25",
      author: "Admin",
      downloads: 0,
      status: "Draft",
    },
  ]

  const mediaLibrary = [
    {
      id: 1,
      name: "Choir Performance - Amazing Grace",
      type: "Audio",
      size: "12.5 MB",
      uploadDate: "2024-12-10",
      category: "Music",
      status: "Published",
    },
    {
      id: 2,
      name: "Youth Drama - Christmas Story",
      type: "Video",
      size: "245 MB",
      uploadDate: "2024-12-08",
      category: "Drama",
      status: "Published",
    },
    {
      id: 3,
      name: "Church Anniversary Photos",
      type: "Images",
      size: "89 MB",
      uploadDate: "2024-11-15",
      category: "Events",
      status: "Published",
    },
    {
      id: 4,
      name: "Baptism Service Recording",
      type: "Video",
      size: "1.2 GB",
      uploadDate: "2024-12-01",
      category: "Service",
      status: "Processing",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />
      case "Audio":
        return <Music className="h-4 w-4" />
      case "Images":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage sermons, bulletins, and media content</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>Upload audio, video, or image files to the media library.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mediaFile" className="text-right">
                    File
                  </Label>
                  <Input id="mediaFile" type="file" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mediaTitle" className="text-right">
                    Title
                  </Label>
                  <Input id="mediaTitle" className="col-span-3" />
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
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="teaching">Teaching</SelectItem>
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
                <Button>Upload</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
                <DialogDescription>Create a new sermon or bulletin entry.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contentType" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sermon">Sermon</SelectItem>
                      <SelectItem value="bulletin">Bulletin</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contentTitle" className="text-right">
                    Title
                  </Label>
                  <Input id="contentTitle" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pastor" className="text-right">
                    Pastor/Author
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select pastor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pastor1">Pastor John Smith</SelectItem>
                      <SelectItem value="pastor2">Pastor Sarah Johnson</SelectItem>
                      <SelectItem value="pastor3">Pastor Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="series" className="text-right">
                    Series
                  </Label>
                  <Input id="series" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contentDate" className="text-right">
                    Date
                  </Label>
                  <Input id="contentDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contentDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea id="contentDescription" className="col-span-3" rows={3} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sermons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">In archive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Audio & Video</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sermons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sermons">Sermon Archive</TabsTrigger>
          <TabsTrigger value="bulletins">Weekly Bulletins</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sermons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sermon Archive</CardTitle>
              <CardDescription>Manage sermon recordings and metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sermons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    <SelectItem value="faith">Faith Series</SelectItem>
                    <SelectItem value="prayer">Prayer Life</SelectItem>
                    <SelectItem value="love">Love Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Pastor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Series</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sermons.map((sermon) => (
                    <TableRow key={sermon.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(sermon.type)}
                          <span className="font-medium">{sermon.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{sermon.pastor}</TableCell>
                      <TableCell>{sermon.date}</TableCell>
                      <TableCell>{sermon.series}</TableCell>
                      <TableCell>{sermon.duration}</TableCell>
                      <TableCell>{sermon.views}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sermon.status)}>{sermon.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="bulletins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Bulletins</CardTitle>
              <CardDescription>Manage church bulletins and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bulletins.map((bulletin) => (
                  <div key={bulletin.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{bulletin.title}</span>
                        <Badge className={getStatusColor(bulletin.status)}>{bulletin.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        By {bulletin.author} • {bulletin.date} • {bulletin.downloads} downloads
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Manage audio, video, and image files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search media..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mediaLibrary.map((media) => (
                    <TableRow key={media.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(media.type)}
                          <span className="font-medium">{media.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{media.type}</TableCell>
                      <TableCell>{media.size}</TableCell>
                      <TableCell>{media.category}</TableCell>
                      <TableCell>{media.uploadDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(media.status)}>{media.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Content</CardTitle>
                <CardDescription>Most viewed sermons and media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sermons
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((sermon, index) => (
                      <div key={sermon.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{sermon.title}</p>
                            <p className="text-sm text-muted-foreground">{sermon.pastor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{sermon.views} views</p>
                          <p className="text-sm text-muted-foreground">{sermon.downloads} downloads</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
                <CardDescription>Overview of content performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Content Views</span>
                    <span className="font-bold">12,456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Downloads</span>
                    <span className="font-bold">3,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Views per Sermon</span>
                    <span className="font-bold">186</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Most Popular Series</span>
                    <span className="font-bold">Faith Series</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Used</span>
                    <span className="font-bold">2.4 GB / 10 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
