import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LL, FL, TL, LBtn, LEm, LIcon, LScreen } from '../../components/light';
import { AuthHeader, Field } from '../../components/auth';
import type { RootStackScreenProps } from '../../types/navigation';
import { confirmPasswordReset } from '../../services/auth';

function pwdScore(pwd: string) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/\d/.test(pwd)) s++;
  if (/[!@#$%^&*]/.test(pwd)) s++;
  if (pwd.length >= 12) s++;
  return s;
}

export function ResetPasswordScreen({ navigation }: RootStackScreenProps<'ResetPassword'>) {
  const [newPwd, setNewPwd] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const score = pwdScore(newPwd);
  const matches = confirm.length > 0 && confirm === newPwd;
  const canSubmit = score >= 2 && matches && !busy;

  const onSubmit = async () => {
    setError(null);
    setBusy(true);
    const res = await confirmPasswordReset(newPwd);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Could not reset password');
      return;
    }
    // Auth listener will flip to 'authenticated' and navigator switches.
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: LL.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LScreen bg={LL.bg} padBottom={false}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <AuthHeader onBack={() => navigation.goBack()} kicker="NEW PASSWORD" />

          <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
            <Text style={{ fontFamily: FL.serif, fontSize: 34, lineHeight: 34, letterSpacing: -0.8, color: LL.ink }}>
              Set a new <LEm>password.</LEm>
            </Text>
            <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 6 }]}>
              Pick a new password to finish resetting your account.
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 16, gap: 14 }}>
            <View>
              <Field
                label="NEW PASSWORD"
                value={newPwd}
                onChangeText={setNewPwd}
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
                        i < score
                          ? score <= 1
                            ? LL.coral
                            : score <= 2
                            ? '#E8A83C'
                            : LL.ink
                          : 'rgba(14,14,18,0.08)',
                    }}
                  />
                ))}
              </View>
              {score >= 3 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <LIcon name="check-circle" size={12} color="#3D7A1F" />
                  <Text style={[TL.labelSm, { color: '#3D7A1F' }]}>STRONG PASSWORD</Text>
                </View>
              ) : null}
            </View>

            <Field
              label="CONFIRM NEW PASSWORD"
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
              label={busy ? 'Resetting…' : 'Reset & log in'}
              variant="ink"
              size="lg"
              block
              trailing="arrow-forward"
              onPress={canSubmit ? onSubmit : undefined}
            />
          </View>
        </ScrollView>
      </LScreen>
    </KeyboardAvoidingView>
  );
}
