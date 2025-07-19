import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Find and validate token
    const emailToken = await prisma.emailToken.findFirst({
      where: {
        token,
        type: "PASSWORD_RESET",
        expires: {
          gte: new Date()
        }
      }
    })

    if (!emailToken) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user's password
    await prisma.user.update({
      where: { email: emailToken.email },
      data: { password: hashedPassword }
    })

    // Delete the used token
    await prisma.emailToken.delete({
      where: { id: emailToken.id }
    })

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Password update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
