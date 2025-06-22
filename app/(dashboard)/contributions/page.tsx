"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Gift, Plus, Search, Calendar, DollarSign, TrendingUp, Heart, Users, Church } from "lucide-react"
import Link from "next/link"

// Mock data for contributions
const contributions = [
  {
    id: 1,
    type: "Wedding",
    event: "John & Mary Wedding",
    date: "2024-01-15",
    amount: 2500,
    contributors: 45,
    status: "Completed",
    description: "Wedding ceremony and reception support",
  },
  {
    id: 2,
    type: "Burial",
    event: "Elder Smith Memorial",
    date: "2024-01-10",
    amount: 1800,
    contributors: 32,
    status: "Completed",
    description: "Funeral service and family support",
  },
  {
    id: 3,
    type: "Baby Dedication",
    event: "Baby Grace Dedication",
    date: "2024-01-20",
    amount: 450,
    contributors: 18,
    status: "Active",
    description: "Baby dedication ceremony support",
  },
  {
    id: 4,
    type: "Medical Emergency",
    event: "Sister Johnson Surgery",
    date: "2024-01-25",
    amount: 3200,
    contributors: 67,
    status: "Active",
    description: "Medical expenses support",
  },
  {
    id: 5,
    type: "Church Building",
    event: "New Sanctuary Fund",
    date: "2024-01-01",
    amount: 15000,
    contributors: 120,
    status: "Ongoing",
    description: "Building fund for new sanctuary",
  },
]

const contributionStats = {
  totalContributions: 23200,
  totalEvents: 12,
  activeContributions: 3,
  totalContributors: 156,
  thisMonthContributions: 5650,
  averagePerEvent: 1933,
}

const contributionTypes = [
  { type: "Wedding", count: 8, total: 18500, icon: Heart },
  { type: "Burial", count: 5, total: 9200, icon: Church },
  { type: "Baby Dedication", count: 12, total: 4800, icon: Gift },
  { type: "Medical Emergency", count: 6, total: 15600, icon: Heart },
  { type: "Church Building", count: 2, total: 25000, icon: Church },
]

export default function ContributionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredContributions = contributions.filter((contribution) => {
    const matchesSearch =
      contribution.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || contribution.type === selectedType
    const matchesStatus = selectedStatus === "all" || contribution.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contributions</h1>
          <p className="text-muted-foreground">Manage special event contributions and fundraising</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Contribution
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Contribution</DialogTitle>
              <DialogDescription>Set up a new contribution campaign</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Event
                </Label>
                <Input id="event" className="col-span-3" />
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
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="burial">Burial</SelectItem>
                    <SelectItem value="baby-dedication">Baby Dedication</SelectItem>
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="building">Church Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                  Target Amount
                </Label>
                <Input id="target" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Contribution</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${contributionStats.totalContributions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contributionStats.activeContributions}</div>
            <p className="text-xs text-muted-foreground">Currently collecting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contributionStats.totalContributors}</div>
            <p className="text-xs text-muted-foreground">Unique contributors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${contributionStats.thisMonthContributions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contributions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contributions">All Contributions</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="types">By Type</TabsTrigger>
        </TabsList>

        <TabsContent value="contributions" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Wedding">Wedding</SelectItem>
                <SelectItem value="Burial">Burial</SelectItem>
                <SelectItem value="Baby Dedication">Baby Dedication</SelectItem>
                <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                <SelectItem value="Church Building">Church Building</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contributions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Contributions</CardTitle>
              <CardDescription>Track all contribution campaigns and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Contributors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contribution.event}</div>
                          <div className="text-sm text-muted-foreground">{contribution.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{contribution.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(contribution.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">${contribution.amount.toLocaleString()}</TableCell>
                      <TableCell>{contribution.contributors}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            contribution.status === "Active"
                              ? "default"
                              : contribution.status === "Completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {contribution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/contributions/${contribution.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">January 2024</span>
                    <span className="font-bold">$5,650</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">December 2023</span>
                    <span className="font-bold">$4,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">November 2023</span>
                    <span className="font-bold">$3,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per Month</span>
                    <span className="font-bold text-green-600">$4,550</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Johnson Family</span>
                    <span className="font-bold">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Smith Foundation</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Davis Group</span>
                    <span className="font-bold">$800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anonymous</span>
                    <span className="font-bold">$1,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contributionTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card key={type.type}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{type.type}</CardTitle>
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${type.total.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{type.count} events</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
