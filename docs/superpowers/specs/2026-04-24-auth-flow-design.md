# Authentication Flow — Design Spec

**Date:** 2026-04-24
**Scope:** v1 login + signup for the Lyftora React Native (Expo) app, backed by Supabase.

---

## 1. Goals

- Add account-based authentication to the app, gating Main behind a session.
- Support two signup paths: **Google OAuth** and **email + password**.
- Verify email at signup via a **6-digit OTP** delivered by email (informing the user where the code was sent).
- Persist user identity and onboarding payload in Supabase so users can sign in on a new device and recover their state.
- Keep the OTP layer pluggable so WhatsApp OTP can be added later as a provider swap, not a rewrite.

## 2. Non-goals (v1)

- WhatsApp OTP (deferred — requires WhatsApp Business approval; will be added in v2 as a delivery channel for the same OTP layer).
- Phone-number-based authentication or storage.
- Account deletion from the client (will require a Supabase Edge Function later).
- Automated end-to-end test infrastructure (Detox) — v1 ships with a manual checklist.

## 3. Architecture

**Backend:** Supabase (Postgres + Auth + Row-Level Security).
**Client:** React Native + Expo, using `@supabase/supabase-js` with `@react-native-async-storage/async-storage` (already a dependency) for session persistence and `autoRefreshToken: true`.

### Layers

- `src/services/supabase.ts` — single Supabase client instance.
- `src/services/auth.ts` — thin wrapper exposing `signUp`, `signIn`, `signInWithGoogle`, `verifyEmailOtp`, `resendOtp`, `requestPasswordReset`, `confirmPasswordReset`, `changeEmail`, `signOut`. **All UI talks to this, never to Supabase directly.** This boundary is what lets us add WhatsApp OTP later without touching screens.
- `src/store/authStore.ts` (Zustand, matches existing store pattern) — holds `session`, `user`, `profile`, `status` (`loading | onboarding | unauthenticated | needs-otp | authenticated`). Subscribes to `supabase.auth.onAuthStateChange`.
- `src/screens/auth/` — new screens (see §5).
- `RootNavigator` — switches stacks based on `authStore.status`.

### Why a separate `authStore`

`userStore` today holds profile/preferences (local-first). `authStore` is about session lifecycle. Keeping them separate means existing local-only flows still work, and `userStore` simply hydrates from the backend `profiles` row once auth completes.

## 4. Data model

### `auth.users` (Supabase-managed)

Holds `id`, `email`, `encrypted_password`, `email_confirmed_at`, OAuth provider metadata. The client never writes to this directly.

### `public.profiles` (our table)

| column | type | notes |
|---|---|---|
| `id` | uuid PK | FK → `auth.users.id`, on delete cascade |
| `username` | text NULL | UNIQUE, case-insensitive (index on `lower(username)`); NULL for Google users |
| `auth_provider` | text NOT NULL | `'email' \| 'google'` |
| `onboarding_data` | jsonb NULL | locally-collected onboarding payload, written once at first signup |
| `created_at` | timestamptz default now() | |
| `updated_at` | timestamptz | trigger-maintained |

**Trigger:** on `auth.users` insert → create empty `profiles` row with `id`, `auth_provider` derived from `raw_app_meta_data.provider`. The app then `update`s `username` and `onboarding_data` in one call after signup.

### Row-Level Security on `profiles`

- `select`: `auth.uid() = id`.
- `update`: `auth.uid() = id`, with column-level guards preventing client changes to `id`, `auth_provider`.
- `insert`: blocked from client; only the trigger inserts.
- `delete`: blocked from client.

### Username uniqueness UX

A Postgres RPC `check_username(name text) returns boolean` is called as the user types (debounced ~300ms) to drive live availability feedback. The DB unique index is the source of truth; the RPC is purely for UX.

### Decisions captured

- **`onboarding_data` is JSONB, not exploded into typed columns.** v1 has no analytics queries that need typed columns, and the onboarding shape will keep evolving. Promote fields later when a real query needs them.
- **No mirrored `email` column on `profiles`.** The client always has its own email via `supabase.auth.getUser()`, and there are no cross-user joins that need it. Add later only if a real need shows up.

## 5. Screens

All under `src/screens/auth/`.

| screen | purpose |
|---|---|
| `AuthLandingScreen` | Shown after onboarding. Two CTAs: "Continue with Google" / "Sign up with email". Tertiary: "Already have an account? Log in". |
| `SignUpScreen` | Form: username, email, password (with strength rules), confirm password. Inline username availability check. Submit → creates Supabase user → routes to OTP screen. |
| `LogInScreen` | Form: email, password. Submit → routes to Main on success. Link to "Forgot password?". |
| `OtpVerifyScreen` | Receives `email` route param. Shows "We sent a 6-digit code to **{email}**" with a 6-input code field, resend button (60s cooldown), and an explicit caption: *"Code sent via email. Check your inbox (and spam folder)."* |
| `ForgotPasswordScreen` | Email input → triggers Supabase password-reset OTP → routes to `ResetPasswordScreen`. |
| `ResetPasswordScreen` | OTP code + new password + confirm. Verifies OTP, updates password, routes to Main. |

## 6. Auth flows

### 6.1 Email signup

`AuthLanding → SignUp` → `auth.signUp({ email, password })` (Supabase email template configured to use `{{ .Token }}` so a 6-digit OTP is emailed instead of a magic link) → `OtpVerify` → `auth.verifyOtp({ type: 'signup' })` → on success, write `profiles` row (username + `onboarding_data` from MMKV) → `Main`.

### 6.2 Email login

`AuthLanding → LogIn` → `auth.signInWithPassword` → `Main`. If `email_confirmed_at` is null (user never finished OTP), bounce to `OtpVerify` to finish.

### 6.3 Google sign-in

`AuthLanding` → native Google Sign-In via `expo-auth-session` Google provider → `auth.signInWithIdToken({ provider: 'google', token })` → trigger creates `profiles` row with `auth_provider='google'`, `username` NULL → write `onboarding_data` if first time → `Main`.

### 6.4 Forgot password

`LogIn → ForgotPassword` → `auth.resetPasswordForEmail` (template configured for OTP token, not magic link) → `ResetPassword` → `auth.verifyOtp({ type: 'recovery' })` → `auth.updateUser({ password })` → `Main`.

### 6.5 Change email (post-auth, in Profile settings)

User enters new email → `auth.updateUser({ email })` → Supabase sends OTP to **new** email → modal `OtpVerify` (type `email_change`) → on verify, email is updated.

### 6.6 Logout

Profile screen "Log out" button → `auth.signOut()` → `authStore.onAuthStateChange` clears session → `RootNavigator` swaps back to `AuthLanding`.

### OTP user-facing copy

- After signup: *"We've sent a 6-digit verification code to **{email}**. Check your inbox (and spam folder)."*
- Resend: *"New code sent to **{email}**."*

## 7. Navigation & first-launch flow

`RootNavigator` becomes status-driven. Three top-level stacks rendered conditionally — switching between them remounts (no back-swipe from Main to Auth):

```
authStore.status:
  'loading'         → SplashScreen (existing expo-splash-screen, kept until store hydrates)
  'onboarding'      → Onboarding stack (existing 4 screens)
  'unauthenticated' → Auth stack (AuthLanding, SignUp, LogIn, OtpVerify, ForgotPassword, ResetPassword)
  'authenticated'   → Main stack (existing tabs + modals)
```

### First-launch state machine

1. App boot → `authStore.hydrate()` reads AsyncStorage. No session, no `onboardingCompleted` flag → status = `'onboarding'`.
2. User finishes `OnboardingProfile` → flag persisted to AsyncStorage, onboarding payload stashed in MMKV (existing dep) under key `pending_onboarding_data` → status flips to `'unauthenticated'` → `AuthLanding`.
3. User signs up / logs in → Supabase session stored in AsyncStorage → on first auth event after signup, `authStore` reads `pending_onboarding_data`, writes it to `profiles.onboarding_data`, clears MMKV key → status = `'authenticated'`.
4. Subsequent launches: session restored from AsyncStorage → status = `'authenticated'` → straight to Main.

### Edge cases

- **User completes onboarding, kills app before signup** → next launch skips onboarding, lands on `AuthLanding`. `pending_onboarding_data` survives in MMKV.
- **User logs out** → status = `'unauthenticated'`, drops to `AuthLanding`. Onboarding is not re-shown.
- **Cross-device login** → Device B has no `pending_onboarding_data`; it hydrates `profiles.onboarding_data` from backend into `userStore`.
- **Token refresh failure** → Supabase emits `SIGNED_OUT`, store flips to `'unauthenticated'`.

### Deep links

Google OAuth callback uses the existing deep-link config from commit `a6006f1`. Supabase redirect URL = `lyftora://auth/callback`.

## 8. Error handling

Surfaced as inline form errors, not toasts (network failure is the one banner-style exception):

| condition | message |
|---|---|
| invalid email format | "Enter a valid email address" |
| password too weak (<8 chars, no number) | "Password must be 8+ characters and include a number" |
| username taken | "That username is already taken" (live, on debounce) |
| email already registered | "An account with this email exists. Log in instead?" (with link) |
| wrong password | "Incorrect email or password" (don't reveal which) |
| OTP wrong | "That code isn't right. Try again or resend." |
| OTP expired | "This code expired. We've sent a new one." (auto-resend) |
| network failure | banner: "Can't reach Lyftora. Check your connection." with retry |
| rate-limited (Supabase 429) | "Too many attempts. Try again in a minute." |

## 9. Security

- Supabase URL + anon key go in `app.config.ts` via `expo-constants`, sourced from `.env` (added to `.gitignore`). Anon key is public-safe; RLS does the actual gatekeeping.
- **No service-role key in the app — ever.**
- Password rules enforced client-side AND in a Supabase Auth hook (server-side guard).
- Rate limits: rely on Supabase defaults (60 OTPs/hour/email, login throttling). Do not roll our own.
- OTP resend cooldown: 60s, enforced client-side, with the server-side rate limit as backstop.

## 10. Testing

- **`auth.ts` service** — unit-test the wrapper using a mocked Supabase client. Cover success + each error branch.
- **`authStore`** — unit-test status transitions (`loading → onboarding → unauthenticated → needs-otp → authenticated → unauthenticated`).
- **Screen-level** — snapshot + interaction tests for `SignUpScreen` and `OtpVerifyScreen` (the two with the most state).
- **E2E (manual for v1)** — documented checklist:
  - Signup happy path (email + OTP)
  - OTP wrong code / OTP resend
  - Login with wrong password
  - Google sign-in (new user, returning user)
  - Forgot password → reset
  - Logout
  - Kill app and relaunch — session restored
  - Cross-device login (onboarding data hydrates from backend)

## 11. Open dependencies before implementation

- Supabase project provisioned; URL + anon key available.
- Supabase email templates updated to use `{{ .Token }}` for signup, recovery, and email-change flows (so users get 6-digit codes, not magic links).
- Google OAuth client IDs created (iOS, Android, Web) and registered in Supabase Auth → Providers → Google.
- Deep-link scheme `lyftora://` confirmed wired in `app.json` (already in place per commit `a6006f1`).
