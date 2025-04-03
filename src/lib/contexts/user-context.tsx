"use client"

import * as React from "react"
import { createContext, useCallback, useMemo, useState } from "react"

interface UserData {
  name: string
  role: string
  profileImage: string
  initialPlatform?: string
}

interface UserContextType {
  name: string
  setName: (name: string) => void
  role: string
  setRole: (role: string) => void
  profileImage: string
  setProfileImage: (image: string) => void
  initialPlatform?: string
  setInitialPlatform: (platform: string) => void
  updateUser: (data: { name: string; profileImage: string; initialPlatform: string }) => void
}

const DEFAULT_USER_DATA: UserData = {
  name: "",
  role: "",
  profileImage: "",
  initialPlatform: undefined
}

function loadUserData(): UserData {
  if (typeof window === 'undefined') return DEFAULT_USER_DATA
  
  try {
    const savedData = localStorage.getItem('userData')
    if (!savedData) return DEFAULT_USER_DATA

    const data = JSON.parse(savedData)
    return {
      name: data.name || "",
      role: data.role || "",
      // Handle both image and profileImage keys for backward compatibility
      profileImage: data.profileImage || data.image || "",
      initialPlatform: data.initialPlatform
    }
  } catch {
    return DEFAULT_USER_DATA
  }
}

export const UserContext = createContext<UserContextType>({
  name: "",
  setName: () => {},
  role: "",
  setRole: () => {},
  profileImage: "",
  setProfileImage: () => {},
  initialPlatform: undefined,
  setInitialPlatform: () => {},
  updateUser: () => {}
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => loadUserData())

  const setName = useCallback((name: string) => {
    setUserData(prev => {
      const newData = { ...prev, name }
      localStorage.setItem('userData', JSON.stringify(newData))
      return newData
    })
  }, [])

  const setRole = useCallback((role: string) => {
    setUserData(prev => {
      const newData = { ...prev, role }
      localStorage.setItem('userData', JSON.stringify(newData))
      return newData
    })
  }, [])

  const setProfileImage = useCallback((image: string) => {
    setUserData(prev => {
      const newData = { ...prev, profileImage: image }
      // Save both image and profileImage for compatibility
      localStorage.setItem('userData', JSON.stringify({
        ...newData,
        image,
        profileImage: image
      }))
      return newData
    })
  }, [])

  const setInitialPlatform = useCallback((platform: string) => {
    setUserData(prev => {
      const newData = { ...prev, initialPlatform: platform }
      localStorage.setItem('userData', JSON.stringify(newData))
      return newData
    })
  }, [])

  const updateUser = useCallback((data: { name: string; profileImage: string; initialPlatform: string }) => {
    setUserData(prev => {
      const newData = {
        ...prev,
        name: data.name,
        profileImage: data.profileImage,
        image: data.profileImage, // Add image key for compatibility
        initialPlatform: data.initialPlatform
      }
      localStorage.setItem('userData', JSON.stringify(newData))
      return newData
    })
  }, [])

  const value = useMemo(
    () => ({
      name: userData.name,
      setName,
      role: userData.role,
      setRole,
      profileImage: userData.profileImage,
      setProfileImage,
      initialPlatform: userData.initialPlatform,
      setInitialPlatform,
      updateUser
    }),
    [userData, setName, setRole, setProfileImage, setInitialPlatform, updateUser]
  )

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 