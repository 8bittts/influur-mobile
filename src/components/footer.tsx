/**
 * Footer Component
 * 
 * A responsive footer component that displays the company logo, navigation links,
 * and copyright information. Uses the brand color scheme and consistent styling.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Footer />
 * ```
 */

"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

// Constants
const FOOTER_STYLES = {
  container: "w-full border-t bg-white mt-auto",
  content: "container mx-auto max-w-md px-4 py-4 sm:py-6",
  logo: "text-lg sm:text-xl font-semibold text-[#FF5F1F]",
  links: "flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500",
  link: "hover:text-[#FF5F1F] transition-colors px-2 py-1",
  copyright: "text-[10px] sm:text-xs text-gray-400"
} as const

const FOOTER_LINKS = [
  { href: "/terms", text: "Terms of Service" },
  { href: "/privacy", text: "Privacy Policy" }
] as const

/**
 * Footer component that displays the site's footer content
 * Includes logo, navigation links, and copyright information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={FOOTER_STYLES.container}>
      <div className={FOOTER_STYLES.content}>
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          {/* Logo */}
          <div className={FOOTER_STYLES.logo}>
            influur
          </div>
          
          {/* Links */}
          <div className={FOOTER_STYLES.links}>
            {FOOTER_LINKS.map(({ href, text }) => (
              <Link 
                key={href}
                href={href} 
                className={FOOTER_STYLES.link}
              >
                {text}
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <div className={FOOTER_STYLES.copyright}>
            © {currentYear} Influur. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 