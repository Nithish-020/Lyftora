import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { upsertProfile } from '../services/auth';

// AsyncStorage (not MMKV) so auth persistence works in Expo Go — MMKV v4 + Nitro requires a dev build.
const KEY_ONBOARDED = 'lyftora-auth/onboarding_completed';
const KEY_PENDING = 'lyftora-auth/pending_onboarding_data';

export type AuthStatus = 'loading' | 'onboarding' | 'unauthenticated' | 'authenticated';

interface Profile {
  id: string;
  username: string | null;
  authProvider: 'email' | 'google' | string;
  onboardingData: unknown;
}

interface AuthState {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  profile: Profile | null;

  hydrate: () => Promise<void>;
  completeOnboarding: (payload: unknown) => void;
  resetOnboarding: () => void;
  refreshProfile: () => Promise<void>;
  flushPendingOnboardingData: () => Promise<void>;
}

async function hasCompletedOnboarding() {
  const v = await AsyncStorage.getItem(KEY_ONBOARDED);
  return v === 'true';
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'loading',
  session: null,
  user: null,
  profile: null,

  hydrate: async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session ?? null;

    if (session) {
      set({ status: 'authenticated', session, user: session.user });
      await get().refreshProfile();
      await get().flushPendingOnboardingData();
    } else if (await hasCompletedOnboarding()) {
      set({ status: 'unauthenticated' });
    } else {
      set({ status: 'onboarding' });
    }

    supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (newSession) {
        set({ status: 'authenticated', session: newSession, user: newSession.user });
        await get().refreshProfile();
        await get().flushPendingOnboardingData();
      } else if (event === 'SIGNED_OUT') {
        const onboarded = await hasCompletedOnboarding();
        set({ status: onboarded ? 'unauthenticated' : 'onboarding', session: null, user: null, profile: null });
      }
    });
  },

  completeOnboarding: (payload) => {
    void (async () => {
      await AsyncStorage.setItem(KEY_ONBOARDED, 'true');
      await AsyncStorage.setItem(KEY_PENDING, JSON.stringify(payload ?? {}));
      if (get().status === 'onboarding') set({ status: 'unauthenticated' });
    })();
  },

  resetOnboarding: () => {
    void AsyncStorage.multiRemove([KEY_ONBOARDED, KEY_PENDING]);
  },

  refreshProfile: async () => {
    const user = get().user;
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, auth_provider, onboarding_data')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data) return;
    set({
      profile: {
        id: data.id,
        username: data.username,
        authProvider: data.auth_provider,
        onboardingData: data.onboarding_data,
      },
    });
  },

  flushPendingOnboardingData: async () => {
    const user = get().user;
    if (!user) return;
    const raw = await AsyncStorage.getItem(KEY_PENDING);
    if (!raw) return;
    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      await AsyncStorage.removeItem(KEY_PENDING);
      return;
    }
    const username = (user.user_metadata?.username as string | undefined) ?? null;
    const result = await upsertProfile({
      userId: user.id,
      username,
      onboardingData: payload,
    });
    if (result.ok) {
      await AsyncStorage.removeItem(KEY_PENDING);
      await get().refreshProfile();
    }
  },
}));
