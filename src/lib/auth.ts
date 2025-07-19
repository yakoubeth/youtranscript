import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth - Disabled until credentials are configured
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // GitHub OAuth - Disabled for now, will implement social logins later
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Email verification check disabled for development
        // Uncomment the lines below when you want to enforce email verification:
        // if (!user.emailVerified) {
        //   throw new Error("Please verify your email before signing in")
        // }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        
        // Set trial end date for new users
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { 
            subscriptionTier: true, 
            trialEndDate: true,
            subscriptionStatus: true 
          }
        })
        
        if (dbUser && !dbUser.trialEndDate && dbUser.subscriptionTier === "free_trial") {
          const trialEndDate = new Date()
          trialEndDate.setDate(trialEndDate.getDate() + 14)
          
          await prisma.user.update({
            where: { id: user.id },
            data: { trialEndDate }
          })
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        
        // Get user subscription info
        const user = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            subscriptionTier: true,
            subscriptionStatus: true,
            trialEndDate: true,
            transcriptsUsed: true,
            aiQueriesUsed: true
          }
        })
        
        if (user) {
          session.user.subscriptionTier = user.subscriptionTier
          session.user.subscriptionStatus = user.subscriptionStatus
          session.user.trialEndDate = user.trialEndDate
          session.user.transcriptsUsed = user.transcriptsUsed
          session.user.aiQueriesUsed = user.aiQueriesUsed
        }
      }
      return session
    },
    async signIn({ user, account }) {
      // For OAuth providers, mark email as verified
      if (account?.provider === "google" || account?.provider === "github") {
        if (user.email) {
          await prisma.user.update({
            where: { email: user.email },
            data: { emailVerified: new Date() }
          })
        }
      }
      return true
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  events: {
    async createUser({ user }) {
      // Send welcome email here if needed
      console.log("New user created:", user.email)
    }
  }
}
