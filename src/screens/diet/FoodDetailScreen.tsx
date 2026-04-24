import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  TL,
  FL,
  LCard,
  LChip,
  LBtn,
  LIconBtn,
  LEm,
  LSectionLabel,
  LRadialWash,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

export function FoodDetailScreen({ navigation }: RootStackScreenProps<'FoodDetail'>) {
  const insets = useSafeAreaInsets();
  const [meal, setMeal] = useState('Lunch');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: LL.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      {/* Hero */}
      <View style={{ height: 220, paddingTop: insets.top, position: 'relative', overflow: 'hidden' }}>
        <LRadialWash color={LL.primary} opacity={0.75} cx="40%" cy="50%" rx="60%" ry="80%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <LRadialWash color={LL.coral} opacity={0.45} cx="92%" cy="35%" rx="45%" ry="60%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

        <View style={{ padding: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <LIconBtn icon="arrow_back" bg="rgba(255,255,255,0.7)" onPress={() => navigation.goBack()} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <LIconBtn icon="bookmark_border" bg="rgba(255,255,255,0.7)" />
            <LIconBtn icon="ios_share" bg="rgba(255,255,255,0.7)" />
          </View>
        </View>
        <View style={{ position: 'absolute', top: 110, left: 0, right: 0, alignItems: 'center' }}>
          <View style={{ width: 140, height: 140, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: LL.bSubtle, alignItems: 'center', justifyContent: 'center' }}>
            <LIcon name="ramen_dining" size={64} color={LL.ink} />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 4 }}>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>INDIAN · LEGUMES</Text>
        <Text style={{ fontFamily: FL.serif, fontSize: 38, lineHeight: 38, letterSpacing: -1, color: LL.ink, marginTop: 4 }}>
          Moong <LEm>Dal</LEm>
        </Text>
        <Text style={[TL.bodyMd, { color: LL.text2 }]}>मूंग दाल · yellow lentil curry</Text>
      </View>

      {/* Serving + kcal */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', gap: 12 }}>
        <LCard style={{ flex: 1, padding: 14 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>SERVING</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <LIconBtn icon="remove" size={28} bg={LL.bg2} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontFamily: FL.serif, fontSize: 24, color: LL.ink, letterSpacing: -0.4, lineHeight: 26 }}>1 bowl</Text>
              <Text style={[TL.labelSm, { color: LL.text2, marginTop: 2 }]}>150 g</Text>
            </View>
            <LIconBtn icon="add" size={28} bg={LL.ink} color={LL.bg} />
          </View>
        </LCard>
        <LCard variant="ink" style={{ width: 120, padding: 14, alignItems: 'center' }}>
          <Text style={[TL.labelSm, { color: 'rgba(244,239,228,0.65)' }]}>KCAL</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 38, color: LL.primary, letterSpacing: -1, lineHeight: 40, marginTop: 4 }}>198</Text>
          <Text style={[TL.labelSm, { color: 'rgba(244,239,228,0.65)', marginTop: 2 }]}>≈ 8% OF DAY</Text>
        </LCard>
      </View>

      <LSectionLabel>MACROS</LSectionLabel>
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', gap: 10 }}>
        {[
          { label: 'PROTEIN', val: 14, unit: 'g', color: LL.ink, pct: 0.28 },
          { label: 'CARBS', val: 28, unit: 'g', color: LL.coral, pct: 0.56 },
          { label: 'FAT', val: 4, unit: 'g', color: LL.violet, pct: 0.16 },
        ].map((m) => (
          <LCard key={m.label} style={{ flex: 1, padding: 14, alignItems: 'center' }}>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>{m.label}</Text>
            <Text style={{ fontFamily: FL.serif, fontSize: 28, color: m.color, letterSpacing: -0.8, marginTop: 2, lineHeight: 30 }}>
              {m.val}<Text style={{ fontSize: 14, color: LL.text2 }}>{m.unit}</Text>
            </Text>
            <View style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(14,14,18,0.08)', marginTop: 8, overflow: 'hidden', alignSelf: 'stretch' }}>
              <View style={{ width: `${m.pct * 100}%`, height: '100%', backgroundColor: m.color }} />
            </View>
          </LCard>
        ))}
      </View>

      <LSectionLabel>MICRONUTRIENTS</LSectionLabel>
      <View style={{ paddingHorizontal: 20, gap: 6 }}>
        {[
          { label: 'Fiber', val: '8 g', pct: 0.32 },
          { label: 'Iron', val: '3.2 mg', pct: 0.22 },
          { label: 'Folate', val: '172 µg', pct: 0.43 },
          { label: 'Potassium', val: '540 mg', pct: 0.18 },
        ].map((m) => (
          <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 }}>
            <Text style={[TL.bodyMd, { color: LL.ink, width: 90 }]}>{m.label}</Text>
            <View style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(14,14,18,0.08)', overflow: 'hidden' }}>
              <View style={{ width: `${m.pct * 100}%`, height: '100%', backgroundColor: LL.ink }} />
            </View>
            <Text style={[TL.mono, { fontSize: 11, color: LL.text2, width: 70, textAlign: 'right' }]}>{m.val}</Text>
          </View>
        ))}
      </View>

      <LSectionLabel>ADD TO</LSectionLabel>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((m) => (
          <LChip key={m} label={m} active={m === meal} onPress={() => setMeal(m)} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <LBtn label={`Add to ${meal} · 198 kcal`} variant="ink" size="lg" block icon="add" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}
