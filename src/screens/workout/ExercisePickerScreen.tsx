import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  TL,
  LScreen,
  LChip,
  LIconBtn,
  LTopBar,
  LPlaceholder,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

const MUSCLES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
const EXERCISES = [
  { name: 'Barbell Bench Press', muscle: 'Chest · Triceps', eq: 'Barbell', pr: '72.5 kg' },
  { name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders', eq: 'Dumbbell' },
  { name: 'Cable Fly', muscle: 'Chest', eq: 'Cable' },
  { name: 'Push-up', muscle: 'Chest · Core', eq: 'Bodyweight' },
  { name: 'Dumbbell Chest Press', muscle: 'Chest', eq: 'Dumbbell', pr: '28 kg' },
  { name: 'Dips', muscle: 'Chest · Triceps', eq: 'Bodyweight' },
];
const TINTS = ['lime', 'coral', 'violet', 'sky', 'cream'] as const;

export function ExercisePickerScreen({ navigation }: RootStackScreenProps<'ExercisePicker'>) {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState('Chest');

  return (
    <LScreen bg={LL.bg} padBottom={false} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Add Exercise"
        left={<LIconBtn icon="close" onPress={() => navigation.goBack()} />}
        right={<LIconBtn icon="tune" />}
      />

      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ height: 50, backgroundColor: '#fff', borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, borderWidth: 1, borderColor: LL.bSubtle }}>
          <LIcon name="search" size={20} color={LL.text2} />
          <Text style={[TL.bodyLg, { color: LL.text2 }]}>Search 400+ exercises</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        {MUSCLES.map((m) => (
          <LChip key={m} label={m} active={cat === m} onPress={() => setCat(m)} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>

      <LSectionLabel>RECENT</LSectionLabel>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {['Bench', 'Incline DB', 'Cable Fly'].map((n) => (
          <View key={n} style={{ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bSubtle, marginRight: 8 }}>
            <Text style={[TL.bodyMd, { color: LL.ink }]}>{n}</Text>
          </View>
        ))}
      </ScrollView>

      <LSectionLabel>CHEST</LSectionLabel>
      <View style={{ paddingHorizontal: 16, gap: 8, paddingBottom: 16 }}>
        {EXERCISES.map((e, i) => (
          <View key={e.name} style={{ padding: 10, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bSubtle, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <LPlaceholder width={48} height={48} tint={TINTS[i % TINTS.length]} icon="fitness_center" radius={10} />
            <View style={{ flex: 1 }}>
              <Text style={[TL.titleMd, { color: LL.ink }]}>{e.name}</Text>
              <Text style={[TL.bodySm, { color: LL.text2 }]}>{e.muscle} · {e.eq}</Text>
            </View>
            {e.pr ? (
              <View style={{ paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, backgroundColor: LL.primary }}>
                <Text style={[TL.mono, { fontSize: 10, color: LL.ink }]}>PR {e.pr}</Text>
              </View>
            ) : null}
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: LL.ink, alignItems: 'center', justifyContent: 'center' }}>
              <LIcon name="add" size={18} color={LL.bg} />
            </View>
          </View>
        ))}
      </View>
    </LScreen>
  );
}
