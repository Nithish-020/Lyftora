import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LScreen,
  LCard,
  LBtn,
  LEm,
  LSectionLabel,
  LRadialWash,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

const STATS = [
  { label: 'DURATION', val: '48:12', sub: 'min', color: LL.ink },
  { label: 'VOLUME', val: '5,260', sub: 'kg', color: LL.ink },
  { label: 'KCAL', val: '428', sub: '', color: LL.coral },
];

const BREAKDOWN = [
  { n: 'Bench Press', sets: '4 × 5–10', vol: 1460, pr: true },
  { n: 'Incline DB Press', sets: '3 × 8–10', vol: 960 },
  { n: 'Cable Fly', sets: '3 × 10–12', vol: 510 },
  { n: 'Shoulder Press', sets: '4 × 8', vol: 1120 },
];

export function PostWorkoutScreen({ navigation }: RootStackScreenProps<'PostWorkout'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      {/* Hero celebration */}
      <View style={{ paddingVertical: 32, paddingHorizontal: 20, alignItems: 'center', overflow: 'hidden' }}>
        <LRadialWash color={LL.primary} opacity={0.7} cx="35%" cy="20%" rx="55%" ry="55%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <LRadialWash color={LL.coral} opacity={0.55} cx="90%" cy="30%" rx="45%" ry="45%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

        <Text style={[TL.labelMd, { color: LL.ink, marginBottom: 8 }]}>SESSION COMPLETE</Text>
        <Text style={{ fontFamily: FL.serif, fontSize: 48, color: LL.ink, letterSpacing: -1.5, lineHeight: 46, textAlign: 'center' }}>
          Let's go, <LEm>Nithish.</LEm>
        </Text>
        <Text style={[TL.bodyMd, { color: LL.text2, marginTop: 10 }]}>Push Day · Upper · crushed</Text>
      </View>

      {/* Stats */}
      <View style={{ paddingHorizontal: 16, flexDirection: 'row', gap: 10 }}>
        {STATS.map((s) => (
          <LCard key={s.label} style={{ flex: 1, padding: 14, alignItems: 'center' }}>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>{s.label}</Text>
            <Text style={{ fontFamily: FL.serif, fontSize: 28, color: s.color, marginTop: 2, letterSpacing: -0.8 }}>{s.val}</Text>
            <Text style={[TL.bodySm, { color: LL.text2 }]}>{s.sub}</Text>
          </LCard>
        ))}
      </View>

      {/* PR banner */}
      <View style={{ marginHorizontal: 16, marginTop: 16, padding: 18, borderRadius: 20, backgroundColor: LL.ink, flexDirection: 'row', alignItems: 'center', gap: 14, overflow: 'hidden' }}>
        <LRadialWash color={LL.coral} opacity={0.55} cx="95%" cy="0%" rx="60%" ry="120%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: LL.coral, alignItems: 'center', justifyContent: 'center', ...LS.coral }}>
          <LIcon name="emoji_events" size={28} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[TL.labelMd, { color: LL.coral }]}>NEW PERSONAL RECORD</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.bg, letterSpacing: -0.3 }}>Bench Press · 72.5 kg × 5</Text>
          <Text style={[TL.bodySm, { color: 'rgba(244,239,228,0.70)' }]}>+2.5 kg from last PR</Text>
        </View>
      </View>

      <LSectionLabel>BREAKDOWN</LSectionLabel>
      <View style={{ paddingHorizontal: 16, gap: 8 }}>
        {BREAKDOWN.map((e) => (
          <LCard key={e.n} style={{ padding: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[TL.titleMd, { color: LL.ink }]}>{e.n}</Text>
                  {e.pr ? <LIcon name="emoji_events" size={14} color={LL.coral} /> : null}
                </View>
                <Text style={[TL.bodySm, { color: LL.text2 }]}>{e.sets}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[TL.mono, { color: LL.ink, fontSize: 13 }]}>{e.vol} kg</Text>
                <Text style={[TL.labelSm, { color: LL.text2 }]}>VOLUME</Text>
              </View>
            </View>
          </LCard>
        ))}
      </View>

      <View style={{ padding: 16, paddingTop: 20, paddingBottom: insets.bottom + 24, flexDirection: 'row', gap: 10 }}>
        <LBtn label="Share" variant="secondary" icon="ios_share" style={{ flex: 1 }} />
        <LBtn label="Done" variant="ink" icon="check" style={{ flex: 1.5 }} onPress={() => navigation.navigate('Main', { screen: 'Dashboard' })} />
      </View>
    </LScreen>
  );
}
