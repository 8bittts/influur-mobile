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
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tell us about yourself</h1>
        <p className="mt-2 text-gray-600">
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
          className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <div className="flex justify-end">
          <span className={`text-sm ${bio.length >= MAX_BIO_LENGTH ? "text-red-500" : "text-gray-500"}`}>
            {bio.length}/{MAX_BIO_LENGTH}
          </span>
        </div>
      </div>

      <button
        className="btn-primary w-full"
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