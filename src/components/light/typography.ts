import type { TextStyle } from 'react-native';
import { fontFamilies } from '../../theme/typography';

// FL — font stacks matching Design System (Instrument Serif / Space Grotesk / Geist Mono)
export const FL = {
  serif: fontFamilies.serif,
  serifItalic: fontFamilies.serifItalic,
  sans: fontFamilies.sans,
  sansMedium: fontFamilies.sansMedium,
  sansSemiBold: fontFamilies.sansSemiBold,
  sansBold: fontFamilies.sansBold,
  mono: fontFamilies.mono,
  monoMedium: fontFamilies.monoMedium,
} as const;

// TL — type helpers mirroring the web design file.
// Ported from lyftora-light/tokens.jsx. Serif display (Instrument Serif) leads;
// Space Grotesk for body/UI; Geist Mono for caps labels and data.
export const TL = {
  displayXl: { fontFamily: FL.serif, fontSize: 48, lineHeight: 46, letterSpacing: -1.2 } satisfies TextStyle,
  displayLg: { fontFamily: FL.serif, fontSize: 38, lineHeight: 36, letterSpacing: -0.8 } satisfies TextStyle,
  displayMd: { fontFamily: FL.serif, fontSize: 30, lineHeight: 30, letterSpacing: -0.5 } satisfies TextStyle,
  headlineLg: { fontFamily: FL.serif, fontSize: 26, lineHeight: 28, letterSpacing: -0.3 } satisfies TextStyle,
  headlineMd: { fontFamily: FL.serif, fontSize: 22, lineHeight: 24, letterSpacing: -0.2 } satisfies TextStyle,

  titleLg: { fontFamily: FL.sansSemiBold, fontSize: 17, lineHeight: 22, letterSpacing: -0.2 } satisfies TextStyle,
  titleMd: { fontFamily: FL.sansSemiBold, fontSize: 15, lineHeight: 20 } satisfies TextStyle,
  titleSm: { fontFamily: FL.sansSemiBold, fontSize: 13, lineHeight: 18 } satisfies TextStyle,

  bodyLg: { fontFamily: FL.sans, fontSize: 15, lineHeight: 22 } satisfies TextStyle,
  bodyMd: { fontFamily: FL.sans, fontSize: 13, lineHeight: 19 } satisfies TextStyle,
  bodySm: { fontFamily: FL.sans, fontSize: 12, lineHeight: 16 } satisfies TextStyle,

  labelLg: { fontFamily: FL.monoMedium, fontSize: 12, lineHeight: 16, letterSpacing: 1.4, textTransform: 'uppercase' } satisfies TextStyle,
  labelMd: { fontFamily: FL.monoMedium, fontSize: 11, lineHeight: 14, letterSpacing: 1.5, textTransform: 'uppercase' } satisfies TextStyle,
  labelSm: { fontFamily: FL.monoMedium, fontSize: 10, lineHeight: 13, letterSpacing: 1.6, textTransform: 'uppercase' } satisfies TextStyle,

  mono: { fontFamily: FL.monoMedium, fontSize: 14, lineHeight: 18 } satisfies TextStyle,
  monoLg: { fontFamily: FL.monoMedium, fontSize: 20, lineHeight: 24 } satisfies TextStyle,
  monoXl: { fontFamily: FL.monoMedium, fontSize: 32, lineHeight: 36, letterSpacing: -0.5 } satisfies TextStyle,
} as const;

export type TLKey = keyof typeof TL;
