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
  LIconBtn,
  LPlaceholder,
  LEm,
  LSectionLabel,
  LBtn,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';
import { signOut } from '../../services/auth';

const STATS = [
  { v: '147', l: 'SESSIONS' },
  { v: '98h', l: 'TRAINED' },
  { v: '24', l: 'PRs' },
  { v: '8.2k', l: 'FOLLOWERS' },
];

type MenuItem = { icon: string; label: string; badge?: string; to?: 'Achievements' | 'Community' };
const MENU: MenuItem[] = [
  { icon: 'emoji_events', label: 'Achievements', badge: '24', to: 'Achievements' },
  { icon: 'group', label: 'Community Feed', badge: '3 new', to: 'Community' },
  { icon: 'track_changes', label: 'Goals & targets' },
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'privacy_tip', label: 'Privacy & data' },
  { icon: 'help', label: 'Help & feedback' },
];

export function ProfileScreen({ navigation }: RootStackScreenProps<'Profile'>) {
  const insets = useSafeAreaInsets();
  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <View style={{ paddingTop: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <LIconBtn icon="arrow_back" onPress={() => navigation.goBack()} />
        <LIconBtn icon="settings" />
      </View>

      {/* Identity */}
      <View style={{ paddingTop: 10, paddingHorizontal: 20, paddingBottom: 16, alignItems: 'center' }}>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: LL.primary, alignItems: 'center', justifyContent: 'center', ...LS.glow }}>
            <Text style={{ fontFamily: FL.serif, fontSize: 40, color: LL.ink }}>NA</Text>
          </View>
          <View style={{ position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderRadius: 15, backgroundColor: LL.coral, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: LL.bg, ...LS.coral }}>
            <LIcon name="local_fire_department" size={16} color="#fff" />
          </View>
        </View>

        <Text style={{ fontFamily: FL.serif, fontSize: 36, lineHeight: 38, letterSpacing: -1, color: LL.ink, marginTop: 12 }}>
          Nithish <LEm>A.</LEm>
        </Text>
        <Text style={[TL.bodyMd, { color: LL.text2 }]}>@lyft_nithish · Chennai</Text>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <View style={{ paddingVertical: 5, paddingHorizontal: 11, borderRadius: 999, backgroundColor: LL.primary }}>
            <Text style={[TL.labelSm, { color: LL.ink }]}>12 DAY STREAK 🔥</Text>
          </View>
          <View style={{ paddingVertical: 5, paddingHorizontal: 11, borderRadius: 999, borderWidth: 1, borderColor: LL.bDefault }}>
            <Text style={[TL.labelSm, { color: LL.text2 }]}>LEVEL 7</Text>
          </View>
        </View>
      </View>

      {/* Stats strip */}
      <View style={{ marginHorizontal: 16, paddingVertical: 14, paddingHorizontal: 10, backgroundColor: LL.ink, borderRadius: 20, flexDirection: 'row' }}>
        {STATS.map((s, i) => (
          <View key={s.l} style={{ flex: 1, alignItems: 'center', borderLeftWidth: i > 0 ? 1 : 0, borderLeftColor: 'rgba(244,239,228,0.12)' }}>
            <Text style={{ fontFamily: FL.serif, fontSize: 22, color: i === 2 ? LL.primary : LL.bg, letterSpacing: -0.4, lineHeight: 22 }}>{s.v}</Text>
            <Text style={[TL.labelSm, { color: 'rgba(244,239,228,0.60)', marginTop: 4, fontSize: 9 }]}>{s.l}</Text>
          </View>
        ))}
      </View>

      <LSectionLabel>CURRENT GOAL</LSectionLabel>
      <View style={{ marginHorizontal: 16 }}>
        <LCard style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <LPlaceholder width={44} height={44} tint="lime" icon="trending_up" radius={12} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.3, lineHeight: 22 }}>
                Bulk · <LEm>+4 kg</LEm>
              </Text>
              <Text style={[TL.bodySm, { color: LL.text2, marginTop: 2 }]}>By Sept · 74.2 → 78 kg</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[TL.mono, { fontSize: 16, color: LL.ink }]}>52%</Text>
              <Text style={[TL.labelSm, { color: LL.text2 }]}>DONE</Text>
            </View>
          </View>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(14,14,18,0.08)', marginTop: 12, overflow: 'hidden' }}>
            <View style={{ width: '52%', height: '100%', backgroundColor: LL.ink }} />
          </View>
        </LCard>
      </View>

      <LSectionLabel>ACCOUNT</LSectionLabel>
      <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
        <LCard style={{ padding: 0 }}>
          {MENU.map((item, i) => (
            <Pressable
              key={item.label}
              onPress={item.to ? () => navigation.navigate(item.to as 'Achievements' | 'Community') : undefined}
              style={{ paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: LL.bSubtle }}
            >
              <LIcon name={item.icon} size={22} color={LL.text2} />
              <Text style={[TL.bodyLg, { color: LL.ink, flex: 1 }]}>{item.label}</Text>
              {item.badge ? (
                <View style={{ paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, backgroundColor: LL.primary }}>
                  <Text style={[TL.labelSm, { color: LL.ink, fontSize: 9 }]}>{item.badge}</Text>
                </View>
              ) : null}
              <LIcon name="chevron_right" size={18} color={LL.text3} />
            </Pressable>
          ))}
        </LCard>
      </View>

      <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
        <LBtn label="Log out" variant="secondary" size="lg" block icon="logout" onPress={() => signOut()} />
      </View>
    </LScreen>
  );
}
