"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface OnboardingState {
  currentStep: number;
  name: string;
  profileImage: string;
  bio: string;
  interests: string[];
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
}

type OnboardingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PROFILE_IMAGE"; payload: string }
  | { type: "SET_BIO"; payload: string }
  | { type: "SET_INTERESTS"; payload: string[] }
  | { type: "SET_SOCIAL_LINKS"; payload: { platform: string; url: string } };

const initialState: OnboardingState = {
  currentStep: 0,
  name: "",
  profileImage: "",
  bio: "",
  interests: [],
  socialLinks: {},
};

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: action.payload,
      };
    case "SET_BIO":
      return {
        ...state,
        bio: action.payload,
      };
    case "SET_INTERESTS":
      return {
        ...state,
        interests: action.payload,
      };
    case "SET_SOCIAL_LINKS":
      return {
        ...state,
        socialLinks: {
          ...state.socialLinks,
          [action.payload.platform]: action.payload.url,
        },
      };
    default:
      return state;
  }
}

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
} 