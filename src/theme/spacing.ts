import { spacingScale, radiiScale, touchTarget } from './tokens.generated';

// Canonical scale from design-tokens/tokens.json (website parity)
export const scale = {
  s1: spacingScale.s1, // 4
  s2: spacingScale.s2, // 8
  s3: spacingScale.s3, // 12
  s4: spacingScale.s4, // 16
  s5: spacingScale.s5, // 24
  s6: spacingScale.s6, // 32
  s7: spacingScale.s7, // 48
  s8: spacingScale.s8, // 64
  s9: spacingScale.s9, // 96
} as const;

// Public spacing keys. Each legacy alias (xs, sm, md, base, lg, xl, 2xl, 3xl) maps 1:1
// to the canonical scale below. New code should prefer s1–s9.
export const spacing = {
  // Canonical
  ...scale,

  // Legacy aliases — keep existing screens building
  xs: scale.s1,    // 4
  sm: scale.s2,    // 8
  md: scale.s3,    // 12
  base: scale.s4,  // 16
  lg: scale.s5,    // 24 (was 20 in the pre-unification theme)
  xl: scale.s6,    // 32 (was 24)
  '2xl': scale.s7, // 48 (was 32)
  '3xl': scale.s8, // 64 (was 48)
} as const;

export const borderRadius = {
  sm: radiiScale.sm,   // 12
  md: radiiScale.md,   // 20
  lg: radiiScale.lg,   // 28
  xl: radiiScale.xl,   // 48
  pill: radiiScale.pill, // 999
  full: radiiScale.pill, // legacy alias
} as const;

export const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
} as const;

export const MIN_TOUCH_TARGET = touchTarget.minimum;

export type SpacingKey = keyof typeof spacing;
