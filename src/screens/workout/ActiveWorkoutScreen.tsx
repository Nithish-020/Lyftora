import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  LBtn,
  LIconBtn,
  LPlaceholder,
  LGlass,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

type SetRow = { n: number; w: number; r: number; done?: boolean; warmup?: boolean; pr?: boolean; active?: boolean };
type Exercise = { name: string; muscle: string; sets: SetRow[] };

const EXERCISES: Exercise[] = [
  {
    name: 'Barbell Bench Press', muscle: 'Chest',
    sets: [
      { n: 1, w: 40, r: 10, done: true, warmup: true },
      { n: 2, w: 60, r: 8, done: true },
      { n: 3, w: 70, r: 6, done: true, pr: true },
      { n: 4, w: 72.5, r: 5, active: true },
    ],
  },
  {
    name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders',
    sets: [{ n: 1, w: 20, r: 10 }, { n: 2, w: 22.5, r: 8 }, { n: 3, w: 22.5, r: 8 }],
  },
  {
    name: 'Cable Fly', muscle: 'Chest',
    sets: [{ n: 1, w: 15, r: 12 }, { n: 2, w: 15, r: 12 }, { n: 3, w: 17.5, r: 10 }],
  },
];

export function ActiveWorkoutScreen({ navigation }: RootStackScreenProps<'ActiveWorkout'>) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: LL.bg }}>
      {/* Sticky header */}
      <LGlass intensity={42} style={{ paddingTop: insets.top + 10, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: LL.bSubtle }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LIconBtn icon="close" onPress={() => navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <Text style={[TL.labelMd, { color: LL.text2 }]}>PUSH DAY · UPPER</Text>
            <Text style={[TL.monoLg, { color: LL.ink, fontSize: 22, letterSpacing: 0.5 }]}>00:24:18</Text>
          </View>
          <LBtn label="Finish" variant="primary" size="sm" onPress={() => navigation.navigate('PostWorkout')} />
        </View>

        <View style={{ flexDirection: 'row', gap: 4, marginTop: 10 }}>
          {[1, 1, 1, 0.5, 0, 0].map((v, i) => (
            <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: 'rgba(14,14,18,0.10)' }}>
              {v > 0 ? <View style={{ height: '100%', width: `${v * 100}%`, backgroundColor: LL.ink }} /> : null}
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>EX 1 / 6</Text>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>VOL 3,260 kg</Text>
          <Text style={[TL.labelSm, { color: LL.coral }]}>3 PRs</Text>
        </View>
      </LGlass>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: insets.bottom + 24 }}>
        {EXERCISES.map((ex, idx) => {
          const active = idx === 0;
          return (
            <View key={ex.name} style={{ borderRadius: 20, backgroundColor: active ? '#fff' : LL.bg2, borderWidth: active ? 1.5 : 1, borderColor: active ? LL.ink : LL.bSubtle, overflow: 'hidden', ...(active ? LS.md : {}) }}>
              <View style={{ padding: 14, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <LPlaceholder width={44} height={44} radius={12} tint={active ? 'lime' : 'cream'} icon="fitness_center" />
                <View style={{ flex: 1 }}>
                  <Text style={[TL.titleMd, { color: LL.ink }]}>{ex.name}</Text>
                  <Text style={[TL.bodySm, { color: LL.text2 }]}>{ex.muscle}</Text>
                </View>
                <LIconBtn icon="more_horiz" size={32} />
              </View>

              <View style={{ paddingHorizontal: 14 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
                  <Text style={[TL.labelSm, { color: LL.text2, width: 30 }]}>SET</Text>
                  <Text style={[TL.labelSm, { color: LL.text2, flex: 1 }]}>WEIGHT</Text>
                  <Text style={[TL.labelSm, { color: LL.text2, flex: 1 }]}>REPS</Text>
                  <Text style={[TL.labelSm, { color: LL.text2, flex: 1 }]}>RPE</Text>
                  <View style={{ width: 36 }} />
                </View>
                {ex.sets.map((s) => (
                  <View key={s.n} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: LL.bSubtle, backgroundColor: s.active ? LL.primarySurface : 'transparent', borderRadius: s.active ? 8 : 0, marginHorizontal: s.active ? -14 : 0, paddingHorizontal: s.active ? 14 : 0 }}>
                    <Text style={[TL.mono, { fontSize: 13, width: 30, color: s.warmup ? LL.coral : LL.ink }]}>{s.warmup ? 'W' : s.n}</Text>
                    <Text style={[TL.mono, { flex: 1, color: LL.ink }]}>
                      {s.w} <Text style={{ color: LL.text2, fontSize: 11 }}>kg</Text>
                    </Text>
                    <Text style={[TL.mono, { flex: 1, color: LL.ink }]}>{s.r}</Text>
                    <Text style={[TL.mono, { flex: 1, color: LL.text2 }]}>{s.done ? '8' : '—'}</Text>
                    <SetMark set={s} />
                  </View>
                ))}
              </View>

              {active ? (
                <View style={{ padding: 14, paddingTop: 12, flexDirection: 'row', gap: 8 }}>
                  <LBtn label="Log set" variant="ink" size="sm" icon="check" style={{ flex: 1 }} onPress={() => navigation.navigate('RestTimer')} />
                  <LBtn label="Add set" variant="secondary" size="sm" icon="add" />
                </View>
              ) : (
                <Pressable style={{ padding: 14, paddingVertical: 12 }}>
                  <Text style={[TL.labelMd, { color: LL.text2, textAlign: 'center' }]}>+ ADD SET</Text>
                </Pressable>
              )}
            </View>
          );
        })}

        <Pressable
          onPress={() => navigation.navigate('ExercisePicker')}
          style={{ padding: 16, borderRadius: 16, borderWidth: 1, borderStyle: 'dashed', borderColor: LL.bDefault, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <LIcon name="add" size={20} color={LL.ink} />
          <Text style={[TL.titleMd, { color: LL.ink }]}>Add exercise</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SetMark({ set }: { set: SetRow }) {
  if (set.done) {
    return (
      <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: set.pr ? LL.coral : LL.ink, alignItems: 'center', justifyContent: 'center' }}>
        <LIcon name={set.pr ? 'emoji_events' : 'check'} size={16} color={set.pr ? '#fff' : LL.primary} />
      </View>
    );
  }
  if (set.active) {
    return <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: LL.ink, ...LS.glow }} />;
  }
  return <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: LL.bDefault }} />;
}
