import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LBtn,
  LChip,
  LEm,
  LEyebrow,
  LRing,
  LRadialWash,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';
import { useAuthStore } from '../../store/authStore';

// ───────────────────────────────────────────────────────────────────
// Onboarding is split into 4 stack routes so each step is deep-linkable
// (e.g. lyftora://onboarding/profile) and the native back-gesture works
// across steps. Each step component is local to this file because they
// share the StepHeader / StepDots helpers and never render outside the
// Onboarding flow.
// ───────────────────────────────────────────────────────────────────

// ═══════════════ STEP 1 — Welcome ═══════════════
export function OnboardingWelcomeScreen({ navigation }: RootStackScreenProps<'OnboardingWelcome'>) {
  const insets = useSafeAreaInsets();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const goNext = () => navigation.navigate('OnboardingCoach');
  const signIn = () => completeOnboarding({});

  return (
    <View style={{ flex: 1, backgroundColor: LL.bg }}>
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <LRadialWash color={LL.primary} opacity={0.85} cx="85%" cy="18%" rx="55%" ry="45%" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%' }} />
        <LRadialWash color={LL.coral} opacity={0.75} cx="10%" cy="78%" rx="55%" ry="45%" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' }} />
        <LRadialWash color={LL.violet} opacity={0.55} cx="40%" cy="55%" rx="45%" ry="35%" style={{ position: 'absolute', top: '25%', left: 0, right: 0, height: '50%' }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: LL.primary, shadowColor: LL.primary, shadowOpacity: 0.6, shadowRadius: 3, shadowOffset: { width: 0, height: 0 }, elevation: 2 }} />
          <Text style={{ fontFamily: FL.serif, fontSize: 24, letterSpacing: -0.3, color: LL.ink }}>lyftora</Text>
          <View style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, backgroundColor: LL.ink }}>
            <Text style={[TL.labelSm, { color: LL.bg, fontSize: 9 }]}>NAMASTE</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <LEyebrow>WELCOME IN · V 1.0</LEyebrow>
        <Text style={{ fontFamily: FL.serif, fontSize: 58, lineHeight: 54, letterSpacing: -1.6, color: LL.ink, marginTop: 18, marginBottom: 14 }}>
          Your coach.{'\n'}Your kitchen.{'\n'}<LEm>Your pace.</LEm>
        </Text>
        <Text style={[TL.bodyLg, { color: LL.text2, maxWidth: 320 }]}>
          AI personal training tuned for desi kitchens and small home gyms. No subscription. Just show up.
        </Text>

        <View style={{ marginTop: 26 }}>
          <LBtn label="Let's go" variant="ink" size="lg" block trailing="arrow_forward" onPress={goNext} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16, gap: 6 }}>
            <Text style={[TL.bodySm, { color: LL.text2 }]}>Already have an account?</Text>
            <Pressable onPress={signIn}>
              <Text style={[TL.bodySm, { color: LL.ink, fontFamily: FL.sansSemiBold, textDecorationLine: 'underline' }]}>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

// ═══════════════ STEP 2 — AI Coach intro ═══════════════
export function OnboardingCoachScreen({ navigation }: RootStackScreenProps<'OnboardingCoach'>) {
  const insets = useSafeAreaInsets();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const goNext = () => navigation.navigate('OnboardingTracking');
  const skip = () => completeOnboarding({});

  return (
    <View style={{ flex: 1, backgroundColor: LL.bg, paddingTop: insets.top }}>
      <StepHeader onBack={() => navigation.goBack()} onSkip={skip} />

      <View style={{ height: 310, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <View style={{ position: 'absolute', width: 240, height: 240, borderRadius: 120, borderWidth: 1, borderColor: LL.bAI, borderStyle: 'dashed' }} />
        <View style={{ position: 'absolute', width: 170, height: 170, borderRadius: 85, borderWidth: 1, borderColor: 'rgba(123,92,255,0.45)', borderStyle: 'dashed' }} />
        <View style={{ position: 'absolute', top: 46, right: 28, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bSubtle, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14, borderBottomRightRadius: 4, ...LS.sm }}>
          <Text style={[TL.bodySm, { color: LL.ink }]}>Leg day?</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 54, left: 20, backgroundColor: LL.aiSurface, borderWidth: 1, borderColor: LL.bAI, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14, borderBottomLeftRadius: 4 }}>
          <Text style={[TL.bodySm, { color: LL.violet, fontFamily: FL.sansMedium }]}>Squats @ 4×8. Ready?</Text>
        </View>
        <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: LL.violet, alignItems: 'center', justifyContent: 'center', ...LS.glowAI }}>
          <LIcon name="auto_awesome" size={44} color="#fff" />
        </View>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <Text style={[TL.labelMd, { color: LL.violet, marginBottom: 10 }]}>STEP 1 · AI COACH</Text>
        <Text style={{ fontFamily: FL.serif, fontSize: 36, lineHeight: 37, letterSpacing: -0.8, color: LL.ink }}>
          A trainer that knows your <LEm color={LL.violet}>dal</LEm>, your desk job, and your <LEm>deadlift.</LEm>
        </Text>
        <Text style={[TL.bodyLg, { color: LL.text2, marginTop: 14 }]}>
          Tell it your week. It builds the plan. Ask anything — form cues, rest, substitutions. It remembers.
        </Text>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <StepDots step={0} total={3} />
        <LBtn label="Next" variant="ink" size="lg" block trailing="arrow_forward" onPress={goNext} />
      </View>
    </View>
  );
}

// ═══════════════ STEP 3 — Tracking intro ═══════════════
export function OnboardingTrackingScreen({ navigation }: RootStackScreenProps<'OnboardingTracking'>) {
  const insets = useSafeAreaInsets();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const goNext = () => navigation.navigate('OnboardingProfile');
  const skip = () => completeOnboarding({});

  return (
    <View style={{ flex: 1, backgroundColor: LL.bg, paddingTop: insets.top }}>
      <StepHeader onBack={() => navigation.goBack()} onSkip={skip} />

      <View style={{ height: 310, position: 'relative' }}>
        <View style={{ position: 'absolute', top: 46, left: 28, width: 150, backgroundColor: '#fff', borderRadius: 18, padding: 12, borderWidth: 1, borderColor: LL.bSubtle, transform: [{ rotate: '-7deg' }], ...LS.lg }}>
          <Text style={[TL.labelSm, { color: LL.text2, marginBottom: 6 }]}>TODAY</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <LRing size={56} stroke={6} value={0.68} color={LL.ink}>
              <Text style={[TL.mono, { fontSize: 11, color: LL.ink }]}>1820</Text>
            </LRing>
            <View>
              <Text style={[TL.bodySm, { color: LL.text2 }]}>kcal</Text>
              <Text style={[TL.mono, { fontSize: 11, color: LL.coral }]}>−680</Text>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 26, right: 20, width: 170, backgroundColor: LL.ink, borderRadius: 18, padding: 12, transform: [{ rotate: '6deg' }], ...LS.lg }}>
          <Text style={[TL.labelSm, { color: LL.primary }]}>🔥 PR</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 20, color: LL.bg, marginTop: 2, letterSpacing: -0.3 }}>Bench Press</Text>
          <Text style={[TL.mono, { color: LL.primary, fontSize: 20, marginTop: 2 }]}>72.5 kg × 5</Text>
          <View style={{ height: 4, backgroundColor: 'rgba(244,239,228,0.15)', borderRadius: 2, marginTop: 10 }}>
            <View style={{ width: '72%', height: '100%', backgroundColor: LL.primary, borderRadius: 2 }} />
          </View>
        </View>
        <View style={{ position: 'absolute', top: 90, right: 40, width: 130, backgroundColor: '#fff', borderRadius: 16, padding: 10, borderWidth: 1, borderColor: LL.bSubtle, transform: [{ rotate: '-4deg' }], ...LS.md }}>
          <Text style={[TL.bodySm, { color: LL.ink, fontFamily: FL.sansSemiBold }]}>Moong Dal</Text>
          <Text style={[TL.mono, { fontSize: 10, color: LL.text2, marginTop: 2 }]}>1 bowl · 198 kcal</Text>
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: LL.primary }} />
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: LL.coral }} />
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: LL.violet }} />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <Text style={[TL.labelMd, { color: LL.ink, marginBottom: 10 }]}>STEP 2 · TRACKING</Text>
        <Text style={{ fontFamily: FL.serif, fontSize: 36, lineHeight: 37, letterSpacing: -0.8, color: LL.ink }}>
          Every set. Every <LEm>roti.</LEm> Nothing slips.
        </Text>
        <Text style={[TL.bodyLg, { color: LL.text2, marginTop: 14 }]}>
          100+ Indian foods with real macros. Set logging that keeps up. Offline by default.
        </Text>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <StepDots step={1} total={3} />
        <LBtn label="Next" variant="ink" size="lg" block trailing="arrow_forward" onPress={goNext} />
      </View>
    </View>
  );
}

// ═══════════════ STEP 4 — Profile setup ═══════════════
export function OnboardingProfileScreen({ navigation }: RootStackScreenProps<'OnboardingProfile'>) {
  const insets = useSafeAreaInsets();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const [exp, setExp] = useState('Intermediate');
  const [goal, setGoal] = useState('gain');

  const finish = () => {
    // Stash onboarding data locally; authStore will persist to backend after signup.
    completeOnboarding({ experience: exp, goal });
  };
  const goals = [
    { id: 'lose', label: 'Cut', sub: 'Lose fat', icon: 'trending_down' },
    { id: 'maintain', label: 'Hold', sub: 'Maintain', icon: 'balance' },
    { id: 'gain', label: 'Bulk', sub: 'Build muscle', icon: 'trending_up' },
  ] as const;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: LL.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      <View style={{ paddingTop: insets.top + 14, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={[TL.labelMd, { color: LL.text2 }]}>← BACK</Text>
        </Pressable>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>STEP 3 / 3</Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 }}>
        <Text style={{ fontFamily: FL.serif, fontSize: 40, lineHeight: 38, letterSpacing: -1, color: LL.ink }}>
          Let's make it <LEm>yours.</LEm>
        </Text>
        <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 6 }]}>90 seconds. Edit anytime.</Text>
      </View>

      <View style={{ paddingHorizontal: 20, gap: 14 }}>
        <View>
          <Text style={[TL.labelMd, { color: LL.text2, marginBottom: 6 }]}>NAME</Text>
          <View style={{ height: 50, backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: LL.ink }}>
            <Text style={{ fontFamily: FL.serif, fontSize: 20, color: LL.ink }}>Nithish A.</Text>
            <View style={{ width: 2, height: 20, backgroundColor: LL.coral, marginLeft: 3 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[
            { label: 'AGE', val: '27', unit: 'yr' },
            { label: 'WEIGHT', val: '74', unit: 'kg' },
            { label: 'HEIGHT', val: '176', unit: 'cm' },
          ].map((f) => (
            <View key={f.label} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: LL.bSubtle }}>
              <Text style={[TL.labelSm, { color: LL.text2 }]}>{f.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3, marginTop: 4 }}>
                <Text style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, letterSpacing: -1 }}>{f.val}</Text>
                <Text style={[TL.labelSm, { color: LL.text2 }]}>{f.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View>
          <Text style={[TL.labelMd, { color: LL.text2, marginBottom: 8 }]}>EXPERIENCE</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['Beginner', 'Intermediate', 'Advanced'].map((x) => (
              <LChip key={x} label={x} active={x === exp} onPress={() => setExp(x)} />
            ))}
          </View>
        </View>

        <View>
          <Text style={[TL.labelMd, { color: LL.text2, marginBottom: 8 }]}>GOAL</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {goals.map((g) => {
              const active = g.id === goal;
              return (
                <Pressable key={g.id} onPress={() => setGoal(g.id)} style={{ flex: 1, backgroundColor: active ? LL.primary : '#fff', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: active ? 1.5 : 1, borderColor: active ? LL.ink : LL.bSubtle, ...(active ? LS.glow : {}) }}>
                  <LIcon name={g.icon} size={22} color={LL.ink} />
                  <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, marginTop: 2, letterSpacing: -0.2 }}>{g.label}</Text>
                  <Text style={[TL.labelSm, { color: active ? LL.ink : LL.text2 }]}>{g.sub}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <LBtn label="Build my plan" variant="ink" size="lg" block trailing="auto_awesome" onPress={finish} />
      </View>
    </ScrollView>
  );
}

// ───────────────────────────────────────────────────────────────────
// Shared step chrome
// ───────────────────────────────────────────────────────────────────
function StepHeader({ onBack, onSkip }: { onBack: () => void; onSkip: () => void }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Pressable onPress={onBack}>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>← BACK</Text>
      </Pressable>
      <Pressable onPress={onSkip}>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>SKIP</Text>
      </Pressable>
    </View>
  );
}

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 3, backgroundColor: i === step ? LL.ink : 'rgba(14,14,18,0.18)' }} />
      ))}
    </View>
  );
}
