import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';

type CardVariant = 'surface' | 'elevated' | 'ai' | 'outlined';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: number;
  radius?: keyof typeof radii;
}

const variantStyles: Record<CardVariant, ViewStyle> = {
  surface: {
    backgroundColor: colors.surfaceContainer,
  },
  elevated: {
    backgroundColor: colors.surfaceContainer,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.20)',
  },
  ai: {
    backgroundColor: colors.aiSurface,
    borderWidth: 1,
    borderColor: colors.aiBorder,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
};

export function Card({
  variant = 'surface',
  padding = spacing[4],
  radius = 'md',
  style,
  children,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        variantStyles[variant],
        {
          borderRadius: radii[radius],
          padding,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
