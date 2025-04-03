"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
  connectedPlatforms: string[];
  setConnectedPlatforms: (platforms: string[]) => void;
  bio: string;
  setBio: (bio: string) => void;
  step: number;
  setStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [step, setStep] = useState(1);

  return (
    <OnboardingContext.Provider
      value={{
        connectedPlatforms,
        setConnectedPlatforms,
        bio,
        setBio,
        step,
        setStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
} 