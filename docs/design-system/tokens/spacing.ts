/**
 * Lyftora Spacing Tokens — 8px grid
 * Every spacing value must be a multiple of 4px.
 * Preferred multiples: 4, 8, 12, 16, 24, 32, 48, 64
 */

export const spacing = {
  0: 0,
  1: 4,    // xs: tight inline gaps (icon-to-text)
  2: 8,    // sm: chip padding, tight card internal
  3: 12,   // md: card gap, form field gap
  4: 16,   // base: screen horizontal padding, card padding
  5: 20,   // lg: comfortable padding
  6: 24,   // xl: section gap
  8: 32,   // 2xl: large section dividers
  10: 40,  // 3xl: hero padding
  12: 48,  // 4xl: screen vertical padding
  16: 64,  // 5xl: major section breaks
  20: 80,  // bottom nav clearance
} as const;

/** Named semantic spacing for common patterns */
export const layout = {
  screenPaddingX: spacing[4],     // 16px
  cardPadding: spacing[4],        // 16px
  sectionGap: spacing[6],         // 24px
  cardGap: spacing[3],            // 12px
  itemGap: spacing[2],            // 8px
  inlineGap: spacing[2],          // 8px
  chipPaddingX: spacing[3],       // 12px
  chipPaddingY: spacing[1],       // 4px
  bottomNavHeight: spacing[20],   // 80px
  headerHeight: spacing[16],      // 64px
  touchTarget: 44,
  touchTargetComfortable: 48,
} as const;
