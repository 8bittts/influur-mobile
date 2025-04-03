/**
 * Input Component
 * 
 * A customizable input component that extends the native HTML input element.
 * Supports all standard input types and includes built-in styling for various states.
 * 
 * @example
 * ```tsx
 * // Basic text input
 * <Input type="text" placeholder="Enter your name" />
 * 
 * // Password input
 * <Input type="password" placeholder="Enter your password" />
 * 
 * // Disabled input
 * <Input type="text" placeholder="Disabled input" disabled />
 * 
 * // With custom className
 * <Input className="w-64" placeholder="Custom width" />
 * ```
 */

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Props interface for the Input component
 * Extends standard HTML input attributes
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component that provides consistent styling and behavior
 * across different input types and states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 