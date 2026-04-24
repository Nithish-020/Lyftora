import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LL, FL, TL, LBtn, LEm, LIcon } from '../../components/light';
import { AuthHeader, Field, type FieldState } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { signUp, checkUsernameAvailable } from '../../services/auth';

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

function usePasswordScore(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/\d/.test(pwd)) score++;
  if (/[!@#$%^&*]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;
  return score;
}

export function SignUpScreen({ navigation }: RootStackScreenProps<'SignUp'>) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [usernameState, setUsernameState] = React.useState<FieldState>('default');
  const [usernameHint, setUsernameHint] = React.useState<string | undefined>();
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const pwdScore = usePasswordScore(password);
  const validUsername = USERNAME_RE.test(username);
  const validEmail = /\S+@\S+\.\S+/.test(email);
  const matches = confirm.length > 0 && confirm === password;

  React.useEffect(() => {
    if (!validUsername) {
      setUsernameState(username ? 'error' : 'default');
      setUsernameHint(undefined);
      return;
    }
    const t = setTimeout(async () => {
      const res = await checkUsernameAvailable(username);
      if (res.error) {
        setUsernameState('default');
        setUsernameHint(undefined);
        return;
      }
      setUsernameState(res.available ? 'ok' : 'error');
      setUsernameHint(res.available ? 'AVAILABLE' : 'TAKEN');
    }, 300);
    return () => clearTimeout(t);
  }, [username, validUsername]);

  const canSubmit = validUsername && validEmail && pwdScore >= 2 && matches && !busy && usernameState !== 'error';

  const onSubmit = async () => {
    setError(null);
    if (!canSubmit) return;
    setBusy(true);
    const res = await signUp({ username, email: email.trim(), password });
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Signup failed');
      return;
    }
    navigation.navigate('OtpVerify', { email: email.trim(), mode: 'signup' });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: LL.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <AuthHeader onBack={() => navigation.goBack()} step={1} totalSteps={2} />

        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          <Text style={{ fontFamily: FL.serif, fontSize: 34, lineHeight: 34, letterSpacing: -0.9, color: LL.ink }}>
            Create your <LEm>account.</LEm>
          </Text>
          <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 6 }]}>
            We'll email you a 6-digit code to verify.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 14, gap: 14 }}>
          <Field
            label="USERNAME"
            value={username}
            onChangeText={(t) => setUsername(t.toLowerCase())}
            state={usernameState}
            hint={usernameHint}
            helper="Lowercase, numbers, underscore · 3–20 chars"
            autoCapitalize="none"
            autoCorrect={false}
            trailingIcon={usernameState === 'ok' ? 'check-circle' : undefined}
            trailingColor={usernameState === 'ok' ? '#3D7A1F' : undefined}
          />

          <Field
            label="EMAIL"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            trailingIcon="mail"
          />

          <View>
            <Field
              label="PASSWORD"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPwd}
              autoCapitalize="none"
              trailingIcon={showPwd ? 'visibility' : 'visibility-off'}
              onTrailingPress={() => setShowPwd(!showPwd)}
            />
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor:
                      i < pwdScore
                        ? pwdScore <= 1
                          ? LL.coral
                          : pwdScore <= 2
                          ? '#E8A83C'
                          : LL.ink
                        : 'rgba(14,14,18,0.08)',
                  }}
                />
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
              {[
                { label: '8+ CHARS', ok: password.length >= 8 },
                { label: 'NUMBER', ok: /\d/.test(password) },
                { label: 'SYMBOL', ok: /[!@#$%^&*]/.test(password) },
              ].map((c) => (
                <View key={c.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <LIcon name={c.ok ? 'check' : 'close'} size={11} color={c.ok ? '#3D7A1F' : LL.text3} />
                  <Text style={[TL.labelSm, { color: c.ok ? '#3D7A1F' : LL.text3 }]}>{c.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <Field
            label="CONFIRM PASSWORD"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showPwd}
            autoCapitalize="none"
            state={matches ? 'ok' : confirm ? 'error' : 'default'}
            helper={matches ? 'Passwords match' : confirm ? "Passwords don't match" : undefined}
            trailingIcon={matches ? 'check' : undefined}
            trailingColor={matches ? '#3D7A1F' : undefined}
          />
        </View>

        {error ? (
          <Text style={[TL.bodySm, { color: LL.coral, textAlign: 'center', marginTop: 14, paddingHorizontal: 20 }]}>
            {error}
          </Text>
        ) : null}

        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <LBtn
            label={busy ? 'Sending…' : 'Send verification code'}
            variant="ink"
            size="lg"
            block
            trailing="arrow-forward"
            onPress={onSubmit}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 4 }}>
            <Text style={[TL.bodySm, { color: LL.text2 }]}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate('LogIn')}
              style={[TL.bodySm, { color: LL.ink, fontWeight: '600', textDecorationLine: 'underline' }]}
            >
              Log in
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
