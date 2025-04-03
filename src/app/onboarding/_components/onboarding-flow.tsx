"use client";

import { useOnboarding } from "@/lib/context/onboarding-context";
import { ProfileSetup } from "./profile-setup";
import { BioSetup } from "./bio-setup";
import { InterestsSetup } from "./interests-setup";
import { SocialLinksSetup } from "./social-links-setup";
import { Completion } from "./completion";
import { AnimatePresence } from "framer-motion";

const ONBOARDING_STEPS = [
  {
    id: "profile",
    component: ProfileSetup,
  },
  {
    id: "bio",
    component: BioSetup,
  },
  {
    id: "interests",
    component: InterestsSetup,
  },
  {
    id: "social",
    component: SocialLinksSetup,
  },
  {
    id: "completion",
    component: Completion,
  },
];

export function OnboardingFlow() {
  const { state } = useOnboarding();
  const CurrentStep = ONBOARDING_STEPS[state.currentStep]?.component;

  if (!CurrentStep) {
    // Handle completion or redirect
    return null;
  }

  const isLastStep = state.currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div className="relative">
      {/* Progress bar */}
      {!isLastStep && (
        <div className="absolute top-0 left-0 right-0">
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{
                width: `${((state.currentStep + 1) / (ONBOARDING_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className={isLastStep ? "pt-0" : "pt-8"}>
        <AnimatePresence mode="wait">
          <CurrentStep key={ONBOARDING_STEPS[state.currentStep].id} />
        </AnimatePresence>
      </div>
    </div>
  );
} 