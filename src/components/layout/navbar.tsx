/**
 * Navbar Component
 * 
 * A responsive navigation bar component that displays the site logo, navigation links,
 * and user profile information. Uses the brand color scheme and consistent styling.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Navbar />
 * 
 * // With custom class
 * <Navbar className="border-b" />
 * ```
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import ProfileImage from "../profile-image"

// Constants
const NAVBAR_STYLES = {
  container: "w-full bg-white",
  content: "container mx-auto px-4 py-4",
  logo: "text-xl font-semibold text-[#FF5F1F]",
  nav: "flex items-center justify-between",
  links: "hidden md:flex gap-6",
  link: "text-gray-600 hover:text-[#FF5F1F] transition-colors",
  activeLink: "text-[#FF5F1F] font-medium",
  mobileMenu: "md:hidden",
  profile: "flex items-center gap-4"
} as const

const NAV_LINKS = [
  { href: "/dashboard", text: "Dashboard" },
  { href: "/campaigns", text: "Campaigns" },
  { href: "/marketplace", text: "Marketplace" },
  { href: "/payments", text: "Payments" }
] as const

/**
 * Navigation bar component that displays the site's navigation content
 * Includes logo, navigation links, and user profile information
 */
export default function Navbar({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn(NAVBAR_STYLES.container, className)}>
      <div className={NAVBAR_STYLES.content}>
        <div className={NAVBAR_STYLES.nav}>
          {/* Logo */}
          <Link href="/" className={NAVBAR_STYLES.logo}>
            influur
          </Link>

          {/* Desktop Navigation */}
          <div className={NAVBAR_STYLES.links}>
            {NAV_LINKS.map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  NAVBAR_STYLES.link,
                  pathname === href && NAVBAR_STYLES.activeLink
                )}
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Profile Section */}
          <div className={NAVBAR_STYLES.profile}>
            <ProfileImage size="sm" />
          </div>
        </div>
      </div>
    </nav>
  )
} 