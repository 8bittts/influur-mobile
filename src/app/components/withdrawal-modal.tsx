/**
 * WithdrawalModal Component
 * 
 * A modal dialog that allows users to withdraw funds to their bank account.
 * Includes amount input, account selection, and processing status.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <WithdrawalModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   availableBalance={1000}
 *   bankAccount={{
 *     name: "Chase Bank",
 *     last4: "1234"
 *   }}
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
interface BankAccount {
  /** Name of the bank account */
  name: string
  /** Last 4 digits of the account number */
  last4: string
}

interface WithdrawalModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback function to close the modal */
  onClose: () => void
  /** Available balance for withdrawal */
  availableBalance: number
  /** Bank account information */
  bankAccount: BankAccount
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
  form: "space-y-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  inputContainer: "relative",
  inputPrefix: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  inputSuffix: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  input: "block w-full pl-7 pr-12 py-2 border rounded-lg focus:ring-[#FF5F1F] focus:border-[#FF5F1F]",
  balance: "mt-1 text-sm text-gray-500",
  accountContainer: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg",
  accountIcon: "w-10 h-10 bg-white rounded-full flex items-center justify-center",
  accountName: "font-medium text-gray-900",
  accountNumber: "text-sm text-gray-500",
  notice: "bg-blue-50 rounded-lg p-3 flex items-start gap-2",
  noticeIcon: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5",
  noticeText: "text-sm text-blue-600",
  submitButton: "w-full bg-[#FF5F1F] text-white py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed",
  loadingSpinner: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
} as const

const PROCESSING_DELAY = 2000 // ms

/**
 * Modal dialog for withdrawing funds to a bank account
 * Handles amount input, account selection, and processing status
 */
export default function WithdrawalModal({ 
  isOpen, 
  onClose, 
  availableBalance, 
  bankAccount 
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState<string>(availableBalance.toString())
  const [isProcessing, setIsProcessing] = useState(false)

  /**
   * Handles the withdrawal process
   * Simulates an API call with a delay
   */
  const handleWithdraw = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, PROCESSING_DELAY))
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.content}>
        <div className={MODAL_STYLES.container}>
          <div className={MODAL_STYLES.header}>
            <div className="text-center flex-1">
              <h2 className={MODAL_STYLES.title}>Withdraw Funds</h2>
              <p className={MODAL_STYLES.subtitle}>Transfer money to your bank account</p>
            </div>
            <button
              onClick={onClose}
              className={MODAL_STYLES.closeButton}
            >
              <X className={MODAL_STYLES.closeIcon} />
            </button>
          </div>

          <div className={MODAL_STYLES.form}>
            <div>
              <label className={MODAL_STYLES.label}>Amount</label>
              <div className={MODAL_STYLES.inputContainer}>
                <div className={MODAL_STYLES.inputPrefix}>
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '')
                    const numValue = parseInt(value || '0')
                    if (numValue <= availableBalance) {
                      setAmount(value)
                    }
                  }}
                  className={MODAL_STYLES.input}
                  placeholder="0.00"
                  disabled={isProcessing}
                />
                <div className={MODAL_STYLES.inputSuffix}>
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              <p className={MODAL_STYLES.balance}>
                Available balance: ${availableBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <label className={MODAL_STYLES.label}>Withdrawal Account</label>
              <div className={MODAL_STYLES.accountContainer}>
                <div className={MODAL_STYLES.accountIcon}>
                  <Bank className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className={MODAL_STYLES.accountName}>{bankAccount.name}</div>
                  <div className={MODAL_STYLES.accountNumber}>****{bankAccount.last4}</div>
                </div>
              </div>
            </div>

            <div className={MODAL_STYLES.notice}>
              <AlertCircle className={MODAL_STYLES.noticeIcon} />
              <div className={MODAL_STYLES.noticeText}>
                Withdrawals typically take 1-2 business days to process. You'll receive an email confirmation once the transfer is complete.
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWithdraw}
            disabled={isProcessing || !amount}
            className={MODAL_STYLES.submitButton}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className={MODAL_STYLES.loadingSpinner} />
                <span>Processing...</span>
              </div>
            ) : (
              'Withdraw Funds'
            )}
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 