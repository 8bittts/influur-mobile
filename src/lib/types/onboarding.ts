export type SocialPlatform = 'youtube' | 'tiktok' | 'instagram';

export interface OnboardingState {
  step: number;
  name: string;
  profileImage: string | null;
  integrations: {
    [K in SocialPlatform]: {
      connected: boolean;
      loading: boolean;
      data?: {
        username: string;
        followers: number;
        engagement: number;
      };
    };
  };
}

export type OnboardingAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PROFILE_IMAGE'; payload: string }
  | { type: 'START_INTEGRATION'; payload: SocialPlatform }
  | { type: 'COMPLETE_INTEGRATION'; payload: { platform: SocialPlatform; data: any } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }; 