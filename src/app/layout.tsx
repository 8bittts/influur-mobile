import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { UserProvider } from "@/lib/contexts/user-context"
import Footer from "@/components/footer"
import "./globals.css"
import { NotificationManager } from "@/components/ui/notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creator Campaign Platform",
  description: "Connect with brands and manage your campaigns",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased text-base">
      <body className={inter.className}>
        <Providers>
          <UserProvider>
            <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
              <main className="flex-1 container mx-auto">
                {children}
              </main>
              <Footer />
            </div>
          </UserProvider>
        </Providers>
        <NotificationManager />
      </body>
    </html>
  )
} 