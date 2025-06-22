"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Save,
  ArrowLeft,
  DollarSign,
  CalendarIcon,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  User,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function RecordDonationPage() {
  const [donationDate, setDonationDate] = useState<Date>()
  const [isRecurring, setIsRecurring] = useState(false)
  const [donorType, setDonorType] = useState("existing")
  const [paymentMethod, setPaymentMethod] = useState("cash")

  const existingDonors = [
    { id: 1, name: "John Smith", email: "john@email.com", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 (555) 234-5678" },
    { id: 3, name: "Michael Brown", email: "michael@email.com", phone: "+1 (555) 345-6789" },
    { id: 4, name: "Emily Davis", email: "emily@email.com", phone: "+1 (555) 456-7890" },
  ]

  const donationCategories = [
    "Tithe",
    "General Offering",
    "Building Fund",
    "Missions",
    "Special Projects",
    "Youth Ministry",
    "Children's Ministry",
    "Benevolence Fund",
    "Other",
  ]

  const paymentMethods = [
    { value: "cash", label: "Cash", icon: <Banknote className="h-4 w-4" /> },
    { value: "check", label: "Check", icon: <Receipt className="h-4 w-4" /> },
    { value: "card", label: "Credit/Debit Card", icon: <CreditCard className="h-4 w-4" /> },
    { value: "online", label: "Online Transfer", icon: <Smartphone className="h-4 w-4" /> },
    { value: "mpesa", label: "M-Pesa", icon: <Smartphone className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/finance">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Finance
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Record Donation</h1>
            <p className="text-muted-foreground">Add a new donation or contribution record</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Donation
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Donor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Donor Information</CardTitle>
              <CardDescription>Select or add donor details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={donorType} onValueChange={setDonorType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing">Existing Donor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New Donor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anonymous" id="anonymous" />
                  <Label htmlFor="anonymous">Anonymous</Label>
                </div>
              </RadioGroup>

              {donorType === "existing" && (
                <div className="space-y-2">
                  <Label htmlFor="donor">Select Donor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select donor" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingDonors.map((donor) => (
                        <SelectItem key={donor.id} value={donor.id.toString()}>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{donor.name}</div>
                              <div className="text-xs text-muted-foreground">{donor.email}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {donorType === "new" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Address (Optional)</Label>
                    <Textarea id="address" placeholder="Enter address" rows={2} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
              <CardDescription>Specify donation amount and category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="amount" type="number" placeholder="0.00" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {donationCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Donation Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {donationDate ? format(donationDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={donationDate} onSelect={setDonationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Add any additional notes about this donation" rows={3} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
                <Label htmlFor="recurring">This is a recurring donation</Label>
              </div>

              {isRecurring && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Select end date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>How was this donation received?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label htmlFor={method.value} className="flex items-center space-x-2">
                        {method.icon}
                        <span>{method.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {paymentMethod === "check" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkNumber">Check Number</Label>
                    <Input id="checkNumber" placeholder="Enter check number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="Enter bank name" />
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lastFour">Last 4 Digits</Label>
                    <Input id="lastFour" placeholder="****" maxLength={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">American Express</SelectItem>
                        <SelectItem value="discover">Discover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {paymentMethod === "online" && (
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input id="transactionId" placeholder="Enter transaction ID" />
                </div>
              )}

              {paymentMethod === "mpesa" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mpesaCode">M-Pesa Code</Label>
                    <Input id="mpesaCode" placeholder="Enter M-Pesa transaction code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mpesaPhone">Phone Number</Label>
                    <Input id="mpesaPhone" placeholder="Enter phone number" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number (Optional)</Label>
                <Input id="reference" placeholder="Internal reference number" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Donation Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Summary</CardTitle>
              <CardDescription>Review donation details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount</span>
                <span className="text-lg font-bold">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Category</span>
                <span className="text-sm text-muted-foreground">Not selected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm text-muted-foreground">
                  {donationDate ? format(donationDate, "MMM dd, yyyy") : "Not selected"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Payment Method</span>
                <span className="text-sm text-muted-foreground capitalize">{paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recurring</span>
                <Badge variant={isRecurring ? "default" : "secondary"}>{isRecurring ? "Yes" : "No"}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common donation amounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  $25
                </Button>
                <Button variant="outline" size="sm">
                  $50
                </Button>
                <Button variant="outline" size="sm">
                  $100
                </Button>
                <Button variant="outline" size="sm">
                  $250
                </Button>
                <Button variant="outline" size="sm">
                  $500
                </Button>
                <Button variant="outline" size="sm">
                  $1000
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest donation records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">John Smith</div>
                    <div className="text-muted-foreground">Tithe</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$250</div>
                    <div className="text-muted-foreground">Today</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">Anonymous</div>
                    <div className="text-muted-foreground">Building Fund</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$500</div>
                    <div className="text-muted-foreground">Yesterday</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-muted-foreground">General Offering</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$75</div>
                    <div className="text-muted-foreground">2 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
