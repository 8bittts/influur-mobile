"use client"

import * as React from "react"
import { ArrowLeft, Plus, CreditCard, Trash2, Building2 } from "lucide-react"
import Link from "next/link"
import AddPaymentModal from "./_components/add-payment-modal"

interface PaymentMethod {
  id: string
  type: "card" | "bank" | "ach"
  lastFour?: string
  expiryDate?: string
  name?: string
  email?: string
  bankName?: string
  accountType?: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      lastFour: "4242",
      expiryDate: "12/24",
      name: "Sarah Johnson",
      isDefault: true
    },
    {
      id: "2",
      type: "bank",
      bankName: "Bank of America",
      accountType: "Checking",
      lastFour: "9876",
      name: "Sarah Johnson",
      isDefault: false
    }
  ])

  const [isAddingNew, setIsAddingNew] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const handleDelete = async (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  const handleAddNew = async (data: any) => {
    // In a real app, this would make an API call
    const newMethod: PaymentMethod = {
      id: Math.random().toString(),
      type: data.type,
      isDefault: false,
      ...(data.type === 'card' ? {
        lastFour: data.cardNumber.slice(-4),
        expiryDate: data.expiryDate,
        name: data.cardholderName
      } : {
        bankName: data.bankName || 'Bank Account',
        accountType: data.accountType,
        lastFour: data.accountNumber.slice(-4),
        name: data.accountHolderName
      })
    }
    
    setPaymentMethods(prev => [...prev, newMethod])
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFFBF7] border-b z-10">
        <div className="container mx-auto max-w-md px-3 py-3">
          <div className="flex justify-between items-center">
            <Link href="/settings" className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Payment Methods</h1>
            <div className="w-5" />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-3 py-4">
        <div className="space-y-6">
          {/* Payment Methods List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Your Payment Methods</h2>
            </div>
            <div className="divide-y">
              {paymentMethods.map(method => (
                <div key={method.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {method.type === "card" ? (
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      <div>
                        {method.type === "card" ? (
                          <>
                            <div className="text-sm font-medium text-gray-900">
                              •••• {method.lastFour}
                              {method.isDefault && (
                                <span className="ml-2 text-xs text-[#FF5F1F]">Default</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              Expires {method.expiryDate}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-gray-900">
                              {method.bankName}
                              {method.isDefault && (
                                <span className="ml-2 text-xs text-[#FF5F1F]">Default</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {method.accountType} •••• {method.lastFour}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <>
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="text-xs text-[#FF5F1F] font-medium hover:underline"
                          >
                            Set Default
                          </button>
                          <button
                            onClick={() => handleDelete(method.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Payment Method */}
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Payment Method</span>
          </button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center px-6">
            Your payment information is securely stored and processed by our payment provider.
            We never store your full card details.
          </p>
        </div>
      </div>

      <AddPaymentModal
        isOpen={isAddingNew}
        onClose={() => setIsAddingNew(false)}
        onSubmit={handleAddNew}
      />
    </div>
  )
} 