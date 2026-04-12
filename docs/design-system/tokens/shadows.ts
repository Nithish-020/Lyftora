/**
 * Lyftora Shadow Tokens
 * React Native boxShadow format (Expo SDK 55+)
 */

export const shadows = {
  none: 'none',
  sm: '0px 1px 3px rgba(0, 0, 0, 0.12)',
  md: '0px 4px 12px rgba(0, 0, 0, 0.20)',
  lg: '0px 8px 24px rgba(0, 0, 0, 0.25)',
  glow: '0px 0px 16px rgba(0, 212, 170, 0.25)',
  glowAI: '0px 0px 16px rgba(124, 106, 247, 0.25)',
  navBar: '0px -4px 20px rgba(0, 0, 0, 0.40)',
} as const;

export type ShadowToken = keyof typeof shadows;
