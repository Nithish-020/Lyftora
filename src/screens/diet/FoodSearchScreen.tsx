import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  LL,
  LS,
  TL,
  FL,
  LScreen,
  LChip,
  LIconBtn,
  LTopBar,
  LPlaceholder,
  LSectionLabel,
} from '../../components/light';
import { LIcon } from '../../components/light/Icon';
import type { RootStackScreenProps } from '../../types/navigation';

type Food = {
  name: string;
  regional?: string;
  serving: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  tint: 'lime' | 'coral' | 'violet' | 'sky' | 'cream';
};

const RECENT: Food[] = [
  { name: 'Moong Dal', regional: 'मूंग दाल', serving: '1 bowl · 150g', kcal: 198, p: 14, c: 28, f: 4, tint: 'lime' },
  { name: 'Chapati', regional: 'चपाती', serving: '1 pc · 40g', kcal: 104, p: 3, c: 20, f: 2, tint: 'cream' },
  { name: 'Chicken Tikka', regional: 'चिकन टिक्का', serving: '100g', kcal: 186, p: 28, c: 2, f: 7, tint: 'coral' },
];
const INDIAN: Food[] = [
  { name: 'Paneer Bhurji', regional: 'पनीर भुर्जी', serving: '100g', kcal: 232, p: 16, c: 5, f: 17, tint: 'coral' },
  { name: 'Masala Oats', regional: 'मसाला ओट्स', serving: '1 bowl', kcal: 280, p: 10, c: 42, f: 7, tint: 'lime' },
  { name: 'Idli', regional: 'இட்லி', serving: '2 pc', kcal: 132, p: 4, c: 26, f: 1, tint: 'cream' },
  { name: 'Rajma', regional: 'राजमा', serving: '1 bowl', kcal: 212, p: 14, c: 32, f: 3, tint: 'coral' },
];

export function FoodSearchScreen({ navigation }: RootStackScreenProps<'FoodSearch'>) {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = React.useState('Indian');
  const cats = ['All', 'Indian', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <LScreen bg={LL.bg} padBottom={false} style={{ paddingTop: insets.top }}>
      <LTopBar
        title="Add Food"
        left={<LIconBtn icon="close" onPress={() => navigation.goBack()} />}
        right={<LIconBtn icon="qr_code_scanner" />}
      />

      {/* Search */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ height: 54, backgroundColor: '#fff', borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, borderWidth: 1.5, borderColor: LL.ink, ...LS.sm }}>
          <LIcon name="search" size={22} color={LL.ink} />
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={[TL.bodyLg, { color: LL.ink }]}>dal</Text>
            <View style={{ width: 2, height: 18, backgroundColor: LL.coral, marginLeft: 2 }} />
          </View>
          <LIcon name="mic" size={20} color={LL.text2} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 4, gap: 4 }}>
          <LIcon name="auto_awesome" size={12} color={LL.violet} />
          <Text style={[TL.bodySm, { color: LL.text2 }]}>
            Coach also suggests: <Text style={{ color: LL.ink, textDecorationLine: 'underline' }}>moong dal</Text>
            , <Text style={{ color: LL.ink, textDecorationLine: 'underline' }}>tadka dal</Text>
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        {cats.map((c) => (
          <LChip key={c} label={c} active={cat === c} onPress={() => setCat(c)} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>

      <LSectionLabel>RECENT</LSectionLabel>
      <View style={{ paddingHorizontal: 16, gap: 8 }}>
        {RECENT.map((f, i) => (
          <FoodRow key={f.name} food={f} onPress={i === 0 ? () => navigation.navigate('FoodDetail') : undefined} />
        ))}
      </View>

      <LSectionLabel action={<Text style={[TL.labelSm, { color: LL.ink, textDecorationLine: 'underline' }]}>SEE ALL</Text>}>
        INDIAN STAPLES
      </LSectionLabel>
      <View style={{ paddingHorizontal: 16, gap: 8, paddingBottom: 24 }}>
        {INDIAN.map((f) => (
          <FoodRow key={f.name} food={f} />
        ))}
      </View>

      <LSectionLabel>QUICK ADD</LSectionLabel>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 28, gap: 8 }}>
        {[
          { icon: 'edit_note', label: 'Manual', ai: false },
          { icon: 'photo_camera', label: 'Snap meal', ai: false },
          { icon: 'auto_awesome', label: 'Describe to AI', ai: true },
        ].map((q) => (
          <View key={q.label} style={{ minWidth: 120, padding: 14, borderRadius: 16, backgroundColor: q.ai ? LL.aiSurface : '#fff', borderWidth: 1, borderColor: q.ai ? LL.bAI : LL.bSubtle, gap: 6, marginRight: 8 }}>
            <LIcon name={q.icon} size={22} color={q.ai ? LL.violet : LL.ink} />
            <Text style={[TL.titleSm, { color: q.ai ? LL.violet : LL.ink }]}>{q.label}</Text>
          </View>
        ))}
      </ScrollView>
    </LScreen>
  );
}

function FoodRow({ food, onPress }: { food: Food; onPress?: () => void }) {
  const Wrap = onPress ? Pressable : View;
  return (
    <Wrap {...(onPress ? { onPress } : {})} style={{ padding: 12, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: LL.bSubtle, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <LPlaceholder width={48} height={48} tint={food.tint} icon="restaurant" radius={10} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
          <Text style={[TL.titleMd, { color: LL.ink }]}>{food.name}</Text>
          {food.regional ? <Text style={[TL.bodySm, { color: LL.text2 }]}>{food.regional}</Text> : null}
        </View>
        <Text style={[TL.bodySm, { color: LL.text2, marginTop: 2 }]}>{food.serving}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
          <Text style={[TL.mono, { fontSize: 10, color: LL.ink }]}>P {food.p}</Text>
          <Text style={[TL.mono, { fontSize: 10, color: LL.coral }]}>C {food.c}</Text>
          <Text style={[TL.mono, { fontSize: 10, color: LL.violet }]}>F {food.f}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', marginRight: 4 }}>
        <Text style={{ fontFamily: FL.serif, fontSize: 20, color: LL.ink, letterSpacing: -0.4 }}>{food.kcal}</Text>
        <Text style={[TL.labelSm, { color: LL.text2 }]}>KCAL</Text>
      </View>
      <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: LL.ink, alignItems: 'center', justifyContent: 'center' }}>
        <LIcon name="add" size={18} color={LL.bg} />
      </View>
    </Wrap>
  );
}
