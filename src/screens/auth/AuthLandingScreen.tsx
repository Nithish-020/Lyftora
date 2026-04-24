import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LScreen, LL, FL, TL, LBtn, LEm, LEyebrow, LRadialWash } from '../../components/light';
import { GoogleButton } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { signInWithGoogle } from '../../services/auth';

export function AuthLandingScreen({ navigation }: RootStackScreenProps<'AuthLanding'>) {
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onGoogle = async () => {
    setError(null);
    setBusy(true);
    const res = await signInWithGoogle();
    setBusy(false);
    if (!res.ok) setError(res.error ?? 'Google sign-in failed');
  };

  return (
    <LScreen noScroll padBottom={false} bg={LL.bg}>
      <View style={StyleSheet.absoluteFill}>
        <LRadialWash color={LL.primary} opacity={0.55} cx="80%" cy="8%" rx="50%" ry="50%" style={{ flex: 1 }} />
      </View>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LRadialWash color={LL.coral} opacity={0.35} cx="12%" cy="82%" rx="45%" ry="45%" style={{ flex: 1 }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: LL.primary,
              shadowColor: LL.primary,
              shadowOpacity: 0.6,
              shadowRadius: 4,
            }}
          />
          <Text style={{ fontFamily: FL.serif, fontSize: 24, letterSpacing: -0.3, color: LL.ink }}>
            lyftora
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <View>
          <LEyebrow>STEP 04 · CREATE ACCOUNT</LEyebrow>
          <Text
            style={{
              fontFamily: FL.serif,
              fontWeight: '400',
              fontSize: 48,
              lineHeight: 45,
              letterSpacing: -1.4,
              marginTop: 16,
              marginBottom: 10,
              color: LL.ink,
            }}
          >
            Save your plan.{'\n'}Sign in on <LEm>any device.</LEm>
          </Text>
          <Text style={[TL.bodyLg, { color: LL.text2, maxWidth: 320 }]}>
            Your onboarding's ready. One last step — pick how to keep it safe.
          </Text>
        </View>

        <View style={{ marginTop: 26, gap: 10 }}>
          <GoogleButton onPress={onGoogle} />
          <LBtn
            label={busy ? 'Please wait…' : 'Sign up with email'}
            variant="ink"
            size="lg"
            block
            icon="mail"
            onPress={() => !busy && navigation.navigate('SignUp')}
          />

          {error ? (
            <Text style={[TL.bodySm, { color: LL.coral, textAlign: 'center', marginTop: 4 }]}>
              {error}
            </Text>
          ) : null}

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6, gap: 4 }}>
            <Text style={[TL.bodySm, { color: LL.text2 }]}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate('LogIn')}
              style={[TL.bodySm, { color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }]}
            >
              Log in
            </Text>
          </View>
          <Text style={[TL.labelSm, { color: LL.text3, textAlign: 'center', marginTop: 4, lineHeight: 17 }]}>
            BY CONTINUING YOU AGREE TO OUR{'\n'}
            <Text style={{ color: LL.text2, textDecorationLine: 'underline' }}>TERMS</Text>
            {' · '}
            <Text style={{ color: LL.text2, textDecorationLine: 'underline' }}>PRIVACY</Text>
          </Text>
        </View>
      </View>
    </LScreen>
  );
}
