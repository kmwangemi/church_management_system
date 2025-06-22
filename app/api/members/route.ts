import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Member from "@/models/Member"
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
    const status = searchParams.get("status") || ""
    const branchId = searchParams.get("branchId") || ""

    const query: any = { churchId: user.churchId }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { memberId: { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.membershipStatus = status
    }

    if (branchId) {
      query.branchId = branchId
    }

    const skip = (page - 1) * limit

    const [members, total] = await Promise.all([
      Member.find(query)
        .populate("branchId", "name")
        .populate("departmentIds", "name")
        .populate("groupIds", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Member.countDocuments(query),
    ])

    return NextResponse.json({
      members,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get members error:", error)
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

    const memberData = await request.json()

    // Generate member ID
    const memberCount = await Member.countDocuments({ churchId: user.churchId })
    const memberId = `MEM${String(memberCount + 1).padStart(4, "0")}`

    const member = new Member({
      ...memberData,
      churchId: user.churchId,
      memberId,
    })

    await member.save()
    await member.populate(["branchId", "departmentIds", "groupIds"])

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error("Create member error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
