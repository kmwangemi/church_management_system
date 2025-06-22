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
import {
  DollarSign,
  Calendar,
  Users,
  Edit,
  Share2,
  Download,
  TrendingUp,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for contribution details
const contributionDetails = {
  id: 1,
  type: "Wedding",
  event: "John & Mary Wedding",
  description:
    "Supporting the wedding ceremony and reception for our beloved church members John Smith and Mary Johnson. This includes venue decoration, catering support, and gift presentation.",
  startDate: "2024-01-01",
  eventDate: "2024-02-15",
  targetAmount: 5000,
  currentAmount: 2500,
  contributors: 45,
  status: "Active",
  organizer: {
    name: "Pastor David Wilson",
    phone: "+1 (555) 123-4567",
    email: "pastor.david@church.com",
  },
  category: "Wedding",
  priority: "High",
  endDate: "2024-02-10",
}

const contributors = [
  {
    id: 1,
    name: "Johnson Family",
    amount: 500,
    date: "2024-01-15",
    method: "Bank Transfer",
    message: "Congratulations to the happy couple!",
    anonymous: false,
  },
  {
    id: 2,
    name: "Anonymous",
    amount: 300,
    date: "2024-01-14",
    method: "Cash",
    message: "May God bless your union",
    anonymous: true,
  },
  {
    id: 3,
    name: "Smith Foundation",
    amount: 750,
    date: "2024-01-12",
    method: "Check",
    message: "Wishing you a lifetime of happiness",
    anonymous: false,
  },
  {
    id: 4,
    name: "Davis Group",
    amount: 200,
    date: "2024-01-10",
    method: "Online",
    message: "Congratulations and best wishes!",
    anonymous: false,
  },
  {
    id: 5,
    name: "Wilson Family",
    amount: 400,
    date: "2024-01-08",
    method: "Bank Transfer",
    message: "So happy for you both!",
    anonymous: false,
  },
]

const contributionHistory = [
  { date: "2024-01-15", amount: 500, total: 2500, contributors: 45 },
  { date: "2024-01-14", amount: 300, total: 2000, contributors: 44 },
  { date: "2024-01-12", amount: 750, total: 1700, contributors: 43 },
  { date: "2024-01-10", amount: 200, total: 950, contributors: 42 },
  { date: "2024-01-08", amount: 400, total: 750, contributors: 41 },
  { date: "2024-01-05", amount: 350, total: 350, contributors: 40 },
]

const expenses = [
  {
    id: 1,
    category: "Venue Decoration",
    description: "Flowers, lighting, and decorative items",
    budgeted: 1500,
    actual: 1200,
    status: "Completed",
  },
  {
    id: 2,
    category: "Catering Support",
    description: "Additional food and beverage costs",
    budgeted: 2000,
    actual: 0,
    status: "Pending",
  },
  {
    id: 3,
    category: "Gift Presentation",
    description: "Special gift from the church community",
    budgeted: 800,
    actual: 0,
    status: "Pending",
  },
  {
    id: 4,
    category: "Photography",
    description: "Professional wedding photography",
    budgeted: 700,
    actual: 650,
    status: "Completed",
  },
]

export default function ContributionDetailsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const progressPercentage = (contributionDetails.currentAmount / contributionDetails.targetAmount) * 100

  const filteredContributors = contributors.filter(
    (contributor) =>
      contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/contributions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contributions
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{contributionDetails.event}</h1>
            <p className="text-muted-foreground">{contributionDetails.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Contribution</DialogTitle>
                <DialogDescription>Update contribution details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="target" className="text-right">
                    Target
                  </Label>
                  <Input
                    id="target"
                    type="number"
                    defaultValue={contributionDetails.targetAmount}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" defaultValue={contributionDetails.description} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Contribution Progress</CardTitle>
              <CardDescription>Track progress towards the target amount</CardDescription>
            </div>
            <Badge variant={contributionDetails.status === "Active" ? "default" : "secondary"}>
              {contributionDetails.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                ${contributionDetails.currentAmount.toLocaleString()} of $
                {contributionDetails.targetAmount.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="font-medium">{progressPercentage.toFixed(1)}% Complete</span>
              <span className="text-muted-foreground">
                ${(contributionDetails.targetAmount - contributionDetails.currentAmount).toLocaleString()} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${contributionDetails.currentAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{progressPercentage.toFixed(1)}% of target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contributionDetails.contributors}</div>
            <p className="text-xs text-muted-foreground">People contributed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Contribution</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(contributionDetails.currentAmount / contributionDetails.contributors)}
            </div>
            <p className="text-xs text-muted-foreground">Per contributor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.ceil(
                (new Date(contributionDetails.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              )}
            </div>
            <p className="text-xs text-muted-foreground">Until deadline</p>
          </CardContent>
        </Card>
      </div>

      {/* Event Information */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Event Type</Label>
                <Badge variant="outline">{contributionDetails.type}</Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <Badge variant={contributionDetails.priority === "High" ? "destructive" : "default"}>
                  {contributionDetails.priority}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Event Date</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(contributionDetails.eventDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contribution Deadline</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(contributionDetails.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-muted-foreground">{contributionDetails.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>
                  {contributionDetails.organizer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{contributionDetails.organizer.name}</h3>
                <p className="text-sm text-muted-foreground">Event Organizer</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">{contributionDetails.organizer.phone}</div>
              <div className="text-sm">{contributionDetails.organizer.email}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Contact Organizer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="contributors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="contributors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contributors</CardTitle>
                  <CardDescription>People who have contributed to this event</CardDescription>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Search contributors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContributors.map((contributor) => (
                    <TableRow key={contributor.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>
                              {contributor.anonymous
                                ? "?"
                                : contributor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contributor.name}</div>
                            {contributor.anonymous && (
                              <Badge variant="outline" className="text-xs">
                                Anonymous
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${contributor.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(contributor.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{contributor.method}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{contributor.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
              <CardDescription>Track contributions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Running Total</TableHead>
                    <TableHead>Contributors</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributionHistory.map((record) => (
                    <TableRow key={record.date}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium text-green-600">+${record.amount.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${record.total.toLocaleString()}</TableCell>
                      <TableCell>{record.contributors}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(record.total / contributionDetails.targetAmount) * 100}
                            className="w-16 h-2"
                          />
                          <span className="text-sm">
                            {((record.total / contributionDetails.targetAmount) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget & Expenses</CardTitle>
              <CardDescription>Track how contributions are being used</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Budgeted</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>${expense.budgeted.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">
                        {expense.actual > 0 ? `$${expense.actual.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={expense.status === "Completed" ? "default" : "outline"}>
                          {expense.status === "Completed" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {expense.actual > 0 && (
                          <span className={expense.actual <= expense.budgeted ? "text-green-600" : "text-red-600"}>
                            {expense.actual <= expense.budgeted ? "-" : "+"}$
                            {Math.abs(expense.budgeted - expense.actual).toLocaleString()}
                          </span>
                        )}
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
