/**
 * Badges Component
 * 
 * A component that displays a collection of achievement badges for a user.
 * Each badge has a name, description, icon, and color, and can be earned based on user statistics.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Badges userStats={userStats} />
 * 
 * // With custom class
 * <Badges userStats={userStats} className="gap-2" />
 * ```
 */

"use client"

import { BadgeWithTooltip } from "@/components/ui/badge-with-tooltip"
import { Trophy, Star, Calendar, DollarSign, Users, Award, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface UserStats {
  completedCampaigns: number
  perfectRatings: number
  daysActive: number
  totalEarnings: number
  brandConnections: number
  avgResponseTime: number
  topPercentile: number
}

interface Badge {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  requirement: (stats: UserStats) => boolean
}

interface BadgesProps {
  /** User statistics used to determine which badges are earned */
  userStats: UserStats
  /** Additional CSS classes to apply */
  className?: string
}

// Constants
const BADGE_STYLES = {
  container: "flex gap-1.5 items-center"
} as const

const BADGES: Badge[] = [
  {
    name: "Ten Successful Campaigns",
    description: "Successfully completed 10 brand campaigns",
    icon: <Trophy className="w-4 h-4 text-yellow-600" />,
    color: "bg-yellow-100",
    requirement: (stats) => stats.completedCampaigns >= 10,
  },
  {
    name: "Rising Star",
    description: "Achieved perfect ratings on first 5 campaigns",
    icon: <Star className="w-4 h-4 text-purple-600" />,
    color: "bg-purple-100",
    requirement: (stats) => stats.perfectRatings >= 5,
  },
  {
    name: "First Anniversary",
    description: "One year as an active creator",
    icon: <Calendar className="w-4 h-4 text-blue-600" />,
    color: "bg-blue-100",
    requirement: (stats) => stats.daysActive >= 365,
  },
  {
    name: "Top Earner",
    description: "Earned over $1,000 from campaigns",
    icon: <DollarSign className="w-4 h-4 text-green-600" />,
    color: "bg-green-100",
    requirement: (stats) => stats.totalEarnings >= 1000,
  },
  {
    name: "Network Builder",
    description: "Connected with 20+ brands",
    icon: <Users className="w-4 h-4 text-indigo-600" />,
    color: "bg-indigo-100",
    requirement: (stats) => stats.brandConnections >= 20,
  },
  {
    name: "Quick Response",
    description: "Average response time under 2 hours",
    icon: <Zap className="w-4 h-4 text-orange-600" />,
    color: "bg-orange-100",
    requirement: (stats) => stats.avgResponseTime <= 2,
  },
  {
    name: "Elite Creator",
    description: "Top 10% of creators by engagement",
    icon: <Award className="w-4 h-4 text-rose-600" />,
    color: "bg-rose-100",
    requirement: (stats) => stats.topPercentile <= 10,
  },
] as const

/**
 * Displays a collection of achievement badges for a user
 * Each badge is shown with a tooltip and can be earned based on user statistics
 */
export function Badges({ userStats, className = "" }: BadgesProps) {
  return (
    <div className={cn(BADGE_STYLES.container, className)}>
      {BADGES.map((badge) => (
        <BadgeWithTooltip
          key={badge.name}
          name={badge.name}
          description={badge.description}
          icon={badge.icon}
          color={badge.color}
          earned={badge.requirement(userStats)}
        />
      ))}
    </div>
  )
} 