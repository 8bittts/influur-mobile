"use client";

import { useOnboarding } from "@/lib/contexts/onboarding/onboarding-context";
import { motion } from "framer-motion";
import { useState } from "react";

const SOCIAL_PLATFORMS = [
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "instagram.com/username",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    name: "tiktok",
    label: "TikTok",
    placeholder: "tiktok.com/@username",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: "youtube",
    label: "YouTube",
    placeholder: "youtube.com/c/channel",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function isValidUrl(url: string) {
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

export function SocialLinksSetup() {
  const { state, dispatch } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleUrlChange(platform: string, url: string) {
    // Remove error when user starts typing
    if (errors[platform]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[platform];
        return newErrors;
      });
    }

    dispatch({
      type: "SET_SOCIAL_LINKS",
      payload: { platform, url },
    });
  }

  function handleSubmit() {
    const newErrors: Record<string, string> = {};
    let hasValidUrl = false;

    // Validate each URL if provided
    Object.entries(state.socialLinks).forEach(([platform, url]) => {
      if (url && !isValidUrl(url)) {
        newErrors[platform] = "Please enter a valid URL";
      }
      if (url && isValidUrl(url)) {
        hasValidUrl = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && hasValidUrl) {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Connect your accounts</h1>
        <p className="mt-2 text-gray-600">
          Add your social media profiles to help brands find you
        </p>
      </div>

      <div className="space-y-4">
        {SOCIAL_PLATFORMS.map((platform) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-700">
              {platform.icon}
              <label htmlFor={platform.name} className="text-sm font-medium">
                {platform.label}
              </label>
            </div>
            <input
              type="text"
              id={platform.name}
              placeholder={platform.placeholder}
              value={state.socialLinks[platform.name as keyof typeof state.socialLinks] || ""}
              onChange={(e) => handleUrlChange(platform.name, e.target.value)}
              className={`input-primary w-full ${
                errors[platform.name] ? "border-red-500" : ""
              }`}
            />
            {errors[platform.name] && (
              <p className="text-sm text-red-500">{errors[platform.name]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        className="btn-primary w-full"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </motion.div>
  );
} 