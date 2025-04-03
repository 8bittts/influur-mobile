"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

// Generate seeds for consistent avatars
const SEEDS = Array.from({ length: 8 }, (_, i) => `creator-${i + 1}`)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col max-w-md mx-auto">
      {/* Checkered pattern header */}
      <div className="px-3 pt-3">
        <div className="grid grid-cols-4 gap-1">
          {SEEDS.map((seed, i) => (
            <div key={seed} className="aspect-square">
              {(i + Math.floor(i / 4)) % 2 === 0 ? (
                <div className="w-full h-full bg-[#FF5F1F] rounded-lg" />
              ) : (
                <div className="w-full h-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=ffffff`}
                    alt="Creator"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-4 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <span className="text-[#FF5F1F] text-6xl font-bold tracking-tight">
            influur
          </span>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-lg text-gray-600">
            Start earning money by connecting with top brands
          </p>
        </div>

        {/* Form */}
        {children}
      </div>
    </div>
  )
} 