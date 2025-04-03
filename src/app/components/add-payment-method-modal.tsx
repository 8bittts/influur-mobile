/**
 * AddPaymentMethodModal Component
 * 
 * A modal dialog that allows users to add new payment methods.
 * Displays a list of available payment methods with their details and fees.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <AddPaymentMethodModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 * />
 * ```
 */

"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Building2 as Bank, CreditCard, AlertCircle, Clock, DollarSign, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface PaymentMethod {
  /** Unique identifier for the payment method */
  id: string
  /** Display name of the payment method */
  name: string
  /** Description of the payment method */
  description: string
  /** Icon component for the payment method */
  icon: React.ComponentType<{ className?: string }>
  /** Estimated time for transfers */
  eta: string
  /** Fee structure for the payment method */
  fee: string
}

interface AddPaymentMethodModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback function to close the modal */
  onClose: () => void
}

// Constants
const MODAL_STYLES = {
  content: "sm:max-w-md p-0",
  container: "p-6 space-y-6",
  header: "flex items-center justify-between",
  title: "text-xl font-semibold text-gray-900",
  subtitle: "text-sm text-gray-500 mt-1",
  closeButton: "p-2 hover:bg-gray-100 rounded-full transition-colors -mr-2",
  closeIcon: "w-5 h-5 text-gray-500",
  methods: "space-y-3",
  methodButton: "w-full flex items-start gap-4 p-4 bg-white rounded-xl border hover:border-[#FF5F1F] transition-colors",
  methodButtonSelected: "border-[#FF5F1F] bg-orange-50",
  methodIcon: "w-10 h-10 bg-[#FF5F1F]/10 rounded-full flex items-center justify-center flex-shrink-0",
  methodIconSvg: "w-5 h-5 text-[#FF5F1F]",
  methodContent: "flex-1 text-left",
  methodName: "font-medium text-gray-900",
  recommendedBadge: "px-2 py-0.5 bg-green-50 rounded-full text-xs text-green-600",
  methodDescription: "text-sm text-gray-500 mt-0.5",
  methodDetails: "flex items-center gap-3 mt-2",
  methodDetail: "text-xs text-gray-500 flex items-center gap-1",
  methodDetailIcon: "w-3 h-3",
  notice: "flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-600",
  noticeIcon: "w-5 h-5 flex-shrink-0"
} as const

const PROCESSING_DELAY = 1500 // ms

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bank",
    name: "Bank Account",
    description: "Connect your bank account directly",
    icon: Bank,
    eta: "2-3 business days",
    fee: "No fees"
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Connect your PayPal account",
    icon: () => (
      <svg className={MODAL_STYLES.methodIconSvg} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.067 8.478c.492.315.844.825.983 1.39a6.344 6.344 0 0 1-.002 2.397 4.469 4.469 0 0 1-.473 1.397 5.557 5.557 0 0 1-.911 1.194 5.167 5.167 0 0 1-1.226.911 6.344 6.344 0 0 1-1.437.527c-.502.108-1.018.163-1.535.163h-2.944l-.771 4.835H8.933l-.184 1.108H5.462l1.85-11.602h7.014c.548 0 1.095.063 1.63.19.437.102.86.268 1.253.495l.858.478zm-2.21.913a3.252 3.252 0 0 0-1.428-.33h-5.352l-1.327 8.377h2.287l.771-4.835h2.945c.666 0 1.328-.126 1.95-.374a4.547 4.547 0 0 0 1.657-1.072c.454-.454.795-.988 1.003-1.577a4.004 4.004 0 0 0 .252-2.03 2.166 2.166 0 0 0-.582-1.113 2.89 2.89 0 0 0-1.38-.687 4.388 4.388 0 0 0-1.667-.154l-.129.795z"/>
      </svg>
    ),
    eta: "Instant",
    fee: "2.9% + $0.30"
  },
  {
    id: "venmo",
    name: "Venmo",
    description: "Connect your Venmo account",
    icon: () => (
      <svg className={MODAL_STYLES.methodIconSvg} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.766 3H4.234A1.234 1.234 0 0 0 3 4.234v15.532C3 20.448 3.552 21 4.234 21h15.532A1.234 1.234 0 0 0 21 19.766V4.234A1.234 1.234 0 0 0 19.766 3zm-2.59 5.877c-.194 1.035-.98 2.335-1.766 3.634-1.193 1.976-2.41 3.544-2.41 3.544-.43.554-1.013.673-1.55.363-.537-.31-2.793-3.494-2.793-3.494-.43-.554-.43-1.13 0-1.684.43-.554 1.013-.673 1.55-.363.537.31 1.766 2.335 1.766 2.335 1.193-1.976 1.766-3.634 1.766-4.188 0-.554.43-1.13 1.193-1.13.764 0 1.193.576 1.193 1.13 0 .554.43-.554.43-.554.43-.554 1.013-.673 1.55-.363.537.31.43.886.236 1.92z"/>
      </svg>
    ),
    eta: "1-2 business days",
    fee: "1.9% + $0.10"
  },
  {
    id: "stripe",
    name: "Credit Card",
    description: "Add a credit or debit card",
    icon: CreditCard,
    eta: "Instant",
    fee: "2.9% + $0.30"
  }
] as const

/**
 * Modal dialog for adding new payment methods
 * Displays available payment options with their details and fees
 */
export default function AddPaymentMethodModal({ isOpen, onClose }: AddPaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  /**
   * Handles the selection of a payment method
   * Simulates the connection process with a delay
   * @param methodId - ID of the selected payment method
   */
  const handleMethodSelect = async (methodId: string) => {
    setSelectedMethod(methodId)
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY))
    
    // In a real implementation, this would redirect to the provider's OAuth flow
    // or open their SDK for connection
    window.alert(`This would redirect to ${methodId}'s connection flow`)
    
    setIsProcessing(false)
    setSelectedMethod(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.content}>
        <div className={MODAL_STYLES.container}>
          <div className={MODAL_STYLES.header}>
            <div className="text-center flex-1">
              <h2 className={MODAL_STYLES.title}>Add Payment Method</h2>
              <p className={MODAL_STYLES.subtitle}>Choose how you want to receive payments</p>
            </div>
            <button
              onClick={onClose}
              className={MODAL_STYLES.closeButton}
            >
              <X className={MODAL_STYLES.closeIcon} />
            </button>
          </div>

          <div className={MODAL_STYLES.methods}>
            {PAYMENT_METHODS.map((method) => (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMethodSelect(method.id)}
                disabled={isProcessing}
                className={cn(
                  MODAL_STYLES.methodButton,
                  selectedMethod === method.id && MODAL_STYLES.methodButtonSelected
                )}
              >
                <div className={MODAL_STYLES.methodIcon}>
                  <method.icon className={MODAL_STYLES.methodIconSvg} />
                </div>
                <div className={MODAL_STYLES.methodContent}>
                  <div className="flex items-center gap-2">
                    <span className={MODAL_STYLES.methodName}>{method.name}</span>
                    {method.id === "bank" && (
                      <span className="px-2 py-0.5 bg-green-50 rounded-full text-xs text-green-600">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{method.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {method.eta}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {method.fee}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>
              For testing purposes, clicking any option will show an alert instead of redirecting to the actual payment provider.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 