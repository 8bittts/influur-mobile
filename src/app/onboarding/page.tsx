"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Instagram, Youtube, Video, CheckCircle2, X } from "lucide-react"
import { useUser } from "@/lib/contexts/user-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import confetti from 'canvas-confetti'

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="h-5 w-5 text-[#E1306C]" />,
    baseRevenue: 221,
    color: "#E1306C"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="h-5 w-5 text-[#FF0000]" />,
    baseRevenue: 450,
    color: "#FF0000"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <Video className="h-5 w-5" />,
    baseRevenue: 1230,
    color: "#00F2EA"
  }
]

function getRevenueData(connectedPlatforms: string[]) {
  const baseRevenue = 20
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  // Create fluctuating growth patterns
  const getGrowthPattern = (targetValue: number) => {
    const pattern = []
    let currentValue = baseRevenue
    const increment = (targetValue - baseRevenue) / (months.length - 1)
    
    for (let i = 0; i < months.length; i++) {
      // Add some random fluctuation but ensure overall upward trend
      const fluctuation = Math.random() * 30 - 15 // Smaller fluctuation for smoother curves
      const targetForMonth = baseRevenue + (increment * i)
      currentValue = Math.max(baseRevenue, Math.round(targetForMonth + fluctuation))
      pattern.push(currentValue)
    }
    
    // Ensure final value matches target
    pattern[pattern.length - 1] = targetValue
    return pattern
  }
  
  return months.map((month, i) => {
    const data: { [key: string]: any } = { month }
    
    // Base revenue line with slight growth
    data.base = Math.round(baseRevenue * (1 + i * 0.1))
    
    // Add lines for connected platforms with fluctuating growth
    connectedPlatforms.forEach(platformId => {
      const platform = PLATFORMS.find(p => p.id === platformId)
      if (platform) {
        const pattern = getGrowthPattern(platform.baseRevenue)
        data[platformId] = pattern[i]
      }
    })
    
    return data
  })
}

export default function OnboardingPage() {
  const router = useRouter()
  const { name, profileImage, initialPlatform } = useUser()
  const [connectedPlatforms, setConnectedPlatforms] = React.useState<string[]>([])
  const [showIntegrationModal, setShowIntegrationModal] = React.useState(false)
  const [selectedPlatform, setSelectedPlatform] = React.useState<string | null>(null)
  const [isIntegrating, setIsIntegrating] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  // Calculate total potential revenue
  const totalRevenue = React.useMemo(() => {
    return connectedPlatforms.reduce((total, platformId) => {
      const platform = PLATFORMS.find(p => p.id === platformId)
      return total + (platform?.baseRevenue || 0)
    }, 0)
  }, [connectedPlatforms])

  // Connect initial platform from registration
  React.useEffect(() => {
    if (initialPlatform && !connectedPlatforms.includes(initialPlatform)) {
      setConnectedPlatforms([initialPlatform])
    }
  }, [initialPlatform, connectedPlatforms])

  const handlePlatformClick = (platformId: string) => {
    if (connectedPlatforms.includes(platformId)) return
    setSelectedPlatform(platformId)
    setShowIntegrationModal(true)
  }

  const handleIntegrationConfirm = async () => {
    if (!selectedPlatform) return
    setIsIntegrating(true)
    
    // Simulate integration delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setConnectedPlatforms(prev => [...prev, selectedPlatform])
    setIsIntegrating(false)
    setShowIntegrationModal(false)
    
    // Trigger confetti when platform is connected
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleGetStarted = () => {
    router.push("/dashboard")
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  const allPlatformsConnected = connectedPlatforms.length === PLATFORMS.length

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      {/* Profile Header */}
      <div className="relative h-72 bg-[#FF5F1F] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={profileImage || "https://placekitten.com/400/400"}
            alt={name || "Profile"}
            width={800}
            height={600}
            priority
            className={`object-cover w-full h-full transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{name}</h1>
            <p className="text-white/90">Creator</p>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="max-w-lg mx-auto px-4 -mt-6 relative z-10 space-y-4 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-xl font-bold text-gray-900">Total Potential Revenue</h2>
              <div className="text-2xl font-bold text-[#FF5F1F] animate-earnings">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Connect more platforms to increase your earning potential
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getRevenueData(connectedPlatforms)} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="base"
                    stroke="#E5E7EB"
                    strokeWidth={2}
                    dot={{ fill: '#E5E7EB', strokeWidth: 2, r: 3 }}
                  />
                  {connectedPlatforms.map(platformId => {
                    const platform = PLATFORMS.find(p => p.id === platformId)
                    return (
                      <Line
                        key={platformId}
                        type="monotone"
                        dataKey={platformId}
                        stroke={platform?.color}
                        strokeWidth={2}
                        dot={{ fill: platform?.color, strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    )
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Integration */}
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect Your Platforms</h2>
            <div className="grid grid-cols-3 gap-3">
              {PLATFORMS.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformClick(platform.id)}
                    disabled={isConnected}
                    className={`
                      relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                      ${isConnected 
                        ? 'bg-green-50 border-green-500' 
                        : 'hover:border-gray-300 border-gray-200'
                      }
                    `}
                  >
                    {platform.icon}
                    <span className="mt-1 text-sm">{platform.name}</span>
                    <div className="mt-1 text-xs font-medium text-[#FF5F1F]">
                      ${platform.baseRevenue}
                    </div>
                    {isConnected && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Get Started or Skip Option */}
            <div className="mt-6 text-center">
              {allPlatformsConnected ? (
                <div className="space-y-2">
                  <button
                    onClick={handleGetStarted}
                    className="w-full py-3 px-4 bg-[#FF5F1F] text-white rounded-lg hover:bg-[#FF5F1F]/90 transition-colors font-medium"
                  >
                    Let's Get Started!
                  </button>
                  <p className="text-sm text-gray-500">
                    You're all set to start earning!
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSkip}
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Skip for now
                  </button>
                  <p className="text-xs text-gray-400 mt-1">
                    You can always do this later!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Modal */}
      {showIntegrationModal && selectedPlatform && (
        <Dialog open={true} onOpenChange={() => setShowIntegrationModal(false)}>
          <DialogContent>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isIntegrating ? 'Connecting...' : 'Connect Platform'}
                </h2>
                <button
                  onClick={() => setShowIntegrationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {isIntegrating ? (
                <div className="space-y-4">
                  <div className="animate-pulse text-gray-600">
                    Integrating with our AI system...
                  </div>
                  <div className="w-16 h-16 border-4 border-[#FF5F1F] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    Ready to connect your {PLATFORMS.find(p => p.id === selectedPlatform)?.name} account?
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setShowIntegrationModal(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleIntegrationConfirm}
                      className="px-4 py-2 bg-[#FF5F1F] text-white rounded-lg hover:bg-[#FF5F1F]/90"
                    >
                      Connect
                    </button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 