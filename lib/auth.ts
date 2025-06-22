import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export interface AuthUser {
  userId: string
  churchId: string
  role: string
  email: string
}

export async function verifyToken(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export function requireAuth(roles?: string[]) {
  return async (request: NextRequest) => {
    const user = await verifyToken(request)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (roles && !roles.includes(user.role)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    return user
  }
}
