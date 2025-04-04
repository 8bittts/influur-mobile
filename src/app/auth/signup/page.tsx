"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Users, Globe, Sparkles, X, LineChart as ChartIcon, Upload, User } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import "./styles.css"

const SOCIAL_PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
    color: "border-pink-400 text-pink-500"
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "border-red-400 text-red-500"
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: "border-gray-400 text-gray-500"
  }
]

// Mock data for the revenue chart
const REVENUE_DATA = [
  { month: 'Jan', value: 2000 },
  { month: 'Feb', value: 4000 },
  { month: 'Mar', value: 3000 },
  { month: 'Apr', value: 7000 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 9000 },
]

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function SignupPage() {
  const router = useRouter()
  const [showInfoModal, setShowInfoModal] = React.useState(false)
  const [showAvatarModal, setShowAvatarModal] = React.useState(false)
  const [avatarUrl, setAvatarUrl] = React.useState("")
  const [name, setName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [selectedPlatform, setSelectedPlatform] = React.useState("")

  const handlePlatformClick = async (platform: string) => {
    setSelectedPlatform(platform)
    setShowAvatarModal(true)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Image size should be less than 5MB')
      return
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setAvatarUrl(dataUrl)
    }

    reader.onerror = () => {
      toast.error('Error reading file. Please try again.')
    }

    reader.readAsDataURL(file)
  }

  const handleContinue = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name')
      return
    }

    setIsLoading(true)
    
    try {
      // Save user data in a consistent format
      const userData = {
        name: name.trim(),
        image: avatarUrl || "/default-avatar.png",
        initialPlatform: selectedPlatform,
        connectedPlatforms: []
      }

      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify(userData))

      // Wait a moment to ensure data is saved
      await new Promise(resolve => setTimeout(resolve, 100))

      // Navigate to onboarding using replace to prevent back navigation
      router.replace("/onboarding")
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Error saving profile. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF7]">
      <main className="flex-1 flex flex-col px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        {/* Logo Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#FF5F1F] mb-2">
            Influur
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Start earning money by connecting with top brands
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Join thousands of creators already using Influur
          </p>
        </div>

        <div className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-0">
          {/* Platform buttons */}
          <div className="space-y-3">
            {SOCIAL_PLATFORMS.map((platform) => (
              <motion.button
                key={platform.id}
                onClick={() => handlePlatformClick(platform.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 rounded-xl hover:bg-gray-50 ${platform.color} hover:border-current shadow-sm transition-all`}
              >
                {platform.icon}
                <span className="ml-3 text-sm sm:text-base font-medium">Continue with {platform.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Influur AI Info */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowInfoModal(true)}
              className="text-sm sm:text-base text-gray-500 hover:text-[#FF5F1F] transition-colors"
            >
              What is <span className="font-medium text-[#FF5F1F]">Influur AI</span>?
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center mt-auto">
        <div className="space-y-2 px-4">
          <div className="flex justify-center gap-4 text-xs sm:text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          </div>
          <div className="text-xs sm:text-sm text-gray-400">
            © 2025 Influur. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Avatar Upload Modal */}
      <Dialog open={showAvatarModal} onOpenChange={setShowAvatarModal}>
        <DialogContent className="sm:max-w-md mx-4 sm:mx-auto">
          <div className="relative">
            <button
              onClick={() => setShowAvatarModal(false)}
              className="absolute right-2 top-2 rounded-full p-2 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Add a profile picture and your name to get started
                </p>
              </div>

              <div className="space-y-6">
                {/* Avatar Upload */}
                <div className="text-center">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative mx-auto w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#FF5F1F] transition-colors"
                  >
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    Click to upload your profile picture
                  </p>
                </div>

                {/* Name Input */}
                <div>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm sm:text-base"
                  />
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full py-2 sm:py-3 px-4 bg-[#FF5F1F] text-white rounded-lg font-medium hover:bg-[#FF4F00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Setting up..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="sm:max-w-lg mx-4 sm:mx-auto">
          <div className="relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute right-2 top-2 rounded-full p-2 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Welcome to Influur AI
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#FF5F1F]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">Smart Growth</h4>
                    <p className="text-xs sm:text-sm text-gray-500">AI-powered insights to grow your audience</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Users className="w-5 h-5 text-[#FF5F1F]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">Brand Matching</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Connect with brands that match your style</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#FF5F1F]" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">Global Reach</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Access opportunities worldwide</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 text-[#FF5F1F] mr-2" />
                      Average Creator Earnings
                    </h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={REVENUE_DATA}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#FF5F1F" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 