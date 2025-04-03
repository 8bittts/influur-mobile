"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/contexts/user-context"

export default function LoginPage() {
  const router = useRouter()
  const { setName, setRole } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Here you would typically make an API call to authenticate the user
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user context with mock data
      setName("asd fsf")
      setRole("Creator")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FF5F1F]">
              influur
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF5F1F] focus:border-[#FF5F1F]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#FF5F1F] focus:border-[#FF5F1F]"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5F1F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-[#FF5F1F] hover:text-[#FF5F1F]/90">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 