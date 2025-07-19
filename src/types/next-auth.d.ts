import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      subscriptionTier?: string
      subscriptionStatus?: string
      trialEndDate?: Date | null
      transcriptsUsed?: number
      aiQueriesUsed?: number
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    subscriptionTier?: string
    subscriptionStatus?: string
    trialEndDate?: Date | null
    transcriptsUsed?: number
    aiQueriesUsed?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}
