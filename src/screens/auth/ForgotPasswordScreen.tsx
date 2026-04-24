import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LL, FL, TL, LBtn, LEm, LIcon, LScreen } from '../../components/light';
import { AuthHeader, Field } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { requestPasswordReset } from '../../services/auth';

export function ForgotPasswordScreen({ navigation }: RootStackScreenProps<'ForgotPassword'>) {
  const [email, setEmail] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const canSubmit = /\S+@\S+\.\S+/.test(email) && !busy;

  const onSubmit = async () => {
    setError(null);
    setBusy(true);
    const res = await requestPasswordReset(email.trim());
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Could not send reset email');
      return;
    }
    navigation.navigate('OtpVerify', { email: email.trim(), mode: 'recovery' });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: LL.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LScreen bg={LL.bg} padBottom={false}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <AuthHeader onBack={() => navigation.goBack()} kicker="RECOVER" />

          <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
            <View
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
                backgroundColor: LL.coralSurface,
                borderWidth: 1.5,
                borderColor: LL.bCoral,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <LIcon name="lock-reset" size={30} color={LL.coral} />
            </View>
            <Text style={{ fontFamily: FL.serif, fontSize: 36, lineHeight: 36, letterSpacing: -0.9, color: LL.ink }}>
              Forgot your <LEm color={LL.coral}>password?</LEm>
            </Text>
            <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 8, maxWidth: 320 }]}>
              Enter your account email. We'll send a 6-digit code to reset it.
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
            <Field
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              trailingIcon="mail"
            />
          </View>

          {error ? (
            <Text style={[TL.bodySm, { color: LL.coral, textAlign: 'center', marginTop: 14, paddingHorizontal: 20 }]}>
              {error}
            </Text>
          ) : null}

          <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
            <LBtn
              label={busy ? 'Sending…' : 'Send reset code'}
              variant="ink"
              size="lg"
              block
              trailing="arrow-forward"
              onPress={canSubmit ? onSubmit : undefined}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 14, gap: 4 }}>
              <Text style={[TL.bodySm, { color: LL.text2 }]}>Remembered it?</Text>
              <Text
                onPress={() => navigation.navigate('LogIn')}
                style={[TL.bodySm, { color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }]}
              >
                Log in
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
            <View
              style={{
                padding: 12,
                borderRadius: 14,
                backgroundColor: LL.bg2,
                borderWidth: 1,
                borderColor: LL.bSubtle,
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <LIcon name="shield" size={18} color={LL.text2} />
              <Text style={[TL.bodySm, { color: LL.text2, lineHeight: 20, flex: 1 }]}>
                Codes expire in 10 min. Up to 5 tries before you need to request a new one.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LScreen>
    </KeyboardAvoidingView>
  );
}
