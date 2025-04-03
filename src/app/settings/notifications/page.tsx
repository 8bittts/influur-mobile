"use client"

import * as React from "react"
import { ArrowLeft, Bell, DollarSign, TrendingUp, MessageSquare, Star, Megaphone } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface NotificationCategory {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  preferences: {
    id: string
    title: string
    description: string
    enabled: boolean
  }[]
}

const DEFAULT_CATEGORIES: NotificationCategory[] = [
  {
    id: 'campaigns',
    title: 'Campaign Notifications',
    description: 'Notifications about brand campaigns and opportunities',
    icon: <Star className="w-5 h-5 text-[#FF5F1F]" />,
    preferences: [
      {
        id: 'new_campaigns',
        title: 'New Opportunities',
        description: 'Get notified when new campaigns match your profile',
        enabled: true
      },
      {
        id: 'campaign_deadlines',
        title: 'Deadlines & Reminders',
        description: 'Reminders about content submission deadlines',
        enabled: true
      },
      {
        id: 'campaign_updates',
        title: 'Campaign Updates',
        description: 'Changes or updates to your active campaigns',
        enabled: true
      }
    ]
  },
  {
    id: 'earnings',
    title: 'Earnings & Payments',
    description: 'Updates about your earnings and payments',
    icon: <DollarSign className="w-5 h-5 text-green-600" />,
    preferences: [
      {
        id: 'payment_received',
        title: 'Payment Received',
        description: 'When you receive payment for completed campaigns',
        enabled: true
      },
      {
        id: 'earnings_milestone',
        title: 'Earnings Milestones',
        description: 'When you reach significant earning milestones',
        enabled: true
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Insights',
    description: 'Analytics and performance notifications',
    icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
    preferences: [
      {
        id: 'viral_content',
        title: 'Viral Content Alerts',
        description: 'When your content performs exceptionally well',
        enabled: true
      },
      {
        id: 'weekly_insights',
        title: 'Weekly Performance Report',
        description: 'Weekly summary of your content performance',
        enabled: true
      }
    ]
  },
  {
    id: 'messages',
    title: 'Messages & Communication',
    description: 'Notifications about messages and updates',
    icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
    preferences: [
      {
        id: 'brand_messages',
        title: 'Brand Messages',
        description: 'When brands send you direct messages',
        enabled: true
      },
      {
        id: 'important_updates',
        title: 'Important Updates',
        description: 'Critical updates about your account or campaigns',
        enabled: true
      }
    ]
  }
]

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [categories, setCategories] = React.useState<NotificationCategory[]>([])

  // Load saved preferences on mount
  React.useEffect(() => {
    const savedPreferences = localStorage.getItem('notificationPreferences')
    if (savedPreferences) {
      try {
        setCategories(JSON.parse(savedPreferences))
      } catch (error) {
        console.error('Error loading preferences:', error)
        setCategories(DEFAULT_CATEGORIES)
      }
    } else {
      setCategories(DEFAULT_CATEGORIES)
    }
    setIsLoading(false)
  }, [])

  const togglePreference = (categoryId: string, preferenceId: string) => {
    setCategories(prev => {
      const newCategories = prev.map(category =>
        category.id === categoryId
          ? {
              ...category,
              preferences: category.preferences.map(pref =>
                pref.id === preferenceId
                  ? { ...pref, enabled: !pref.enabled }
                  : pref
              )
            }
          : category
      )
      
      // Save to localStorage
      localStorage.setItem('notificationPreferences', JSON.stringify(newCategories))
      return newCategories
    })

    // Show success toast
    toast.success('Preference updated')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="sticky top-0 z-10 bg-[#FFFBF7] border-b">
          <div className="container mx-auto max-w-md px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-md px-4 py-6">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[1, 2].map((j) => (
                    <div key={j} className="p-4 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFBF7] border-b">
        <div className="container mx-auto max-w-md px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-md px-4 py-6">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">{category.title}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {category.preferences.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-start justify-between p-4 bg-white rounded-lg border hover:border-[#FF5F1F] transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium text-gray-900">{pref.title}</h3>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={pref.enabled}
                        onChange={() => togglePreference(category.id, pref.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF5F1F]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5F1F]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 