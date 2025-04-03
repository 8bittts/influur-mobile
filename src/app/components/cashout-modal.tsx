"use client"

import * as React from "react"
import { X, CreditCard, Building2, ArrowRight } from "lucide-react"
import TransferSuccessModal from "./transfer-success-modal"

interface PaymentMethod {
  id: string
  type: 'bank' | 'card'
  last4: string
  name: string
  isDefault: boolean
}

interface CashoutModalProps {
  isOpen: boolean
  onClose: () => void
  availableBalance: number
  paymentMethods: PaymentMethod[]
}

export default function CashoutModal({
  isOpen,
  onClose,
  availableBalance,
  paymentMethods
}: CashoutModalProps) {
  const [step, setStep] = React.useState<'select' | 'confirm'>('select')
  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethod | null>(
    paymentMethods.find(m => m.isDefault) || null
  )
  const [amount, setAmount] = React.useState<string>(availableBalance.toString())
  const [showSuccess, setShowSuccess] = React.useState(false)

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStep('select')
      setSelectedMethod(paymentMethods.find(m => m.isDefault) || null)
      setAmount(availableBalance.toString())
      setShowSuccess(false)
    }
  }, [isOpen, paymentMethods, availableBalance])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'select' && selectedMethod) {
      setStep('confirm')
    } else if (step === 'confirm') {
      // Show success modal
      setShowSuccess(true)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    const numValue = parseInt(value || '0')
    if (numValue <= availableBalance) {
      setAmount(value)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
        <div className="bg-white rounded-2xl max-w-md w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Cash Out</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-4 space-y-4">
              {step === 'select' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-lg focus:ring-[#FF5F1F] focus:border-[#FF5F1F]"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Available balance: ${availableBalance.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Payment Method
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method)}
                          className={`w-full flex items-center justify-between p-3 border rounded-lg ${
                            selectedMethod?.id === method.id
                              ? 'border-[#FF5F1F] bg-[#FF5F1F]/5'
                              : 'border-gray-300 hover:border-[#FF5F1F]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                              {method.type === 'card' ? (
                                <CreditCard className="w-5 h-5 text-gray-700" />
                              ) : (
                                <Building2 className="w-5 h-5 text-gray-700" />
                              )}
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-gray-900">
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ending in {method.last4}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              selectedMethod?.id === method.id
                                ? 'border-[#FF5F1F] bg-[#FF5F1F]'
                                : 'border-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium text-gray-900">
                        ${parseInt(amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">To</span>
                      <span className="font-medium text-gray-900">
                        {selectedMethod?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimated Arrival</span>
                      <span className="font-medium text-gray-900">
                        Next business day
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    By continuing, you agree to our terms of service and transfer policies.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <button
                type="submit"
                disabled={!selectedMethod || !amount}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#FF5F1F] text-white rounded-lg hover:bg-[#FF5F1F]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {step === 'select' ? 'Continue' : 'Confirm Transfer'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <TransferSuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          onClose()
        }}
        amount={parseInt(amount)}
      />
    </>
  )
} 