"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Users, CalendarDays, Globe, Sparkles, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import Link from "next/link"

interface Campaign {
  id: string
  brand: string
  title: string
  payout: number
  deadline: string
  participants: number
  description: string
  requirements: string[]
  platform: string
  duration: string
  stats: {
    totalRevenue: number
    totalCreators: number
    growthData: {
      date: string
      creators: number
      revenue: number
    }[]
  }
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    brand: "Nike",
    title: "Summer Collection Launch",
    payout: 1500,
    deadline: "3 days left",
    participants: 12,
    description: "Create authentic content showcasing Nike's new summer collection in your unique style. Focus on lifestyle integration and athletic performance.",
    requirements: [
      "Minimum 10k followers",
      "Sports or lifestyle focus",
      "High engagement rate",
      "Previous brand collaborations"
    ],
    platform: "Instagram & TikTok",
    duration: "2 weeks",
    stats: {
      totalRevenue: 18500,
      totalCreators: 12,
      growthData: [
        { date: "Week 1", creators: 3, revenue: 4500 },
        { date: "Week 2", creators: 8, revenue: 9000 },
        { date: "Week 3", creators: 12, revenue: 18500 }
      ]
    }
  },
  {
    id: "2",
    brand: "Apple",
    title: "Tech Review Series",
    payout: 2000,
    deadline: "5 days left",
    participants: 8,
    description: "Share your honest experience with Apple's latest products. Focus on unique features and real-world usage scenarios.",
    requirements: [
      "Tech-focused content",
      "High production quality",
      "Minimum 20k followers",
      "Previous tech reviews"
    ],
    platform: "YouTube & Instagram",
    duration: "3 weeks",
    stats: {
      totalRevenue: 24000,
      totalCreators: 8,
      growthData: [
        { date: "Week 1", creators: 2, revenue: 6000 },
        { date: "Week 2", creators: 6, revenue: 15000 },
        { date: "Week 3", creators: 8, revenue: 24000 }
      ]
    }
  },
  {
    id: "3",
    brand: "Starbucks",
    title: "Morning Routine",
    payout: 800,
    deadline: "2 days left",
    participants: 15,
    description: "Create content featuring Starbucks as part of your morning routine. Highlight new seasonal beverages and food items.",
    requirements: [
      "Lifestyle content creator",
      "Food & beverage experience",
      "5k+ followers",
      "US-based"
    ],
    platform: "Instagram",
    duration: "1 week",
    stats: {
      totalRevenue: 10000,
      totalCreators: 15,
      growthData: [
        { date: "Week 1", creators: 5, revenue: 2000 },
        { date: "Week 2", creators: 12, revenue: 7000 },
        { date: "Week 3", creators: 15, revenue: 10000 }
      ]
    }
  },
  {
    id: "4",
    brand: "Adidas",
    title: "Fitness Challenge",
    payout: 1200,
    deadline: "4 days left",
    participants: 10,
    description: "Lead a fitness challenge using Adidas workout gear. Create motivational content and engage with your community.",
    requirements: [
      "Fitness influencer",
      "Certified trainer preferred",
      "15k+ followers",
      "High engagement"
    ],
    platform: "Instagram & TikTok",
    duration: "4 weeks",
    stats: {
      totalRevenue: 16000,
      totalCreators: 10,
      growthData: [
        { date: "Week 1", creators: 3, revenue: 4000 },
        { date: "Week 2", creators: 8, revenue: 12000 },
        { date: "Week 3", creators: 10, revenue: 16000 }
      ]
    }
  },
  {
    id: "5",
    brand: "Samsung",
    title: "Mobile Photography",
    payout: 1800,
    deadline: "6 days left",
    participants: 6,
    description: "Showcase the photography capabilities of the new Samsung phone. Focus on creative techniques and unique perspectives.",
    requirements: [
      "Photography focus",
      "Creative portfolio",
      "8k+ followers",
      "Previous tech content"
    ],
    platform: "Instagram",
    duration: "2 weeks",
    stats: {
      totalRevenue: 22000,
      totalCreators: 6,
      growthData: [
        { date: "Week 1", creators: 2, revenue: 5000 },
        { date: "Week 2", creators: 5, revenue: 14000 },
        { date: "Week 3", creators: 6, revenue: 22000 }
      ]
    }
  }
]

export function CampaignOpportunities() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Best Opportunities</h2>
          <p className="text-sm text-gray-500 mt-1">Curated by Influur AI</p>
        </div>
        <Link 
          href="/marketplace" 
          className="px-4 py-2 border border-gray-200 rounded-lg text-[#FF5F1F] font-medium hover:bg-orange-50 transition-all"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {MOCK_CAMPAIGNS.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            onClick={() => setSelectedCampaign(campaign)}
            className="bg-white rounded-xl border p-3 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{campaign.brand}</h3>
                <p className="text-sm text-gray-600">{campaign.title}</p>
              </div>
              <div className="text-[#FF5F1F] font-medium text-lg">
                ${campaign.payout}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {campaign.deadline}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {campaign.participants} creators
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-md p-0">
          <AnimatePresence>
            {selectedCampaign && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {/* Fixed Header */}
                <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedCampaign.brand}</h2>
                      <p className="text-gray-600">{selectedCampaign.title}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="px-6 py-6 max-h-[calc(85vh-80px)] overflow-y-auto">
                  <div className="space-y-6">
                    {/* Campaign Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-3 text-blue-700">
                        <div className="text-lg font-semibold">${selectedCampaign.payout}</div>
                        <div className="text-xs">Campaign Budget</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-3 text-purple-700">
                        <div className="text-lg font-semibold">{selectedCampaign.duration}</div>
                        <div className="text-xs">Campaign Duration</div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
                      <h3 className="font-medium text-orange-900 mb-2">Campaign Details</h3>
                      <p className="text-sm text-orange-800">{selectedCampaign.description}</p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Why This Vibe Fits You</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCampaign.requirements.map((req, i) => (
                          <div 
                            key={i}
                            className="flex items-center bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-1.5 rounded-full text-sm text-indigo-700"
                          >
                            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Graph */}
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-3">
                      <h3 className="font-medium text-violet-900 text-center mb-3">Campaign Performance</h3>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-violet-700">
                            {selectedCampaign.stats.totalCreators}
                          </div>
                          <div className="text-xs text-violet-600">Creators</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-violet-700">
                            ${selectedCampaign.stats.totalRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-violet-600">Revenue</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-2">
                        <div className="h-[160px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={selectedCampaign.stats.growthData}
                              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f4" />
                              <XAxis 
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                dy={5}
                              />
                              <YAxis 
                                yAxisId="left"
                                orientation="left"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                domain={[0, 'dataMax + 2']}
                              />
                              <YAxis 
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#6b7280', fontSize: 11 }}
                                tickFormatter={(value) => `$${value}`}
                                domain={[0, 'dataMax + 2000']}
                              />
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  padding: '6px 8px'
                                }}
                                itemStyle={{ fontSize: 11 }}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#FF5F1F"
                                strokeWidth={2}
                                dot={{ fill: '#FF5F1F', strokeWidth: 2, r: 3 }}
                              />
                              <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="creators"
                                stroke="#6366F1"
                                strokeWidth={2}
                                dot={{ fill: '#6366F1', strokeWidth: 2, r: 3 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="flex justify-center gap-3 mt-2">
                        <div className="flex items-center text-[11px] text-indigo-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1"></div>
                          Creators
                        </div>
                        <div className="flex items-center text-[11px] text-[#FF5F1F]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F1F] mr-1"></div>
                          Revenue
                        </div>
                      </div>
                    </div>

                    {/* Sign Up Button */}
                    <Link 
                      href="/my-campaigns" 
                      className="block w-full py-3.5 bg-gradient-to-r from-[#FF5F1F] to-[#FF8F1F] text-white rounded-xl font-medium hover:from-[#FF5F1F]/90 hover:to-[#FF8F1F]/90 transition-colors shadow-sm text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
} 