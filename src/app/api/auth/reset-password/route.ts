import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: "If an account with that email exists, we've sent a password reset link." },
        { status: 200 }
      )
    }

    // Generate password reset token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Delete any existing password reset tokens for this email
    await prisma.emailToken.deleteMany({
      where: {
        email,
        type: "PASSWORD_RESET"
      }
    })

    // Create new token
    await prisma.emailToken.create({
      data: {
        email,
        token,
        type: "PASSWORD_RESET",
        expires,
      }
    })

    // Send reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset your password - YouTranscript",
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #dc2626; text-align: center;">Reset Your Password</h1>
            <p>Hi ${user.name || 'there'},</p>
            <p>We received a request to reset your password for your YouTranscript account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <p>Best regards,<br>The YouTranscript Team</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError)
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "If an account with that email exists, we've sent a password reset link." },
      { status: 200 }
    )

  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
