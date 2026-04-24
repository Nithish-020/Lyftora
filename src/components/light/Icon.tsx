import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { TextStyle } from 'react-native';
// Glyphmaps let us check name existence at module load and route to the
// correct font family without rendering a "?" tofu.
import miGlyphs from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json';
import mcGlyphs from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

export type LIconName = string;

const MI: Record<string, number> = miGlyphs as Record<string, number>;
const MC: Record<string, number> = mcGlyphs as Record<string, number>;

// Some Material Symbols names from the design file have no 1:1 in MaterialIcons.
// Map them to the closest visual MI/MC equivalent here.
const ALIASES: Record<string, string> = {
  monitoring: 'insights',
  ramen_dining: 'ramen-dining',
  tips_and_updates: 'tips-and-updates',
};

const warned = new Set<string>();

export function LIcon({
  name,
  size = 20,
  color,
  filled = false,
  style,
}: {
  name: LIconName;
  size?: number;
  color?: string;
  filled?: boolean;
  style?: TextStyle;
}) {
  // MaterialIcons is already a "filled" set; keep `filled` in the API for parity.
  void filled;

  const aliased = ALIASES[name] ?? name;
  const kebab = aliased.replace(/_/g, '-');

  if (MI[kebab] !== undefined) {
    const n = kebab as React.ComponentProps<typeof MaterialIcons>['name'];
    return <MaterialIcons name={n} size={size} color={color} style={style} />;
  }
  if (MC[kebab] !== undefined) {
    const n = kebab as React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    return <MaterialCommunityIcons name={n} size={size} color={color} style={style} />;
  }
  if (__DEV__ && !warned.has(name)) {
    warned.add(name);
    console.warn(`[LIcon] unknown icon "${name}" — falling back to "help-outline"`);
  }
  return <MaterialIcons name="help-outline" size={size} color={color} style={style} />;
}
