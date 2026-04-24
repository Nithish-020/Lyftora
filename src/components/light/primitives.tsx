import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  type GestureResponderEvent,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  Pattern,
  Path,
  Rect,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { LL, LR, LS } from './palette';
import { FL, TL } from './typography';
import { LIcon, type LIconName } from './Icon';

// ────────────────────────────────────────────────────────────────
// LScreen — cream-backed scrollable screen wrapper
// ────────────────────────────────────────────────────────────────
export function LScreen({
  children,
  bg = LL.bg,
  padBottom = true,
  noScroll = false,
  style,
}: {
  children: React.ReactNode;
  bg?: string;
  padBottom?: boolean;
  noScroll?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const content = noScroll ? (
    <View style={[{ flex: 1 }, style]}>{children}</View>
  ) : (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[{ paddingBottom: padBottom ? 90 : 0 }, style]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
  return <View style={{ flex: 1, backgroundColor: bg }}>{content}</View>;
}

// ────────────────────────────────────────────────────────────────
// LCard — white (or tinted) surface lifting off cream
// ────────────────────────────────────────────────────────────────
type LCardVariant = 'surface' | 'cream' | 'ai' | 'outlined' | 'lime' | 'coral' | 'ink';
export function LCard({
  children,
  variant = 'surface',
  onPress,
  style,
}: {
  children: React.ReactNode;
  variant?: LCardVariant;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}) {
  const bg: Record<LCardVariant, string> = {
    surface: LL.sContainer,
    cream: LL.bg2,
    ai: '#F7F4FF',
    outlined: 'transparent',
    lime: LL.primarySurface,
    coral: LL.coralSurface,
    ink: LL.ink,
  };
  const borderColor: Record<LCardVariant, string> = {
    surface: LL.bSubtle,
    cream: LL.bSubtle,
    ai: LL.bAI,
    outlined: LL.bDefault,
    lime: LL.bAccent,
    coral: LL.bCoral,
    ink: 'transparent',
  };
  const body = (
    <View
      style={[
        {
          backgroundColor: bg[variant],
          borderRadius: LR.md,
          padding: 16,
          borderWidth: variant === 'ink' ? 0 : 1,
          borderColor: borderColor[variant],
        },
        variant !== 'outlined' && LS.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
        {body}
      </Pressable>
    );
  }
  return body;
}

// ────────────────────────────────────────────────────────────────
// LChip — pill-shaped filter/toggle
// ────────────────────────────────────────────────────────────────
type LChipVariant = 'default' | 'lime' | 'ai';
export function LChip({
  label,
  active = false,
  leading,
  onPress,
  variant = 'default',
  style,
}: {
  label: string;
  active?: boolean;
  leading?: LIconName;
  onPress?: () => void;
  variant?: LChipVariant;
  style?: StyleProp<ViewStyle>;
}) {
  const conf = (() => {
    if (variant === 'lime') {
      return active
        ? { bg: LL.primary, color: LL.ink, border: 'transparent' }
        : { bg: 'transparent', color: LL.ink, border: LL.bDefault };
    }
    if (variant === 'ai') {
      return active
        ? { bg: LL.violet, color: '#fff', border: 'transparent' }
        : { bg: 'transparent', color: LL.violet, border: LL.bAI };
    }
    return active
      ? { bg: LL.ink, color: LL.bg, border: 'transparent' }
      : { bg: 'transparent', color: LL.ink, border: LL.bDefault };
  })();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: 32,
          paddingHorizontal: 14,
          borderRadius: LR.pill,
          backgroundColor: conf.bg,
          borderWidth: 1,
          borderColor: conf.border,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        style,
      ]}
    >
      {leading ? <LIcon name={leading} size={14} color={conf.color} /> : null}
      <Text style={[TL.labelMd, { fontSize: 11, color: conf.color }]}>{label}</Text>
    </Pressable>
  );
}

// ────────────────────────────────────────────────────────────────
// LBtn — all button variants from the design system
// ────────────────────────────────────────────────────────────────
type LBtnVariant = 'primary' | 'ink' | 'coral' | 'secondary' | 'ghost' | 'ai' | 'aiGhost' | 'cream';
type LBtnSize = 'sm' | 'md' | 'lg';

export function LBtn({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  trailing,
  onPress,
  block,
  style,
  textStyle,
}: {
  label: string;
  variant?: LBtnVariant;
  size?: LBtnSize;
  icon?: LIconName;
  trailing?: LIconName;
  onPress?: () => void;
  block?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  const h = size === 'sm' ? 36 : size === 'lg' ? 54 : 46;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;
  const iconSize = size === 'lg' ? 20 : 18;

  const variants: Record<LBtnVariant, { bg: string; color: string; border: string; shadow?: ViewStyle; family: string }> = {
    primary: { bg: LL.primary, color: LL.ink, border: 'transparent', shadow: LS.glow, family: FL.sansBold },
    ink: { bg: LL.ink, color: LL.bg, border: 'transparent', shadow: LS.md, family: FL.sansSemiBold },
    coral: { bg: LL.coral, color: '#fff', border: 'transparent', shadow: LS.coral, family: FL.sansBold },
    secondary: { bg: 'transparent', color: LL.ink, border: LL.bStrong, family: FL.sansSemiBold },
    ghost: { bg: 'transparent', color: LL.ink, border: 'transparent', family: FL.sansMedium },
    ai: { bg: LL.violet, color: '#fff', border: 'transparent', shadow: LS.glowAI, family: FL.sansSemiBold },
    aiGhost: { bg: LL.aiSurface, color: LL.violet, border: LL.bAI, family: FL.sansSemiBold },
    cream: { bg: LL.bg2, color: LL.ink, border: 'transparent', family: FL.sansSemiBold },
  };
  const v = variants[variant];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: h,
          paddingHorizontal: size === 'sm' ? 14 : 22,
          borderRadius: LR.pill,
          backgroundColor: v.bg,
          borderWidth: 1,
          borderColor: v.border,
          alignSelf: block ? 'stretch' : 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: pressed ? 0.85 : 1,
        },
        v.shadow,
        style,
      ]}
    >
      {icon ? <LIcon name={icon} size={iconSize} color={v.color} /> : null}
      <Text style={[{ fontFamily: v.family, fontSize, color: v.color, letterSpacing: -0.1 }, textStyle]}>
        {label}
      </Text>
      {trailing ? <LIcon name={trailing} size={iconSize} color={v.color} /> : null}
    </Pressable>
  );
}

// ────────────────────────────────────────────────────────────────
// LIconBtn — circular icon button
// ────────────────────────────────────────────────────────────────
export function LIconBtn({
  icon,
  onPress,
  size = 36,
  bg = 'rgba(14,14,18,0.06)',
  color = LL.ink,
  style,
}: {
  icon: LIconName;
  onPress?: () => void;
  size?: number;
  bg?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <LIcon name={icon} size={size * 0.55} color={color} />
    </Pressable>
  );
}

// ────────────────────────────────────────────────────────────────
// LTopBar — screen header with optional kicker + subtitle
// ────────────────────────────────────────────────────────────────
export function LTopBar({
  title,
  subtitle,
  kicker,
  left,
  right,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const centerText = !subtitle && !kicker;
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {left ?? <View style={{ width: 36 }} />}
      <View style={{ flex: 1, alignItems: centerText ? 'center' : 'flex-start' }}>
        {kicker ? <Text style={[TL.labelSm, { color: LL.text2, marginBottom: 2 }]}>{kicker}</Text> : null}
        <Text style={[TL.headlineMd, { fontSize: 20, color: LL.ink }]}>{title}</Text>
        {subtitle ? <Text style={[TL.bodySm, { color: LL.text2 }]}>{subtitle}</Text> : null}
      </View>
      {right ?? <View style={{ width: 36 }} />}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LRing — SVG circular progress ring
// ────────────────────────────────────────────────────────────────
export function LRing({
  size = 80,
  stroke = 8,
  value = 0.65,
  color = LL.ink,
  trackColor = 'rgba(14,14,18,0.08)',
  children,
}: {
  size?: number;
  stroke?: number;
  value?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const dash = clamped * c;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
        />
      </Svg>
      {children ? (
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>{children}</View>
      ) : null}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LPlaceholder — cross-hatch stripe placeholder (DS signature tint tile).
// Renders a translucent SVG <Pattern> of diagonal lines over a tinted base,
// matching the design's "repeating-linear-gradient" stripe feel.
// ────────────────────────────────────────────────────────────────
type LTint = 'lime' | 'coral' | 'violet' | 'sky' | 'cream' | 'ink';
type LTintConf = { bg: string; fg: string; stripe: string };

const TINT_PALETTE: Record<LTint, LTintConf> = {
  lime: { bg: 'rgba(214,255,77,0.42)', fg: '#5A6A0E', stripe: 'rgba(122,140,30,0.35)' },
  coral: { bg: 'rgba(255,90,60,0.22)', fg: '#B8361F', stripe: 'rgba(184,54,31,0.30)' },
  violet: { bg: 'rgba(123,92,255,0.20)', fg: '#3F2FA0', stripe: 'rgba(74,59,166,0.30)' },
  sky: { bg: 'rgba(110,224,255,0.28)', fg: '#176A82', stripe: 'rgba(27,122,150,0.30)' },
  cream: { bg: 'rgba(14,14,18,0.05)', fg: LL.text2, stripe: 'rgba(14,14,18,0.10)' },
  ink: { bg: LL.ink, fg: LL.primary, stripe: 'rgba(244,239,228,0.18)' },
};

export function LPlaceholder({
  width = 56,
  height = 56,
  tint = 'lime',
  icon,
  label,
  radius = 16,
  showStripes = true,
  style,
}: {
  width?: number | `${number}%`;
  height?: number;
  tint?: LTint;
  icon?: LIconName;
  label?: string;
  radius?: number;
  showStripes?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const p = TINT_PALETTE[tint];
  // Slight pattern density tweak: smaller tiles look better on small chips.
  const tile = Math.max(6, Math.min(12, Math.round(Number(height) / 6)));
  const patternId = React.useId().replace(/:/g, '');
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: p.bg,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 6,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {showStripes ? (
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
          <Defs>
            <Pattern
              id={`stripe-${patternId}`}
              x={0}
              y={0}
              width={tile}
              height={tile}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Path d={`M 0 0 L 0 ${tile}`} stroke={p.stripe} strokeWidth={1} />
            </Pattern>
          </Defs>
          <Rect x={0} y={0} width="100%" height="100%" fill={`url(#stripe-${patternId})`} />
        </Svg>
      ) : null}
      {icon ? <LIcon name={icon} size={Math.min(28, Number(height) * 0.5)} color={p.fg} /> : null}
      {label ? <Text style={[TL.labelMd, { color: p.fg }]}>{label}</Text> : null}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LGlass — frosted surface using expo-blur's BlurView.
// Replaces the static translucent `LL.glass` colour. Falls back to
// the cream tint on Android < 12 (where blur isn't available).
// ────────────────────────────────────────────────────────────────
export function LGlass({
  children,
  intensity = 32,
  tint = 'light',
  style,
}: {
  children?: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: StyleProp<ViewStyle>;
}) {
  // BlurView on Android uses experimentalBlurMethod for proper blurring;
  // the fallback colour matches LL.glass so the visual is cohesive either way.
  const fallback = tint === 'dark' ? LL.glassInk : LL.glass;
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : 'none'}
      style={[{ backgroundColor: Platform.OS === 'ios' ? 'transparent' : fallback }, style]}
    >
      {children}
    </BlurView>
  );
}

// ────────────────────────────────────────────────────────────────
// LRadialWash — soft radial gradient backdrop (SVG, no extra deps).
// Used behind hero blocks to recreate the design's `radial-gradient`
// glows that RN's box decoration can't express.
// ────────────────────────────────────────────────────────────────
export function LRadialWash({
  color = LL.primary,
  opacity = 0.55,
  cx = '50%',
  cy = '50%',
  rx = '70%',
  ry = '70%',
  style,
  children,
}: {
  color?: string;
  opacity?: number;
  cx?: string | number;
  cy?: string | number;
  rx?: string | number;
  ry?: string | number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const id = React.useId().replace(/:/g, '');
  return (
    // pointerEvents="box-none" keeps the wash decorative — children remain
    // tappable, but the empty wash background never swallows touches.
    <View pointerEvents="box-none" style={[{ overflow: 'hidden' }, style]}>
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <RadialGradient id={`rw-${id}`} cx={cx} cy={cy} rx={rx} ry={ry} fx={cx} fy={cy}>
            <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
            <Stop offset="60%" stopColor={color} stopOpacity={opacity * 0.35} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill={`url(#rw-${id})`} />
      </Svg>
      {children}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LMacroBar — thin progress bar with label + mono value
// ────────────────────────────────────────────────────────────────
export function LMacroBar({
  label,
  value,
  goal,
  color,
  sub = '',
  style,
}: {
  label: string;
  value: number;
  goal: number;
  color: string;
  sub?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const pct = Math.min(1, value / goal);
  return (
    <View style={[{ flex: 1 }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={[TL.labelSm, { color: LL.text2 }]}>{label}</Text>
        <Text style={[TL.mono, { fontSize: 11, color: LL.ink }]}>{value}/{goal}{sub}</Text>
      </View>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: 'rgba(14,14,18,0.08)', overflow: 'hidden' }}>
        <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: 2 }} />
      </View>
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LAvatar — disc with initials (serif)
// ────────────────────────────────────────────────────────────────
type LAvatarTone = 'ink' | 'lime' | 'coral' | 'violet' | 'cream';
export function LAvatar({
  name = 'U',
  size = 36,
  tone = 'ink',
}: {
  name?: string;
  size?: number;
  tone?: LAvatarTone;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const tones: Record<LAvatarTone, { bg: string; color: string }> = {
    ink: { bg: LL.ink, color: LL.bg },
    lime: { bg: LL.primary, color: LL.ink },
    coral: { bg: LL.coral, color: '#fff' },
    violet: { bg: LL.violet, color: '#fff' },
    cream: { bg: LL.bg2, color: LL.ink },
  };
  const t = tones[tone];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: t.bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: FL.serif, fontSize: size * 0.42, color: t.color, letterSpacing: -0.5 }}>
        {initials}
      </Text>
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LSectionLabel — section kicker with short rule line
// ────────────────────────────────────────────────────────────────
export function LSectionLabel({
  children,
  action,
  style,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 22,
          marginBottom: 12,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 20, height: 1, backgroundColor: LL.text2 }} />
        <Text style={[TL.labelMd, { color: LL.text2 }]}>{children}</Text>
      </View>
      {action}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────
// LEm — italic serif emphasis (defaults to coral)
// ────────────────────────────────────────────────────────────────
export function LEm({ children, color = LL.coral, style }: { children: React.ReactNode; color?: string; style?: StyleProp<TextStyle> }) {
  return <Text style={[{ fontFamily: FL.serifItalic, color }, style]}>{children}</Text>;
}

// ────────────────────────────────────────────────────────────────
// LEyebrow — small pill with lime dot
// ────────────────────────────────────────────────────────────────
export function LEyebrow({ children, dot = true, style }: { children: React.ReactNode; dot?: boolean; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: LR.pill,
          backgroundColor: 'rgba(14,14,18,0.05)',
          borderWidth: 1,
          borderColor: LL.bDefault,
        },
        style,
      ]}
    >
      {dot ? <View style={styles.dot} /> : null}
      <Text style={[TL.labelMd, { color: LL.ink }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: LL.primary,
    // boxShadow-ish halo via a border-like shadow
    shadowColor: LL.primary,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
});
