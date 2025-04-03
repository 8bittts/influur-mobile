"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Send, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useUser } from "@/lib/contexts/user-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  avatar?: string
  context?: {
    campaign?: string
    company?: string
    productType?: string
    contentType?: string
  }
}

interface BrandManager {
  name: string
  avatar: string
  title: string
  company: string
}

// Update brand managers to use avatar API
const brandManagers: Record<string, BrandManager> = {
  "1": {
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=sarah-chen&backgroundColor=ffdfbf",
    title: "Brand Success Manager",
    company: "FitLife Supplements"
  },
  "2": {
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=alex-rivera&backgroundColor=b6e3f4",
    title: "Campaign Manager",
    company: "TechGear Pro"
  },
  "3": {
    name: "Emma Thompson",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=emma-thompson&backgroundColor=ffd5dc",
    title: "Creative Director",
    company: "StyleBox Fashion"
  },
  "4": {
    name: "Michael Park",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=michael-park&backgroundColor=c1f4c5",
    title: "Content Strategy Lead",
    company: "GreenEats Kitchen"
  },
  "5": {
    name: "Jessica Liu",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=jessica-liu&backgroundColor=e4d5f4",
    title: "Gaming Community Manager",
    company: "GameVerse"
  },
  "6": {
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=david-kim&backgroundColor=fff4d5",
    title: "Beauty Brand Manager",
    company: "BeautyGlow"
  }
}

// Sample initial messages for each campaign
const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm Sarah from FitLife Supplements. I noticed you've joined our Wellness Journey campaign. How can I help you create authentic content that resonates with your audience?",
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: "2",
      role: "user",
      content: "Hi Sarah! I'm thinking about showcasing my morning routine with your supplements. Would that align well with the campaign goals?",
      timestamp: new Date(Date.now() - 85400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "That's a fantastic approach! Morning routines perform really well, and it's a natural way to showcase how our supplements integrate into daily wellness habits. Would you like some specific tips on highlighting key product benefits while keeping it authentic?",
      timestamp: new Date(Date.now() - 84400000)
    },
    {
      id: "4",
      role: "user",
      content: "Yes, that would be really helpful! I want to make sure I'm showcasing the benefits effectively.",
      timestamp: new Date(Date.now() - 83400000)
    },
    {
      id: "5",
      role: "assistant",
      content: "Great! Here are some key points to consider:\n\n1. Start with your genuine morning ritual - maybe meditation or light stretching\n2. Show how our supplements naturally fit into your routine\n3. Highlight the energy boost you feel (but keep it realistic)\n4. Maybe include a quick healthy breakfast recipe\n\nWould you like me to review your content outline before you start filming?",
      timestamp: new Date(Date.now() - 82400000)
    }
  ],
  "2": [
    {
      id: "1",
      role: "assistant",
      content: "Welcome to the TechGear Pro campaign! I'm Alex, and I'm here to help you create an engaging unboxing experience. Have you received your product kit yet?",
      timestamp: new Date(Date.now() - 76400000)
    },
    {
      id: "2",
      role: "user",
      content: "Yes, just got it today! The packaging looks amazing. Any tips for making the unboxing video stand out?",
      timestamp: new Date(Date.now() - 75400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "Excellent! For tech unboxings, lighting and pacing are key. Here's what I recommend:\n\n1. Use natural lighting if possible\n2. Start with the outer packaging design\n3. Create suspense by slowly revealing each component\n4. Focus on the premium materials and build quality\n5. Include your first impressions\n\nWould you like some example shots that have worked well for other creators?",
      timestamp: new Date(Date.now() - 74400000)
    }
  ],
  "3": [
    {
      id: "1",
      role: "assistant",
      content: "Hi! Emma from StyleBox Fashion here. Excited to work with you on our Spring Collection Preview! Our goal is to showcase how versatile these pieces are. What's your initial vision for the content?",
      timestamp: new Date(Date.now() - 66400000)
    },
    {
      id: "2",
      role: "user",
      content: "I was thinking of doing a mix of casual and dressed-up looks. Maybe show how to style one piece multiple ways?",
      timestamp: new Date(Date.now() - 65400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "Love that concept! Styling versatility is exactly what we want to highlight. For TikTok, quick transitions between looks work really well. Would you like me to share some trending transition ideas that could work for this?",
      timestamp: new Date(Date.now() - 64400000)
    }
  ],
  "4": [
    {
      id: "1",
      role: "assistant",
      content: "Hello! Michael from GreenEats Kitchen here. Thanks for joining our Healthy Recipe campaign! Our organic ingredients are perfect for creating vibrant, nutritious dishes. What type of recipe are you thinking of creating?",
      timestamp: new Date(Date.now() - 56400000)
    },
    {
      id: "2",
      role: "user",
      content: "I'd love to create a colorful Buddha bowl recipe! Would that work well with your ingredients?",
      timestamp: new Date(Date.now() - 55400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "A Buddha bowl would be perfect! Our quinoa and fresh vegetables would make a beautiful, Instagram-worthy dish. Would you like our chef's tips for plating and color composition?",
      timestamp: new Date(Date.now() - 54400000)
    }
  ],
  "5": [
    {
      id: "1",
      role: "assistant",
      content: "Hey there! Jessica from GameVerse here. Ready to help you create an epic gaming setup showcase! Our accessories are designed for both aesthetics and performance. What's your current setup like?",
      timestamp: new Date(Date.now() - 46400000)
    },
    {
      id: "2",
      role: "user",
      content: "I have a minimalist setup with white and purple accents. Planning to integrate your RGB accessories into the theme!",
      timestamp: new Date(Date.now() - 45400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "That sounds perfect! Our RGB line can sync with your existing setup. For the video, let's showcase:\n\n1. The clean aesthetic\n2. RGB synchronization\n3. Cable management (very important for minimalist setups)\n4. Performance features\n\nWould you like some lighting tips for filming RGB products?",
      timestamp: new Date(Date.now() - 44400000)
    }
  ],
  "6": [
    {
      id: "1",
      role: "assistant",
      content: "Hi! David from BeautyGlow here. Excited to see how you'll incorporate our skincare line into your content! Our focus is on showing the natural, glowing results. What's your skincare routine like?",
      timestamp: new Date(Date.now() - 36400000)
    },
    {
      id: "2",
      role: "user",
      content: "I usually do a morning and evening routine. Thinking of doing a split-screen before/after with your products!",
      timestamp: new Date(Date.now() - 35400000)
    },
    {
      id: "3",
      role: "assistant",
      content: "Love the split-screen idea! That's perfect for TikTok. Some tips for skincare content:\n\n1. Use natural lighting for the best glow\n2. Show the texture of each product\n3. Demonstrate the application technique\n4. Capture the dewy finish\n\nWould you like some examples of successful before/after transitions?",
      timestamp: new Date(Date.now() - 34400000)
    }
  ]
}

// Add campaign context
const campaignContext: Record<string, {
  company: string
  productType: string
  contentType: string
  goals: string[]
}> = {
  "1": {
    company: "FitLife Supplements",
    productType: "Wellness supplements",
    contentType: "Lifestyle content",
    goals: ["Show authentic daily integration", "Highlight health benefits", "Demonstrate ease of use"]
  },
  "2": {
    company: "TechGear Pro",
    productType: "Tech accessories",
    contentType: "Unboxing and reviews",
    goals: ["Showcase product quality", "Demonstrate features", "Create engaging unboxing experience"]
  },
  "3": {
    company: "StyleBox Fashion",
    productType: "Fashion items",
    contentType: "Style guides",
    goals: ["Show versatility", "Create trendy looks", "Demonstrate styling tips"]
  },
  "4": {
    company: "GreenEats Kitchen",
    productType: "Organic ingredients",
    contentType: "Recipe content",
    goals: ["Create healthy recipes", "Show ingredient quality", "Inspire healthy cooking"]
  },
  "5": {
    company: "GameVerse",
    productType: "Gaming accessories",
    contentType: "Setup showcases",
    goals: ["Display product integration", "Show performance benefits", "Create aesthetic setups"]
  },
  "6": {
    company: "BeautyGlow",
    productType: "Skincare products",
    contentType: "Beauty routines",
    goals: ["Show product application", "Demonstrate results", "Share skincare tips"]
  }
}

// Add storage helper functions at the top level
function getStoredMessages(campaignId: string): Message[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`chat_history_${campaignId}`)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }))
  } catch (error) {
    console.error('Error loading chat history:', error)
    return []
  }
}

function storeMessages(campaignId: string, messages: Message[]) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`chat_history_${campaignId}`, JSON.stringify(messages))
  } catch (error) {
    console.error('Error saving chat history:', error)
  }
}

export default function ChatPage() {
  const router = useRouter()
  const { campaignId } = useParams()
  const { profileImage } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const brandManager = brandManagers[campaignId as string]
  const userAvatar = profileImage || "/placeholder-profile.jpg"

  // Load messages from storage or initialize with default messages
  useEffect(() => {
    const loadMessages = () => {
      const storedMessages = getStoredMessages(campaignId as string)
      
      if (storedMessages.length > 0) {
        setMessages(storedMessages)
      } else {
        // Initialize with default messages if no stored messages exist
        const defaultMessages = initialMessages[campaignId as string] || []
        setMessages(defaultMessages)
        storeMessages(campaignId as string, defaultMessages)
      }
      setIsInitialized(true)
    }

    if (campaignId && !isInitialized) {
      loadMessages()
    }
  }, [campaignId, isInitialized])

  // Save messages to storage whenever they change
  useEffect(() => {
    if (isInitialized && campaignId) {
      storeMessages(campaignId as string, messages)
    }
  }, [messages, campaignId, isInitialized])

  // Calculate response time based on message length
  const getResponseTime = (message: string) => {
    const wordCount = message.split(/\s+/).length
    const baseDelay = 500 // Base delay in milliseconds
    const perWordDelay = 50 // Additional delay per word
    return Math.min(baseDelay + (wordCount * perWordDelay), 3000) // Cap at 3 seconds
  }

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to generate system prompt based on campaign context
  const generateSystemPrompt = (campaignId: string) => {
    const context = campaignContext[campaignId]
    if (!context) return ""

    return `You are a helpful and professional brand manager for ${context.company}. 
You're assisting a content creator with their campaign featuring ${context.productType}.
The content type is ${context.contentType}.
Campaign goals: ${context.goals.join(", ")}.
Keep responses concise, friendly, and focused on helping the creator make engaging content.
Provide specific, actionable advice that aligns with the campaign goals.`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
      avatar: userAvatar,
      context: {
        campaign: campaignId as string,
        company: campaignContext[campaignId as string]?.company,
        productType: campaignContext[campaignId as string]?.productType,
        contentType: campaignContext[campaignId as string]?.contentType
      }
    }

    // Update messages immediately for user feedback
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const systemPrompt = generateSystemPrompt(campaignId as string)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: userMessage.content }
          ],
          campaignContext: campaignContext[campaignId as string]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const responseTime = getResponseTime(data.content)
      await new Promise(resolve => setTimeout(resolve, responseTime))
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        avatar: brandManager.avatar,
        context: userMessage.context
      }

      // Update messages with assistant's response
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error toast or notification here
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] flex flex-col">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="container mx-auto max-w-md px-3 py-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={brandManager.avatar} alt={brandManager.name} />
                <AvatarFallback>{brandManager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-medium text-gray-900">{brandManager.name}</h1>
                <p className="text-sm text-gray-500">{brandManager.title} at {brandManager.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-md px-3 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`text-xs text-gray-500 px-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.role === 'user' ? 'You' : brandManager.name}
                </div>
                <div className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-6 h-6">
                    <AvatarImage 
                      src={message.role === 'user' ? userAvatar : brandManager.avatar} 
                      alt={message.role === 'user' ? 'You' : brandManager.name} 
                    />
                    <AvatarFallback>
                      {message.role === 'user' ? 'Y' : brandManager.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`
                    max-w-[75%] rounded-2xl px-4 py-2
                    ${message.role === 'user' 
                      ? 'bg-[#FF5F1F] text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }
                  `}>
                    <div className="text-sm prose prose-sm dark:prose-invert marker:text-gray-500">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Override default elements to match chat styling
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="mb-2 last:mb-0 list-disc pl-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="mb-2 last:mb-0 list-decimal pl-4" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => (
                            <strong className={`font-semibold ${message.role === 'user' ? 'text-white' : 'text-gray-900'}`} {...props} />
                          ),
                          em: ({node, ...props}) => (
                            <em className={message.role === 'user' ? 'text-white/90' : 'text-gray-700'} {...props} />
                          ),
                          code: ({node, ...props}) => (
                            <code className={`px-1 py-0.5 rounded ${
                              message.role === 'user' 
                                ? 'bg-white/10 text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`} {...props} />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <p className={`
                      text-xs mt-1
                      ${message.role === 'user' ? 'text-white/70' : 'text-gray-500'}
                    `}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col gap-1 items-start">
                <div className="text-xs text-gray-500 px-2">
                  {brandManager.name} is typing...
                </div>
                <div className="flex items-end gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={brandManager.avatar} alt={brandManager.name} />
                    <AvatarFallback>{brandManager.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="container mx-auto max-w-md px-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message brand manager..."
              className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F1F]/20"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 text-[#FF5F1F] hover:bg-[#FF5F1F]/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 