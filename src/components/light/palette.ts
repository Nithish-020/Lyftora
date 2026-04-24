import { palette } from '../../theme/tokens.generated';

// LL — mirrors Design System "cream/ink/lime/coral/violet" light tokens.
// Source: /tmp/lyftora-design/testing/project/lyftora-light/tokens.jsx
export const LL = {
  // Surfaces (cream world)
  bg: palette.cream,
  bg2: palette.cream2,
  sBase: palette.cream,
  sLow: palette.cream2,
  sContainer: '#FFFFFF',
  sHigh: palette.cream2,
  sHighest: '#E7DFCC',
  ink: palette.ink,
  ink2: palette.ink2,

  // Accents
  primary: palette.lime,
  primaryDeep: '#B8E03A',
  coral: palette.coral,
  violet: palette.violet,
  sky: palette.sky,
  warning: palette.coral,
  error: palette.coral,

  // Text
  text: palette.ink,
  text2: palette.muted,
  text3: '#A09F96',
  textInv: palette.cream,
  textOnLime: palette.ink,

  // Borders (on cream)
  bSubtle: 'rgba(14,14,18,0.08)',
  bDefault: 'rgba(14,14,18,0.14)',
  bStrong: 'rgba(14,14,18,0.22)',
  bAccent: 'rgba(214,255,77,0.55)',
  bAI: 'rgba(123,92,255,0.35)',
  bCoral: 'rgba(255,90,60,0.35)',

  // Surface tints
  aiSurface: 'rgba(123,92,255,0.08)',
  primarySurface: 'rgba(214,255,77,0.32)',
  coralSurface: 'rgba(255,90,60,0.10)',
  skySurface: 'rgba(110,224,255,0.14)',

  glass: 'rgba(244,239,228,0.82)',
  glassInk: 'rgba(14,14,18,0.70)',
} as const;

// Shadow tokens — RN shadowColor/Offset/Opacity + elevation.
// Web design uses box-shadow; RN equivalents below preserve direction and intensity.
export const LS = {
  sm: {
    shadowColor: '#0E0E12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  md: {
    shadowColor: '#0E0E12',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#0E0E12',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 14,
  },
  glow: {
    shadowColor: palette.lime,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 6,
  },
  glowAI: {
    shadowColor: palette.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  coral: {
    shadowColor: palette.coral,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;

export const LR = { sm: 12, md: 20, lg: 28, xl: 40, pill: 999 } as const;

export type LightPalette = typeof LL;
