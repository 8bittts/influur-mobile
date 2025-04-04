"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Clock, Users, CheckCircle2, XCircle, AlertCircle, TrendingUp, DollarSign, LucideIcon, ArrowLeft, Settings } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Link from "next/link"

/**
 * Campaign status type representing the current state of a campaign
 */
type CampaignStatus = "pending_approval" | "completed" | "dropped" | "incomplete"

/**
 * Campaign interface representing a creator's campaign
 */
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

/**
 * Mock campaign data for demonstration purposes
 * @type {{ pending: Campaign[], history: Campaign[] }}
 */
const MOCK_CAMPAIGNS: {
  pending: Campaign[]
  history: Campaign[]
} = {
  pending: [
    {
      id: "p1",
      brand: "Sony Music",
      title: "New Artist Spotlight Series",
      payout: 2500,
      status: "pending_approval",
      submittedAt: "2024-03-10",
      platform: "Instagram & TikTok",
      requirements: ["3 Behind-the-scenes Posts", "1 Live Performance", "Artist Interview"]
    },
    {
      id: "p2",
      brand: "Warner Music",
      title: "Album Release Campaign",
      payout: 3000,
      status: "pending_approval",
      submittedAt: "2024-03-12",
      platform: "YouTube & Instagram",
      requirements: ["Album Review", "Track Preview", "Artist Q&A"]
    }
  ],
  history: [
    {
      id: "h1",
      brand: "Universal Music",
      title: "Festival Coverage",
      payout: 2000,
      status: "completed",
      completedAt: "2024-02-28",
      platform: "Instagram & TikTok",
      engagement: {
        likes: 25000,
        comments: 1200,
        shares: 800
      }
    },
    {
      id: "h2",
      brand: "Spotify",
      title: "Playlist Curation",
      payout: 1800,
      status: "dropped",
      droppedAt: "2024-02-15",
      reason: "Schedule conflict",
      platform: "Spotify & Instagram"
    },
    {
      id: "h3",
      brand: "Apple Music",
      title: "Artist Takeover",
      payout: 2200,
      status: "incomplete",
      endedAt: "2024-01-30",
      reason: "Did not meet engagement requirements",
      platform: "Apple Music & Instagram"
    },
    {
      id: "h4",
      brand: "Atlantic Records",
      title: "New Release Promotion",
      payout: 2800,
      status: "completed",
      completedAt: "2024-01-15",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 35000,
        comments: 1800,
        shares: 1200
      }
    },
    {
      id: "h5",
      brand: "Interscope",
      title: "Artist Discovery",
      payout: 2000,
      status: "completed",
      completedAt: "2024-02-20",
      platform: "Instagram & TikTok",
      engagement: {
        likes: 28000,
        comments: 1400,
        shares: 900
      }
    },
    {
      id: "h6",
      brand: "Def Jam",
      title: "Hip-Hop Series",
      payout: 2500,
      status: "completed",
      completedAt: "2024-02-10",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 32000,
        comments: 1600,
        shares: 1100
      }
    },
    {
      id: "h7",
      brand: "Columbia Records",
      title: "Live Session",
      payout: 3000,
      status: "dropped",
      droppedAt: "2024-02-05",
      reason: "Creative differences",
      platform: "YouTube"
    },
    {
      id: "h8",
      brand: "RCA Records",
      title: "Artist Interview",
      payout: 2200,
      status: "completed",
      completedAt: "2024-01-25",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 26000,
        comments: 1300,
        shares: 900
      }
    },
    {
      id: "h9",
      brand: "EMI",
      title: "Classical Series",
      payout: 1800,
      status: "incomplete",
      endedAt: "2024-01-20",
      reason: "Technical issues",
      platform: "YouTube"
    },
    {
      id: "h10",
      brand: "BMG",
      title: "Music Review",
      payout: 2000,
      status: "completed",
      completedAt: "2024-01-10",
      platform: "Instagram & YouTube",
      engagement: {
        likes: 29000,
        comments: 1500,
        shares: 1000
      }
    }
  ]
}

/**
 * Mock earnings data for demonstration purposes
 * @type {Array<{month: string, earnings: number}>}
 */
const EARNINGS_DATA = [
  { month: "Sep", earnings: 2800 },
  { month: "Oct", earnings: 3500 },
  { month: "Nov", earnings: 4200 },
  { month: "Dec", earnings: 3800 },
  { month: "Jan", earnings: 5300 },
  { month: "Feb", earnings: 6200 },
  { month: "Mar", earnings: 5800 }
]

/**
 * Total earnings calculated from earnings data
 * @type {number}
 */
const TOTAL_EARNINGS = EARNINGS_DATA.reduce((sum, month) => sum + month.earnings, 0)

/**
 * Status style interface for campaign status visualization
 */
interface StatusStyle {
  color: string
  bg: string
  icon: LucideIcon
  label: string
}

/**
 * Status styles mapping for different campaign statuses
 * @type {Record<CampaignStatus, StatusStyle>}
 */
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

/**
 * Campaign growth data for visualization
 * @type {Array<{day: string, engagement: number, earnings: number}>}
 */
const CAMPAIGN_GROWTH_DATA = [
  { day: "Day 1", engagement: 2310, earnings: 350 },
  { day: "Day 2", engagement: 4735, earnings: 720 },
  { day: "Day 3", engagement: 8170, earnings: 1280 },
  { day: "Day 4", engagement: 12100, earnings: 1890 },
  { day: "Day 5", engagement: 15970, earnings: 2200 },
  { day: "Day 6", engagement: 18620, earnings: 2350 },
  { day: "Day 7", engagement: 20100, earnings: 2500 },
]

/**
 * MyCampaignsPage component displays a creator's active and historical campaigns,
 * including campaign details, status, engagement metrics, and earnings data.
 * 
 * @component
 * @returns {JSX.Element} Rendered my campaigns page
 */
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