"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Settings, Wallet, TrendingUp, Clock, AlertCircle, CheckCircle2, ChevronRight, CreditCard, DollarSign, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Area, AreaChart } from "recharts"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import WithdrawalModal from "@/app/components/withdrawal-modal"
import AddPaymentMethodModal from "@/app/components/add-payment-method-modal"

// Mock payment history data
const PAYMENT_HISTORY = [
  {
    id: "p1",
    brand: "Nike",
    amount: 1500,
    status: "completed",
    date: "2024-03-10",
    campaign: "Summer Collection Launch",
    paymentMethod: "PayPal",
    processingTime: 2 // days
  },
  {
    id: "p2",
    brand: "Apple",
    amount: 2000,
    status: "pending",
    date: "2024-03-12",
    campaign: "Tech Review Series",
    paymentMethod: "Pending",
    processingTime: null
  },
  {
    id: "p3",
    brand: "Adidas",
    amount: 1200,
    status: "completed",
    date: "2024-02-28",
    campaign: "Fitness Challenge",
    paymentMethod: "Bank Transfer",
    processingTime: 3
  },
  {
    id: "p4",
    brand: "Samsung",
    amount: 1800,
    status: "completed",
    date: "2024-02-15",
    campaign: "Mobile Photography",
    paymentMethod: "PayPal",
    processingTime: 1
  }
]

// Mock brand payment analytics
const BRAND_ANALYTICS = [
  { brand: "Nike", avgProcessingDays: 2, totalPaid: 12500, campaigns: 8 },
  { brand: "Apple", avgProcessingDays: 1, totalPaid: 18000, campaigns: 6 },
  { brand: "Adidas", avgProcessingDays: 3, totalPaid: 8500, campaigns: 5 },
  { brand: "Samsung", avgProcessingDays: 1, totalPaid: 15000, campaigns: 7 }
].sort((a, b) => a.avgProcessingDays - b.avgProcessingDays)

// Mock data for different time periods
const INCOME_DATA = {
  "7D": [
    { date: "Mon", income: 1200, campaigns: 2 },
    { date: "Tue", income: 800, campaigns: 1 },
    { date: "Wed", income: 2100, campaigns: 3 },
    { date: "Thu", income: 1500, campaigns: 2 },
    { date: "Fri", income: 1800, campaigns: 2 },
    { date: "Sat", income: 2500, campaigns: 4 },
    { date: "Sun", income: 1900, campaigns: 3 },
  ],
  "1M": [
    { date: "Week 1", income: 5500, campaigns: 8 },
    { date: "Week 2", income: 7200, campaigns: 10 },
    { date: "Week 3", income: 6800, campaigns: 9 },
    { date: "Week 4", income: 8500, campaigns: 12 },
  ],
  "3M": [
    { date: "Jan", income: 22000, campaigns: 28 },
    { date: "Feb", income: 25500, campaigns: 32 },
    { date: "Mar", income: 28000, campaigns: 35 },
  ],
  "1Y": [
    { date: "Q1", income: 75500, campaigns: 95 },
    { date: "Q2", income: 82000, campaigns: 102 },
    { date: "Q3", income: 88500, campaigns: 110 },
    { date: "Q4", income: 95000, campaigns: 118 },
  ],
}

type TimePeriod = "7D" | "1M" | "3M" | "1Y"

// Payment methods interface
interface PaymentMethod {
  id: string
  type: "paypal" | "bank" | "stripe" | "venmo"
  label: string
  connected: boolean
  lastUsed?: string
}

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"history" | "analytics">("history")
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1M")
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
  const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false)
  const currentData = INCOME_DATA[timePeriod]
  
  // Calculate total income and average
  const totalIncome = currentData.reduce((sum, item) => sum + item.income, 0)
  const averageIncome = totalIncome / currentData.length
  const totalCampaigns = currentData.reduce((sum, item) => sum + item.campaigns, 0)

  const mockBankAccount = {
    name: "Chase Business Account",
    last4: "4321"
  }
  
  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFFBF7] border-b z-10">
        <div className="container mx-auto max-w-md px-3 py-3">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="p-1 -ml-1 hover:bg-black/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Wallet</h1>
            <Link href="/settings" className="p-1 -mr-1 hover:bg-black/5 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-3 py-4 space-y-4">
        {/* Balance Card with Payment Methods */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl border shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-sm font-medium text-gray-600">Available Balance</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#FF5F1F] to-[#FF8F1F] bg-clip-text text-transparent">
                    $1,250.00
                  </span>
                </div>
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+28% vs last month</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsWithdrawalOpen(true)}
                className="bg-gradient-to-r from-[#FF5F1F] to-[#FF8F1F] text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg shadow-orange-200/50 hover:shadow-orange-200/80 transition-shadow"
              >
                Withdraw
              </motion.button>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Payment Methods</span>
                <Link href="/settings/payment" className="text-[#FF5F1F] font-medium">
                  Manage
                </Link>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-orange-100">
                <div className="w-10 h-10 bg-[#FF5F1F]/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#FF5F1F]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Chase Business Account</div>
                  <div className="text-xs text-gray-500">****4321</div>
                </div>
                <div className="px-2 py-1 bg-green-50 rounded-full">
                  <span className="text-xs text-green-600">Default</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAddPaymentMethodOpen(true)}
                className="w-full flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-orange-100 hover:border-[#FF5F1F] transition-colors"
              >
                <div className="w-10 h-10 bg-[#FF5F1F]/10 rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#FF5F1F]" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">Add Payment Method</div>
                  <div className="text-xs text-gray-500">PayPal, Venmo, or Stripe</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Income Overview */}
        <div className="bg-white rounded-xl border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">Income Overview</h2>
            <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7D">7 Days</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-sm text-orange-600">Total Income</div>
              <div className="text-lg font-semibold text-orange-900">
                ${totalIncome.toLocaleString()}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm text-blue-600">Average</div>
              <div className="text-lg font-semibold text-blue-900">
                ${Math.round(averageIncome).toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-sm text-purple-600">Campaigns</div>
              <div className="text-lg font-semibold text-purple-900">
                {totalCampaigns}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5F1F" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF5F1F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f4" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '8px 12px'
                  }}
                  labelStyle={{ color: '#111827', fontWeight: 500 }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Income']}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#FF5F1F"
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                  dot={{ fill: '#FF5F1F', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h2 className="font-medium text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y">
            {currentData.map((item, index) => (
              <div key={index} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#FF5F1F]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Campaign Payment
                    </div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    +${item.income.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.campaigns} campaign{item.campaigns > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`flex-1 text-sm font-medium px-4 py-2 text-center ${
              activeTab === "history" 
                ? "text-[#FF5F1F] border-b-2 border-[#FF5F1F]" 
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Payment History
          </button>
          <button 
            className={`flex-1 text-sm font-medium px-4 py-2 text-center ${
              activeTab === "analytics" 
                ? "text-[#FF5F1F] border-b-2 border-[#FF5F1F]" 
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Brand Analytics
          </button>
        </div>

        {/* Payment History */}
        {activeTab === "history" && (
          <div className="space-y-2">
            {PAYMENT_HISTORY.map((payment) => (
              <Link
                key={payment.id}
                href={`/my-campaigns?campaign=${payment.campaign}`}
                className="block bg-white rounded-lg border p-3 hover:border-[#FF5F1F] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{payment.brand}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{payment.campaign}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                        {payment.paymentMethod}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        payment.status === "completed" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {payment.status === "completed" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Paid</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FF5F1F] font-medium">${payment.amount}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Brand Analytics */}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Average Payment Processing Time</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BRAND_ANALYTICS}>
                    <XAxis 
                      dataKey="brand" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                      tickFormatter={(value) => `${value}d`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value) => [`${value} days`, 'Processing Time']}
                    />
                    <Bar 
                      dataKey="avgProcessingDays" 
                      fill="#FF5F1F"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              {BRAND_ANALYTICS.map((brand) => (
                <div key={brand.brand} className="bg-white rounded-lg border p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{brand.brand}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{brand.campaigns} campaigns completed</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#FF5F1F] font-medium">${brand.totalPaid.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Avg. {brand.avgProcessingDays} days to pay
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={isAddPaymentMethodOpen}
        onClose={() => setIsAddPaymentMethodOpen(false)}
      />
      
      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalOpen}
        onClose={() => setIsWithdrawalOpen(false)}
        availableBalance={1250}
        bankAccount={mockBankAccount}
      />
    </div>
  )
} 