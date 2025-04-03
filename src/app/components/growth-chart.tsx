/**
 * GrowthChart Component
 * 
 * A component that displays a growth chart visualization using SVG.
 * Shows a gradient line chart representing platform growth and earnings.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <GrowthChart
 *   connectedPlatforms={['instagram', 'tiktok']}
 *   platforms={[
 *     { id: 'instagram', chartColor: '#E1306C', baseEarning: 100 },
 *     { id: 'tiktok', chartColor: '#000000', baseEarning: 150 }
 *   ]}
 * />
 * ```
 */

'use client'

import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

// Types
interface Platform {
  /** Unique identifier for the platform */
  id: string
  /** Color to use in the chart gradient */
  chartColor: string
  /** Base earning value for the platform */
  baseEarning: number
}

interface GrowthChartProps {
  /** List of connected platform IDs */
  connectedPlatforms: string[]
  /** List of platform configurations */
  platforms: Platform[]
}

// Constants
const CHART_STYLES = {
  container: "relative w-full h-full",
  loading: "w-full h-full bg-gray-100 rounded animate-pulse",
  svg: "w-full h-full",
  path: "drop-shadow-md"
} as const

const SVG_ATTRIBUTES = {
  viewBox: "0 0 100 100",
  preserveAspectRatio: "none",
  strokeWidth: "3",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
} as const

/**
 * Generates an SVG path string for the growth chart
 * @param connectedPlatforms - List of connected platform IDs
 * @returns SVG path string
 */
function generatePath(connectedPlatforms: string[]): string {
  if (connectedPlatforms.length === 0) return ""
  
  const points = connectedPlatforms.map((_, index) => {
    const x = (index * 100) / (Math.max(1, connectedPlatforms.length - 1))
    const y = 100 - ((index + 1) * 100) / Math.max(1, connectedPlatforms.length)
    return `${x},${y}`
  })
  
  if (points.length === 1) return `M${points[0]} L${points[0]}`
  
  return `M${points.join(" L")}`
}

/**
 * Growth chart visualization component
 * Displays a gradient line chart showing platform growth and earnings
 */
export function GrowthChart({ connectedPlatforms, platforms }: GrowthChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={CHART_STYLES.container}>
        <div className={CHART_STYLES.loading} />
      </div>
    )
  }

  return (
    <div className={CHART_STYLES.container}>
      <svg
        viewBox={SVG_ATTRIBUTES.viewBox}
        className={CHART_STYLES.svg}
        preserveAspectRatio={SVG_ATTRIBUTES.preserveAspectRatio}
      >
        <defs>
          <linearGradient id="line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
            {connectedPlatforms.map((platformId, index) => {
              const platform = platforms.find(p => p.id === platformId)
              return (
                <stop
                  key={platformId}
                  offset={`${(index * 100) / Math.max(1, connectedPlatforms.length - 1)}%`}
                  stopColor={platform?.chartColor || "#666666"}
                />
              )
            })}
          </linearGradient>
        </defs>
        <path
          d={generatePath(connectedPlatforms)}
          stroke="url(#line-gradient)"
          strokeWidth={SVG_ATTRIBUTES.strokeWidth}
          fill={SVG_ATTRIBUTES.fill}
          strokeLinecap={SVG_ATTRIBUTES.strokeLinecap}
          strokeLinejoin={SVG_ATTRIBUTES.strokeLinejoin}
          className={CHART_STYLES.path}
        />
      </svg>
    </div>
  )
} 