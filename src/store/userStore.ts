import { create } from 'zustand';
import type { User, MedicalProfile, UserPreferences } from '../types/user';

interface UserState {
  user: User | null;
  isOnboarded: boolean;
  setUser: (user: User) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateMedicalProfile: (profile: MedicalProfile) => void;
  completeOnboarding: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isOnboarded: false,

  setUser: (user) => set({ user }),

  updatePreferences: (prefs) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...prefs },
        },
      };
    }),

  updateMedicalProfile: (profile) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: { ...state.user, medicalProfile: profile },
      };
    }),

  completeOnboarding: () => set({ isOnboarded: true }),

  clearUser: () => set({ user: null, isOnboarded: false }),
}));
