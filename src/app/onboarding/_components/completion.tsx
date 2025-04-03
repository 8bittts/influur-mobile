"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/context/onboarding-context";
import Image from "next/image";

export function Completion() {
  const router = useRouter();
  const { state } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="relative mx-auto w-32 h-32 mb-8">
        {state.profileImage ? (
          <Image
            src={state.profileImage}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200" />
        )}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome aboard, {state.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Your profile is all set up and ready to go
        </p>
      </div>

      <div className="space-y-4">
        <button
          className="btn-primary w-full"
          onClick={() => router.push("/onboarding/next-step")}
        >
          Go to Dashboard
        </button>
        <button
          className="btn-secondary w-full"
          onClick={() => router.push("/profile")}
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
} 