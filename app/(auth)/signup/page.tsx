"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Church, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Church Registration Data
  const [churchData, setChurchData] = useState({
    churchName: "",
    denomination: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    foundedYear: "",
    description: "",
  })

  // Admin User Data
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Pastor",
    agreeToTerms: false,
  })

  const handleChurchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle final registration
    console.log("Church Registration:", { churchData, adminData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center space-x-2 mb-4">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ChurchManager</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Church Account</h1>
          <p className="text-gray-600">{step === 1 ? "Tell us about your church" : "Set up your admin account"}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <Card>
          {step === 1 ? (
            <>
              <CardHeader>
                <CardTitle>Church Information</CardTitle>
                <CardDescription>Provide details about your church organization</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChurchSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="churchName">Church Name *</Label>
                      <Input
                        id="churchName"
                        placeholder="Grace Community Church"
                        value={churchData.churchName}
                        onChange={(e) => setChurchData({ ...churchData, churchName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="denomination">Denomination</Label>
                      <Select onValueChange={(value) => setChurchData({ ...churchData, denomination: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select denomination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baptist">Baptist</SelectItem>
                          <SelectItem value="methodist">Methodist</SelectItem>
                          <SelectItem value="presbyterian">Presbyterian</SelectItem>
                          <SelectItem value="pentecostal">Pentecostal</SelectItem>
                          <SelectItem value="catholic">Catholic</SelectItem>
                          <SelectItem value="episcopal">Episcopal</SelectItem>
                          <SelectItem value="lutheran">Lutheran</SelectItem>
                          <SelectItem value="non-denominational">Non-denominational</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Church Street"
                      value={churchData.address}
                      onChange={(e) => setChurchData({ ...churchData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Springfield"
                        value={churchData.city}
                        onChange={(e) => setChurchData({ ...churchData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="IL"
                        value={churchData.state}
                        onChange={(e) => setChurchData({ ...churchData, state: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="62701"
                        value={churchData.zipCode}
                        onChange={(e) => setChurchData({ ...churchData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={churchData.phone}
                        onChange={(e) => setChurchData({ ...churchData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Church Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@gracechurch.com"
                        value={churchData.email}
                        onChange={(e) => setChurchData({ ...churchData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="www.gracechurch.com"
                        value={churchData.website}
                        onChange={(e) => setChurchData({ ...churchData, website: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        placeholder="1985"
                        value={churchData.foundedYear}
                        onChange={(e) => setChurchData({ ...churchData, foundedYear: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Church Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your church's mission and vision..."
                      value={churchData.description}
                      onChange={(e) => setChurchData({ ...churchData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Continue to Admin Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Admin Account Setup</CardTitle>
                <CardDescription>Create your administrator account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={adminData.firstName}
                        onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={adminData.lastName}
                        onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Email Address *</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="pastor@gracechurch.com"
                        value={adminData.email}
                        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPhone">Phone Number</Label>
                      <Input
                        id="adminPhone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={adminData.phone}
                        onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={adminData.role}
                      onValueChange={(value) => setAdminData({ ...adminData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pastor">Pastor</SelectItem>
                        <SelectItem value="Associate Pastor">Associate Pastor</SelectItem>
                        <SelectItem value="Church Administrator">Church Administrator</SelectItem>
                        <SelectItem value="Elder">Elder</SelectItem>
                        <SelectItem value="Deacon">Deacon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password *</Label>
                    <div className="relative">
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={adminData.password}
                        onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={adminData.confirmPassword}
                        onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={adminData.agreeToTerms}
                      onCheckedChange={(checked) => setAdminData({ ...adminData, agreeToTerms: checked as boolean })}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!adminData.agreeToTerms}>
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
