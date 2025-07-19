import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=invalid-token", req.url))
    }

    // Find and validate token
    const emailToken = await prisma.emailToken.findFirst({
      where: {
        token,
        type: "EMAIL_VERIFICATION",
        expires: {
          gte: new Date()
        }
      }
    })

    if (!emailToken) {
      return NextResponse.redirect(new URL("/login?error=token-expired", req.url))
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { email: emailToken.email },
      data: { emailVerified: new Date() }
    })

    // Delete the used token
    await prisma.emailToken.delete({
      where: { id: emailToken.id }
    })

    return NextResponse.redirect(new URL("/login?message=email-verified", req.url))

  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/login?error=verification-failed", req.url))
  }
}
