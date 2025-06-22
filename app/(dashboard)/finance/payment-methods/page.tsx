"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Save,
  ArrowLeft,
  Plus,
  Settings,
  CreditCard,
  Smartphone,
  Building2,
  Globe,
  Check,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"

export default function PaymentMethodsPage() {
  const [showApiKeys, setShowApiKeys] = useState(false)

  const paymentMethods = [
    {
      id: 1,
      name: "Stripe",
      type: "Credit/Debit Cards",
      status: "Active",
      description: "Accept credit and debit card payments online",
      icon: <CreditCard className="h-6 w-6" />,
      fees: "2.9% + $0.30 per transaction",
      configured: true,
      testMode: false,
    },
    {
      id: 2,
      name: "M-Pesa",
      type: "Mobile Money",
      status: "Active",
      description: "Accept mobile money payments via M-Pesa",
      icon: <Smartphone className="h-6 w-6" />,
      fees: "1.5% per transaction",
      configured: true,
      testMode: false,
    },
    {
      id: 3,
      name: "PayPal",
      type: "Digital Wallet",
      status: "Inactive",
      description: "Accept payments through PayPal",
      icon: <Globe className="h-6 w-6" />,
      fees: "2.9% + $0.30 per transaction",
      configured: false,
      testMode: true,
    },
    {
      id: 4,
      name: "Bank Transfer",
      type: "Direct Transfer",
      status: "Active",
      description: "Direct bank account transfers",
      icon: <Building2 className="h-6 w-6" />,
      fees: "No processing fees",
      configured: true,
      testMode: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
            <p className="text-muted-foreground">Configure and manage payment gateways</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>Configure a new payment gateway</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gateway">Payment Gateway</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="flutterwave">Flutterwave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" placeholder="Enter display name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter description" />
                </div>
                <Button className="w-full">Add Payment Method</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Methods</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.filter((m) => m.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Payment gateways</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground">Configured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">Total processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Fees</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground">Processing fees</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">{method.icon}</div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{method.name}</span>
                          <Badge className={getStatusColor(method.status)}>{method.status}</Badge>
                          {method.testMode && <Badge variant="outline">Test Mode</Badge>}
                        </CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={method.status === "Active"} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <p className="text-sm text-muted-foreground">{method.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Processing Fees</Label>
                      <p className="text-sm text-muted-foreground">{method.fees}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Configuration</Label>
                      <p className="text-sm text-muted-foreground">
                        {method.configured ? "Configured" : "Not Configured"}
                      </p>
                    </div>
                  </div>

                  {method.name === "Stripe" && method.configured && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Stripe Configuration</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <Label className="text-xs">Publishable Key</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type={showApiKeys ? "text" : "password"}
                              value="pk_test_..."
                              readOnly
                              className="text-xs"
                            />
                            <Button variant="outline" size="sm" onClick={() => setShowApiKeys(!showApiKeys)}>
                              {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Secret Key</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type={showApiKeys ? "text" : "password"}
                              value="sk_test_..."
                              readOnly
                              className="text-xs"
                            />
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {method.name === "M-Pesa" && method.configured && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">M-Pesa Configuration</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <Label className="text-xs">Business Short Code</Label>
                          <Input value="174379" readOnly className="text-xs" />
                        </div>
                        <div>
                          <Label className="text-xs">Till Number</Label>
                          <Input value="5555555" readOnly className="text-xs" />
                        </div>
                        <div>
                          <Label className="text-xs">Consumer Key</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type={showApiKeys ? "text" : "password"}
                              value="consumer_key_..."
                              readOnly
                              className="text-xs"
                            />
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Consumer Secret</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type={showApiKeys ? "text" : "password"}
                              value="consumer_secret_..."
                              readOnly
                              className="text-xs"
                            />
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {method.name === "Bank Transfer" && method.configured && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Bank Account Details</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        <div>
                          <Label className="text-xs">Bank Name</Label>
                          <Input value="First National Bank" readOnly className="text-xs" />
                        </div>
                        <div>
                          <Label className="text-xs">Account Number</Label>
                          <Input value="1234567890" readOnly className="text-xs" />
                        </div>
                        <div>
                          <Label className="text-xs">Account Name</Label>
                          <Input value="Grace Community Church" readOnly className="text-xs" />
                        </div>
                        <div>
                          <Label className="text-xs">Routing Number</Label>
                          <Input value="021000021" readOnly className="text-xs" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Payment Settings</CardTitle>
              <CardDescription>Configure general payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enable Test Mode</Label>
                    <p className="text-xs text-muted-foreground">Use test credentials for all payment methods</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Send Payment Confirmations</Label>
                    <p className="text-xs text-muted-foreground">Email receipts to donors automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow Anonymous Donations</Label>
                    <p className="text-xs text-muted-foreground">Accept donations without donor information</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enable Recurring Donations</Label>
                    <p className="text-xs text-muted-foreground">Allow donors to set up recurring payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="kes">KES - Kenyan Shilling</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Minimum Donation Amount</Label>
                  <Input id="minAmount" type="number" defaultValue="1.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Maximum Donation Amount</Label>
                  <Input id="maxAmount" type="number" defaultValue="10000.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptTemplate">Receipt Email Template</Label>
                <Textarea
                  id="receiptTemplate"
                  rows={6}
                  defaultValue="Dear {donor_name},

Thank you for your generous donation of {amount} to {church_name}.

Your contribution helps us continue our mission and serve our community.

Transaction ID: {transaction_id}
Date: {date}

Blessings,
{church_name} Finance Team"
                />
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Payment processing logs and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Stripe Payment</h4>
                      <p className="text-sm text-muted-foreground">John Smith - $250.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">M-Pesa Payment</h4>
                      <p className="text-sm text-muted-foreground">Sarah Johnson - $75.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Success</Badge>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-medium">Stripe Payment</h4>
                      <p className="text-sm text-muted-foreground">Michael Brown - $100.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-100 text-red-800">Failed</Badge>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
