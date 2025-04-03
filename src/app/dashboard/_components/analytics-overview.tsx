"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, DollarSign, Target } from "lucide-react"

const MOCK_ANALYTICS = {
  totalEarnings: 12500,
  activeCampaigns: 3,
  completedCampaigns: 12,
  engagementRate: 4.8,
  monthlyGrowth: 12.5,
  followers: 25000,
  totalViews: 1250000
}

export function AnalyticsOverview() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Performance Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${MOCK_ANALYTICS.totalEarnings.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{MOCK_ANALYTICS.monthlyGrowth}% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {MOCK_ANALYTICS.activeCampaigns}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {MOCK_ANALYTICS.completedCampaigns} completed
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {MOCK_ANALYTICS.followers.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {MOCK_ANALYTICS.totalViews.toLocaleString()} total views
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Engagement Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {MOCK_ANALYTICS.engagementRate}%
              </h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Above average for your niche
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Earnings Trend</h3>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Chart placeholder - Earnings trend over time
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Chart placeholder - Campaign performance metrics
          </div>
        </motion.div>
      </div>
    </section>
  )
} 