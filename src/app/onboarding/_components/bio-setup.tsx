"use client";

import { useOnboarding } from "@/lib/context/onboarding-context";
import { motion } from "framer-motion";

const MAX_BIO_LENGTH = 160;

export function BioSetup() {
  const { bio, setBio, setStep } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto px-4 sm:px-0 space-y-6 sm:space-y-8"
    >
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tell us about yourself</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Write a short bio that describes who you are
        </p>
      </div>

      <div className="space-y-2">
        <textarea
          value={bio}
          onChange={(e) => {
            const text = e.target.value;
            if (text.length <= MAX_BIO_LENGTH) {
              setBio(text);
            }
          }}
          placeholder="I'm a content creator passionate about..."
          className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm sm:text-base resize-none"
        />
        <div className="flex justify-end">
          <span className={`text-xs sm:text-sm ${bio.length >= MAX_BIO_LENGTH ? "text-red-500" : "text-gray-500"}`}>
            {bio.length}/{MAX_BIO_LENGTH}
          </span>
        </div>
      </div>

      <button
        className="w-full py-3 px-4 bg-[#FF5F1F] text-white rounded-lg font-medium text-sm sm:text-base hover:bg-[#FF4F00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={() => {
          if (bio) {
            setStep(2);
          }
        }}
        disabled={!bio}
      >
        Continue
      </button>
    </motion.div>
  );
} 