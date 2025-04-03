/**
 * ProfileImage Component
 * 
 * A component that displays a user's profile image or their initials as a fallback.
 * Supports different sizes and handles both image and text-based displays.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ProfileImage size="md" />
 * 
 * // With custom class
 * <ProfileImage size="lg" className="border-2 border-primary" />
 * 
 * // Small size
 * <ProfileImage size="sm" />
 * ```
 */

"use client"

import * as React from "react"
import Image from "next/image"
import { useUser } from "@/lib/contexts/user-context"
import { cn } from "@/lib/utils"

// Type definitions
type ProfileSize = "sm" | "md" | "lg"

interface ProfileImageProps {
  /** Size of the profile image */
  size?: ProfileSize
  /** Additional CSS classes to apply */
  className?: string
}

// Constants
const PROFILE_SIZES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12"
} as const

const FONT_SIZES = {
  sm: "12px",
  md: "14px",
  lg: "16px"
} as const

const DEFAULT_PROFILE_IMAGE = "/placeholder-profile.jpg"
const FALLBACK_INITIAL = "?"

/**
 * Profile image component that displays either a user's profile image
 * or their initials as a fallback
 */
export default function ProfileImage({ 
  size = "md", 
  className = "" 
}: ProfileImageProps) {
  const { profileImage, name } = useUser()
  
  // If there's no profile image or it's the default placeholder and we have a name,
  // show initials instead
  if (!profileImage || (profileImage === DEFAULT_PROFILE_IMAGE && name)) {
    const initials = name
      ? name
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : FALLBACK_INITIAL

    return (
      <div 
        className={cn(
          PROFILE_SIZES[size],
          "bg-[#FF5F1F]/10 rounded-full flex items-center justify-center text-[#FF5F1F] font-medium",
          className
        )}
        style={{ fontSize: FONT_SIZES[size] }}
      >
        {initials}
      </div>
    )
  }

  return (
    <div className={cn(PROFILE_SIZES[size], "relative overflow-hidden rounded-full", className)}>
      <Image
        src={profileImage}
        alt={name || "Profile"}
        fill
        className="object-cover"
      />
    </div>
  )
} 