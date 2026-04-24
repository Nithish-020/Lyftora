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
  LChip,
  LBtn,
  LAvatar,
  LIconBtn,
  LTopBar,
  LPlaceholder,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

type Tint = 'lime' | 'coral' | 'violet';
type Post = {
  who: string;
  handle?: string;
  ago?: string;
  city?: string;
  text: string;
  ai?: boolean;
  pr?: { ex: string; w: number; r: number; delta: string };
  workout?: { name: string; dur: number; vol: string; ex: number };
  streak?: number;
  cta?: string;
  likes?: number;
  comments?: number;
  tint?: Tint;
};

const POSTS: Post[] = [
  {
    who: 'Priya M.', handle: '@priya_lifts', ago: '14m', city: 'Bengaluru',
    text: "Finally broke 80! Six months of the grind. Let's goooo 🔥",
    pr: { ex: 'Deadlift', w: 82.5, r: 3, delta: '+2.5' },
    likes: 247, comments: 38, tint: 'lime',
  },
  {
    who: 'Coach · Suggested', ai: true,
    text: "Based on your sleep (7h 20m) + yesterday's pull day volume, take a lighter push today. I've queued it.",
    cta: 'View plan',
  },
  {
    who: 'Arjun K.', handle: '@arjun_k', ago: '2h', city: 'Mumbai',
    text: 'Home gym leg day done. Dumbbells only. Cheaper than therapy.',
    workout: { name: 'Legs · Home', dur: 42, vol: '3,240 kg', ex: 5 },
    likes: 89, comments: 12, tint: 'coral',
  },
  {
    who: 'Meera S.', handle: '@meera.fits', ago: '5h', city: 'Chennai',
    text: '30 day streak! Turned 4 months of "tomorrow" into a habit.',
    streak: 30, likes: 412, comments: 67, tint: 'violet',
  },
];

export function CommunityScreen({ navigation }: RootStackScreenProps<'Community'>) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = React.useState('For you');

  return (
    <LScreen bg={LL.bg} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Community"
        left={<LIconBtn icon="arrow_back" onPress={() => navigation.goBack()} />}
        right={<LIconBtn icon="search" />}
      />

      <View style={{ paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', gap: 8 }}>
        {['For you', 'Following', 'PRs', 'India'].map((t) => (
          <LChip key={t} label={t} active={t === tab} onPress={() => setTab(t)} />
        ))}
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 12 }}>
        {POSTS.map((p, i) => (
          <LCard key={i} variant={p.ai ? 'ai' : 'surface'} style={{ padding: 14 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: p.ai ? 8 : 10 }}>
              {p.ai ? (
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: LL.violet, alignItems: 'center', justifyContent: 'center', ...LS.glowAI }}>
                  <LIcon name="auto_awesome" size={18} color="#fff" />
                </View>
              ) : (
                <LAvatar name={p.who} size={36} tone={p.tint ?? 'ink'} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={[TL.titleMd, { color: p.ai ? LL.violet : LL.ink }]}>{p.who}</Text>
                {p.handle ? (
                  <Text style={[TL.labelSm, { color: LL.text2 }]}>
                    {p.handle} · {p.city} · {p.ago}
                  </Text>
                ) : null}
              </View>
              {!p.ai ? <LIcon name="more_horiz" size={18} color={LL.text2} /> : null}
            </View>

            <Text style={[TL.bodyMd, { color: LL.ink, marginBottom: 10 }]}>{p.text}</Text>

            {p.pr ? (
              <View style={{ padding: 14, borderRadius: 14, backgroundColor: LL.ink, overflow: 'hidden' }}>
                <View style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: LL.coral, opacity: 0.55 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <LIcon name="emoji_events" size={32} color={LL.coral} />
                  <View style={{ flex: 1 }}>
                    <Text style={[TL.labelMd, { color: LL.coral }]}>PERSONAL RECORD</Text>
                    <Text style={{ fontFamily: FL.serif, fontSize: 22, color: LL.bg, letterSpacing: -0.3 }}>{p.pr.ex}</Text>
                    <Text style={[TL.mono, { color: LL.primary, fontSize: 15, marginTop: 2 }]}>
                      {p.pr.w} kg × {p.pr.r} <Text style={{ color: 'rgba(244,239,228,0.60)' }}>({p.pr.delta} kg)</Text>
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            {p.workout ? (
              <View style={{ padding: 12, borderRadius: 14, backgroundColor: LL.bg2, borderWidth: 1, borderColor: LL.bSubtle, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <LPlaceholder width={44} height={44} tint="coral" icon="fitness_center" radius={10} />
                <View style={{ flex: 1 }}>
                  <Text style={[TL.titleMd, { color: LL.ink }]}>{p.workout.name}</Text>
                  <Text style={[TL.mono, { fontSize: 11, color: LL.text2, marginTop: 2 }]}>
                    {p.workout.dur}m · {p.workout.vol} · {p.workout.ex} ex
                  </Text>
                </View>
                <LBtn label="Try" variant="secondary" size="sm" />
              </View>
            ) : null}

            {p.streak ? (
              <View style={{ padding: 14, borderRadius: 14, backgroundColor: LL.coralSurface, borderWidth: 1, borderColor: LL.bCoral, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <LIcon name="local_fire_department" size={36} color={LL.coral} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FL.serif, fontSize: 32, color: LL.ink, letterSpacing: -1, lineHeight: 32 }}>
                    {p.streak} <Text style={{ fontSize: 18, color: LL.text2 }}>days</Text>
                  </Text>
                  <Text style={[TL.labelSm, { color: LL.coral, marginTop: 2 }]}>UNBROKEN</Text>
                </View>
              </View>
            ) : null}

            {p.cta ? <LBtn label={p.cta} variant="ai" size="sm" trailing="arrow_forward" style={{ marginTop: 4 }} /> : null}

            {!p.ai ? (
              <View style={{ marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: LL.bSubtle, flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <LIcon name="favorite_border" size={18} color={LL.text2} />
                  <Text style={[TL.mono, { fontSize: 12, color: LL.text2 }]}>{p.likes}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <LIcon name="chat_bubble_outline" size={18} color={LL.text2} />
                  <Text style={[TL.mono, { fontSize: 12, color: LL.text2 }]}>{p.comments}</Text>
                </View>
                <View style={{ flex: 1 }} />
                <LIcon name="bookmark_border" size={18} color={LL.text2} />
                <LIcon name="ios_share" size={18} color={LL.text2} />
              </View>
            ) : null}
          </LCard>
        ))}
      </View>
    </LScreen>
  );
}
