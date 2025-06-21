"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Users,
  Building2,
  DollarSign,
  Calendar,
  MessageSquare,
  BarChart3,
  BookOpen,
  Heart,
  UserCheck,
  Settings,
  Church,
  UserPlus,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Members", href: "/members", icon: Users },
  { name: "Branches & Departments", href: "/branches", icon: Building2 },
  { name: "Finance & Giving", href: "/finance", icon: DollarSign },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Communication", href: "/communication", icon: MessageSquare },
  { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { name: "Content Management", href: "/content", icon: BookOpen },
  { name: "Discipleship", href: "/discipleship", icon: UserPlus },
  { name: "Volunteers", href: "/volunteers", icon: UserCheck },
  { name: "Prayer Requests", href: "/prayer", icon: Heart },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-card border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Church className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold">ChurchMS</span>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", pathname === item.href && "bg-secondary")}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
