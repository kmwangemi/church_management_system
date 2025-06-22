"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Church, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isReset, setIsReset] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    // Handle password reset logic here
    console.log("Password reset:", { password })
    setIsReset(true)
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center space-x-2 mb-4">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ChurchManager</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600">
            {isReset ? "Your password has been reset successfully" : "Create a new password for your account"}
          </p>
        </div>

        <Card>
          {!isReset ? (
            <>
              <CardHeader>
                <CardTitle>Create New Password</CardTitle>
                <CardDescription>Choose a strong password to secure your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

                  {/* Password Requirements */}
                  {password && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Password Requirements:</Label>
                      <div className="space-y-1">
                        {passwordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className={`h-3 w-3 ${req.met ? "text-green-500" : "text-gray-300"}`} />
                            <span className={req.met ? "text-green-700" : "text-gray-500"}>{req.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="flex items-center space-x-2 text-xs">
                      <CheckCircle
                        className={`h-3 w-3 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}
                      />
                      <span className={password === confirmPassword ? "text-green-700" : "text-red-500"}>
                        {password === confirmPassword ? "Passwords match" : "Passwords don't match"}
                      </span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!passwordRequirements.every((req) => req.met) || password !== confirmPassword}
                  >
                    Reset Password
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Password Reset Successful</CardTitle>
                <CardDescription>Your password has been updated successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/login">
                  <Button className="w-full">Sign In with New Password</Button>
                </Link>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
