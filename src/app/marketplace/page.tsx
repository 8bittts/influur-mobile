"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Users, CalendarDays, Globe, Sparkles, X, ChevronLeft } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Generate 50 mock opportunities
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook"]
const CATEGORIES = ["Fashion", "Tech", "Food", "Fitness", "Beauty", "Travel", "Gaming", "Lifestyle"]
const BRANDS = [
  "Nike", "Apple", "Samsung", "Adidas", "Starbucks", "Microsoft", "Sony", "Google",
  "Amazon", "Coca-Cola", "Pepsi", "Under Armour", "Reebok", "Puma", "H&M", "Zara"
]

function generateMockCampaigns(count: number) {
  const campaigns = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const payout = Math.floor(Math.random() * 4000) + 1000
    const participants = Math.floor(Math.random() * 20) + 5
    const daysLeft = Math.floor(Math.random() * 14) + 1
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)]
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)]
    const totalRevenue = payout * participants

    campaigns.push({
      id: `campaign-${i + 1}`,
      brand,
      title: `${category} ${platform} Campaign`,
      payout,
      deadline: `${daysLeft} days left`,
      participants,
      platform,
      category,
      description: `Create engaging content for ${brand}'s ${category.toLowerCase()} campaign on ${platform}. Share authentic experiences and connect with your audience.`,
      requirements: [
        `Minimum ${Math.floor(Math.random() * 90 + 10)}k followers`,
        `${category} focus`,
        "High engagement rate",
        platform + " creator"
      ],
      duration: `${Math.floor(Math.random() * 3) + 1} weeks`,
      stats: {
        totalRevenue,
        totalCreators: participants,
        growthData: [
          { date: "Week 1", creators: Math.floor(participants * 0.3), revenue: Math.floor(totalRevenue * 0.3) },
          { date: "Week 2", creators: Math.floor(participants * 0.7), revenue: Math.floor(totalRevenue * 0.6) },
          { date: "Week 3", creators: participants, revenue: totalRevenue }
        ]
      }
    })
  }

  return campaigns.sort((a, b) => b.payout - a.payout)
}

const ALL_CAMPAIGNS = generateMockCampaigns(50)

export default function MarketplacePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCampaign, setSelectedCampaign] = useState<(typeof ALL_CAMPAIGNS)[0] | null>(null)
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const pageSize = 10

  const filteredCampaigns = useMemo(() => {
    let filtered = [...ALL_CAMPAIGNS]
    
    if (filterPlatform !== "all") {
      filtered = filtered.filter(c => c.platform === filterPlatform)
    }
    if (filterCategory !== "all") {
      filtered = filtered.filter(c => c.category === filterCategory)
    }

    return filtered
  }, [filterPlatform, filterCategory])

  const paginatedCampaigns = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredCampaigns.slice(start, start + pageSize)
  }, [filteredCampaigns, currentPage])

  const totalPages = Math.ceil(filteredCampaigns.length / pageSize)

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="container mx-auto max-w-md px-4 py-6 space-y-4">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/dashboard" 
            className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">All Opportunities</h1>
            <p className="text-sm text-gray-500">Find the perfect campaigns for your audience</p>
          </div>
        </div>

        {/* Mobile-friendly filters */}
        <div className="flex gap-2">
          <Select value={filterPlatform} onValueChange={setFilterPlatform}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {PLATFORMS.map(platform => (
                <SelectItem key={platform} value={platform}>{platform}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {paginatedCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{campaign.brand}</h3>
                  <p className="text-sm text-gray-600">{campaign.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                      {campaign.platform}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#FF5F1F] font-medium text-lg">
                    ${campaign.payout}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
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

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Campaign Details Modal */}
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="sm:max-w-md max-h-[90vh] p-0 overflow-hidden">
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

                      {/* Campaign Stats */}
                      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4">
                        <h3 className="font-medium text-violet-900 mb-3">Campaign Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-semibold text-violet-700">
                              {selectedCampaign.stats.totalCreators}
                            </div>
                            <div className="text-xs text-violet-600">Total Creators</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-semibold text-violet-700">
                              ${selectedCampaign.stats.totalRevenue.toLocaleString()}
                            </div>
                            <div className="text-xs text-violet-600">Total Revenue</div>
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
      </div>
    </div>
  )
} 