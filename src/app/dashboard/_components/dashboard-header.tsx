"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Wallet, Settings } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/contexts/user-context"

interface UserData {
  name: string
  image: string | null
  wallet: {
    balance: number
  }
}

export function DashboardHeader() {
  const { name, profileImage } = useUser()
  const [userData, setUserData] = useState<UserData>({
    name: name || "Creator",
    image: profileImage,
    wallet: {
      balance: 1250.00
    }
  })

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/settings" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={userData.image || "https://placekitten.com/200/200"}
                alt={userData.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF5F1F] transition-colors">{userData.name}</h1>
              <p className="text-xs text-gray-500">Creator</p>
            </div>
          </Link>

          <Link 
            href="/wallet" 
            className="flex flex-col items-end hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center text-sm text-gray-500">
              <Wallet className="w-4 h-4 mr-1" />
              <span>Balance</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FF5F1F] to-[#FF8F1F] bg-clip-text text-transparent animate-earnings">
              ${userData.wallet.balance.toFixed(2)}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 