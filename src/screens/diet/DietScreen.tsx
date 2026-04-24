import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  TL,
  FL,
  LScreen,
  LCard,
  LRing,
  LMacroBar,
  LIconBtn,
  LTopBar,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { MainTabScreenProps } from '../../types/navigation';

type Meal = {
  type: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
  time?: string;
  items: { name: string; serving: string; kcal: number; regional?: string }[];
  kcal: number;
};

const MEALS: Meal[] = [
  { type: 'BREAKFAST', time: '8:20 AM', items: [
    { name: 'Masala Oats', serving: '1 bowl', kcal: 280 },
    { name: 'Boiled Eggs', serving: '3 pc', kcal: 215 },
  ], kcal: 495 },
  { type: 'LUNCH', time: '1:40 PM', items: [
    { name: 'Chicken Curry', serving: '200g', kcal: 320, regional: 'चिकन करी' },
    { name: 'Brown Rice', serving: '1 cup', kcal: 218 },
    { name: 'Moong Dal', serving: '1 bowl', kcal: 198 },
  ], kcal: 736 },
  { type: 'SNACK', items: [], kcal: 0 },
  { type: 'DINNER', items: [], kcal: 0 },
];

export function DietScreen({ navigation }: MainTabScreenProps<'Diet'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Diet Diary"
        subtitle="Wed, Apr 23"
        left={<LIconBtn icon="calendar_today" />}
        right={<LIconBtn icon="bar_chart" />}
      />

      {/* Summary */}
      <View style={{ marginHorizontal: 16, marginTop: 2 }}>
        <LCard style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
            <LRing size={110} stroke={10} value={0.62} color={LL.ink}>
              <Text style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, letterSpacing: -1 }}>1,820</Text>
              <Text style={[TL.labelSm, { color: LL.text2 }]}>OF 2,500</Text>
            </LRing>
            <View style={{ flex: 1 }}>
              <Text style={[TL.labelMd, { color: LL.ink }]}>680 KCAL LEFT</Text>
              <Text style={[TL.bodySm, { color: LL.text2, marginTop: 2 }]}>On track for bulk goal</Text>
              <View style={{ gap: 6, marginTop: 12 }}>
                <LMacroBar label="PROTEIN" value={112} goal={160} color={LL.ink} sub="g" />
                <LMacroBar label="CARBS" value={182} goal={280} color={LL.coral} sub="g" />
                <LMacroBar label="FAT" value={58} goal={78} color={LL.violet} sub="g" />
              </View>
            </View>
          </View>
        </LCard>
      </View>

      <LSectionLabel
        action={
          <Pressable onPress={() => navigation.navigate('FoodSearch')}>
            <Text style={[TL.labelSm, { color: LL.ink, textDecorationLine: 'underline' }]}>+ QUICK LOG</Text>
          </Pressable>
        }
      >
        MEALS
      </LSectionLabel>

      <View style={{ marginHorizontal: 16, gap: 10 }}>
        {MEALS.map((m) => {
          const empty = m.items.length === 0;
          return (
            <LCard
              key={m.type}
              style={{ padding: 14 }}
              onPress={empty ? () => navigation.navigate('FoodSearch') : undefined}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={[TL.labelMd, { color: LL.ink }]}>{m.type}</Text>
                {m.time ? <Text style={[TL.labelSm, { color: LL.text2 }]}>{m.time}</Text> : null}
                <View style={{ flex: 1 }} />
                {!empty && <Text style={[TL.mono, { color: LL.coral, fontSize: 13 }]}>{m.kcal} kcal</Text>}
              </View>
              {empty ? (
                <View style={{ marginTop: 10, padding: 12, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', borderColor: LL.bDefault, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <LIcon name="add" size={18} color={LL.text2} />
                  <Text style={[TL.bodySm, { color: LL.text2 }]}>Log {m.type.toLowerCase()}</Text>
                </View>
              ) : (
                <View style={{ marginTop: 10, gap: 6 }}>
                  {m.items.map((it, j) => (
                    <View key={j} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: LL.ink }} />
                      <Text style={[TL.bodyMd, { color: LL.ink, flex: 1 }]}>
                        {it.name}
                        {it.regional ? <Text style={[TL.bodySm, { color: LL.text2 }]}> · {it.regional}</Text> : null}
                      </Text>
                      <Text style={[TL.bodySm, { color: LL.text2 }]}>{it.serving}</Text>
                      <Text style={[TL.mono, { fontSize: 11, color: LL.text2, width: 50, textAlign: 'right' }]}>{it.kcal}</Text>
                    </View>
                  ))}
                </View>
              )}
            </LCard>
          );
        })}
      </View>
    </LScreen>
  );
}
