import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LL, FL, TL, LBtn, LEm } from '../../components/light';
import { AuthHeader, Field, GoogleButton } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { signIn, signInWithGoogle } from '../../services/auth';

export function LogInScreen({ navigation }: RootStackScreenProps<'LogIn'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !busy;

  const onSubmit = async () => {
    setError(null);
    setBusy(true);
    const res = await signIn({ email: email.trim(), password });
    setBusy(false);
    if (!res.ok) {
      const msg = res.error ?? 'Login failed';
      // Route unverified users to OTP
      if (msg.toLowerCase().includes('verify your email')) {
        navigation.navigate('OtpVerify', { email: email.trim(), mode: 'signup' });
        return;
      }
      setError(msg);
    }
  };

  const onGoogle = async () => {
    setError(null);
    setBusy(true);
    const res = await signInWithGoogle();
    setBusy(false);
    if (!res.ok) setError(res.error ?? 'Google sign-in failed');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: LL.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <AuthHeader onBack={() => navigation.goBack()} kicker="LOG IN" />

        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          <Text style={{ fontFamily: FL.serif, fontSize: 38, lineHeight: 38, letterSpacing: -1, color: LL.ink }}>
            Welcome <LEm>back.</LEm>
          </Text>
          <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 6 }]}>
            Your streak is still going. Don't break it now.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 16, gap: 14 }}>
          <Field
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            trailingIcon="mail"
          />
          <Field
            label="PASSWORD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPwd}
            autoCapitalize="none"
            trailingIcon={showPwd ? 'visibility' : 'visibility-off'}
            onTrailingPress={() => setShowPwd(!showPwd)}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={[TL.labelMd, { color: LL.ink, textDecorationLine: 'underline' }]}
            >
              FORGOT PASSWORD?
            </Text>
          </View>
        </View>

        {error ? (
          <Text style={[TL.bodySm, { color: LL.coral, textAlign: 'center', marginTop: 14, paddingHorizontal: 20 }]}>
            {error}
          </Text>
        ) : null}

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <LBtn
            label={busy ? 'Logging in…' : 'Log in'}
            variant="ink"
            size="lg"
            block
            trailing="arrow-forward"
            onPress={canSubmit ? onSubmit : undefined}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: LL.bSubtle }} />
          <Text style={[TL.labelSm, { color: LL.text3 }]}>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: LL.bSubtle }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          <GoogleButton onPress={onGoogle} size={52} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, paddingTop: 16 }}>
          <Text style={[TL.bodySm, { color: LL.text2 }]}>No account yet?</Text>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={[TL.bodySm, { color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }]}
          >
            Sign up
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
