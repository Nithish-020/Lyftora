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
  LIconBtn,
  LTopBar,
  LPlaceholder,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

// 5 weeks × 7 days; 2 = today
const CALENDAR = [
  1, 1, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1,
  0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 2,
];

type Tint = 'lime' | 'coral' | 'violet' | 'sky' | 'cream';
const BADGES: { name: string; got: boolean; icon: string; tint: Tint }[] = [
  { name: 'First PR', got: true, icon: 'emoji_events', tint: 'lime' },
  { name: '10 Day Streak', got: true, icon: 'local_fire_department', tint: 'coral' },
  { name: 'Meal Master', got: true, icon: 'restaurant', tint: 'violet' },
  { name: 'Early Bird', got: true, icon: 'wb_sunny', tint: 'sky' },
  { name: '100 Sessions', got: true, icon: 'star', tint: 'lime' },
  { name: '30 Day', got: false, icon: 'local_fire_department', tint: 'cream' },
  { name: '1000 kg Club', got: false, icon: 'military_tech', tint: 'cream' },
  { name: 'Dawn Patrol', got: false, icon: 'bedtime', tint: 'cream' },
];

const MONTHS = ['MAR', 'APR', 'MAY', 'JUN', 'JUL'];

export function AchievementsScreen({ navigation }: RootStackScreenProps<'Achievements'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Achievements"
        left={<LIconBtn icon="arrow_back" onPress={() => navigation.goBack()} />}
        right={<LIconBtn icon="ios_share" />}
      />

      {/* Hero streak */}
      <View style={{ marginHorizontal: 16 }}>
        <LCard variant="ink" style={{ padding: 20, alignItems: 'center', overflow: 'hidden' }}>
          <View style={{ position: 'absolute', top: -40, left: '50%', marginLeft: -110, width: 220, height: 220, borderRadius: 110, backgroundColor: LL.coral, opacity: 0.35 }} />
          <LIcon name="local_fire_department" size={56} color={LL.coral} />
          <Text style={{ fontFamily: FL.serif, fontSize: 78, color: LL.bg, letterSpacing: -3, lineHeight: 74, marginTop: -4 }}>12</Text>
          <Text style={[TL.labelMd, { color: 'rgba(244,239,228,0.60)', marginTop: 4 }]}>DAY STREAK · ALL TIME BEST</Text>
        </LCard>
      </View>

      <LSectionLabel action={<Text style={[TL.labelSm, { color: LL.ink, textDecorationLine: 'underline' }]}>FULL YEAR</Text>}>
        TRAINING CALENDAR
      </LSectionLabel>

      <View style={{ marginHorizontal: 16 }}>
        <LCard style={{ padding: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            {MONTHS.map((m) => (
              <Text key={m} style={[TL.labelSm, { color: LL.text2 }]}>{m}</Text>
            ))}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
            {CALENDAR.map((v, i) => (
              <View
                key={i}
                style={{
                  width: `${(100 - 6 * 3 / 7) / 7}%` as unknown as number,
                  aspectRatio: 1,
                  borderRadius: 4,
                  backgroundColor: v === 2 ? LL.primary : v === 1 ? LL.ink : 'rgba(14,14,18,0.06)',
                  borderWidth: v === 2 ? 1.5 : 0,
                  borderColor: LL.ink,
                  ...(v === 2 ? LS.glow : {}),
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>LESS</Text>
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'rgba(14,14,18,0.06)' }} />
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: 'rgba(14,14,18,0.25)' }} />
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: LL.ink }} />
              <View style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: LL.primary }} />
            </View>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>MORE</Text>
            <View style={{ flex: 1 }} />
            <Text style={[TL.labelSm, { color: LL.ink }]}>28/35 DAYS</Text>
          </View>
        </LCard>
      </View>

      <LSectionLabel>BADGES · 5 / 24</LSectionLabel>
      <View style={{ marginHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {BADGES.map((b) => (
          <View
            key={b.name}
            style={{
              width: `${(100 - 30 / 4) / 4}%` as unknown as number,
              aspectRatio: 0.85,
              padding: 10,
              borderRadius: 14,
              backgroundColor: b.got ? '#fff' : LL.bg2,
              borderWidth: 1,
              borderStyle: b.got ? 'solid' : 'dashed',
              borderColor: b.got ? LL.bSubtle : LL.bDefault,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              opacity: b.got ? 1 : 0.5,
              ...(b.got ? LS.sm : {}),
            }}
          >
            <LPlaceholder width={40} height={40} tint={b.tint} icon={b.icon} radius={10} />
            <Text style={[TL.labelSm, { color: LL.ink, fontSize: 9, textAlign: 'center' }]}>{b.name}</Text>
          </View>
        ))}
      </View>
    </LScreen>
  );
}
