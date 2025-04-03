"use client"

import * as React from "react"
import { CreditCard, Building2, X } from "lucide-react"

interface PaymentMethodFormData {
  type: 'card' | 'bank' | 'ach'
  // Card fields
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  // Bank account fields
  accountNumber?: string
  routingNumber?: string
  accountType?: 'checking' | 'savings'
  bankName?: string
  accountHolderName?: string
}

interface AddPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PaymentMethodFormData) => Promise<void>
}

const paymentTypes = [
  {
    id: 'card',
    name: 'Credit or Debit Card',
    icon: CreditCard,
    description: 'Add a credit or debit card for instant payments'
  },
  {
    id: 'bank',
    name: 'Bank Account',
    icon: Building2,
    description: 'Connect your bank account for direct deposits'
  },
  {
    id: 'ach',
    name: 'ACH Transfer',
    icon: Building2,
    description: 'Set up ACH transfers using your routing number'
  }
]

// Mock data generators for testing
const generateMockCardNumber = () => '4242424242424242'
const generateMockExpiry = () => {
  const date = new Date()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = (date.getFullYear() + 2).toString().slice(-2)
  return `${month}/${year}`
}
const generateMockCVV = () => '123'
const generateMockRoutingNumber = () => '123456789'
const generateMockAccountNumber = () => '987654321'

export default function AddPaymentModal({ isOpen, onClose, onSubmit }: AddPaymentModalProps) {
  const [step, setStep] = React.useState<'type' | 'details'>('type')
  const [selectedType, setSelectedType] = React.useState<PaymentMethodFormData['type']>('card')
  const [formData, setFormData] = React.useState<PaymentMethodFormData>({ type: 'card' })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleTypeSelect = (type: PaymentMethodFormData['type']) => {
    setSelectedType(type)
    setFormData({ 
      type,
      // Pre-fill with mock data based on type
      ...(type === 'card' ? {
        cardNumber: generateMockCardNumber(),
        expiryDate: generateMockExpiry(),
        cvv: generateMockCVV(),
        cardholderName: 'John Doe'
      } : {
        accountNumber: generateMockAccountNumber(),
        routingNumber: generateMockRoutingNumber(),
        accountType: 'checking',
        bankName: 'Mock Bank',
        accountHolderName: 'John Doe'
      })
    })
    setStep('details')
  }

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const groups = numbers.match(/.{1,4}/g) || []
    return groups.join(' ').substr(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return numbers.substr(0, 2) + '/' + numbers.substr(2, 2)
    }
    return numbers
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format inputs
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 3)
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Remove spaces from card number before submitting
      const submissionData = {
        ...formData,
        cardNumber: formData.cardNumber?.replace(/\s/g, '')
      }
      await onSubmit(submissionData)
      onClose()
    } catch (error) {
      console.error('Error adding payment method:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    setStep('type')
  }

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setStep('type')
      setSelectedType('card')
      setFormData({ type: 'card' })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-medium text-gray-900">
            {step === 'type' ? 'Add Payment Method' : 'Enter Payment Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {step === 'type' ? (
          <div className="p-4">
            <div className="space-y-3">
              {paymentTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id as PaymentMethodFormData['type'])}
                  className="w-full flex items-start gap-3 p-3 border rounded-lg hover:border-[#FF5F1F] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{type.name}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4">
            {selectedType === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={formData.cardNumber || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {(selectedType === 'bank' || selectedType === 'ach') && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="John Doe"
                    value={formData.accountHolderName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    required
                  />
                </div>
                {selectedType === 'bank' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Bank of America"
                      value={formData.bankName || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="123456789"
                    value={formData.accountNumber || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    name="routingNumber"
                    placeholder="987654321"
                    value={formData.routingNumber || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent"
                    required
                  >
                    <option value="">Select account type</option>
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-[#FF5F1F] text-white rounded-lg hover:bg-[#FF5F1F]/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Payment Method"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 