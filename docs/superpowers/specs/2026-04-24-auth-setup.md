# Auth Setup (Supabase)

One-time steps to activate the auth flow built against the spec at
`docs/superpowers/specs/2026-04-24-auth-flow-design.md`.

## 1. Create the Supabase project

1. New project at https://supabase.com/dashboard
2. Copy the project URL and anon key into `.env` (template at `.env.example`):
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   ```

## 2. Run the migration

Apply `supabase/migrations/20260424000000_auth_profiles.sql` in the SQL editor
(or via `supabase db push` if using the CLI). Creates `profiles`, RLS, triggers,
and the `check_username` RPC.

## 3. Configure email OTP templates

Dashboard → Authentication → Email Templates. For **Confirm signup**,
**Magic Link / Recovery**, and **Change Email Address**, replace the magic link
with the OTP token so users get a 6-digit code:

```
Your Lyftora verification code is:

{{ .Token }}
```

Under Authentication → Providers → Email, confirm:
- Enable Email provider = on
- Confirm email = on
- Secure email change = on

## 4. Configure Google provider

Dashboard → Authentication → Providers → Google.
- Create OAuth client IDs at https://console.cloud.google.com → APIs & Services → Credentials.
- Add these redirect URIs to the Google client:
  - `https://<project-ref>.supabase.co/auth/v1/callback`
- Add the client ID + secret to Supabase.
- On the Lyftora side, the `signInWithGoogle` service uses `expo-web-browser`
  with a deep-link callback to `lyftora://auth/callback` — the scheme is already
  registered in `app.json`.

## 5. Redirect URLs allowlist

Dashboard → Authentication → URL Configuration → Redirect URLs. Add:
- `lyftora://auth/callback`
- `exp://` (for Expo Go during development, optional)

## 6. Manual test checklist

- [ ] Fresh install → onboarding → AuthLanding lands after OnboardingProfile finish.
- [ ] Email signup → receives 6-digit code → verify → Main tab.
- [ ] Wrong OTP → inline error, can retry.
- [ ] Resend after 60s cooldown.
- [ ] Login with wrong password → inline error.
- [ ] Forgot password → OTP → new password → logged in.
- [ ] Google sign-in → returns to app → Main tab.
- [ ] Logout from Profile → returns to AuthLanding.
- [ ] Kill app and relaunch → session restored → Main tab.
