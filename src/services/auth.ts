import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from './supabase';

export type OtpType = 'signup' | 'recovery' | 'email_change';

export interface AuthResult {
  ok: boolean;
  error?: string;
}

function mapAuthError(message?: string | null): string {
  if (!message) return 'Something went wrong. Try again.';
  const m = message.toLowerCase();
  if (m.includes('invalid login')) return 'Incorrect email or password';
  if (m.includes('email not confirmed')) return 'Please verify your email first';
  if (m.includes('user already registered')) return 'An account with this email exists. Log in instead?';
  if (m.includes('token has expired') || m.includes('otp expired')) return 'That code expired. Resend to get a new one.';
  if (m.includes('invalid otp') || m.includes('token is invalid')) return "That code isn't right. Try again or resend.";
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Try again in a minute.';
  if (m.includes('network')) return "Can't reach Lyftora. Check your connection.";
  return message;
}

export async function signUp(params: { email: string; password: string; username: string }): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: { username: params.username },
    },
  });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function signIn(params: { email: string; password: string }): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  const redirectTo = Linking.createURL('auth/callback');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error || !data?.url) return { ok: false, error: mapAuthError(error?.message) };

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success' || !result.url) {
    return { ok: false, error: 'Google sign-in was cancelled' };
  }

  // Supabase returns the session in the URL fragment / query — extract and set it.
  const url = new URL(result.url);
  const params = new URLSearchParams(url.hash.startsWith('#') ? url.hash.slice(1) : url.search);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (!access_token || !refresh_token) {
    return { ok: false, error: 'Google sign-in did not return a session' };
  }
  const { error: setError } = await supabase.auth.setSession({ access_token, refresh_token });
  if (setError) return { ok: false, error: mapAuthError(setError.message) };
  return { ok: true };
}

export async function verifyEmailOtp(params: { email: string; token: string; type: OtpType }): Promise<AuthResult> {
  const { error } = await supabase.auth.verifyOtp({
    email: params.email,
    token: params.token,
    type: params.type,
  });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function resendOtp(params: { email: string; type: 'signup' }): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({ email: params.email, type: params.type });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function confirmPasswordReset(newPassword: string): Promise<AuthResult> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function changeEmail(newEmail: string): Promise<AuthResult> {
  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}

export async function checkUsernameAvailable(username: string): Promise<{ available: boolean; error?: string }> {
  const { data, error } = await supabase.rpc('check_username', { name: username });
  if (error) return { available: false, error: mapAuthError(error.message) };
  return { available: !!data };
}

export async function upsertProfile(params: {
  userId: string;
  username?: string | null;
  onboardingData?: unknown;
}): Promise<AuthResult> {
  const patch: Record<string, unknown> = {};
  if (params.username !== undefined) patch.username = params.username;
  if (params.onboardingData !== undefined) patch.onboarding_data = params.onboardingData;
  if (Object.keys(patch).length === 0) return { ok: true };
  const { error } = await supabase.from('profiles').update(patch).eq('id', params.userId);
  if (error) return { ok: false, error: mapAuthError(error.message) };
  return { ok: true };
}
