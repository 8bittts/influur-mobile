/**
 * Notification Component
 * 
 * A notification system that displays toast-like notifications with different types and styles.
 * Includes a manager component that handles the display and timing of notifications.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <NotificationManager />
 * 
 * // Individual notification
 * <Notification
 *   id="1"
 *   type="message"
 *   title="New Message"
 *   message="You have a new message"
 *   onDismiss={() => {}}
 *   index={0}
 * />
 * ```
 */

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, MessageSquare, TrendingUp, Wallet, FileCheck } from "lucide-react"
import { usePathname } from "next/navigation"

// Type definitions
type NotificationType = "trending" | "reply" | "deposit" | "contract" | "alert" | "message"

interface NotificationProps {
  /** Unique identifier for the notification */
  id: string
  /** Type of notification that determines its appearance */
  type: NotificationType
  /** Title of the notification */
  title: string
  /** Message content of the notification */
  message: string
  /** Callback function when the notification is dismissed */
  onDismiss: (id: string) => void
  /** Index position for stacking multiple notifications */
  index: number
}

interface DummyNotification {
  type: NotificationType
  title: string
  message: string
}

// Constants
const NOTIFICATION_ICONS = {
  trending: TrendingUp,
  reply: MessageSquare,
  deposit: Wallet,
  contract: FileCheck,
  alert: AlertCircle,
  message: MessageSquare,
} as const

const NOTIFICATION_COLORS = {
  trending: "bg-blue-500/10 text-blue-500",
  reply: "bg-purple-500/10 text-purple-500",
  deposit: "bg-green-500/10 text-green-500",
  contract: "bg-emerald-500/10 text-emerald-500",
  alert: "bg-yellow-500/10 text-yellow-500",
  message: "bg-indigo-500/10 text-indigo-500",
} as const

const DUMMY_NOTIFICATIONS: DummyNotification[] = [
  {
    type: "trending",
    title: "Trending Campaign",
    message: "New campaign 'Summer Vibes' is trending in your area!",
  },
  {
    type: "reply",
    title: "New Reply",
    message: "Campaign manager replied to your application",
  },
  {
    type: "deposit",
    title: "Payment Received",
    message: "Your deposit of $500 has been processed",
  },
  {
    type: "contract",
    title: "Contract Fulfilled",
    message: "Campaign 'Beach Day' has been completed successfully",
  },
  {
    type: "alert",
    title: "Important Update",
    message: "New campaign requirements have been updated",
  },
  {
    type: "message",
    title: "New Message",
    message: "You have a new message from a brand manager",
  },
]

/**
 * Individual notification component
 * Displays a single notification with animation and auto-dismiss functionality
 */
export function Notification({ id, type, title, message, onDismiss, index }: NotificationProps) {
  const Icon = NOTIFICATION_ICONS[type]
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id)
    }, 15000) // Auto-dismiss after 15 seconds

    return () => clearTimeout(timer)
  }, [id, onDismiss])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "fixed right-4 w-[400px] rounded-lg p-3 shadow-lg backdrop-blur-sm z-[9999]",
        NOTIFICATION_COLORS[type]
      )}
      style={{ top: `${4 + index * 100}px` }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold leading-none">{title}</h3>
          <p className="text-xs leading-snug opacity-90">{message}</p>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="text-xs opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </motion.div>
  )
}

/**
 * Notification manager component
 * Handles the display and timing of notifications
 * Only shows notifications on the dashboard page
 */
export function NotificationManager() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([])
  const [isPaused, setIsPaused] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const addNotification = React.useCallback(() => {
    if (currentIndex >= DUMMY_NOTIFICATIONS.length || !isDashboard) return

    const newNotification = {
      ...DUMMY_NOTIFICATIONS[currentIndex],
      id: Math.random().toString(36).substr(2, 9),
      onDismiss: (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
        setIsPaused(true) // Stop all notifications when any is dismissed
      },
      index: 0, // Always at the top since we're showing one at a time
    }
    setNotifications([newNotification])
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex, isDashboard])

  React.useEffect(() => {
    if (!isDashboard) {
      setNotifications([])
      setIsPaused(true)
      return
    }

    // Show first notification within 5 seconds
    const initialTimer = setTimeout(() => {
      addNotification()
    }, 5000) // Fixed 5 seconds for first notification

    if (isPaused) return

    // Set up interval for subsequent notifications
    const interval = setInterval(() => {
      if (currentIndex < DUMMY_NOTIFICATIONS.length) {
        addNotification()
      } else {
        clearInterval(interval)
      }
    }, Math.random() * 5000 + 15000) // Random time between 15-20 seconds

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [isPaused, addNotification, currentIndex, isDashboard])

  if (!isDashboard) return null

  return (
    <AnimatePresence>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} index={0} />
      ))}
    </AnimatePresence>
  )
} 