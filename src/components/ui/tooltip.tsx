/**
 * Tooltip Component
 * 
 * A tooltip component built on top of Radix UI's Tooltip primitive.
 * Provides a styled tooltip with support for different positions and animations.
 * 
 * @example
 * ```tsx
 * // Basic tooltip
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>
 *       <p>This is a tooltip</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * 
 * // With custom styling
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Custom Tooltip</TooltipTrigger>
 *     <TooltipContent className="bg-blue-500 text-white">
 *       <p>Custom styled tooltip</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */

"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

// Type definitions
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  className?: string
  sideOffset?: number
}

// Root components
const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * Content component that displays the tooltip text
 * Supports custom positioning and animations
 */
const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-white px-3 py-1.5 text-sm text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } 