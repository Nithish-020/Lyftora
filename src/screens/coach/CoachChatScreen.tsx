import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LBtn,
  LIconBtn,
  LEm,
  LGlass,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

const PLAN = [
  { n: 'Bench Press', s: '4 × 5–8', hot: true },
  { n: 'Incline DB Press', s: '3 × 8–10' },
  { n: 'Cable Fly', s: '3 × 10–12' },
  { n: 'Overhead Press', s: '4 × 8' },
  { n: '+ 2 more', s: '' },
];

const SUGGESTIONS = ["Today's plan", 'What to eat?', 'Form check', 'Explain RPE'];

export function CoachChatScreen({ navigation }: RootStackScreenProps<'CoachChat'>) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: LL.bg }}>
      {/* Header */}
      <LGlass intensity={40} style={{ paddingTop: insets.top + 10, paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: LL.bSubtle, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <LIconBtn icon="arrow_back" onPress={() => navigation.goBack()} />
        <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: LL.violet, alignItems: 'center', justifyContent: 'center', ...LS.glowAI }}>
          <LIcon name="auto_awesome" size={20} color="#fff" />
          <View style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: LL.primary, borderWidth: 2, borderColor: LL.bg }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FL.serif, fontSize: 20, color: LL.ink, letterSpacing: -0.3, lineHeight: 22 }}>Coach</Text>
          <Text style={[TL.labelSm, { color: LL.violet, marginTop: 2 }]}>TUNED TO YOU · REMEMBERS ALL</Text>
        </View>
        <LIconBtn icon="more_vert" />
      </LGlass>

      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 18, gap: 12 }}>
        <Text style={[TL.labelSm, { color: LL.text3, textAlign: 'center' }]}>· TODAY · 8:14 AM ·</Text>

        <Bubble side="ai">
          <Text style={{ fontFamily: FL.serif, fontSize: 20, lineHeight: 22, letterSpacing: -0.3, color: LL.ink }}>
            Good morning, <LEm color={LL.violet}>Nithish.</LEm>
          </Text>
          <Text style={[TL.bodyMd, { color: LL.ink, marginTop: 6 }]}>
            You smashed pull day yesterday — 3 PRs, 68 min. Recovery looks solid (sleep 7h 20m). Ready for push?
          </Text>
        </Bubble>

        <Bubble side="ai" noTail>
          <Text style={[TL.labelMd, { color: LL.violet, marginBottom: 6 }]}>TODAY'S PLAN</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.3, lineHeight: 22 }}>
            Push Day · <LEm color={LL.violet}>Upper</LEm>
          </Text>
          <View style={{ gap: 4, marginTop: 10 }}>
            {PLAN.map((ex, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: LL.bSubtle }}>
                <Text style={[TL.mono, { fontSize: 11, color: LL.text2, width: 20 }]}>{i < 4 ? `0${i + 1}` : '··'}</Text>
                <Text style={[TL.bodyMd, { color: LL.ink, flex: 1 }]}>{ex.n}</Text>
                {ex.hot ? <LIcon name="emoji_events" size={12} color={LL.coral} /> : null}
                <Text style={[TL.mono, { fontSize: 11, color: LL.text2 }]}>{ex.s}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <LBtn label="Start now" variant="ai" size="sm" icon="play_arrow" onPress={() => navigation.navigate('ActiveWorkout', {})} />
            <LBtn label="Tweak" variant="aiGhost" size="sm" />
          </View>
        </Bubble>

        <Bubble side="user">
          <Text style={[TL.bodyMd, { color: LL.bg }]}>Shoulder's a bit tight. Can we swap bench for dumbbell?</Text>
        </Bubble>

        <Bubble side="ai">
          <Text style={[TL.bodyMd, { color: LL.ink }]}>
            Good call — safer range of motion. Let's do <Text style={{ fontFamily: FL.sansBold, color: LL.ink }}>Dumbbell Bench 4 × 8</Text> at 22.5 kg, with a 2-min warm-up on the cable first.
          </Text>
          <View style={{ marginTop: 10, padding: 10, borderRadius: 12, backgroundColor: LL.coralSurface, borderWidth: 1, borderColor: LL.bCoral, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <LIcon name="tips_and_updates" size={18} color={LL.coral} />
            <Text style={[TL.bodySm, { color: LL.ink, flex: 1 }]}>Your PR is 28 kg × 6 — I'll track if today feels spicy.</Text>
          </View>
        </Bubble>

        <Bubble side="ai" noTail>
          <Text style={[TL.bodySm, { color: LL.text2, fontStyle: 'italic' }]}>
            Also — want me to bump your lunch dal to 1.5 bowls? You're <LEm>30g protein</LEm> short this week.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
            <View style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bDefault }}>
              <Text style={[TL.labelMd, { color: LL.ink }]}>YES, LOG IT</Text>
            </View>
            <View style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1, borderColor: LL.bDefault }}>
              <Text style={[TL.labelMd, { color: LL.text2 }]}>NOT NOW</Text>
            </View>
          </View>
        </Bubble>
      </ScrollView>

      {/* Composer */}
      <LGlass intensity={40} style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: insets.bottom + 12, borderTopWidth: 1, borderTopColor: LL.bSubtle }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 10 }}>
          {SUGGESTIONS.map((s) => (
            <View key={s} style={{ paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999, backgroundColor: 'rgba(123,92,255,0.08)', borderWidth: 1, borderColor: LL.bAI, marginRight: 8 }}>
              <Text style={[TL.labelSm, { color: LL.violet }]}>✦ {s}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ height: 50, backgroundColor: '#fff', borderRadius: 25, borderWidth: 1, borderColor: LL.bDefault, paddingLeft: 18, paddingRight: 6, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={[TL.bodyMd, { color: LL.text2, flex: 1 }]}>Ask Coach anything…</Text>
          <LIconBtn icon="mic" size={36} bg={LL.bg2} />
          <LIconBtn icon="arrow_upward" size={38} bg={LL.violet} color="#fff" />
        </View>
      </LGlass>
    </View>
  );
}

function Bubble({ children, side, noTail }: { children: React.ReactNode; side: 'ai' | 'user'; noTail?: boolean }) {
  const isAi = side === 'ai';
  return (
    <View style={{ flexDirection: 'row', justifyContent: isAi ? 'flex-start' : 'flex-end' }}>
      <View
        style={{
          maxWidth: '82%',
          backgroundColor: isAi ? '#fff' : LL.ink,
          padding: 14,
          paddingHorizontal: 14,
          borderRadius: 18,
          borderBottomLeftRadius: isAi && !noTail ? 4 : 18,
          borderBottomRightRadius: !isAi ? 4 : 18,
          borderWidth: isAi ? 1 : 0,
          borderColor: LL.bSubtle,
          ...(isAi ? LS.sm : LS.md),
        }}
      >
        {children}
      </View>
    </View>
  );
}
