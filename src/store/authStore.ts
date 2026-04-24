import { create } from 'zustand';
import { createMMKV } from 'react-native-mmkv';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { upsertProfile } from '../services/auth';

const storage = createMMKV({ id: 'lyftora-auth' });
const KEY_ONBOARDED = 'onboarding_completed';
const KEY_PENDING = 'pending_onboarding_data';

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

function hasCompletedOnboarding() {
  return storage.getBoolean(KEY_ONBOARDED) === true;
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
    } else if (hasCompletedOnboarding()) {
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
        set({ status: hasCompletedOnboarding() ? 'unauthenticated' : 'onboarding', session: null, user: null, profile: null });
      }
    });
  },

  completeOnboarding: (payload) => {
    storage.set(KEY_ONBOARDED, true);
    storage.set(KEY_PENDING, JSON.stringify(payload ?? {}));
    if (get().status === 'onboarding') set({ status: 'unauthenticated' });
  },

  resetOnboarding: () => {
    storage.remove(KEY_ONBOARDED);
    storage.remove(KEY_PENDING);
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
    const raw = storage.getString(KEY_PENDING);
    if (!raw) return;
    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      storage.remove(KEY_PENDING);
      return;
    }
    const username = (user.user_metadata?.username as string | undefined) ?? null;
    const result = await upsertProfile({
      userId: user.id,
      username,
      onboardingData: payload,
    });
    if (result.ok) {
      storage.remove(KEY_PENDING);
      await get().refreshProfile();
    }
  },
}));
