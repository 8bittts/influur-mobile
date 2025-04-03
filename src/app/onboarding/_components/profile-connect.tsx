"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, PartyPopper, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import confetti from 'canvas-confetti'
import { ConnectPlatformModal } from "@/app/components/connect-platform-modal"
import { GrowthChart } from "@/app/components/growth-chart"

interface Platform {
  id: string
  name: string
  icon: JSX.Element
  color: string
  chartColor: string
  pillColor: string
  baseEarning: number
  brands: string[]
}

const SOCIAL_PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "text-red-600",
    chartColor: "#FF4444",
    pillColor: "bg-red-100 text-red-700 border-red-200",
    baseEarning: 210,
    brands: ["Universal Music", "Sony Music", "Live Nation"]
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "text-gray-900",
    chartColor: "#666666",
    pillColor: "bg-gray-100 text-gray-700 border-gray-200",
    baseEarning: 370,
    brands: ["Fashion Nova", "Shein", "Gymshark"]
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
    color: "text-pink-600",
    chartColor: "#EC4899",
    pillColor: "bg-pink-100 text-pink-700 border-pink-200",
    baseEarning: 620,
    brands: ["Nike", "Adidas", "Puma"]
  },
]

interface UserData {
  name: string
  image: string
  initialPlatform?: string
  connectedPlatforms: string[]
}

export default function ProfileConnect() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({
    name: "",
    image: "",
    connectedPlatforms: []
  })
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showReviewButton, setShowReviewButton] = useState(false)
  const [hasCelebrated, setHasCelebrated] = useState(false)
  const [isIntegrating, setIsIntegrating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("userData")
      if (!storedData) {
        router.replace("/auth/signup")
        return
      }

      const data = JSON.parse(storedData) as UserData
      const initialData = {
        name: data.name || "",
        image: data.image || "",
        initialPlatform: data.initialPlatform || "",
        connectedPlatforms: data.connectedPlatforms || []
      }

      // If there's an initial platform and it's not already connected, connect it
      if (initialData.initialPlatform && !initialData.connectedPlatforms.includes(initialData.initialPlatform)) {
        initialData.connectedPlatforms = [...initialData.connectedPlatforms, initialData.initialPlatform]
        localStorage.setItem("userData", JSON.stringify(initialData))
      }

      setUserData(initialData)
    } catch (error) {
      console.error("Error loading user data:", error)
      router.replace("/auth/signup")
    } finally {
      setIsLoading(true)
      // Short delay to ensure DOM is ready
      setTimeout(() => setIsLoading(false), 100)
    }
  }, [router])

  useEffect(() => {
    // Check if all platforms are connected and show celebration
    if (userData.connectedPlatforms.length === SOCIAL_PLATFORMS.length && !showCelebration && !hasCelebrated) {
      setShowCelebration(true)
      setHasCelebrated(true)
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [userData.connectedPlatforms.length, showCelebration, hasCelebrated])

  const totalEarnings = userData.connectedPlatforms.reduce((total, platformId) => {
    const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId)
    return total + (platform?.baseEarning || 0)
  }, 0)

  const availableBrands = Array.from(new Set(
    userData.connectedPlatforms.flatMap(platformId => {
      const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId)
      return platform?.brands || []
    })
  ))

  const handlePlatformClick = (platformId: string) => {
    if (userData.connectedPlatforms.includes(platformId)) return
    setSelectedPlatform(platformId)
    setShowDialog(true)
  }

  const handleConnect = async () => {
    if (!selectedPlatform) return
    setIsIntegrating(true)
    
    // Simulate integration delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const updatedData = {
      ...userData,
      connectedPlatforms: [...userData.connectedPlatforms, selectedPlatform]
    }
    setUserData(updatedData)
    localStorage.setItem("userData", JSON.stringify(updatedData))
    setIsIntegrating(false)
    setShowDialog(false)
    
    // Trigger confetti when platform is connected
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleCelebrationContinue = () => {
    setShowCelebration(false)
    setShowReviewButton(true)
  }

  const handleReviewOpportunities = () => {
    router.push("/dashboard")
  }

  const handleCelebrationDialogChange = (open: boolean) => {
    if (!open) {
      setShowCelebration(false)
      setShowReviewButton(true)
    }
  }

  // Show loading state during SSR and initial client load
  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF5F1F] via-white to-white" />
        <div className="relative max-w-md mx-auto px-4 pt-6 pb-8">
          <div className="relative h-80 rounded-2xl overflow-hidden mb-6 bg-gray-100 animate-pulse" />
          <div className="space-y-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FF5F1F] via-white to-white"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="relative max-w-md mx-auto px-4 pt-6 pb-8">
        {/* Profile Section */}
        <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF5F1F]/80 to-black/60" />
          {userData.image && userData.image !== "/default-avatar.png" ? (
            <div className="relative w-full h-full">
              <Image
                src={userData.image}
                alt={userData.name || "Profile"}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block px-8 py-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-900">
                {userData.name || ""}
              </h2>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="space-y-4">
          {userData.connectedPlatforms.length > 0 ? (
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <h2 className={cn(
                        "text-3xl font-bold tracking-tight",
                        userData.connectedPlatforms.length > 0 && "animate-earnings"
                      )}>
                        ${totalEarnings}
                      </h2>
                      <span className="text-sm font-medium text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Connect more platforms to increase your earnings
                </div>
                <div className="h-[140px] w-full">
                  <GrowthChart 
                    connectedPlatforms={userData.connectedPlatforms}
                    platforms={SOCIAL_PLATFORMS}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
              <p className="text-sm text-muted-foreground text-center">
                Connect your first platform to see your earning potential
              </p>
            </div>
          )}

          {userData.connectedPlatforms.length > 0 && userData.connectedPlatforms.length < 3 && (
            <div className="text-center py-3 px-4 rounded-xl border bg-orange-50/50 text-sm text-gray-700">
              Add {3 - userData.connectedPlatforms.length} more {userData.connectedPlatforms.length === 2 ? 'platform' : 'platforms'} to unlock up to <span className="font-semibold text-[#FF5F1F]">$1,200</span> in monthly earnings
            </div>
          )}
        </div>

        {/* Review Opportunities Button */}
        {showReviewButton && (
          <div className="my-6">
            <Button 
              onClick={handleReviewOpportunities}
              className="w-full text-lg py-4 bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Review Opportunities Now
            </Button>
          </div>
        )}

        {/* Platform Buttons */}
        <div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="grid grid-cols-3 gap-3">
              {SOCIAL_PLATFORMS.map((platform) => {
                const isConnected = userData.connectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformClick(platform.id)}
                    disabled={isConnected}
                    className={cn(
                      "relative aspect-square flex items-center justify-center rounded-xl border-2 transition-all",
                      isConnected
                        ? "bg-white border-green-500 shadow-sm"
                        : "hover:border-gray-300 border-gray-200 hover:bg-white/50"
                    )}
                  >
                    <span className={platform.color}>{platform.icon}</span>
                    {isConnected && (
                      <div className="absolute -top-1.5 -right-1.5 bg-green-500 rounded-full p-1">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          {userData.connectedPlatforms.length === SOCIAL_PLATFORMS.length && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 font-medium bg-white/50 backdrop-blur-sm py-2 px-4 rounded-lg inline-block">
                Success! We're excited for you to get started!
              </p>
            </div>
          )}
        </div>

        {/* Platform Connection Modal */}
        {selectedPlatform && (
          <ConnectPlatformModal
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            onConnect={handleConnect}
            platformName={SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform)?.name || ""}
            isIntegrating={isIntegrating}
          />
        )}

        {/* Celebration Modal */}
        <Dialog 
          open={showCelebration} 
          onOpenChange={handleCelebrationDialogChange}
        >
          <DialogContent className="sm:max-w-md">
            <div className="pt-8 pb-6 text-center">
              <div className="mb-6 inline-block p-3 bg-orange-100 rounded-full">
                <PartyPopper className="w-8 h-8 text-[#FF5F1F]" />
              </div>
              <DialogTitle className="text-2xl mb-2">
                Congrats! You've just maximized your potential earnings!
              </DialogTitle>
              <div className="my-6">
                <div className="relative">
                  <div className="text-5xl font-bold text-[#FF5F1F]">
                    ${totalEarnings}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 -z-10 rounded-2xl opacity-60 blur-lg" />
                </div>
                <div className="text-sm text-gray-500 mt-2">Monthly Potential</div>
              </div>
              <DialogDescription className="text-base">
                You're all set to start earning with your connected platforms.
              </DialogDescription>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCelebrationContinue}
                className="w-full text-lg py-6"
              >
                Let's Go!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 