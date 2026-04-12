import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  radius?: keyof typeof radii;
}

/**
 * Glassmorphic container — used for bottom nav bar, floating elements.
 * Standardizes the glass effect that was inconsistent across screens:
 * - Welcome: rgba(10,14,26,0.7) + blur(100px)
 * - Dashboard: rgba(10,14,26,0.7) + blur(12px)
 * - Workout: bg-[#0A0E1A]/80 + backdrop-blur-md
 *
 * Standardized: 80% opacity + 12px blur
 */
export function GlassView({
  intensity = 12,
  radius = 'lg',
  style,
  children,
  ...props
}: GlassViewProps) {
  return (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[
        {
          borderRadius: radii[radius],
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.borderSubtle,
        } satisfies ViewStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </BlurView>
  );
}
