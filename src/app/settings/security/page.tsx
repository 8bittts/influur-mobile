"use client"

import * as React from "react"
import { ArrowLeft, Eye, EyeOff, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

interface SecurityState {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  showCurrentPassword: boolean
  showNewPassword: boolean
  showConfirmPassword: boolean
  twoFactorEnabled: boolean
}

export default function SecurityPage() {
  const [state, setState] = React.useState<SecurityState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    twoFactorEnabled: false
  })

  const [isSaving, setIsSaving] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (field: "showCurrentPassword" | "showNewPassword" | "showConfirmPassword") => {
    setState(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const toggleTwoFactor = () => {
    setState(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Reset password fields
    setState(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }))
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
            <h1 className="text-lg font-semibold text-gray-900">Security Settings</h1>
            <div className="w-5" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-3 py-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Change Password */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Change Password</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={state.showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={state.currentPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("showCurrentPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {state.showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={state.showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={state.newPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("showNewPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {state.showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={state.showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("showConfirmPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {state.showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium text-gray-900">Two-Factor Authentication</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Two-Factor Authentication
                    </div>
                    <div className="text-xs text-gray-500">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleTwoFactor}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    state.twoFactorEnabled ? "bg-[#FF5F1F]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      state.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
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

          {/* Security Tips */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-900">Security Tips</h3>
            </div>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Use a strong password with at least 8 characters</li>
              <li>• Include numbers, symbols, and uppercase letters</li>
              <li>• Don't reuse passwords from other accounts</li>
              <li>• Enable two-factor authentication for extra security</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
} 