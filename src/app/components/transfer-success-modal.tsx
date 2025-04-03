import * as React from "react"
import { Check, Share2, Twitter, Instagram, X, PartyPopper, Sparkles } from "lucide-react"
import confetti from 'canvas-confetti'
import { toPng } from 'html-to-image'

interface TransferSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export default function TransferSuccessModal({
  isOpen,
  onClose,
  amount,
}: TransferSuccessModalProps) {
  const shareRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF5F1F', '#FFD700', '#FF69B4', '#4CAF50']
      })
    }
  }, [isOpen])

  const handleShare = async (platform: 'twitter' | 'instagram') => {
    if (!shareRef.current) return

    try {
      const dataUrl = await toPng(shareRef.current, {
        quality: 1.0,
        backgroundColor: '#FFFFFF',
      })

      // Create a temporary link to download the image
      const link = document.createElement('a')
      link.download = `transfer-success-${amount}.png`
      link.href = dataUrl
      link.click()

      // Open share dialog based on platform
      if (platform === 'twitter') {
        const text = `Just secured the bag! 💰 $${amount.toLocaleString()} earned from creating awesome content! 🎉 Building my creator empire with @influur! 🚀 #CreatorEconomy #ContentCreator`
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=`, '_blank')
      } else {
        // For Instagram, we can only help download the image since direct sharing isn't possible
        alert('Image downloaded! You can now share it on Instagram 📸')
      }
    } catch (err) {
      console.error('Error generating share image:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Shareable content */}
        <div 
          ref={shareRef} 
          className="relative px-8 pt-6 pb-12 bg-gradient-to-br from-[#FF5F1F] to-[#FF8F1F] text-white text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <PartyPopper className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Sparkles className="w-8 h-8 text-white/30" />
          </div>
          
          {/* Main content */}
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-6">
              <Check className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl font-bold mb-3">
              Secured the Bag! 🎉
            </h2>
            
            <p className="text-2xl opacity-90 mb-4">
              ${amount.toLocaleString()}
            </p>

            <div className="inline-block bg-white/20 rounded-full px-6 py-2 text-lg font-medium">
              Get paid to create 💫
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-2 right-4 text-sm font-medium text-white/70">
            @influur
          </div>
        </div>

        {/* Share buttons */}
        <div className="p-6 space-y-4">
          <p className="text-center text-gray-600 font-medium">
            Share your success! 🎉
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </button>
            
            <button
              onClick={() => handleShare('instagram')}
              className="flex items-center gap-2 px-4 py-2 bg-[#E4405F] text-white rounded-lg hover:bg-[#d93651] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 