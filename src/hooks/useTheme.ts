import { useThemeStore } from '../store/themeStore';
import { typography } from '../theme/typography';
import { spacing, borderRadius, shadows } from '../theme';

export function useTheme() {
  const colors = useThemeStore((s) => s.colors);
  const activeScheme = useThemeStore((s) => s.activeScheme);

  return {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    isDark: activeScheme === 'dark',
  };
}
