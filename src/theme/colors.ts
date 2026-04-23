import { lightTheme, darkTheme, palette } from './tokens.generated';

export { palette };

export type ThemeColors = {
  // Canonical theme tokens (prefer these going forward)
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  textInverse: string;
  inverseBg: string;
  inverseSurface: string;
  primary: string;
  primaryOn: string;
  accent: string;
  accentOn: string;
  danger: string;
  dangerOn: string;
  border: string;
  borderSubtle: string;
  focusRing: string;

  // Legacy aliases — keep existing screens building while they migrate
  background: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  error: string;
  warning: string;
  success: string;
  overlay: string;
  card: string;
  tabBar: string;
  inputBackground: string;
};

function withAliases(theme: typeof lightTheme): ThemeColors {
  return {
    ...theme,
    background: theme.bg,
    surfaceElevated: theme.surfaceAlt,
    textPrimary: theme.text,
    textSecondary: theme.textMuted,
    textTertiary: theme.textMuted,
    error: theme.danger,
    warning: palette.carbs,
    success: theme.accent,
    overlay: 'rgba(14, 14, 18, 0.6)',
    card: theme.surface,
    tabBar: theme.surface,
    inputBackground: theme.surface,
  };
}

export const colors = {
  light: withAliases(lightTheme),
  dark: withAliases(darkTheme),
};

export type ColorScheme = keyof typeof colors;
