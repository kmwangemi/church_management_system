import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Branch from "@/models/Branch"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""

    const query: any = { churchId: user.churchId }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "address.city": { $regex: search, $options: "i" } },
        { "address.state": { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [branches, total] = await Promise.all([
      Branch.find(query).populate("pastorId", "firstName lastName").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Branch.countDocuments(query),
    ])

    return NextResponse.json({
      branches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get branches error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const branchData = await request.json()

    const branch = new Branch({
      ...branchData,
      churchId: user.churchId,
    })

    await branch.save()
    await branch.populate("pastorId", "firstName lastName")

    return NextResponse.json(branch, { status: 201 })
  } catch (error) {
    console.error("Create branch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
