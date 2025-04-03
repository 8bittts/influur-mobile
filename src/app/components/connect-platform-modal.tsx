/**
 * ConnectPlatformModal Component
 * 
 * A modal dialog that allows users to connect their social media platforms.
 * Displays a confirmation message and provides options to connect or cancel.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ConnectPlatformModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConnect={handleConnect}
 *   platformName="Instagram"
 *   isIntegrating={false}
 * />
 * ```
 */

'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Types
interface ConnectPlatformModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback function to close the modal */
  onClose: () => void
  /** Callback function to connect the platform */
  onConnect: () => void
  /** Name of the platform to connect */
  platformName: string
  /** Whether the platform is currently being connected */
  isIntegrating: boolean
}

// Constants
const MODAL_STYLES = {
  content: "sm:max-w-md",
  container: "py-6",
  title: "text-2xl font-semibold mb-3",
  description: "text-gray-600 text-lg",
  buttons: "flex gap-3 mt-8",
  button: "flex-1 py-6 text-base",
  cancelButton: "bg-white hover:bg-gray-50",
  connectButton: "bg-[#FF5F1F] hover:bg-[#FF5F1F]/90"
} as const

/**
 * Modal dialog for connecting social media platforms
 * Provides a confirmation interface with connect and cancel options
 */
export function ConnectPlatformModal({
  isOpen,
  onClose,
  onConnect,
  platformName,
  isIntegrating
}: ConnectPlatformModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.content}>
        <div className={MODAL_STYLES.container}>
          <h2 className={MODAL_STYLES.title}>
            Connect Platform
          </h2>
          <div className={MODAL_STYLES.description}>
            Ready to connect your {platformName} account?
          </div>
          
          <div className={MODAL_STYLES.buttons}>
            <Button
              type="button"
              variant="outline"
              className={cn(MODAL_STYLES.button, MODAL_STYLES.cancelButton)}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className={cn(MODAL_STYLES.button, MODAL_STYLES.connectButton)}
              onClick={onConnect}
              disabled={isIntegrating}
            >
              {isIntegrating ? "Connecting..." : "Connect"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 