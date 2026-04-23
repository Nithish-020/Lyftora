import { create } from 'zustand';
import { Appearance } from 'react-native';
import { colors, type ThemeColors, type ColorScheme } from '../theme/colors';

type ThemePreference = 'dark' | 'light' | 'system';

interface ThemeState {
  preference: ThemePreference;
  activeScheme: ColorScheme;
  colors: ThemeColors;
  setPreference: (pref: ThemePreference) => void;
}

function resolveScheme(pref: ThemePreference): ColorScheme {
  if (pref === 'system') {
    return Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
  }
  return pref;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initial = resolveScheme('light');

  return {
    preference: 'light',
    activeScheme: initial,
    colors: colors[initial],
    setPreference: (pref) => {
      const scheme = resolveScheme(pref);
      set({ preference: pref, activeScheme: scheme, colors: colors[scheme] });
    },
  };
});
