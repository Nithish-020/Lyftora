import React from 'react';
import { View, Text } from 'react-native';
import { LL, FL, TL, LBtn, LEm, LIcon, LScreen, LS } from '../../components/light';
import { AuthHeader, OtpInput } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { resendOtp, verifyEmailOtp } from '../../services/auth';

function maskEmail(e: string) {
  const [user, domain] = e.split('@');
  if (!user || !domain) return e;
  return user[0] + '•'.repeat(Math.max(3, user.length - 2)) + user.slice(-1) + '@' + domain;
}

const RESEND_SECONDS = 60;

export function OtpVerifyScreen({ navigation, route }: RootStackScreenProps<'OtpVerify'>) {
  const { email, mode = 'signup' } = route.params ?? { email: '' };
  const [code, setCode] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [cooldown, setCooldown] = React.useState(RESEND_SECONDS);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const title =
    mode === 'recovery' ? (
      <>
        Reset your <LEm>password.</LEm>
      </>
    ) : mode === 'email_change' ? (
      <>
        Confirm new <LEm>email.</LEm>
      </>
    ) : (
      <>
        Check your <LEm>inbox.</LEm>
      </>
    );

  const onVerify = async () => {
    if (code.length !== 6) return;
    setBusy(true);
    setError(null);
    const res = await verifyEmailOtp({ email, token: code, type: mode });
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Verification failed');
      return;
    }
    if (mode === 'recovery') {
      navigation.navigate('ResetPassword');
    }
    // On success for signup/email_change, the auth state change listener will
    // flip the navigator to the main stack; no manual navigation needed.
  };

  const onResend = async () => {
    if (cooldown > 0) return;
    setError(null);
    const res = await resendOtp({ email, type: 'signup' });
    if (res.ok) setCooldown(RESEND_SECONDS);
    else setError(res.error ?? 'Could not resend');
  };

  const fmt = `${String(Math.floor(cooldown / 60)).padStart(2, '0')}:${String(cooldown % 60).padStart(2, '0')}`;

  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <AuthHeader
        onBack={() => navigation.goBack()}
        step={2}
        totalSteps={2}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }}>
        <View
          style={[
            {
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: LL.primarySurface,
              borderWidth: 1.5,
              borderColor: LL.bAccent,
              alignItems: 'center',
              justifyContent: 'center',
            },
            LS.glow,
          ]}
        >
          <LIcon name="mark-email-read" size={34} color={LL.ink} />
        </View>

        <Text
          style={{
            fontFamily: FL.serif,
            fontSize: 32,
            lineHeight: 32,
            letterSpacing: -0.8,
            color: LL.ink,
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 8 }]}>We sent a 6-digit code to</Text>
        <Text style={[TL.bodyLg, { color: LL.ink, fontWeight: '600', marginTop: 2 }]}>{maskEmail(email)}</Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <OtpInput value={code} onChange={setCode} />
      </View>

      <View style={{ alignItems: 'center', paddingTop: 14, flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
        <LIcon name="info" size={12} color={LL.text3} />
        <Text style={[TL.labelSm, { color: LL.text2 }]}>CHECK YOUR INBOX (AND SPAM FOLDER)</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 14, alignItems: 'center' }}>
        <Text style={[TL.bodySm, { color: LL.text2 }]}>Didn't get it?</Text>
        {cooldown > 0 ? (
          <Text style={[TL.bodySm, { color: LL.text3 }]}>
            Resend in <Text style={[TL.mono, { color: LL.ink }]}>{fmt}</Text>
          </Text>
        ) : (
          <Text
            onPress={onResend}
            style={[TL.bodySm, { color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }]}
          >
            Resend code
          </Text>
        )}
      </View>

      {error ? (
        <Text style={[TL.bodySm, { color: LL.coral, textAlign: 'center', marginTop: 12, paddingHorizontal: 20 }]}>
          {error}
        </Text>
      ) : null}

      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <LBtn
          label={busy ? 'Verifying…' : 'Verify & continue'}
          variant="ink"
          size="lg"
          block
          trailing="arrow-forward"
          onPress={code.length === 6 && !busy ? onVerify : undefined}
        />
      </View>

      <View style={{ paddingTop: 16, alignItems: 'center' }}>
        <Text style={[TL.bodySm, { color: LL.text2 }]}>
          Wrong email?{' '}
          <Text
            onPress={() => navigation.goBack()}
            style={{ color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }}
          >
            Change it
          </Text>
        </Text>
      </View>
    </LScreen>
  );
}
