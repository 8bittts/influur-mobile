/**
 * Card Component
 * 
 * A flexible card component that provides a consistent container for content.
 * Includes subcomponents for header, title, description, content, and footer sections.
 * 
 * @example
 * ```tsx
 * // Basic card with all sections
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <p>Card footer content</p>
 *   </CardFooter>
 * </Card>
 * 
 * // Minimal card
 * <Card>
 *   <CardContent>
 *     <p>Simple card content</p>
 *   </CardContent>
 * </Card>
 * ```
 */

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Type definitions for component props
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

/**
 * Root card component that provides the base container
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

/**
 * Header section of the card
 * Typically contains the title and description
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

/**
 * Title component for the card
 * Used within CardHeader
 */
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

/**
 * Description component for the card
 * Used within CardHeader
 */
const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

/**
 * Main content section of the card
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

/**
 * Footer section of the card
 * Typically used for actions or additional information
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
