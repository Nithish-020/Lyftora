import { TextStyle } from 'react-native';

export const fontFamilies = {
  display: 'DMSerifDisplay-Regular',
  body: 'Outfit-Regular',
  bodyMedium: 'Outfit-Medium',
  bodySemiBold: 'Outfit-SemiBold',
  mono: 'JetBrainsMono-Regular',
} as const;

type TypographyVariant = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
};

export const typography: Record<string, TypographyVariant & TextStyle> = {
  displayLarge: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily: fontFamilies.display,
    fontSize: 28,
    lineHeight: 36,
  },
  displaySmall: {
    fontFamily: fontFamilies.display,
    fontSize: 24,
    lineHeight: 32,
  },
  headingLarge: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  headingMedium: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 18,
    lineHeight: 24,
  },
  headingSmall: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
  },
  labelLarge: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  labelMedium: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  labelSmall: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: 14,
    lineHeight: 20,
  },
  monoSmall: {
    fontFamily: fontFamilies.mono,
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export type TypographyKey = keyof typeof typography;
