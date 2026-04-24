import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  TL,
  FL,
  LScreen,
  LCard,
  LIconBtn,
  LTopBar,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { MainTabScreenProps } from '../../types/navigation';

const WEEKS = [0.4, 0.55, 0.48, 0.72, 0.68, 0.82, 0.9];
const PRS = [
  { ex: 'Bench Press', w: 72.5, r: 5, date: '2d ago', up: true },
  { ex: 'Squat', w: 100, r: 3, date: '1w ago', up: true },
  { ex: 'Deadlift', w: 120, r: 5, date: '2w ago', up: false },
];

export function ProgressScreen(_props: MainTabScreenProps<'Progress'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Progress"
        subtitle="Last 7 weeks"
        left={<LIconBtn icon="filter_list" />}
        right={<LIconBtn icon="share" />}
      />

      {/* Volume hero */}
      <View style={{ marginHorizontal: 16, marginTop: 2 }}>
        <LCard variant="ink" style={{ padding: 18 }}>
          <Text style={[TL.labelMd, { color: 'rgba(244,239,228,0.60)' }]}>TOTAL VOLUME</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <Text style={{ fontFamily: FL.serif, fontSize: 56, color: LL.bg, letterSpacing: -2, lineHeight: 56 }}>127.8k</Text>
            <Text style={[TL.bodyMd, { color: 'rgba(244,239,228,0.60)' }]}>kg · 7 wk</Text>
          </View>
          <Text style={[TL.bodySm, { color: LL.primary, marginTop: 4 }]}>↑ 12% vs previous period</Text>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 16 }}>
            {WEEKS.map((v, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                <View style={{ width: '100%', height: `${v * 100}%` as unknown as number, backgroundColor: i === WEEKS.length - 1 ? LL.primary : 'rgba(244,239,228,0.20)', borderRadius: 4 }} />
                <Text style={[TL.labelSm, { fontSize: 9, color: 'rgba(244,239,228,0.50)' }]}>W{i + 1}</Text>
              </View>
            ))}
          </View>
        </LCard>
      </View>

      <LSectionLabel
        action={<Text style={[TL.labelSm, { color: LL.ink, textDecorationLine: 'underline' }]}>ALL →</Text>}
      >
        PERSONAL RECORDS
      </LSectionLabel>
      <View style={{ marginHorizontal: 16, gap: 8 }}>
        {PRS.map((p) => (
          <LCard key={p.ex} style={{ padding: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: p.up ? LL.primary : LL.coralSurface, alignItems: 'center', justifyContent: 'center' }}>
                <LIcon name={p.up ? 'arrow_upward' : 'emoji_events'} size={20} color={p.up ? LL.ink : LL.coral} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[TL.titleMd, { color: LL.ink }]}>{p.ex}</Text>
                <Text style={[TL.bodySm, { color: LL.text2 }]}>{p.date}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[TL.mono, { color: LL.ink, fontSize: 16 }]}>{p.w} kg</Text>
                <Text style={[TL.labelSm, { color: LL.text2 }]}>× {p.r}</Text>
              </View>
            </View>
          </LCard>
        ))}
      </View>

      <LSectionLabel>BODY</LSectionLabel>
      <View style={{ marginHorizontal: 16, flexDirection: 'row', gap: 10 }}>
        <LCard style={{ flex: 1, padding: 14 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>WEIGHT</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            74.2 <Text style={[TL.bodyMd, { color: LL.text2 }]}>kg</Text>
          </Text>
          <Text style={[TL.bodySm, { color: LL.coral }]}>+1.2 this month</Text>
        </LCard>
        <LCard style={{ flex: 1, padding: 14 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>BODY FAT</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            17.8<Text style={[TL.bodyMd, { color: LL.text2 }]}>%</Text>
          </Text>
          <Text style={[TL.bodySm, { color: LL.text2 }]}>Est · DEXA</Text>
        </LCard>
      </View>
    </LScreen>
  );
}
