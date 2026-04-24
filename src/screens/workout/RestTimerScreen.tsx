import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LBtn,
  LRing,
  LEm,
  LRadialWash,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

export function RestTimerScreen({ navigation }: RootStackScreenProps<'RestTimer'>) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: LL.bg, paddingTop: insets.top }}>
      {/* Ambient lime wash behind the timer ring */}
      <LRadialWash
        color={LL.primary}
        opacity={0.55}
        cx="50%"
        cy="44%"
        rx="65%"
        ry="40%"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View style={{ padding: 16, paddingHorizontal: 20, opacity: 0.35 }}>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>PUSH DAY · UPPER</Text>
        <Text style={[TL.mono, { color: LL.ink, fontSize: 18 }]}>00:26:04</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={[TL.labelMd, { color: LL.ink }]}>REST</Text>
        <Text style={[TL.bodySm, { color: LL.text2, marginTop: 4, textAlign: 'center' }]}>
          After Bench Press · Set 3 · 70 kg × 6 <Text style={{ color: LL.coral }}>🔥 PR</Text>
        </Text>

        <View style={{ marginTop: 28, ...LS.glow }}>
          <LRing size={240} stroke={12} value={0.48} color={LL.ink}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontFamily: FL.serif, fontSize: 72, color: LL.ink, letterSpacing: -3, lineHeight: 74 }}>01:12</Text>
              <Text style={[TL.labelMd, { color: LL.text2, marginTop: 4 }]}>OF 2:30</Text>
            </View>
          </LRing>
        </View>

        <View style={{ marginTop: 24, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, backgroundColor: LL.coral, flexDirection: 'row', alignItems: 'center', gap: 8, ...LS.coral }}>
          <LIcon name="emoji_events" size={18} color="#fff" />
          <Text style={{ fontFamily: FL.serif, fontSize: 18, letterSpacing: -0.3, color: '#fff' }}>
            That's a <LEm color="#fff">PR</LEm>, brother.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 24, width: '100%', maxWidth: 320 }}>
          <LBtn label="−15s" variant="cream" style={{ flex: 1 }} />
          <LBtn label="Skip" variant="ink" icon="skip_next" style={{ flex: 1.5 }} onPress={() => navigation.goBack()} />
          <LBtn label="+15s" variant="cream" style={{ flex: 1 }} />
        </View>

        <View style={{ marginTop: 18, padding: 14, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bSubtle, width: '100%', maxWidth: 320, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LIcon name="arrow_forward" size={20} color={LL.text2} />
          <View style={{ flex: 1 }}>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>NEXT SET</Text>
            <Text style={[TL.titleMd, { color: LL.ink }]}>Bench Press · 72.5 kg × 5</Text>
          </View>
        </View>
      </View>
      <View style={{ height: insets.bottom + 12 }} />
    </View>
  );
}
