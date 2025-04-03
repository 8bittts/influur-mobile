"use client"

import * as React from "react"
import { ArrowLeft, Upload, Instagram, TrendingUp, CheckCircle2, AlertCircle, Youtube, Music2, ArrowRight, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useUser } from "@/lib/contexts/user-context"
import ProfileImage from "@/components/profile-image"

interface ProfileFormData {
  fullName: string
  username: string
  email: string
  bio: string
  instagram: string
  tiktok: string
  youtube: string
  avatar?: string
}

interface NetworkStats {
  network: string
  followers: number
  engagement: number
  growth: number
  posts: number
}

interface NetworkGrowth {
  month: string
  instagram: number
  tiktok: number
  youtube: number
}

interface Recommendation {
  type: 'improvement' | 'opportunity'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  action?: string
  actionLink?: string
}

const mockGrowthData: NetworkGrowth[] = [
  { 
    month: 'Jan',
    instagram: 10000,
    tiktok: 15000,
    youtube: 5000
  },
  { 
    month: 'Feb',
    instagram: 12000,
    tiktok: 18000,
    youtube: 5500
  },
  { 
    month: 'Mar',
    instagram: 13500,
    tiktok: 22000,
    youtube: 6200
  },
  { 
    month: 'Apr',
    instagram: 15000,
    tiktok: 25000,
    youtube: 7000
  },
  { 
    month: 'May',
    instagram: 18000,
    tiktok: 30000,
    youtube: 8500
  },
  { 
    month: 'Jun',
    instagram: 20000,
    tiktok: 35000,
    youtube: 10000
  }
]

const networkStats: NetworkStats[] = [
  {
    network: 'Instagram',
    followers: 20000,
    engagement: 4.5,
    growth: 15,
    posts: 450
  },
  {
    network: 'TikTok',
    followers: 35000,
    engagement: 8.2,
    growth: 25,
    posts: 200
  },
  {
    network: 'YouTube',
    followers: 10000,
    engagement: 6.8,
    growth: 12,
    posts: 48
  }
]

const recommendations: Recommendation[] = [
  {
    type: 'improvement',
    title: 'Increase Instagram Story Engagement',
    description: 'Your story engagement is lower than your post engagement. Try using more interactive elements like polls and questions.',
    impact: 'high',
    action: 'View Story Tips',
    actionLink: '/tips/instagram-stories'
  },
  {
    type: 'opportunity',
    title: 'Perfect for Sustainable Fashion Campaign',
    description: 'Based on your content and audience, you are a great fit for an upcoming sustainable fashion campaign.',
    impact: 'high',
    action: 'View Campaign',
    actionLink: '/campaigns/sustainable-fashion'
  },
  {
    type: 'improvement',
    title: 'Optimize YouTube Thumbnails',
    description: 'Custom thumbnails with clear text and engaging images can increase click-through rates by 30%.',
    impact: 'medium',
    action: 'Learn More',
    actionLink: '/tips/youtube-thumbnails'
  }
]

export default function ProfilePage() {
  const { name, setName, role, setRole, profileImage, setProfileImage } = useUser()
  const [formData, setFormData] = React.useState<ProfileFormData>({
    fullName: "Sarah Johnson",
    username: "sarahcreates",
    email: "sarah@example.com",
    bio: "Lifestyle and fashion content creator passionate about sustainable living",
    instagram: "@sarahcreates",
    tiktok: "@sarahcreates",
    youtube: "@SarahCreates",
    avatar: "https://placekitten.com/200/200"
  })

  const [isSaving, setIsSaving] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFBF7] border-b">
        <div className="container mx-auto max-w-md px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/settings"
              className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-md px-4 py-6">
        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <ProfileImage size="lg" className="w-24 h-24" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-[#FF5F1F] text-white rounded-full shadow-lg hover:bg-[#FF5F1F]/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">
                Upload a profile picture
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                placeholder="Your role"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
              />
            </div>
          </div>

          {/* Network Growth Analytics */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Network Growth</h2>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} />
                    <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} />
                    <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {networkStats.map(stat => (
                  <div key={stat.network} className="text-center">
                    <div className="text-sm font-medium text-gray-900">{stat.network}</div>
                    <div className="text-lg font-semibold text-[#FF5F1F]">
                      {stat.followers.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">followers</div>
                    <div className="text-xs text-green-600">+{stat.growth}% growth</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Integrations */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Connected Accounts</h2>
            </div>
            <div className="divide-y">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Instagram</div>
                    <div className="text-xs text-gray-500">{formData.instagram}</div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>

              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <Music2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">TikTok</div>
                    <div className="text-xs text-gray-500">{formData.tiktok}</div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>

              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <Youtube className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">YouTube</div>
                    <div className="text-xs text-gray-500">{formData.youtube}</div>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Recommendations</h2>
            </div>
            <div className="divide-y">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      rec.type === 'improvement' ? 'bg-blue-50' : 'bg-green-50'
                    }`}>
                      {rec.type === 'improvement' ? (
                        <TrendingUp className={`w-4 h-4 text-blue-600`} />
                      ) : (
                        <AlertCircle className={`w-4 h-4 text-green-600`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          rec.impact === 'high' 
                            ? 'bg-red-50 text-red-600' 
                            : rec.impact === 'medium'
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {rec.impact} impact
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{rec.description}</p>
                      {rec.action && (
                        <Link 
                          href={rec.actionLink || '#'} 
                          className="mt-2 inline-flex items-center text-sm text-[#FF5F1F] font-medium hover:underline"
                        >
                          {rec.action}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#FF5F1F] text-white py-2 rounded-lg font-medium hover:bg-[#FF5F1F]/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
} 