import { TextStyle } from 'react-native';
import { fontFamilies as generatedFamilies, type as generatedType } from './tokens.generated';

export const fontFamilies = {
  // Canonical families from design-tokens/tokens.json
  serif: generatedFamilies.serifRegular,
  serifItalic: generatedFamilies.serifItalic,
  sans: generatedFamilies.sansRegular,
  sansMedium: generatedFamilies.sansMedium,
  sansSemiBold: generatedFamilies.sansSemiBold,
  sansBold: generatedFamilies.sansBold,
  mono: generatedFamilies.monoRegular,
  monoMedium: generatedFamilies.monoMedium,

  // Legacy aliases used by existing screens
  display: generatedFamilies.serifRegular,
  body: generatedFamilies.sansRegular,
  bodyMedium: generatedFamilies.sansMedium,
  bodySemiBold: generatedFamilies.sansSemiBold,
} as const;

type TypographyVariant = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

type TypographyDef = TypographyVariant & TextStyle;

// Mobile scale derived from tokens.json (desktop values) by capping display sizes for small screens.
// The serif display weights render at a fixed size because the canvas is narrow.
export const typography: Record<string, TypographyDef> = {
  // ----- Canonical (prefer these) -----
  display: {
    fontFamily: fontFamilies.serif,
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: -1.2,
  },
  h1: {
    fontFamily: fontFamilies.serif,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: fontFamilies.serif,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  h3: {
    fontFamily: fontFamilies.serif,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h4: {
    fontFamily: fontFamilies.serif,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  headlineItalic: {
    fontFamily: fontFamilies.serifItalic,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  bodyLg: {
    fontFamily: fontFamilies.sans,
    fontSize: 17,
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 15,
    lineHeight: 18,
  },
  caption: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.32,
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: 13,
    lineHeight: 18,
  },

  // ----- Legacy aliases (existing screens) -----
  displayLarge: {
    fontFamily: fontFamilies.serif,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  displayMedium: {
    fontFamily: fontFamilies.serif,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  displaySmall: {
    fontFamily: fontFamilies.serif,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  headingLarge: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 20,
    lineHeight: 26,
  },
  headingMedium: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 18,
    lineHeight: 24,
  },
  headingSmall: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: fontFamilies.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  labelMedium: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  labelSmall: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  monoSmall: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    lineHeight: 14,
  },
} as const;

export type TypographyKey = keyof typeof typography;

// Re-export raw JSON scale for tools that need design values (web parity)
export { generatedType as typeScale };
