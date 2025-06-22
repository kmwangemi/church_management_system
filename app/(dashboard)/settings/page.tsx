"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Church,
  Users,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Key,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage church system settings and configurations</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup & Data</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Church className="h-5 w-5" />
                  <span>Church Information</span>
                </CardTitle>
                <CardDescription>Basic church details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="churchName">Church Name</Label>
                  <Input id="churchName" defaultValue="Grace Community Church" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Church Street, Downtown, City 12345" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="info@gracechurch.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://gracechurch.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pastor">Senior Pastor</Label>
                  <Input id="pastor" defaultValue="Pastor John Smith" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Allow users to switch to dark theme</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable system access</p>
                  </div>
                  <Switch />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Roles</span>
                </CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Super Admin</h4>
                      <p className="text-sm text-muted-foreground">Full system access</p>
                    </div>
                    <Badge variant="secondary">2 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Pastor</h4>
                      <p className="text-sm text-muted-foreground">Ministry and member management</p>
                    </div>
                    <Badge variant="secondary">3 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Finance Officer</h4>
                      <p className="text-sm text-muted-foreground">Financial data access</p>
                    </div>
                    <Badge variant="secondary">2 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Secretary</h4>
                      <p className="text-sm text-muted-foreground">Administrative tasks</p>
                    </div>
                    <Badge variant="secondary">4 users</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Volunteer</h4>
                      <p className="text-sm text-muted-foreground">Limited access</p>
                    </div>
                    <Badge variant="secondary">15 users</Badge>
                  </div>
                  <Button className="w-full">Manage Roles & Permissions</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Currently active system users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>PJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Pastor John</p>
                        <p className="text-sm text-muted-foreground">pastor@church.com</p>
                      </div>
                    </div>
                    <Badge>Super Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">sarah@church.com</p>
                      </div>
                    </div>
                    <Badge variant="outline">Pastor</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">michael@church.com</p>
                      </div>
                    </div>
                    <Badge variant="outline">Finance Officer</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>ED</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Davis</p>
                        <p className="text-sm text-muted-foreground">emily@church.com</p>
                      </div>
                    </div>
                    <Badge variant="outline">Secretary</Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Email Notifications</span>
                </CardTitle>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Member Registration</Label>
                    <p className="text-sm text-muted-foreground">Notify when new members join</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Donation Received</Label>
                    <p className="text-sm text-muted-foreground">Notify on new donations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send event reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Prayer Request Submitted</Label>
                    <p className="text-sm text-muted-foreground">Notify on new prayer requests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input id="adminEmail" defaultValue="admin@gracechurch.com" />
                </div>
                <Button>Save Email Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Configure SMS notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical emergency notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Service Reminders</Label>
                    <p className="text-sm text-muted-foreground">Sunday service reminders</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Event Updates</Label>
                    <p className="text-sm text-muted-foreground">Last-minute event changes</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Volunteer Requests</Label>
                    <p className="text-sm text-muted-foreground">Urgent volunteer needs</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">SMS Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                      <SelectItem value="textmagic">TextMagic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smsCredits">SMS Credits Remaining</Label>
                  <div className="text-2xl font-bold">2,847</div>
                  <Button variant="outline" className="w-full">
                    Purchase More Credits
                  </Button>
                </div>
                <Button>Save SMS Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Integrations</span>
                </CardTitle>
                <CardDescription>Configure payment processing services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">M-Pesa</h4>
                      <p className="text-sm text-muted-foreground">Mobile money payments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-muted-foreground">Credit card processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Inactive</Badge>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-sm text-muted-foreground">Online payments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Inactive</Badge>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Communication Services</span>
                </CardTitle>
                <CardDescription>Email and SMS service integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">SendGrid</h4>
                      <p className="text-sm text-muted-foreground">Email delivery service</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Twilio</h4>
                      <p className="text-sm text-muted-foreground">SMS messaging service</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Google Drive</h4>
                      <p className="text-sm text-muted-foreground">Cloud storage backup</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Inactive</Badge>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure system security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout inactive users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Attempt Limit</Label>
                    <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                  <Input id="maxAttempts" type="number" defaultValue="5" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
                  </div>
                  <Switch />
                </div>
                <Button>Save Security Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Keys & Access</span>
                </CardTitle>
                <CardDescription>Manage API keys and external access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Access</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Mobile App API</h4>
                      <p className="text-sm text-muted-foreground">Key: ••••••••••••3a2f</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Webhook URLs</Label>
                  <div className="space-y-2">
                    <Input placeholder="https://your-app.com/webhook" />
                    <Button variant="outline" className="w-full">
                      Add Webhook
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>CORS Settings</Label>
                  <Textarea placeholder="https://your-domain.com&#10;https://app.your-domain.com" rows={3} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Limit API requests per hour</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>Save API Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Backup Settings</span>
                </CardTitle>
                <CardDescription>Configure automatic backups and data retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Enable scheduled backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retentionPeriod">Retention Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupLocation">Backup Location</Label>
                  <Select defaultValue="local">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="gdrive">Google Drive</SelectItem>
                      <SelectItem value="dropbox">Dropbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage system data and storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Storage Usage</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database</span>
                      <span>2.4 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Media Files</span>
                      <span>1.8 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Backups</span>
                      <span>3.2 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Data Cleanup</Label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clean Old Logs (30+ days)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Inactive Members (1+ year)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Archive Old Events (6+ months)
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Export Data</Label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Member Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Financial Records
                    </Button>
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
