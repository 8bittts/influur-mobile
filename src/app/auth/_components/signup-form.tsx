"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const SOCIAL_PLATFORMS = [
  {
    id: "youtube",
    name: "YouTube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "text-red-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "text-black",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
    color: "text-pink-600",
  },
]

export function SignupForm() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  function handleSocialLogin(platform: string) {
    setSelectedPlatform(platform)
    setIsDialogOpen(true)
  }

  function handleConfirm() {
    setIsDialogOpen(false)
    router.push(`/onboarding?platform=${selectedPlatform}`)
  }

  return (
    <div className="w-full space-y-8">
      {/* Auth options */}
      <div className="flex gap-3 justify-center">
        <Link 
          href="/auth/signup" 
          className="text-lg font-semibold text-[#FF5F1F] border-b-2 border-[#FF5F1F]"
        >
          Sign up
        </Link>
        <Link 
          href="/auth/login" 
          className="text-lg font-semibold text-gray-400 hover:text-gray-600"
        >
          Sign in
        </Link>
      </div>

      {/* Social buttons */}
      <div className="space-y-3">
        {SOCIAL_PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleSocialLogin(platform.id)}
            className={`flex items-center justify-center w-full px-4 py-3 bg-white border-2 rounded-xl hover:bg-gray-50 ${platform.color} hover:border-current`}
          >
            {platform.icon}
            <span className="ml-2 text-base font-medium">Continue with {platform.name}</span>
          </button>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[320px]">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Connect {selectedPlatform?.charAt(0).toUpperCase()}{selectedPlatform?.slice(1)}
            </DialogTitle>
            <DialogDescription className="pt-2 space-y-2">
              <p className="text-sm">
                Our AI will analyze your content and audience data to match you with the perfect brand opportunities.
              </p>
              <p className="text-sm">
                We'll help you earn more by connecting you with brands that align with your style and values.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF5F1F] rounded-lg hover:bg-[#FF5F1F]/90"
            >
              Connect Now
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 