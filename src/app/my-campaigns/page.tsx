"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Clock, Users, CheckCircle2, XCircle, AlertCircle, TrendingUp, DollarSign, LucideIcon, ArrowLeft, Settings } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"

type CampaignStatus = "pending_approval" | "completed" | "dropped" | "incomplete"

interface Campaign {
  id: string
  brand: string
  title: string
  payout: number
  status: CampaignStatus
  platform: string
  submittedAt?: string
  completedAt?: string
  droppedAt?: string
  endedAt?: string
  requirements?: string[]
  reason?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

// Mock data for campaigns
const MOCK_CAMPAIGNS: {
  pending: Campaign[]
  history: Campaign[]
} = {
  pending: [
    {
      id: "p1",
      brand: "Nike",
      title: "Summer Collection Launch",
      payout: 1500,
      status: "pending_approval",
      submittedAt: "2024-03-10",
      platform: "Instagram",
      requirements: ["Post 3 Stories", "1 Feed Post", "Link in Bio"]
    },
    {
      id: "p2",
      brand: "Apple",
      title: "Tech Review Series",
      payout: 2000,
      status: "pending_approval",
      submittedAt: "2024-03-12",
      platform: "YouTube",
      requirements: ["10-minute Review", "Product Showcase", "Link in Description"]
    }
  ],
  history: [
    {
      id: "h1",
      brand: "Adidas",
      title: "Fitness Challenge",
      payout: 1200,
      status: "completed",
      completedAt: "2024-02-28",
      platform: "Instagram & TikTok",
      engagement: {
        likes: 15000,
        comments: 800,
        shares: 300
      }
    },
    {
      id: "h2",
      brand: "Samsung",
      title: "Mobile Photography",
      payout: 1800,
      status: "dropped",
      droppedAt: "2024-02-15",
      reason: "Schedule conflict",
      platform: "Instagram"
    },
    {
      id: "h3",
      brand: "Starbucks",
      title: "Morning Routine",
      payout: 800,
      status: "incomplete",
      endedAt: "2024-01-30",
      reason: "Did not meet engagement requirements",
      platform: "TikTok"
    },
    {
      id: "h4",
      brand: "Under Armour",
      title: "Training Series",
      payout: 2500,
      status: "completed",
      completedAt: "2024-01-15",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 25000,
        comments: 1200,
        shares: 500
      }
    },
    {
      id: "h5",
      brand: "Spotify",
      title: "Playlist Curation",
      payout: 1000,
      status: "completed",
      completedAt: "2024-02-20",
      platform: "Instagram",
      engagement: {
        likes: 12000,
        comments: 600,
        shares: 200
      }
    },
    {
      id: "h6",
      brand: "Lululemon",
      title: "Yoga Series",
      payout: 1500,
      status: "completed",
      completedAt: "2024-02-10",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 18000,
        comments: 900,
        shares: 400
      }
    },
    {
      id: "h7",
      brand: "Canon",
      title: "Photography Tips",
      payout: 2000,
      status: "dropped",
      droppedAt: "2024-02-05",
      reason: "Creative differences",
      platform: "Instagram"
    },
    {
      id: "h8",
      brand: "HelloFresh",
      title: "Cooking Series",
      payout: 1700,
      status: "completed",
      completedAt: "2024-01-25",
      platform: "TikTok & Instagram",
      engagement: {
        likes: 22000,
        comments: 1100,
        shares: 800
      }
    },
    {
      id: "h9",
      brand: "Fitbit",
      title: "Fitness Journey",
      payout: 1300,
      status: "incomplete",
      endedAt: "2024-01-20",
      reason: "Technical issues",
      platform: "Instagram"
    },
    {
      id: "h10",
      brand: "Sephora",
      title: "Beauty Tutorial",
      payout: 1600,
      status: "completed",
      completedAt: "2024-01-10",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 19000,
        comments: 950,
        shares: 600
      }
    },
    {
      id: "h11",
      brand: "Nintendo",
      title: "Gaming Stream",
      payout: 2200,
      status: "completed",
      completedAt: "2024-01-05",
      platform: "Twitch & YouTube",
      engagement: {
        likes: 28000,
        comments: 1500,
        shares: 900
      }
    },
    {
      id: "h12",
      brand: "Peloton",
      title: "Home Workout",
      payout: 1900,
      status: "completed",
      completedAt: "2023-12-28",
      platform: "Instagram",
      engagement: {
        likes: 21000,
        comments: 1000,
        shares: 700
      }
    },
    {
      id: "h13",
      brand: "GoPro",
      title: "Adventure Series",
      payout: 2800,
      status: "dropped",
      droppedAt: "2023-12-20",
      reason: "Weather conditions",
      platform: "YouTube"
    },
    {
      id: "h14",
      brand: "Whole Foods",
      title: "Healthy Eating",
      payout: 1400,
      status: "completed",
      completedAt: "2023-12-15",
      platform: "Instagram & TikTok",
      engagement: {
        likes: 16000,
        comments: 750,
        shares: 400
      }
    },
    {
      id: "h15",
      brand: "Adobe",
      title: "Creative Workshop",
      payout: 2100,
      status: "completed",
      completedAt: "2023-12-10",
      platform: "YouTube",
      engagement: {
        likes: 24000,
        comments: 1300,
        shares: 800
      }
    },
    {
      id: "h16",
      brand: "DJI",
      title: "Drone Photography",
      payout: 2400,
      status: "incomplete",
      endedAt: "2023-12-05",
      reason: "Equipment malfunction",
      platform: "Instagram"
    },
    {
      id: "h17",
      brand: "Audible",
      title: "Book Review",
      payout: 1100,
      status: "completed",
      completedAt: "2023-11-28",
      platform: "Instagram",
      engagement: {
        likes: 14000,
        comments: 650,
        shares: 300
      }
    },
    {
      id: "h18",
      brand: "Reebok",
      title: "CrossFit Series",
      payout: 1700,
      status: "completed",
      completedAt: "2023-11-20",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 20000,
        comments: 950,
        shares: 600
      }
    },
    {
      id: "h19",
      brand: "Philips Hue",
      title: "Home Lighting",
      payout: 1300,
      status: "dropped",
      droppedAt: "2023-11-15",
      reason: "Budget constraints",
      platform: "Instagram"
    },
    {
      id: "h20",
      brand: "Blue Apron",
      title: "Recipe Challenge",
      payout: 1600,
      status: "completed",
      completedAt: "2023-11-10",
      platform: "TikTok",
      engagement: {
        likes: 17000,
        comments: 800,
        shares: 500
      }
    },
    {
      id: "h21",
      brand: "Bose",
      title: "Music Series",
      payout: 2000,
      status: "completed",
      completedAt: "2023-11-05",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 23000,
        comments: 1100,
        shares: 700
      }
    },
    {
      id: "h22",
      brand: "Patagonia",
      title: "Outdoor Adventure",
      payout: 2600,
      status: "completed",
      completedAt: "2023-10-28",
      platform: "Instagram",
      engagement: {
        likes: 26000,
        comments: 1400,
        shares: 900
      }
    },
    {
      id: "h23",
      brand: "Microsoft",
      title: "Tech Tips",
      payout: 2300,
      status: "incomplete",
      endedAt: "2023-10-20",
      reason: "Missed deadlines",
      platform: "YouTube"
    },
    {
      id: "h24",
      brand: "Dyson",
      title: "Home Tech",
      payout: 1800,
      status: "completed",
      completedAt: "2023-10-15",
      platform: "Instagram",
      engagement: {
        likes: 19000,
        comments: 900,
        shares: 500
      }
    },
    {
      id: "h25",
      brand: "Glossier",
      title: "Skincare Routine",
      payout: 1400,
      status: "completed",
      completedAt: "2023-10-10",
      platform: "Instagram & TikTok",
      engagement: {
        likes: 21000,
        comments: 1000,
        shares: 600
      }
    },
    {
      id: "h26",
      brand: "REI",
      title: "Camping Guide",
      payout: 2100,
      status: "dropped",
      droppedAt: "2023-10-05",
      reason: "Location issues",
      platform: "YouTube"
    },
    {
      id: "h27",
      brand: "Vitamix",
      title: "Smoothie Series",
      payout: 1200,
      status: "completed",
      completedAt: "2023-09-28",
      platform: "Instagram",
      engagement: {
        likes: 15000,
        comments: 700,
        shares: 400
      }
    },
    {
      id: "h28",
      brand: "Zwift",
      title: "Indoor Cycling",
      payout: 1700,
      status: "completed",
      completedAt: "2023-09-20",
      platform: "YouTube",
      engagement: {
        likes: 18000,
        comments: 850,
        shares: 500
      }
    },
    {
      id: "h29",
      brand: "Headspace",
      title: "Meditation Guide",
      payout: 1500,
      status: "incomplete",
      endedAt: "2023-09-15",
      reason: "Content quality issues",
      platform: "Instagram"
    },
    {
      id: "h30",
      brand: "Theragun",
      title: "Recovery Tips",
      payout: 1900,
      status: "completed",
      completedAt: "2023-09-10",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 22000,
        comments: 1050,
        shares: 700
      }
    }
  ]
}

// Mock earnings data
const EARNINGS_DATA = [
  { month: "Sep", earnings: 800 },
  { month: "Oct", earnings: 1500 },
  { month: "Nov", earnings: 2200 },
  { month: "Dec", earnings: 1800 },
  { month: "Jan", earnings: 3300 },
  { month: "Feb", earnings: 4200 },
  { month: "Mar", earnings: 3800 }
]

const TOTAL_EARNINGS = EARNINGS_DATA.reduce((sum, month) => sum + month.earnings, 0)

interface StatusStyle {
  color: string
  bg: string
  icon: LucideIcon
  label: string
}

const STATUS_STYLES: Record<CampaignStatus, StatusStyle> = {
  pending_approval: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: AlertCircle,
    label: "Pending Approval"
  },
  completed: {
    color: "text-green-600",
    bg: "bg-green-50",
    icon: CheckCircle2,
    label: "Completed"
  },
  dropped: {
    color: "text-red-600",
    bg: "bg-red-50",
    icon: XCircle,
    label: "Dropped"
  },
  incomplete: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: AlertCircle,
    label: "Incomplete"
  }
}

// Update the growth data to include earnings
const CAMPAIGN_GROWTH_DATA = [
  { day: "Day 1", engagement: 1310, earnings: 150 },
  { day: "Day 2", engagement: 2735, earnings: 320 },
  { day: "Day 3", engagement: 5170, earnings: 580 },
  { day: "Day 4", engagement: 9100, earnings: 890 },
  { day: "Day 5", engagement: 12970, earnings: 1200 },
  { day: "Day 6", engagement: 14620, earnings: 1350 },
  { day: "Day 7", engagement: 16100, earnings: 1500 },
]

export default function MyCampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  const totalPages = Math.ceil(MOCK_CAMPAIGNS.history.length / itemsPerPage)
  const paginatedHistory = MOCK_CAMPAIGNS.history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleShareToTwitter = (campaign: Campaign) => {
    const timestamp = new Date().toISOString()
    const utmParams = new URLSearchParams({
      utm_source: 'creator_share',
      utm_medium: 'twitter',
      utm_campaign: `${campaign.brand.toLowerCase()}_success`,
      utm_content: timestamp,
      ref: `cr_${campaign.id}`
    }).toString()

    const tweetText = `🚀 Just earned $${campaign.payout} with @influur!\n\nExcited to share my ${campaign.brand} campaign success - being an influencer has never been easier!\n\nStart your journey at influur.com?${utmParams} 💫\n\n#InfluurCreator #ContentCreator #${campaign.brand.replace(/\s+/g, '')}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
  }

  const handleDownloadImage = async (campaign: Campaign) => {
    try {
      const response = await fetch(`/api/campaign-share-image?brand=${encodeURIComponent(campaign.brand)}&payout=${campaign.payout}&likes=${campaign.engagement?.likes}&comments=${campaign.engagement?.comments}&shares=${campaign.engagement?.shares}`)
      
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${campaign.brand.toLowerCase()}-campaign-success.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
      // You might want to show a toast notification here
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="sticky top-0 bg-[#FFFBF7] border-b z-10">
        <div className="container mx-auto max-w-md px-3 py-3">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">My Campaigns</h1>
            <Link href="/settings" className="p-1 -mr-1 hover:bg-black/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-3 py-4 space-y-4">
        {/* Total Earnings Chart */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Total Earnings</h2>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EARNINGS_DATA}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`$${value}`, 'Earnings']}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#FF5F1F"
                  strokeWidth={2}
                  dot={{ fill: '#FF5F1F', strokeWidth: 2, r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Campaigns Button */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur-sm opacity-30 animate-pulse scale-[0.99]"></div>
          <Link
            href="/active-campaigns"
            className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex justify-center items-center"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">Active Campaigns</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
          </Link>
        </div>

        {/* Active Campaigns Section */}
        <div id="active-campaigns">
          {/* Pending Campaigns */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">Pending Approval</h2>
              <div className="animate-pulse w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <div className="space-y-2">
              {MOCK_CAMPAIGNS.pending.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50/50 border-2 border-blue-200 rounded-lg p-3 cursor-pointer hover:border-[#FF5F1F] transition-colors"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{campaign.brand}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{campaign.title}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600">
                          {campaign.platform}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-0.5" />
                          Awaiting Review
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[#FF5F1F] font-medium">
                        ${campaign.payout}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Submitted {new Date(campaign.submittedAt!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    <h4 className="font-medium text-gray-700">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-0.5">
                      {campaign.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Campaign History */}
          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-900">Campaign History</h2>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
            <div className="space-y-3">
              {paginatedHistory.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border p-3 cursor-pointer hover:border-[#FF5F1F] transition-colors"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{campaign.brand}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{campaign.title}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600">
                          {campaign.platform}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 ${STATUS_STYLES[campaign.status].bg} ${STATUS_STYLES[campaign.status].color} rounded-full flex items-center`}>
                          {React.createElement(STATUS_STYLES[campaign.status].icon, { className: "w-3 h-3 mr-0.5" })}
                          {STATUS_STYLES[campaign.status].label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[#FF5F1F] font-medium">
                        ${campaign.payout}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {campaign.completedAt && `Completed ${new Date(campaign.completedAt).toLocaleDateString()}`}
                        {campaign.droppedAt && `Dropped ${new Date(campaign.droppedAt).toLocaleDateString()}`}
                        {campaign.endedAt && `Ended ${new Date(campaign.endedAt).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>

                  {campaign.status === "completed" && campaign.engagement && (
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-gray-900">{campaign.engagement.likes.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">Likes</div>
                      </div>
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-gray-900">{campaign.engagement.comments.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">Comments</div>
                      </div>
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-medium text-gray-900">{campaign.engagement.shares.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">Shares</div>
                      </div>
                    </div>
                  )}

                  {(campaign.status === "dropped" || campaign.status === "incomplete") && campaign.reason && (
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-medium text-gray-700">Reason: </span>
                      {campaign.reason}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm font-medium rounded-lg ${
                      currentPage === page
                        ? "bg-[#FF5F1F] text-white"
                        : "text-gray-700 bg-white border hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-md p-0 gap-0">
          <div className="sticky top-0 bg-white border-b">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">
                {selectedCampaign?.brand}
              </h3>
              <div className="flex items-baseline gap-2">
                <p className="text-sm text-gray-600">{selectedCampaign?.title}</p>
                <div className="text-[#FF5F1F] font-medium">
                  ${selectedCampaign?.payout}
                </div>
              </div>
            </div>

            {selectedCampaign?.status === "completed" && (
              <>
                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => handleShareToTwitter(selectedCampaign)}
                    className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Share Success
                  </button>
                  <button
                    onClick={() => selectedCampaign && handleDownloadImage(selectedCampaign)}
                    className="flex-1 bg-[#FF5F1F] hover:bg-[#ff4c00] text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Image
                  </button>
                </div>
                <div className="px-4 pb-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-3 flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Get $1 Added to Your Wallet! 🎉</div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Share your success on social media and we'll automatically add $1 to your creator wallet as a thank you!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-4">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CAMPAIGN_GROWTH_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    yAxisId="left"
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value, name) => [
                      name === 'earnings' ? `$${value}` : value.toLocaleString(),
                      name === 'earnings' ? 'Earnings' : 'Engagement'
                    ]}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="earnings"
                    name="Earnings"
                    stroke="#FF5F1F"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Total Engagement</div>
                <div className="text-lg font-medium text-[#3B82F6]">16.1K</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +156% Growth
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Campaign Earnings</div>
                <div className="text-lg font-medium text-[#FF5F1F]">$1,500</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +900% vs Last
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 