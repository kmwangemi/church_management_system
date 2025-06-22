"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { DollarSign, TrendingUp, CreditCard, Smartphone, Download, Plus, Settings } from "lucide-react"
import Link from "next/link"

export default function FinancePage() {
  const monthlyData = [
    { month: "Jan", tithes: 12000, offerings: 3000, pledges: 2000 },
    { month: "Feb", tithes: 13500, offerings: 3200, pledges: 2200 },
    { month: "Mar", tithes: 11800, offerings: 2800, pledges: 1800 },
    { month: "Apr", tithes: 14200, offerings: 3500, pledges: 2500 },
    { month: "May", tithes: 15000, offerings: 3800, pledges: 2800 },
    { month: "Jun", tithes: 13200, offerings: 3100, pledges: 2100 },
  ]

  const givingBreakdown = [
    { name: "Tithes", value: 65, color: "#8884d8" },
    { name: "Offerings", value: 25, color: "#82ca9d" },
    { name: "Pledges", value: 10, color: "#ffc658" },
  ]

  const recentTransactions = [
    {
      id: 1,
      donor: "Anonymous",
      amount: 500,
      type: "Tithe",
      method: "M-Pesa",
      date: "2024-12-20",
      status: "Completed",
    },
    {
      id: 2,
      donor: "John Smith",
      amount: 200,
      type: "Offering",
      method: "Bank Transfer",
      date: "2024-12-20",
      status: "Completed",
    },
    {
      id: 3,
      donor: "Mary Johnson",
      amount: 1000,
      type: "Pledge",
      method: "Cash",
      date: "2024-12-19",
      status: "Completed",
    },
    {
      id: 4,
      donor: "David Wilson",
      amount: 150,
      type: "Offering",
      method: "M-Pesa",
      date: "2024-12-19",
      status: "Pending",
    },
  ]

  const pledges = [
    {
      id: 1,
      member: "Sarah Johnson",
      amount: 5000,
      paid: 3000,
      remaining: 2000,
      dueDate: "2024-12-31",
      status: "Active",
    },
    {
      id: 2,
      member: "Michael Brown",
      amount: 3000,
      paid: 3000,
      remaining: 0,
      dueDate: "2024-12-15",
      status: "Completed",
    },
    {
      id: 3,
      member: "Emily Davis",
      amount: 8000,
      paid: 4000,
      remaining: 4000,
      dueDate: "2025-01-15",
      status: "Active",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance & Giving</h1>
          <p className="text-muted-foreground">Track tithes, offerings, pledges, and financial reports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Link href="/finance/record-donation">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Donation
            </Button>
          </Link>
          <Link href="/finance/payment-methods">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Payment Methods
            </Button>
          </Link>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$22,900</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tithes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,000</div>
            <p className="text-xs text-muted-foreground">65% of total giving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offerings</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,700</div>
            <p className="text-xs text-muted-foreground">25% of total giving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">M-Pesa Payments</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,200</div>
            <p className="text-xs text-muted-foreground">36% via mobile money</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="pledges">Pledges</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Giving Trends</CardTitle>
                <CardDescription>Tithes, offerings, and pledges over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tithes: { label: "Tithes", color: "#8884d8" },
                    offerings: { label: "Offerings", color: "#82ca9d" },
                    pledges: { label: "Pledges", color: "#ffc658" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="tithes" fill="#8884d8" />
                      <Bar dataKey="offerings" fill="#82ca9d" />
                      <Bar dataKey="pledges" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giving Distribution</CardTitle>
                <CardDescription>Breakdown of giving types</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tithes: { label: "Tithes", color: "#8884d8" },
                    offerings: { label: "Offerings", color: "#82ca9d" },
                    pledges: { label: "Pledges", color: "#ffc658" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={givingBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {givingBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest donations and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.donor}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "secondary" : "outline"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pledges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pledge Management</CardTitle>
              <CardDescription>Track member pledges and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Pledge Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pledges.map((pledge) => (
                    <TableRow key={pledge.id}>
                      <TableCell className="font-medium">{pledge.member}</TableCell>
                      <TableCell>${pledge.amount}</TableCell>
                      <TableCell>${pledge.paid}</TableCell>
                      <TableCell>${pledge.remaining}</TableCell>
                      <TableCell>{pledge.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={pledge.status === "Completed" ? "secondary" : "outline"}>{pledge.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Record Payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Generate and download financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Monthly Giving Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Annual Financial Summary
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Pledge Status Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Tax Receipts
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure payment integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>M-Pesa Integration</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bank Transfer</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>PayPal</span>
                  <Badge variant="outline">Inactive</Badge>
                </div>
                <Button className="w-full">Configure Payment Methods</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
