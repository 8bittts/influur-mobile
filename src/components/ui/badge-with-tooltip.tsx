/**
 * BadgeWithTooltip Component
 * 
 * A badge component that displays an icon with a tooltip containing additional information.
 * Supports both earned and unearned states with different visual treatments.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <BadgeWithTooltip
 *   name="Early Adopter"
 *   description="Joined during beta testing"
 *   icon={<StarIcon className="w-4 h-4" />}
 *   color="bg-yellow-100 text-yellow-600"
 *   earned={true}
 * />
 * 
 * // Unearned badge
 * <BadgeWithTooltip
 *   name="Top Contributor"
 *   description="Complete 50 successful campaigns"
 *   icon={<TrophyIcon className="w-4 h-4" />}
 *   color="bg-purple-100 text-purple-600"
 *   earned={false}
 * />
 * ```
 */

"use client"

import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Type definitions
interface BadgeProps {
  /** Name of the badge */
  name: string
  /** Description of what the badge represents */
  description: string
  /** Icon to display in the badge */
  icon: React.ReactNode
  /** Tailwind CSS classes for the badge color */
  color: string
  /** Whether the badge has been earned */
  earned: boolean
}

// Constants
const BADGE_STYLES = {
  base: "relative inline-flex items-center justify-center w-7 h-7 rounded-full cursor-help transition-all",
  earned: "shadow-sm hover:shadow-md",
  unearned: "opacity-50",
  lock: "absolute inset-0 bg-gray-100/80 rounded-full flex items-center justify-center",
  tooltip: "bg-white p-3 rounded-lg shadow-lg border max-w-[200px] text-sm",
} as const

/**
 * Badge component that displays an icon with a tooltip
 * Shows a lock overlay for unearned badges
 */
export function BadgeWithTooltip({ name, description, icon, color, earned }: BadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              BADGE_STYLES.base,
              earned ? color : "bg-gray-100",
              earned ? BADGE_STYLES.earned : BADGE_STYLES.unearned
            )}
          >
            <div className="text-[13px]">
              {icon}
            </div>
            {!earned && (
              <div className={BADGE_STYLES.lock}>
                <span className="text-gray-400 text-xs">🔒</span>
              </div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          className={BADGE_STYLES.tooltip}
          side="bottom"
          align="center"
          sideOffset={5}
        >
          <p className="font-semibold mb-1">{name}</p>
          <p className="text-gray-600 text-xs">{description}</p>
          {!earned && (
            <p className="text-gray-400 text-xs mt-1 italic">Not yet earned</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 