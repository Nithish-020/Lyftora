import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  TL,
  FL,
  LScreen,
  LCard,
  LChip,
  LBtn,
  LIconBtn,
  LTopBar,
  LPlaceholder,
  LSectionLabel,
  LEm,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { MainTabScreenProps } from '../../types/navigation';

type Template = {
  name: string;
  muscles: string[];
  dur: string;
  ex: number;
  tag?: 'POPULAR' | 'PR CHANCE' | 'NO KIT' | 'SPORT';
  tint: 'lime' | 'coral' | 'violet' | 'sky';
};

const TEMPLATES: Template[] = [
  { name: 'Push Day · Upper', muscles: ['Chest', 'Shoulders', 'Triceps'], dur: '48m', ex: 6, tag: 'POPULAR', tint: 'lime' },
  { name: 'Pull Day · Back', muscles: ['Back', 'Biceps', 'Rear delts'], dur: '52m', ex: 7, tint: 'coral' },
  { name: 'Leg Builder', muscles: ['Quads', 'Hams', 'Glutes', 'Calves'], dur: '55m', ex: 8, tag: 'PR CHANCE', tint: 'coral' },
  { name: 'Home · Bodyweight', muscles: ['Full body'], dur: '22m', ex: 5, tag: 'NO KIT', tint: 'violet' },
  { name: 'Cricket Power', muscles: ['Rotational', 'Core', 'Legs'], dur: '40m', ex: 6, tag: 'SPORT', tint: 'sky' },
];

const TAG_COLOR: Record<NonNullable<Template['tag']>, string> = {
  POPULAR: LL.ink,
  'PR CHANCE': LL.coral,
  'NO KIT': LL.violet,
  SPORT: '#1B7A96',
};

export function WorkoutScreen({ navigation }: MainTabScreenProps<'Workout'>) {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Push', 'Pull', 'Legs', 'Full', 'Mobility'];

  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Workouts"
        subtitle="Your template library"
        left={<LIconBtn icon="tune" />}
        right={<LIconBtn icon="add" bg={LL.ink} color={LL.bg} />}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6, gap: 8 }}>
        {cats.map((c) => (
          <LChip key={c} label={c} active={cat === c} onPress={() => setCat(c)} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>

      {/* AI pick */}
      <View style={{ marginHorizontal: 16, marginTop: 4, padding: 16, borderRadius: 20, backgroundColor: LL.aiSurface, borderWidth: 1, borderColor: LL.bAI, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(123,92,255,0.22)' }} />
        <Text style={[TL.labelMd, { color: LL.violet }]}>✦ AI PICK · TODAY</Text>
        <Text style={{ fontFamily: FL.serif, fontSize: 24, color: LL.ink, marginTop: 4, letterSpacing: -0.3 }}>
          Push Day · <LEm color={LL.violet}>Upper</LEm>
        </Text>
        <Text style={[TL.bodySm, { color: LL.text2, marginTop: 2 }]}>Based on yesterday's pull session + recovery</Text>
        <View style={{ marginTop: 12 }}>
          <LBtn label="Load workout" variant="ai" size="sm" trailing="arrow_forward" onPress={() => navigation.navigate('ActiveWorkout', {})} />
        </View>
      </View>

      <LSectionLabel>ALL TEMPLATES</LSectionLabel>
      <View style={{ marginHorizontal: 16, gap: 10 }}>
        {TEMPLATES.map((t, i) => (
          <LCard key={t.name} variant="surface" style={{ padding: 14 }} onPress={() => i === 0 && navigation.navigate('ActiveWorkout', {})}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <LPlaceholder width={56} height={56} tint={t.tint} icon="fitness_center" radius={12} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[TL.titleMd, { color: LL.ink }]}>{t.name}</Text>
                  {t.tag ? (
                    <View style={{ paddingVertical: 2, paddingHorizontal: 7, borderRadius: 999, borderWidth: 1, borderColor: TAG_COLOR[t.tag] }}>
                      <Text style={[TL.labelSm, { color: TAG_COLOR[t.tag] }]}>{t.tag}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={[TL.bodySm, { color: LL.text2, marginTop: 2 }]} numberOfLines={1}>
                  {t.muscles.join(' · ')}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                  <Text style={[TL.mono, { fontSize: 11, color: LL.text2 }]}>{t.dur}</Text>
                  <Text style={[TL.mono, { fontSize: 11, color: LL.text2 }]}>·</Text>
                  <Text style={[TL.mono, { fontSize: 11, color: LL.text2 }]}>{t.ex} exercises</Text>
                </View>
              </View>
              <LIcon name="chevron_right" size={20} color={LL.text2} />
            </View>
          </LCard>
        ))}
      </View>
    </LScreen>
  );
}
