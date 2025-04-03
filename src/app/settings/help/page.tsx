"use client"

import * as React from "react"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import Link from "next/link"
import { generateAIResponse } from "@/lib/deepseek"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function HelpCenterPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Influr.ai assistant. I can help you with:\n\n• Understanding your profile and analytics\n• Finding new campaign opportunities\n• Improving your content strategy\n• Managing your payment methods\n• Any other questions about the platform\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const aiResponse = await generateAIResponse(input.trim())
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.')
      console.error('Error getting AI response:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex-1 overflow-hidden">
      <div className="flex flex-col h-full max-w-2xl mx-auto bg-[#FFFBF7]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FFFBF7] border-b">
          <div className="px-3 py-3">
            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <h1 className="font-medium text-gray-900">Help Center</h1>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#FF5F1F] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-[#FF5F1F] text-white'
                      : 'bg-white border text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="mt-1 text-[10px] opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#FF5F1F] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border-red-200 border rounded-2xl px-4 py-3">
                  <div className="text-sm text-red-500">{error}</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="sticky bottom-0 bg-[#FFFBF7] border-t">
          <div className="px-3 py-3">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full px-4 py-3 pr-12 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#FF5F1F] text-white rounded-full hover:bg-[#FF5F1F]/90 transition-colors disabled:opacity-50 disabled:hover:bg-[#FF5F1F]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 