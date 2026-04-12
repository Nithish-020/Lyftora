/**
 * Lyftora Color Tokens
 * Single source of truth. Import this — never hardcode hex values.
 */

export const colors = {
  // Brand
  background: '#0A0E1A',
  primary: '#00D4AA',
  secondary: '#7C6AF7',
  warning: '#FFB020',
  error: '#FF4D6A',
  success: '#00D4AA',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  textTertiary: '#6B7280',
  textInverse: '#0A0E1A',
  textAccent: '#00D4AA',
  textAI: '#7C6AF7',

  // Surfaces (solid hex — no rgba ambiguity)
  surfaceBase: '#0A0E1A',
  surfaceLow: '#111827',
  surfaceContainer: '#1A2235',
  surfaceHigh: '#243045',
  surfaceHighest: '#2E3A50',

  // Borders
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderDefault: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
  borderAccent: 'rgba(0, 212, 170, 0.30)',
  borderAI: 'rgba(124, 106, 247, 0.30)',

  // Interactive states
  primaryHover: '#00BF99',
  primaryPressed: '#00A886',
  secondaryHover: '#6B5AE0',
  secondaryPressed: '#5A4BC9',

  // Glass
  glassBackground: 'rgba(10, 14, 26, 0.80)',

  // Semantic aliases
  ai: '#7C6AF7',
  aiSurface: 'rgba(124, 106, 247, 0.10)',
  aiBorder: 'rgba(124, 106, 247, 0.20)',
  primarySurface: 'rgba(0, 212, 170, 0.10)',
  warningSurface: 'rgba(255, 176, 32, 0.10)',
  errorSurface: 'rgba(255, 77, 106, 0.10)',
} as const;

export type ColorToken = keyof typeof colors;
