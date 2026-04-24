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

Dashboard → **Authentication** → **URL Configuration**.

**Site URL:** Set this to a URL you will never break during local testing if possible (for example your production `https://` app URL, or a placeholder `https://lyftora.app`). New Supabase projects default this to `http://localhost:3000`, but Expo does not serve the app on port 3000. If the OAuth return URL is missing from **Redirect URLs** or does not match what the app sends, the flow can end at that default Site URL and the browser will show *This site can’t be reached*.

**Redirect URLs:** Add every URL the app will use after Google sign-in (must include the exact `redirectTo` the client sends, including path):

- `lyftora://auth/callback` — iOS / Android **development** or **release** build (not Expo Go).
- `exp://*/*` or `exp://` patterns — **Expo Go** (the app uses an `exp://<host>:8081/--/auth/callback` style URL; Supabase [supports wildcards](https://supabase.com/docs/guides/auth/redirect-urls) for this).
- If you test **Expo web**, add your real dev origin, for example:
  - `http://localhost:8081/*`
  - (Use the port where Metro actually serves the app; it is not `3000` unless you configured it that way.)

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
