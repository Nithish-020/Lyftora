/**
 * Lyftora Typography Tokens
 * Fonts: DM Sans (headlines), Inter (body), Space Grotesk (labels), JetBrains Mono (data)
 */

import { TextStyle } from 'react-native';

export const fonts = {
  headline: 'DMSans',
  body: 'Inter',
  label: 'SpaceGrotesk',
  mono: 'JetBrainsMono',
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

type TypographyToken = Pick<TextStyle, 'fontSize' | 'lineHeight' | 'fontWeight' | 'letterSpacing' | 'fontFamily'>;

export const typography: Record<string, TypographyToken> = {
  displayLg: {
    fontFamily: fonts.headline,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.5,
  },
  displayMd: {
    fontFamily: fonts.headline,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.3,
  },
  headlineLg: {
    fontFamily: fonts.headline,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.2,
  },
  headlineMd: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0,
  },
  titleLg: {
    fontFamily: fonts.body,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0,
  },
  titleMd: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0,
  },
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeights.regular,
    letterSpacing: 0,
  },
  bodyMd: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.regular,
    letterSpacing: 0,
  },
  bodySm: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.regular,
    letterSpacing: 0,
  },
  labelLg: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.5,
  },
  labelMd: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.8,
  },
  labelSm: {
    fontFamily: fonts.label,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: fontWeights.medium,
    letterSpacing: 1.2,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.bold,
    letterSpacing: 0,
  },
};
