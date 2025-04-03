"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  CheckCircle2, 
  Instagram, 
  Youtube, 
  Upload, 
  Sparkles, 
  Play, 
  Pause,
  Clock, 
  CheckCircle,
  Maximize2,
  Volume2,
  VolumeX,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import confetti from 'canvas-confetti'

interface ActiveCampaign {
  id: string
  brand: string
  title: string
  payout: number
  platform: "instagram" | "youtube" | "tiktok"
  requirements: string
  dueDate: string
  isExpanded?: boolean
}

interface RecentPost {
  title: string
  videoUrl: string
}

interface VerifiedPost extends RecentPost {
  isVerified?: boolean
}

const WORKING_VIDEOS = [
  "https://www.youtube.com/embed/n61ULEU7CO0", // Fitness
  "https://www.youtube.com/embed/ZVlQOb1LiNs", // Cooking
  "https://www.youtube.com/embed/L9VXHnzp3Ks", // Tech
  "https://www.youtube.com/embed/8B1wIzQRin4", // Photography
  "https://www.youtube.com/embed/yKLVL0mX2GU", // Gaming
  "https://www.youtube.com/embed/fEspMhqmHrI", // Beauty
  "https://www.youtube.com/embed/5-sfG8BV8wU", // Lifestyle
  "https://www.youtube.com/embed/VJ0SRKZewx0"  // Tutorial
]

const PlatformIcon = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8.5,0H12c0,2.5,1.9,4.5,4,4.5V8c-1.5,0-2.9-0.5-4-1.5V12c0,4.4-4.5,7.2-8.5,5.2c-2.4-1.2-4-3.7-4-6.2 c0-4.1,3.4-7.5,7.5-7.5V7c-2,0-3.5,1.6-3.5,3.5c0,2,1.6,3.5,3.5,3.5c1.9,0,3.5-1.6,3.5-3.5V0z"/>
    </svg>
  )
}

interface EmbedCheckResult {
  isAvailable: boolean
  url: string
}

async function checkInstagramEmbed(postId: string): Promise<EmbedCheckResult> {
  try {
    const response = await fetch(`https://www.instagram.com/p/${postId}/`)
    if (response.ok) {
      return { isAvailable: true, url: `https://www.instagram.com/p/${postId}/embed` }
    }
  } catch (error) {
    console.error('Instagram embed check failed:', error)
  }
  return { isAvailable: false, url: '' }
}

async function checkYouTubeEmbed(videoId: string): Promise<EmbedCheckResult> {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    if (response.ok) {
      return { isAvailable: true, url: `https://www.youtube.com/embed/${videoId}` }
    }
  } catch (error) {
    console.error('YouTube embed check failed:', error)
  }
  return { isAvailable: false, url: '' }
}

async function checkTikTokEmbed(videoId: string): Promise<EmbedCheckResult> {
  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/video/${videoId}`)
    if (response.ok) {
      return { isAvailable: true, url: `https://www.tiktok.com/embed/${videoId}` }
    }
  } catch (error) {
    console.error('TikTok embed check failed:', error)
  }
  return { isAvailable: false, url: '' }
}

const recentPosts: Record<string, RecentPost[]> = {
  instagram: [
    {
      title: "Behind the scenes at my morning workout 💪 #FitLife",
      videoUrl: "https://www.instagram.com/p/C4Gn7NUL2Kj/embed/captioned"
    },
    {
      title: "Quick healthy meal prep ideas for busy creators 🥗",
      videoUrl: "https://www.instagram.com/p/C4MKL8YLwsq/embed/captioned"
    },
    {
      title: "My minimalist desk setup tour 2024 🖥️",
      videoUrl: "https://www.instagram.com/p/C4O2nG4rQKt/embed/captioned"
    },
    {
      title: "5 tips for better Instagram Reels 📱",
      videoUrl: "https://www.instagram.com/reel/C4Gn7NUL2Kj/embed"
    }
  ],
  youtube: [
    {
      title: "Ultimate Home Studio Setup Guide 2024",
      videoUrl: "https://www.youtube.com/embed/n61ULEU7CO0"
    },
    {
      title: "How I Edit Videos in Under 30 Minutes",
      videoUrl: "https://www.youtube.com/embed/ZVlQOb1LiNs"
    },
    {
      title: "Creator Economy: What Nobody Tells You",
      videoUrl: "https://www.youtube.com/embed/L9VXHnzp3Ks"
    },
    {
      title: "Budget Camera Gear That Looks Expensive",
      videoUrl: "https://www.youtube.com/embed/8B1wIzQRin4"
    }
  ],
  tiktok: [
    {
      title: "3 Life Hacks That Changed Everything 🤯",
      videoUrl: "https://www.tiktok.com/embed/v2/7341561837947972901"
    },
    {
      title: "Day in the Life: Content Creator Edition 📸",
      videoUrl: "https://www.tiktok.com/embed/v2/7341561837947972901"
    },
    {
      title: "Trending Sound Tutorial: Step by Step 🎵",
      videoUrl: "https://www.tiktok.com/embed/v2/7341561837947972901"
    },
    {
      title: "Room Transformation in 60 Seconds ✨",
      videoUrl: "https://www.tiktok.com/embed/v2/7341561837947972901"
    }
  ]
}

interface SubmissionStep {
  title: string
  description: string
  icon: React.ReactNode
  status: 'pending' | 'current' | 'completed'
  date: string
  time: string
}

const submissionSteps: SubmissionStep[] = [
  {
    title: "Submission",
    description: "Content submitted for review",
    icon: <Upload className="w-5 h-5" />,
    status: 'completed',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  {
    title: "Review",
    description: "Brand team reviewing content",
    icon: <Clock className="w-5 h-5" />,
    status: 'current',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
    time: "24h estimated"
  },
  {
    title: "Approval",
    description: "Content approved by brand",
    icon: <CheckCircle2 className="w-5 h-5" />,
    status: 'pending',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    time: "48h estimated"
  },
  {
    title: "Payment",
    description: "Funds released to creator",
    icon: <CheckCircle className="w-5 h-5" />,
    status: 'pending',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    time: "72h after approval"
  }
]

interface VideoPlayerState {
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isFullscreen: boolean
}

interface StoredVideo {
  url: string
  name: string
  timestamp: number
}

async function verifyEmbed(platform: string, url: string): Promise<boolean> {
  try {
    if (platform === 'instagram') {
      // Instagram embeds are always considered valid since we can't verify them client-side
      return true
    }
    
    if (platform === 'youtube') {
      const videoId = url.split('/embed/')[1]?.split('?')[0]
      if (!videoId) return false
      return true // YouTube embeds are reliable once we have a valid ID
    }
    
    if (platform === 'tiktok') {
      const videoId = url.split('/v2/')[1]?.split('?')[0]
      if (!videoId) return false
      return true // TikTok embeds are reliable once we have a valid ID
    }
    
    return false
  } catch (error) {
    console.error('Embed verification failed:', error)
    return false
  }
}

export default function ActiveCampaignsPage() {
  const [campaigns, setCampaigns] = useState<ActiveCampaign[]>([
    {
      id: "1",
      brand: "FitLife Supplements",
      title: "Wellness Journey Showcase",
      payout: 500,
      platform: "instagram",
      requirements: "Share your authentic experience with our products",
      dueDate: "2024-04-15",
      isExpanded: false
    },
    {
      id: "2",
      brand: "TechGear Pro",
      title: "Unboxing Experience",
      payout: 750,
      platform: "youtube",
      requirements: "Create an engaging unboxing video",
      dueDate: "2024-04-20",
      isExpanded: false
    },
    {
      id: "3",
      brand: "StyleBox Fashion",
      title: "Spring Collection Preview",
      payout: 400,
      platform: "tiktok",
      requirements: "Show off your favorite pieces from our collection",
      dueDate: "2024-04-25",
      isExpanded: false
    },
    {
      id: "4",
      brand: "GreenEats Kitchen",
      title: "Healthy Recipe Creation",
      payout: 600,
      platform: "instagram",
      requirements: "Create a recipe using our organic ingredients",
      dueDate: "2024-04-18",
      isExpanded: false
    },
    {
      id: "5",
      brand: "GameVerse",
      title: "Gaming Setup Tour",
      payout: 800,
      platform: "youtube",
      requirements: "Showcase our gaming accessories in your setup",
      dueDate: "2024-04-22",
      isExpanded: false
    },
    {
      id: "6",
      brand: "BeautyGlow",
      title: "Skincare Routine",
      payout: 450,
      platform: "tiktok",
      requirements: "Demo our new skincare line in your routine",
      dueDate: "2024-04-28",
      isExpanded: false
    }
  ])

  const [selectedPosts, setSelectedPosts] = useState<Record<string, string>>({})
  const [selectedPostVideos, setSelectedPostVideos] = useState<Record<string, string>>({})
  const [uploadedVideos, setUploadedVideos] = useState<Record<string, File>>({})
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const [showSuccess, setShowSuccess] = useState<Record<string, boolean>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({})
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({})
  const [videoStates, setVideoStates] = useState<Record<string, VideoPlayerState>>({})
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({})
  const [videoBlobs, setVideoBlobs] = useState<Record<string, string>>({})
  const [isVideoLoading, setIsVideoLoading] = useState<Record<string, boolean>>({})
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({})
  const [verifiedPosts, setVerifiedPosts] = useState<Record<string, VerifiedPost[]>>({})

  const toggleCampaign = (id: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, isExpanded: !campaign.isExpanded } : campaign
    ))
  }

  const storeVideo = async (campaignId: string, file: File) => {
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const storedVideos = JSON.parse(localStorage.getItem('campaignVideos') || '{}')
      storedVideos[campaignId] = {
        url: base64,
        name: file.name,
        timestamp: Date.now()
      }
      localStorage.setItem('campaignVideos', JSON.stringify(storedVideos))

      setVideoUrls(prev => ({ ...prev, [campaignId]: base64 }))
      return base64
    } catch (error) {
      console.error('Error storing video:', error)
      toast.error("Failed to process video")
      return null
    }
  }

  const handlePostSelect = async (campaignId: string, value: string) => {
    setSelectedPosts({ ...selectedPosts, [campaignId]: value })
    setVideoErrors(prev => ({ ...prev, [campaignId]: false }))
    setIsVideoLoading(prev => ({ ...prev, [campaignId]: true }))
    
    const campaign = campaigns.find(c => c.id === campaignId)
    if (campaign) {
      const verifiedPost = verifiedPosts[campaign.id]?.find(p => p.title === value)
      if (verifiedPost) {
        setSelectedPostVideos({ ...selectedPostVideos, [campaignId]: verifiedPost.videoUrl })
        setTimeout(() => {
          setIsVideoLoading(prev => ({ ...prev, [campaignId]: false }))
        }, 1000)
      }
    }
  }

  const handleFileSelect = async (campaignId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      try {
        setIsVideoLoading(prev => ({ ...prev, [campaignId]: true }))
        setUploadedVideos(prev => ({ ...prev, [campaignId]: file }))
        
        // Create a blob URL for immediate playback
        const blobUrl = URL.createObjectURL(file)
        setVideoBlobs(prev => ({ ...prev, [campaignId]: blobUrl }))
        
        // Store in localStorage for persistence
        const videoUrl = await storeVideo(campaignId, file)
        if (videoUrl) {
          initVideoState(campaignId)
        }
      } catch (error) {
        console.error('Error processing video:', error)
        toast.error("Failed to process video")
      } finally {
        setIsVideoLoading(prev => ({ ...prev, [campaignId]: false }))
      }
    } else {
      toast.error("Please select a valid video file")
    }
  }

  const toggleVideo = async (campaignId: string) => {
    const video = videoRefs.current[campaignId]
    if (!video) return

    try {
      if (video.paused) {
        await video.play()
        setIsPlaying(prev => ({ ...prev, [campaignId]: true }))
      } else {
        video.pause()
        setIsPlaying(prev => ({ ...prev, [campaignId]: false }))
      }
    } catch (error) {
      console.error('Error playing video:', error)
      toast.error("Failed to play video")
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleSubmit = async (campaignId: string) => {
    const selectedPost = selectedPosts[campaignId]
    const uploadedVideo = uploadedVideos[campaignId]
    
    if (!selectedPost && !uploadedVideo) {
      toast.error("Please select a post or upload a video")
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    triggerConfetti()
    setShowSuccess(prev => ({ ...prev, [campaignId]: true }))
    
    toast.success("Content submitted successfully!", {
      description: "Your submission is now being reviewed by the brand team."
    })
  }

  const handleFileInputRef = (campaignId: string) => (el: HTMLInputElement | null) => {
    if (el) fileInputRefs.current[campaignId] = el
  }

  const handleVideoRef = (campaignId: string) => (el: HTMLVideoElement | null) => {
    if (el) videoRefs.current[campaignId] = el
  }

  const initVideoState = (campaignId: string) => {
    setVideoStates(prev => ({
      ...prev,
      [campaignId]: {
        currentTime: 0,
        duration: 0,
        volume: 1,
        isMuted: false,
        isFullscreen: false
      }
    }))
  }

  const handleTimeUpdate = (campaignId: string) => {
    const video = videoRefs.current[campaignId]
    if (video) {
      setVideoStates(prev => ({
        ...prev,
        [campaignId]: {
          ...prev[campaignId],
          currentTime: video.currentTime,
          duration: video.duration
        }
      }))
    }
  }

  const handleVideoProgress = (campaignId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRefs.current[campaignId]
    if (!video) return

    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const percent = x / bounds.width
    video.currentTime = percent * video.duration
  }

  const toggleMute = (campaignId: string) => {
    const video = videoRefs.current[campaignId]
    if (video) {
      const newMuted = !video.muted
      video.muted = newMuted
      setVideoStates(prev => ({
        ...prev,
        [campaignId]: {
          ...prev[campaignId],
          isMuted: newMuted
        }
      }))
    }
  }

  const toggleFullscreen = (campaignId: string) => {
    const video = videoRefs.current[campaignId]
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setVideoStates(prev => ({
        ...prev,
        [campaignId]: {
          ...prev[campaignId],
          isFullscreen: true
        }
      }))
    } else {
      document.exitFullscreen()
      setVideoStates(prev => ({
        ...prev,
        [campaignId]: {
          ...prev[campaignId],
          isFullscreen: false
        }
      }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVideoError = async (campaignId: string) => {
    console.error('Video unavailable:', campaignId)
    setVideoErrors(prev => ({ ...prev, [campaignId]: true }))
    
    const campaign = campaigns.find(c => c.id === campaignId)
    if (!campaign) return
    
    // Find a working fallback based on platform
    let fallbackUrl = ''
    switch (campaign.platform) {
      case 'youtube':
        const youtubeResult = await checkYouTubeEmbed(WORKING_VIDEOS[0].split('/').pop()!)
        fallbackUrl = youtubeResult.isAvailable ? youtubeResult.url : WORKING_VIDEOS[0]
        break
      case 'instagram':
        const instaResult = await checkInstagramEmbed('C4Gn7NUL2Kj')
        fallbackUrl = instaResult.isAvailable ? instaResult.url : WORKING_VIDEOS[0]
        break
      case 'tiktok':
        const tiktokResult = await checkTikTokEmbed('7341561837947972901')
        fallbackUrl = tiktokResult.isAvailable ? tiktokResult.url : WORKING_VIDEOS[0]
        break
    }
    
    setSelectedPostVideos(prev => ({ ...prev, [campaignId]: fallbackUrl }))
    toast.error(`${campaign.platform} embed unavailable, showing fallback content`)
  }

  useEffect(() => {
    try {
      const storedVideos = JSON.parse(localStorage.getItem('campaignVideos') || '{}')
      const urls: Record<string, string> = {}
      
      Object.entries(storedVideos).forEach(([campaignId, data]) => {
        urls[campaignId] = (data as StoredVideo).url
      })
      
      setVideoUrls(urls)
    } catch (error) {
      console.error('Error loading stored videos:', error)
    }
  }, [])

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(videoBlobs).forEach(url => {
        URL.revokeObjectURL(url)
      })
    }
  }, [videoBlobs])

  useEffect(() => {
    const verifyPosts = async (campaignId: string, platform: string) => {
      const posts = recentPosts[platform]
      if (!posts) return

      // Set loading state
      setVerifiedPosts(prev => ({
        ...prev,
        [campaignId]: [] // Clear previous posts while loading
      }))

      // Verify all posts
      const verified = await Promise.all(
        posts.map(async (post) => ({
          ...post,
          isVerified: await verifyEmbed(platform, post.videoUrl)
        }))
      )

      // Update state with verified posts
      setVerifiedPosts(prev => ({
        ...prev,
        [campaignId]: verified.filter(post => post.isVerified)
      }))
    }

    campaigns.forEach(campaign => {
      if (campaign.isExpanded && (!verifiedPosts[campaign.id] || verifiedPosts[campaign.id].length === 0)) {
        verifyPosts(campaign.id, campaign.platform)
      }
    })
  }, [campaigns])

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="sticky top-0 bg-[#FFFBF7] border-b z-10">
        <div className="container mx-auto max-w-md px-3 py-3">
          <div className="flex justify-between items-center">
            <Link href="/my-campaigns" className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Active Campaigns</h1>
            <div className="w-5" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-3 py-4 space-y-3">
        {campaigns.map((campaign) => {
          const Icon = PlatformIcon[campaign.platform]
          return (
            <motion.div
              key={campaign.id}
              layout
              className="bg-white rounded-xl border shadow-sm p-4 cursor-pointer hover:border-[#FF5F1F] transition-colors"
            >
              <div 
                className="flex justify-between items-start"
                onClick={() => toggleCampaign(campaign.id)}
              >
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Icon className="w-4 h-4" />
                    <span>{campaign.brand}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-[#FF5F1F] font-medium">${campaign.payout}</div>
                  <div className="text-xs text-gray-500">Due {new Date(campaign.dueDate).toLocaleDateString()}</div>
                </div>
              </div>

              {campaign.isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Requirements</h4>
                      <p className="text-sm text-gray-600">{campaign.requirements}</p>
                    </div>
                    
                    <AnimatePresence>
                      {!showSuccess[campaign.id] ? (
                        <motion.div 
                          className="space-y-3"
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div>
                            <label className="text-sm font-medium text-gray-900 mb-2 block">
                              Choose content to submit
                            </label>
                            <div className="flex gap-2">
                              <Select
                                value={selectedPosts[campaign.id]}
                                onValueChange={(value) => handlePostSelect(campaign.id, value)}
                              >
                                <SelectTrigger className="flex-1 bg-white">
                                  <SelectValue placeholder={
                                    verifiedPosts[campaign.id] ? 
                                      verifiedPosts[campaign.id].length > 0 ?
                                        "Select from recent posts" :
                                        "No available posts found" :
                                      "Verifying available posts..."
                                  } />
                                </SelectTrigger>
                                <SelectContent>
                                  {verifiedPosts[campaign.id]?.map((post, index) => (
                                    <SelectItem key={index} value={post.title}>
                                      {post.title}
                                    </SelectItem>
                                  ))}
                                  {(!verifiedPosts[campaign.id] || verifiedPosts[campaign.id].length === 0) && (
                                    <div className="p-2 text-sm text-gray-500 text-center">
                                      {!verifiedPosts[campaign.id] ? (
                                        <div className="flex items-center justify-center gap-2">
                                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                                          Verifying posts...
                                        </div>
                                      ) : (
                                        "No available posts found"
                                      )}
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>

                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                ref={handleFileInputRef(campaign.id)}
                                onChange={(e) => handleFileSelect(campaign.id, e)}
                              />
                              <button 
                                onClick={() => fileInputRefs.current[campaign.id]?.click()}
                                className="shrink-0 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-[#FF5F1F] transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                Upload
                              </button>
                            </div>
                          </div>

                          {(uploadedVideos[campaign.id] || selectedPostVideos[campaign.id]) && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="relative rounded-lg overflow-hidden bg-black aspect-video"
                            >
                              {isVideoLoading[campaign.id] && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                              {uploadedVideos[campaign.id] ? (
                                <video
                                  ref={handleVideoRef(campaign.id)}
                                  src={videoBlobs[campaign.id] || videoUrls[campaign.id]}
                                  className="w-full h-full object-contain"
                                  onLoadedMetadata={() => initVideoState(campaign.id)}
                                  onTimeUpdate={() => handleTimeUpdate(campaign.id)}
                                  onPlay={() => setIsPlaying(prev => ({ ...prev, [campaign.id]: true }))}
                                  onPause={() => setIsPlaying(prev => ({ ...prev, [campaign.id]: false }))}
                                  onError={(e) => {
                                    console.error('Video error:', e)
                                    toast.error("Error loading video")
                                  }}
                                  playsInline
                                  preload="metadata"
                                  controls
                                />
                              ) : selectedPostVideos[campaign.id] ? (
                                <div className={`relative w-full ${
                                  campaign.platform === 'instagram' 
                                    ? 'aspect-[4/5] md:aspect-square' 
                                    : campaign.platform === 'tiktok'
                                      ? 'aspect-[9/16]'
                                      : 'aspect-video'
                                } bg-gray-50`}>
                                  {isVideoLoading[campaign.id] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </div>
                                  )}
                                  <iframe
                                    key={selectedPostVideos[campaign.id]}
                                    src={selectedPostVideos[campaign.id]}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                    allowFullScreen
                                    onLoad={() => {
                                      setIsVideoLoading(prev => ({ ...prev, [campaign.id]: false }))
                                    }}
                                    onError={() => {
                                      handleVideoError(campaign.id)
                                      setIsVideoLoading(prev => ({ ...prev, [campaign.id]: false }))
                                    }}
                                  />
                                </div>
                              ) : null}
                            </motion.div>
                          )}

                          <button
                            onClick={() => handleSubmit(campaign.id)}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF5F1F] rounded-lg hover:bg-[#FF4F0F] transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Submit for Review
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-2"
                        >
                          <div className="relative">
                            <div className="space-y-6 relative">
                              {submissionSteps.map((step, index) => (
                                <div key={index} className="flex gap-3">
                                  <div className="relative">
                                    <div className={`
                                      w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative z-10
                                      ${step.status === 'completed' ? 'bg-green-100 text-green-600 ring-2 ring-green-600/20' :
                                        step.status === 'current' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600/20 animate-pulse' :
                                        'bg-gray-100 text-gray-400'}
                                    `}>
                                      {step.icon}
                                    </div>
                                    {index < submissionSteps.length - 1 && (
                                      <div className={`absolute left-4 top-8 h-[calc(100%-16px)] w-[2px] ${
                                        step.status === 'completed' ? 'bg-green-500' :
                                        step.status === 'current' ? 'bg-gradient-to-b from-blue-500 to-gray-200' :
                                        'bg-gray-200'
                                      }`} />
                                    )}
                                  </div>
                                  <div className={`pb-8 ${index === submissionSteps.length - 1 ? 'pb-0' : ''}`}>
                                    <div className={`font-medium ${
                                      step.status === 'completed' ? 'text-green-600' :
                                      step.status === 'current' ? 'text-blue-600' :
                                      'text-gray-400'
                                    }`}>
                                      {step.title}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-1">{step.description}</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-2">
                                      <span>{step.date}</span>
                                      <span>•</span>
                                      <span>{step.time}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Link 
                      href={`/active-campaigns/${campaign.id}/chat`}
                      className="block w-full"
                    >
                      <button
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat with Brand Manager
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        <Link 
          href="/marketplace"
          className="block mt-8 group"
        >
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5F1F] to-[#FF8F4F] opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-6 py-4 flex items-center justify-center gap-2 text-white font-medium">
              <Sparkles className="w-5 h-5" />
              Find More Campaigns
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
} 