/**
 * Avatar Component
 * 
 * A customizable avatar component built on top of Radix UI's Avatar primitive.
 * Supports images with fallback content and various styling options.
 * 
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/user-avatar.png" alt="User Avatar" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

// Type definitions for component props
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string
}

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  className?: string
}

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  className?: string
}

/**
 * Root Avatar component that wraps the avatar content.
 * Provides the base styling and structure for the avatar.
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage component that displays the avatar image.
 * Falls back to AvatarFallback if the image fails to load.
 */
const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback component that displays when the image fails to load
 * or while the image is loading.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps } 