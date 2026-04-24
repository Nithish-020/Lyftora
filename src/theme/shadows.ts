import { ViewStyle } from 'react-native';
import { shadowsRn, palette } from './tokens.generated';

// Generated shadow tokens map rgba values to RN's shadow* + elevation pair.
// `glow` is lime-colored and used only on dark surfaces for the hero accent.
export const shadows: Record<'sm' | 'md' | 'lg' | 'glow', ViewStyle> = {
  sm: shadowsRn.sm,
  md: shadowsRn.md,
  lg: shadowsRn.lg,
  glow: {
    ...shadowsRn.glow,
    shadowColor: palette.lime,
  },
} as const;
