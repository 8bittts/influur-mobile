"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()

  return (
    <div className="w-full space-y-4">
      <Link
        href="/onboarding"
        className="block w-full text-center text-gray-900 font-medium"
      >
        Log in
      </Link>
    </div>
  )
} 