"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, Sparkles, History, LineChart, AlertCircle, BookOpen, TrendingUp, Users, DollarSign, X, Calendar, Target, Star, Folder } from "lucide-react"
import Link from "next/link"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  charts?: {
    type: "line" | "bar" | "area"
    title: string
    description: string
    data: any[]
  }[]
}

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
  messages: Message[]
}

// Add new interface for campaign details
interface Campaign {
  id: string
  title: string
  description: string
  icon: typeof TrendingUp
  iconColor: string
  gradientFrom: string
  gradientTo: string
  category: string
  categoryColor: string
  match: number
  priceRange: string
  status: string
  details: {
    duration: string
    startDate: string
    requirements: string[]
    deliverables: string[]
    benefits: string[]
  }
}

// Add campaign data
const campaigns: Campaign[] = [
  {
    id: "cosmic-climber",
    title: "Cosmic Climber Challenge",
    description: "30-day zodiac-aligned climbing program with daily horoscope guidance",
    icon: TrendingUp,
    iconColor: "text-indigo-600",
    gradientFrom: "from-indigo-50",
    gradientTo: "to-purple-50",
    category: "Featured",
    categoryColor: "text-indigo-700",
    match: 98,
    priceRange: "$3,000-5,000",
    status: "Active",
    details: {
      duration: "30 days",
      startDate: "May 1, 2024",
      requirements: [
        "Active climbing certification",
        "Minimum 5k followers",
        "Experience creating fitness content",
        "Interest in astrology"
      ],
      deliverables: [
        "12 Instagram posts",
        "4 YouTube videos",
        "Daily Stories",
        "Weekly live sessions"
      ],
      benefits: [
        "Professional astrologist consultation",
        "Premium climbing gear package",
        "Featured creator spotlight",
        "Performance-based bonuses"
      ]
    }
  },
  {
    id: "full-moon-boulder",
    title: "Full Moon Boulder Series",
    description: "Monthly moonlight climbing events with astrological readings",
    icon: Users,
    iconColor: "text-purple-600",
    gradientFrom: "from-purple-50",
    gradientTo: "to-pink-50",
    category: "Community",
    categoryColor: "text-purple-700",
    match: 95,
    priceRange: "$2,500-4,000",
    status: "Active",
    details: {
      duration: "3 months",
      startDate: "June 15, 2024",
      requirements: [
        "Boulder grade V4 or higher",
        "Community management experience",
        "Available for evening events",
        "Astrology knowledge"
      ],
      deliverables: [
        "Monthly event hosting",
        "Event documentation",
        "Community engagement",
        "Social media coverage"
      ],
      benefits: [
        "Event planning support",
        "Custom climbing gear",
        "Networking opportunities",
        "Revenue sharing"
      ]
    }
  },
  {
    id: "zodiac-gear",
    title: "Zodiac Gear Review Series",
    description: "Element-based climbing equipment reviews and recommendations",
    icon: DollarSign,
    iconColor: "text-blue-600",
    gradientFrom: "from-blue-50",
    gradientTo: "to-indigo-50",
    category: "Review",
    categoryColor: "text-blue-700",
    match: 92,
    priceRange: "$1,800-3,000",
    status: "Active",
    details: {
      duration: "2 months",
      startDate: "May 15, 2024",
      requirements: [
        "Technical climbing expertise",
        "Review writing experience",
        "Photography skills",
        "Equipment knowledge"
      ],
      deliverables: [
        "8 detailed reviews",
        "Product photography",
        "Comparison videos",
        "Performance tests"
      ],
      benefits: [
        "Free gear to review",
        "Industry connections",
        "Expert consultations",
        "Affiliate opportunities"
      ]
    }
  }
]

// Sample chart data generator
function generateSampleChartData(type: string) {
  switch (type) {
    case "engagement":
      return Array.from({ length: 6 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        engagement: Math.floor(Math.random() * 50000) + 10000,
        growth: Math.floor(Math.random() * 30) + 10
      }))
    case "revenue":
      return Array.from({ length: 6 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
        revenue: Math.floor(Math.random() * 50000) + 10000,
        creators: Math.floor(Math.random() * 100) + 50
      }))
    default:
      return []
  }
}

export default function StrategyBuilderPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load chat histories from localStorage
    const savedHistories = localStorage.getItem("chatHistories")
    if (savedHistories) {
      setChatHistories(JSON.parse(savedHistories).map((h: any) => ({
        ...h,
        timestamp: new Date(h.timestamp)
      })))
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setError(null)
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API response for now since the API is not working
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const sampleResponse = `# Music Campaign Strategy: ${input}

## 🎵 Action Plan

### 1. Music Integration Strategy
- **Platform Selection**: Choose platforms where your music resonates best
- **Content Format**: Align music with platform-specific content types
- **Timing**: Schedule posts during peak engagement hours
- **Action Items**:
  - Create platform-specific music snippets (15s, 30s, 60s)
  - Prepare visual accompaniments for each snippet
  - Schedule content for optimal posting times

### 2. Campaign Execution Steps

#### 🎧 Content Creation
1. **Music Preparation**
   - Edit track for platform requirements
   - Create multiple snippet versions
   - Add visual watermarks/branding

2. **Visual Elements**
   - Design cohesive visual theme
   - Create platform-specific templates
   - Prepare thumbnail variations

3. **Engagement Plan**
   - Set up response templates
   - Plan live interaction sessions
   - Schedule community engagement times

### 3. Platform-Specific Actions

#### 📱 TikTok
- Create 3 different sound clip versions
- Test various video transitions
- Use trending effects that match your music
- Engage with similar content creators

#### 📸 Instagram
- Share behind-the-scenes content
- Post Reels with music snippets
- Use Stories for teasers
- Highlight fan reactions

#### 🎥 YouTube
- Upload full music video
- Create Shorts from key moments
- Share making-of content
- Engage with comments actively

### 4. Community Building

#### Immediate Actions
1. Respond to comments within 2 hours
2. Share user-generated content daily
3. Host weekly live sessions
4. Create exclusive content for loyal followers

#### Weekly Tasks
- Monitor trending sounds
- Update playlist placements
- Review analytics
- Adjust strategy based on performance

### 5. Performance Tracking

#### Key Metrics to Monitor
- Sound usage in creator videos
- Engagement rate per post
- Follower growth rate
- Click-through to full track

#### Action Items
1. Set up daily metric tracking
2. Review weekly performance
3. Adjust content based on data
4. Document successful formats

## 📊 Expected Outcomes

### Short-term Goals (2 Weeks)
- Initial sound adoption rate
- Base engagement metrics
- Early user feedback
- Platform-specific performance

### Long-term Goals (2 Months)
- Sustained usage growth
- Community engagement levels
- Brand collaboration opportunities
- Cross-platform presence

## 🎯 Next Steps

1. **Today**
   - Prepare music snippets
   - Set up tracking tools
   - Create content calendar

2. **This Week**
   - Launch initial content
   - Monitor early response
   - Engage with community

3. **Next Week**
   - Analyze first week data
   - Adjust strategy
   - Scale successful content

## 💡 Pro Tips

1. **Music Optimization**
   - Test different clip lengths
   - Add visual cues for hooks
   - Include clear call-to-actions

2. **Engagement Tactics**
   - Reply with video responses
   - Use music in replies
   - Create duet opportunities

3. **Growth Hacks**
   - Collaborate with creators
   - Join music challenges
   - Cross-promote content

---

_Strategy generated based on current music trends and platform best practices._
_Updated: ${new Date().toLocaleDateString()}_`

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: sampleResponse,
        role: "assistant",
        timestamp: new Date(),
        charts: [
          {
            type: "line",
            title: "Audience Engagement by Platform & Zodiac Sign",
            description: "Monthly engagement rates across platforms segmented by astrological signs",
            data: generateSampleChartData("engagement")
          },
          {
            type: "area",
            title: "Community Growth & Activity Correlation",
            description: "Relationship between astrological events and climbing community participation",
            data: generateSampleChartData("revenue")
          }
        ]
      }

      // Add a slight delay before showing the assistant message and opportunities
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
      }, 500)

      // Save to history
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title: input.slice(0, 50) + (input.length > 50 ? "..." : ""),
        timestamp: new Date(),
        messages: [...messages, userMessage, assistantMessage]
      }

      setChatHistories(prev => {
        const updated = [newHistory, ...prev]
        localStorage.setItem("chatHistories", JSON.stringify(updated))
        return updated
      })

    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Failed to get response")
      setMessages(prev => prev.slice(0, -1))
      setIsLoading(false)
    }
  }

  const renderChart = (chart: NonNullable<Message["charts"]>[number]) => {
    const commonProps = {
      width: 500,
      height: 300,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    }

    switch (chart.type) {
      case "line":
        return (
          <RechartsLineChart {...commonProps} data={chart.data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="engagement" stroke="#4F46E5" strokeWidth={2} />
            <Line type="monotone" dataKey="growth" stroke="#FF5F1F" strokeWidth={2} />
          </RechartsLineChart>
        )
      case "bar":
        return (
          <BarChart {...commonProps} data={chart.data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps} data={chart.data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} />
            <Area type="monotone" dataKey="creators" stroke="#FF5F1F" fill="#FF5F1F" fillOpacity={0.1} />
          </AreaChart>
        )
    }
  }

  // Add Campaign Card component
  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <button 
      onClick={() => setSelectedCampaign(campaign)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all text-left w-full"
    >
      <div className={`aspect-video w-full bg-gradient-to-br ${campaign.gradientFrom} ${campaign.gradientTo} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <campaign.icon className={`w-8 h-8 ${campaign.iconColor}`} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-1.5 bg-${campaign.categoryColor.split('-')[1]}-50 rounded-full text-sm font-medium ${campaign.categoryColor}`}>
            {campaign.category}
          </span>
          <span className="text-sm text-emerald-600 font-medium">{campaign.match}% Match</span>
        </div>
        <h4 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{campaign.title}</h4>
        <p className="text-base text-gray-500 mt-1.5 mb-3">{campaign.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700">{campaign.priceRange}</span>
            <span className="text-sm text-gray-400">/campaign</span>
          </div>
          <span className="text-sm px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">{campaign.status}</span>
        </div>
      </div>
    </button>
  )

  // Add Campaign Modal component
  const CampaignModal = ({ campaign, onClose }: { campaign: Campaign, onClose: () => void }) => {
    const handleJoinCampaign = () => {
      // Here you would typically make an API call to join the campaign
      // For now, we'll just navigate to My Campaigns
      router.push('/my-campaigns')
      onClose()
    }

    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${campaign.categoryColor.split('-')[1]}-50`}>
                <campaign.icon className={`w-5 h-5 ${campaign.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-base font-medium text-gray-700">Duration</div>
                  <div className="text-base text-gray-500">{campaign.details.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-base font-medium text-gray-700">Start Date</div>
                  <div className="text-base text-gray-500">{campaign.details.startDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-base font-medium text-gray-700">Match Score</div>
                  <div className="text-base text-emerald-600 font-medium">{campaign.match}%</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">Requirements</h4>
                <ul className="space-y-2.5">
                  {campaign.details.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">Deliverables</h4>
                <ul className="space-y-2.5">
                  {campaign.details.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">Benefits</h4>
              <ul className="space-y-2.5">
                {campaign.details.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <div className="text-xl font-medium text-gray-900">{campaign.priceRange}</div>
                <div className="text-lg text-gray-500">per campaign</div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/my-campaigns"
                  className="px-6 py-3 text-lg text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  View All Campaigns
                </Link>
                <button 
                  onClick={handleJoinCampaign}
                  className="px-6 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Join Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                href="/my-campaigns" 
                className="flex items-center gap-2 px-3 py-1.5 text-base font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Folder className="w-4 h-4" />
                My Campaigns
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">Strategy Builder</h1>
            </div>
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 -mr-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <History className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex gap-6">
          {/* Main Chat Area */}
          <div className="flex-1 min-h-[calc(100vh-8rem)]">
            <div className="bg-white rounded-xl border shadow-sm p-4 mb-4 h-[calc(100vh-16rem)] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-4 last:mb-0 ${
                      message.role === "assistant" ? "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl p-6" : "p-4"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-3 text-indigo-600">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-medium">Research Report</span>
                      </div>
                    )}
                    <div className="prose prose-2xl prose-indigo max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:marker:text-gray-400">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({children}) => (
                            <h1 className="text-5xl font-bold mb-6 text-gray-900">
                              {children}
                            </h1>
                          ),
                          h2: ({children}) => (
                            <h2 className="text-4xl font-semibold mt-8 mb-4 text-gray-900">
                              {children}
                            </h2>
                          ),
                          h3: ({children}) => (
                            <h3 className="text-3xl font-semibold mt-6 mb-3 text-gray-800">
                              {children}
                            </h3>
                          ),
                          h4: ({children}) => (
                            <h4 className="text-2xl font-medium mt-4 mb-2 text-gray-800">
                              {children}
                            </h4>
                          ),
                          p: ({children}) => (
                            <p className="text-2xl leading-relaxed mb-4 text-gray-600">
                              {children}
                            </p>
                          ),
                          ul: ({children}) => (
                            <ul className="my-4 space-y-3 text-2xl text-gray-600">
                              {children}
                            </ul>
                          ),
                          li: ({children}) => (
                            <li className="flex items-start gap-3">
                              <span className="mt-3.5 w-2.5 h-2.5 rounded-full bg-gray-400 flex-shrink-0" />
                              <span>{children}</span>
                            </li>
                          ),
                          table: ({children}) => (
                            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
                              <table className="w-full border-collapse bg-white">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({children}) => (
                            <th className="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900">
                              {children}
                            </th>
                          ),
                          td: ({children}) => (
                            <td className="border-b border-gray-200 px-4 py-3 text-gray-600">
                              {children}
                            </td>
                          ),
                          code({className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-4"
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    {message.charts?.map((chart, index) => (
                      <div key={index} className="mt-8 bg-white rounded-xl border p-6">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">{chart.title}</h3>
                        <p className="text-lg text-gray-500 mb-6">{chart.description}</p>
                        <div className="h-64 w-full">
                          <ResponsiveContainer>
                            {renderChart(chart)}
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-gray-500 p-4"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                    <span>Analyzing and preparing research report...</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Analyzing..." : "Ask for marketing research, strategy analysis, or industry insights..."}
                className="w-full px-6 py-4 pr-14 text-xl rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

            {/* Show opportunities only after the assistant message and with a delay */}
            <AnimatePresence>
              {messages.length > 0 && messages[messages.length - 1].role === "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-semibold text-gray-900">Recommended Campaigns</h3>
                    </div>
                    <Link 
                      href="/campaigns" 
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {campaigns.map(campaign => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History Sidebar */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-72 bg-white rounded-xl border shadow-sm p-4 h-[calc(100vh-16rem)] overflow-y-auto"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Research History</h2>
                <div className="space-y-2.5">
                  {chatHistories.map((history) => (
                    <button
                      key={history.id}
                      onClick={() => {
                        setMessages(history.messages)
                        setShowHistory(false)
                      }}
                      className="w-full text-left p-3.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-base text-gray-900 line-clamp-1">
                        {history.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1.5">
                        {history.timestamp.toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Campaign Details Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CampaignModal 
              campaign={selectedCampaign} 
              onClose={() => setSelectedCampaign(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 