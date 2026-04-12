/**
 * Lyftora Border Radius Tokens
 * Standardized scale. No more 0.5rem vs 0.75rem vs 1rem confusion.
 */

export const radii = {
  none: 0,
  sm: 4,       // subtle rounding (tags, small chips)
  default: 8,  // standard components (inputs, small cards)
  md: 12,      // primary cards, buttons, containers
  lg: 16,      // large cards, modals
  xl: 24,      // bottom sheets, large overlays
  full: 9999,  // pills, avatars, FABs
} as const;

export type RadiusToken = keyof typeof radii;
