import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Church, Users, Calendar, Heart, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Comprehensive member database with detailed profiles and communication tools",
    },
    {
      icon: Calendar,
      title: "Event Planning",
      description: "Schedule and manage church events, services, and special occasions",
    },
    {
      icon: Heart,
      title: "Small Groups",
      description: "Organize and track small groups, Bible studies, and ministry teams",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Detailed insights into attendance, giving, and church growth",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with role-based access control",
    },
    {
      icon: Church,
      title: "Multi-Branch Support",
      description: "Manage multiple church locations from a single platform",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Church className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ChurchManager</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Church with
            <span className="text-blue-600"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your church operations with our comprehensive management system. From member management to event
            planning, we've got everything you need to grow your ministry.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Manage Your Church</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools necessary to efficiently manage your church operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Church Management?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of churches already using our platform to grow their ministry
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Church className="h-6 w-6" />
              <span className="text-lg font-semibold">ChurchManager</span>
            </div>
            <p className="text-gray-400">© 2024 ChurchManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
