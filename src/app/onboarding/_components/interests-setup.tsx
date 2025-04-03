"use client";

import { useOnboarding } from "@/lib/context/onboarding-context";
import { motion } from "framer-motion";

const AVAILABLE_INTERESTS = [
  "Fashion",
  "Beauty",
  "Lifestyle",
  "Travel",
  "Food",
  "Fitness",
  "Gaming",
  "Tech",
  "Music",
  "Art",
  "Photography",
  "Dance",
  "Education",
  "Business",
  "Health",
  "Sports",
];

export function InterestsSetup() {
  const { state, dispatch } = useOnboarding();

  function toggleInterest(interest: string) {
    const newInterests = state.interests.includes(interest)
      ? state.interests.filter((i) => i !== interest)
      : [...state.interests, interest];
    dispatch({ type: "SET_INTERESTS", payload: newInterests });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Select your interests</h1>
        <p className="mt-2 text-gray-600">
          Choose the topics that best describe your content
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AVAILABLE_INTERESTS.map((interest) => {
          const isSelected = state.interests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <button
        className="btn-primary w-full"
        onClick={() => {
          if (state.interests.length > 0) {
            dispatch({ type: "NEXT_STEP" });
          }
        }}
        disabled={state.interests.length === 0}
      >
        Continue
      </button>
    </motion.div>
  );
} 