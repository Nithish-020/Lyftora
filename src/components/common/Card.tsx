import React from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, borderRadius } from '../../theme/spacing';

type CardVariant = 'elevated' | 'flat' | 'outlined';

interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = spacing.base,
  style,
  children,
  ...rest
}: CardProps) {
  const { colors, shadows } = useTheme();

  const variantStyle: ViewStyle = (() => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.card,
          ...shadows.md,
        };
      case 'flat':
        return {
          backgroundColor: colors.card,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
    }
  })();

  return (
    <View
      style={[
        styles.base,
        variantStyle,
        { padding },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});
