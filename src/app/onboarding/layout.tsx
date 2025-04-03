import { OnboardingProvider } from "@/lib/contexts/onboarding/onboarding-context"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-white">
        <main className="container mx-auto flex min-h-screen max-w-md flex-col px-4 py-8">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  )
} 