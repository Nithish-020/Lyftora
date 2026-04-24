import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LScreen,
  LCard,
  LBtn,
  LAvatar,
  LIconBtn,
  LRing,
  LMacroBar,
  LEm,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { MainTabScreenProps } from '../../types/navigation';

export function DashboardScreen({ navigation }: MainTabScreenProps<'Dashboard'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <LAvatar name="Nithish A" size={40} tone="ink" />
        <View style={{ flex: 1 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>WED · APR 23</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.4, lineHeight: 24 }}>
            Namaste, <LEm>Nithish</LEm>
          </Text>
        </View>
        <LIconBtn icon="notifications" />
      </View>

      {/* Streak ribbon */}
      <View style={{ marginHorizontal: 16, marginTop: 14, padding: 12, paddingHorizontal: 14, borderRadius: 16, backgroundColor: LL.coralSurface, borderWidth: 1, borderColor: LL.bCoral, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <LIcon name="local_fire_department" size={22} color={LL.coral} />
        <View style={{ flex: 1 }}>
          <Text style={[TL.titleMd, { color: LL.ink }]}>
            12 day streak <Text style={[TL.bodySm, { color: LL.text2 }]}>— train today to keep it</Text>
          </Text>
        </View>
        <LIcon name="chevron_right" size={18} color={LL.text2} />
      </View>

      {/* Today's workout hero */}
      <View style={{ marginHorizontal: 16, marginTop: 12, borderRadius: 22, overflow: 'hidden', backgroundColor: LL.ink }}>
        <View style={{ position: 'absolute', top: -50, right: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: LL.primary, opacity: 0.45 }} />
        <View style={{ padding: 18 }}>
          <Text style={[TL.labelMd, { color: LL.primary }]}>TODAY'S SESSION</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 30, color: LL.bg, marginTop: 4, letterSpacing: -0.5, lineHeight: 32 }}>
            Push Day · <LEm color={LL.primary}>Upper</LEm>
          </Text>
          <View style={{ flexDirection: 'row', gap: 14, marginTop: 10 }}>
            {[
              { icon: 'schedule', label: '48 min' },
              { icon: 'fitness_center', label: '6 ex' },
              { icon: 'local_fire_department', label: '420 kcal' },
            ].map((m) => (
              <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <LIcon name={m.icon} size={13} color="rgba(244,239,228,0.70)" />
                <Text style={[TL.bodySm, { color: 'rgba(244,239,228,0.70)' }]}>{m.label}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            <LBtn label="Start" variant="primary" icon="play_arrow" onPress={() => navigation.navigate('ActiveWorkout', {})} style={{ flex: 1 }} />
            <LBtn label="Preview" variant="secondary" textStyle={{ color: LL.bg }} style={{ borderColor: 'rgba(244,239,228,0.30)' }} />
          </View>
        </View>
      </View>

      {/* Nutrition */}
      <LSectionLabel
        action={
          <Pressable onPress={() => navigation.navigate('Diet')}>
            <Text style={[TL.labelSm, { color: LL.ink, textDecorationLine: 'underline' }]}>VIEW DIARY</Text>
          </Pressable>
        }
      >
        NUTRITION
      </LSectionLabel>
      <View style={{ marginHorizontal: 16 }}>
        <LCard>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <LRing size={88} stroke={9} value={0.62} color={LL.ink}>
              <Text style={[TL.mono, { color: LL.ink, fontSize: 16 }]}>1,820</Text>
              <Text style={[TL.labelSm, { color: LL.text2 }]}>/ 2,500</Text>
            </LRing>
            <View style={{ flex: 1, gap: 8 }}>
              <LMacroBar label="PROTEIN" value={112} goal={160} color={LL.ink} sub="g" />
              <LMacroBar label="CARBS" value={182} goal={280} color={LL.coral} sub="g" />
              <LMacroBar label="FAT" value={58} goal={78} color={LL.violet} sub="g" />
            </View>
          </View>
        </LCard>
      </View>

      {/* Coach CTA */}
      <Pressable onPress={() => navigation.navigate('CoachChat', {})} style={{ marginHorizontal: 16, marginTop: 14, borderRadius: 18, padding: 14, backgroundColor: LL.aiSurface, borderWidth: 1, borderColor: LL.bAI, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: LL.violet, alignItems: 'center', justifyContent: 'center', ...LS.glowAI }}>
          <LIcon name="auto_awesome" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[TL.titleMd, { color: LL.violet }]}>Ask Coach</Text>
          <Text style={[TL.bodySm, { color: LL.text2 }]}>"Swap today's bench for dumbbells?"</Text>
        </View>
        <LIcon name="arrow_forward" size={20} color={LL.violet} />
      </Pressable>

      {/* This week */}
      <LSectionLabel>THIS WEEK</LSectionLabel>
      <View style={{ marginHorizontal: 16, flexDirection: 'row', gap: 10 }}>
        <LCard style={{ flex: 1, padding: 14 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>SESSIONS</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            3 <Text style={[TL.bodyMd, { color: LL.text2 }]}>/ 5</Text>
          </Text>
          <View style={{ flexDirection: 'row', gap: 3, marginTop: 8 }}>
            {[1, 1, 1, 0, 0].map((v, i) => (
              <View key={i} style={{ flex: 1, height: 5, borderRadius: 2, backgroundColor: v ? LL.ink : 'rgba(14,14,18,0.08)' }} />
            ))}
          </View>
        </LCard>
        <LCard style={{ flex: 1, padding: 14 }}>
          <Text style={[TL.labelSm, { color: LL.text2 }]}>VOLUME</Text>
          <Text style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            18.4k <Text style={[TL.bodyMd, { color: LL.coral }]}>↑8%</Text>
          </Text>
          <Text style={[TL.bodySm, { color: LL.text2, marginTop: 4 }]}>kg lifted vs last wk</Text>
        </LCard>
      </View>
    </LScreen>
  );
}
