export const colors = {
  dark: {
    background: '#0A0E1A',
    surface: '#141829',
    surfaceElevated: '#1C2038',
    primary: '#00D4AA',
    accent: '#7C6AF7',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0B0',
    textTertiary: '#6B6B7B',
    error: '#FF4D6A',
    warning: '#FFB020',
    success: '#00D4AA',
    border: '#2A2E42',
    overlay: 'rgba(0, 0, 0, 0.6)',
    card: '#141829',
    tabBar: '#0F1322',
    inputBackground: '#1C2038',
  },
  light: {
    background: '#F5F5FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    primary: '#00B894',
    accent: '#6C5CE7',
    textPrimary: '#1A1A2E',
    textSecondary: '#6B6B7B',
    textTertiary: '#A0A0B0',
    error: '#E03E5C',
    warning: '#E09B18',
    success: '#00B894',
    border: '#E0E0EA',
    overlay: 'rgba(0, 0, 0, 0.3)',
    card: '#FFFFFF',
    tabBar: '#FFFFFF',
    inputBackground: '#F0F0F5',
  },
};

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  error: string;
  warning: string;
  success: string;
  border: string;
  overlay: string;
  card: string;
  tabBar: string;
  inputBackground: string;
};

export type ColorScheme = keyof typeof colors;
