import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          const { email, password } = loginSchema.parse(credentials)

          const response = await fetch("/api/auth/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            return null
          }

          const user = await response.json()
          return user
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to onboarding if it's a new user
      if (url.startsWith(baseUrl)) {
        return url
      }
      return "/onboarding"
    },
  },
})

export { handler as GET, handler as POST } 