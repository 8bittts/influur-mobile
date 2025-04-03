"use client"

import * as React from "react"
import { useState } from "react"
import { ArrowLeft, Settings, Bell, User, CreditCard, Shield, HelpCircle, LogOut, TrendingUp, DollarSign, ChevronRight } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import CashoutModal from "../components/cashout-modal"
import ProfileImage from "@/components/profile-image"
import { useUser } from "@/lib/contexts/user-context"
import { Badges } from "@/components/badges"

// Mock earnings data
const EARNINGS_DATA = [
  { month: "Jan", earnings: 2500 },
  { month: "Feb", earnings: 3200 },
  { month: "Mar", earnings: 4100 },
  { month: "Apr", earnings: 3800 },
  { month: "May", earnings: 4500 },
  { month: "Jun", earnings: 5200 },
  { month: "Jul", earnings: 6100 },
  { month: "Aug", earnings: 7300 },
  { month: "Sep", earnings: 8200 },
  { month: "Oct", earnings: 9100 },
  { month: "Nov", earnings: 10500 },
  { month: "Dec", earnings: 12500 },
]

const EARNINGS_STATS = {
  totalEarnings: 77000,
  averagePerCampaign: 1850,
  campaignsCompleted: 42,
  growthRate: 28
}

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: '1',
    type: 'bank' as const,
    last4: '4321',
    name: 'Chase Business Account',
    isDefault: true
  },
  {
    id: '2',
    type: 'card' as const,
    last4: '5678',
    name: 'Business Debit Card',
    isDefault: false
  }
]

// Mock user stats for demonstration
const mockUserStats = {
  completedCampaigns: 12,
  perfectRatings: 6,
  daysActive: 400,
  totalEarnings: 1500,
  brandConnections: 25,
  avgResponseTime: 1.5,
  topPercentile: 8,
  startDate: "2023-01-15",
}

export default function SettingsPage() {
  const [isCashoutOpen, setIsCashoutOpen] = React.useState(false)
  const { name, role } = useUser()
  
  // Format the start date
  const startDate = new Date(mockUserStats.startDate)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(startDate)
  
  return (
    <>
      <div className="min-h-screen bg-[#FFFBF7]">
        {/* Header */}
        <div className="sticky top-0 bg-[#FFFBF7] border-b z-10">
          <div className="container mx-auto max-w-md px-3 py-3">
            <div className="flex justify-between items-center">
              <Link href="/dashboard" className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
              <div className="w-5" /> {/* Spacer for alignment */}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-md px-3 py-4 space-y-4">
          {/* User Profile Summary with Badges */}
          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-start gap-4">
              <ProfileImage size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <div className="text-xl font-medium text-gray-900">{name || "Set up your profile"}</div>
                    <div className="text-lg text-gray-500">{role}</div>
                    <div className="text-base text-gray-400">Start: {formattedDate}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badges userStats={mockUserStats} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Growth */}
          <div className="space-y-4">
            <h2 className="font-medium text-gray-900">Network Growth</h2>
            <div className="bg-white rounded-lg border p-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={EARNINGS_DATA}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                      tickFormatter={(value) => `${value}k`}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#FF5F1F" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-[#FF5F1F]">35k</div>
                  <div className="text-base text-gray-500">TikTok</div>
                  <div className="text-base text-green-600">+25% growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-[#FF5F1F]">20k</div>
                  <div className="text-base text-gray-500">Instagram</div>
                  <div className="text-base text-green-600">+15% growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-[#FF5F1F]">10k</div>
                  <div className="text-base text-gray-500">YouTube</div>
                  <div className="text-base text-green-600">+12% growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Generated Dossier */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-900">Creator Insights</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Generated by Influur AI</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 space-y-6">
              {/* Executive Summary */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Executive Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  High-performing creator with exceptional engagement rates across multiple platforms. 
                  Demonstrates particular strength in lifestyle and tech content, with viral potential 
                  in short-form video formats. Audience analysis indicates strong brand affinity and 
                  above-average conversion rates.
                </p>
              </div>

              {/* Key Strengths */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Strengths</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-lg text-orange-800 font-medium mb-1.5">Content Consistency</div>
                    <div className="text-base text-orange-600">Posts 4.2 times per week on average, maintaining high quality standards.</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-lg text-blue-800 font-medium mb-1.5">Audience Loyalty</div>
                    <div className="text-base text-blue-600">85% return viewer rate, indicating strong community engagement.</div>
                  </div>
                </div>
              </div>

              {/* Growth Opportunities */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Growth Opportunities</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <div className="shrink-0">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-lg text-purple-900 font-medium">Instagram Story Engagement</div>
                      <p className="text-base text-purple-700 mt-1.5">
                        Your story engagement is lower than your post engagement. Adding interactive elements 
                        like polls and questions could increase viewer participation by up to 40%.
                      </p>
                      <div className="text-sm text-purple-600 mt-2">Source: Platform Analytics, Q1 2024</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <div className="shrink-0">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg text-green-900 font-medium">Sustainable Fashion Campaign Fit</div>
                      <p className="text-base text-green-700 mt-1.5">
                        Your content and audience demographics align perfectly with sustainable fashion brands. 
                        This represents a significant opportunity for brand collaborations.
                      </p>
                      <div className="text-sm text-green-600 mt-2">Source: Influur Brand Match Analysis</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimization Tips */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Optimization Tips</h3>
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F1F]"></div>
                      <p className="text-base text-gray-700">Optimize YouTube thumbnails for 30% higher CTR</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F1F]"></div>
                      <p className="text-base text-gray-700">Post during peak hours (2PM - 6PM local time)</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#FF5F1F]"></div>
                      <p className="text-base text-gray-700">Increase video content length to 60-90 seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Account Settings */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h2 className="font-medium text-gray-900">Account Settings</h2>
              </div>
              <div className="divide-y">
                <Link href="/settings/profile" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Profile</div>
                      <div className="text-xs text-gray-500">Update your personal information</div>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </Link>
                
                <Link
                  href="/settings/notifications"
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Notifications</div>
                      <div className="text-xs text-gray-500">Manage your notification preferences</div>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </Link>

                <Link href="/settings/payment" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Payment Methods</div>
                      <div className="text-xs text-gray-500">Add or remove payment options</div>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h2 className="font-medium text-gray-900">Security</h2>
              </div>
              <div className="divide-y">
                <Link href="/settings/security" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Password & Security</div>
                      <div className="text-xs text-gray-500">Update your security settings</div>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h2 className="font-medium text-gray-900">Support</h2>
              <div className="space-y-2">
                <Link
                  href="/settings/help"
                  className="flex items-center justify-between p-4 bg-white rounded-lg border hover:border-[#FF5F1F] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Help Center</div>
                      <div className="text-sm text-gray-500">Get help with your account</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <CashoutModal
        isOpen={isCashoutOpen}
        onClose={() => setIsCashoutOpen(false)}
        availableBalance={77000}
        paymentMethods={mockPaymentMethods}
      />
    </>
  )
} 