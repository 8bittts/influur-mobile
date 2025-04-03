"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "./_components/dashboard-header"
import { CampaignOpportunities } from "./_components/campaign-opportunities"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (!userData) {
      router.push("/auth/login")
      return
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="container mx-auto max-w-md">
        <DashboardHeader />
        
        <main className="px-4 py-6 space-y-6">
          {/* Campaign Opportunities */}
          <div>
            <CampaignOpportunities />
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <a 
              href="/marketplace" 
              className="block w-full py-3 px-4 text-center rounded-lg bg-[#FF5F1F] text-white hover:bg-[#FF5F1F]/90 transition-colors"
            >
              Browse Marketplace
            </a>
            <a 
              href="http://localhost:3006/my-campaigns" 
              className="block w-full py-3 px-4 text-center rounded-lg bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition-colors"
            >
              My Campaigns
            </a>
            <a 
              href="/strategy-builder" 
              className="block w-full py-3 px-4 text-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
              ✨ Build Your Strategy
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="/settings" 
                className="block py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Settings
              </a>
              <a 
                href="/settings/notifications" 
                className="block py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Notifications
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 