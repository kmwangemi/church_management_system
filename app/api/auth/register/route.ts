import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Church from "@/models/Church"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { churchData, adminData } = body

    // Check if church email already exists
    const existingChurch = await Church.findOne({ "contact.email": churchData.contact.email })
    if (existingChurch) {
      return NextResponse.json({ error: "Church with this email already exists" }, { status: 400 })
    }

    // Check if admin email already exists
    const existingUser = await User.findOne({ email: adminData.email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create church
    const church = new Church(churchData)
    await church.save()

    // Create admin user
    const admin = new User({
      churchId: church._id,
      email: adminData.email,
      password: adminData.password,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      role: adminData.role,
      phone: adminData.phone,
    })
    await admin.save()

    return NextResponse.json(
      {
        message: "Church and admin user created successfully",
        churchId: church._id,
        userId: admin._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
