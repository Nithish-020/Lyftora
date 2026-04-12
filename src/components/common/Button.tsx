import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type PressableProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, borderRadius, MIN_TOUCH_TARGET } from '../../theme/spacing';
import type { ThemeColors } from '../../theme/colors';

type ButtonVariant = 'accent' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function getVariantStyles(variant: ButtonVariant, colors: ThemeColors, pressed: boolean) {
  const base: ViewStyle = {
    minHeight: MIN_TOUCH_TARGET,
    minWidth: MIN_TOUCH_TARGET,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: pressed ? 0.85 : 1,
  };

  const text: TextStyle = {
    fontSize: 16,
    fontWeight: '600',
  };

  switch (variant) {
    case 'accent':
      return {
        container: { ...base, backgroundColor: colors.primary },
        text: { ...text, color: '#0A0E1A' },
      };
    case 'secondary':
      return {
        container: { ...base, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
        text: { ...text, color: colors.textPrimary },
      };
    case 'ghost':
      return {
        container: { ...base, backgroundColor: 'transparent' },
        text: { ...text, color: colors.primary },
      };
    case 'icon':
      return {
        container: {
          ...base,
          backgroundColor: 'transparent',
          paddingHorizontal: spacing.sm,
          borderRadius: borderRadius.full,
        },
        text: { ...text, color: colors.textPrimary },
      };
  }
}

export function Button({
  title,
  variant = 'accent',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  textStyle,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={({ pressed }) => {
        const variantStyle = getVariantStyles(variant, colors, pressed);
        return [
          variantStyle.container,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ];
      }}
      {...rest}
    >
      {({ pressed }) => {
        const variantStyle = getVariantStyles(variant, colors, pressed);
        if (loading) {
          return (
            <ActivityIndicator
              color={variantStyle.text.color as string}
              size="small"
            />
          );
        }
        return (
          <Text style={[variantStyle.text, textStyle]}>
            {title}
          </Text>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
});
