import React from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { shadows } from '../tokens/shadows';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ai' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const sizeMap: Record<ButtonSize, { height: number; paddingX: number; fontSize: keyof typeof import('../tokens/typography').typography }> = {
  sm: { height: 36, paddingX: spacing[3], fontSize: 'labelMd' },
  md: { height: 44, paddingX: spacing[4], fontSize: 'titleMd' },
  lg: { height: 48, paddingX: spacing[6], fontSize: 'titleMd' },
};

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.primary, text: colors.textInverse },
  secondary: { bg: 'transparent', text: colors.primary, border: colors.borderAccent },
  ghost: { bg: 'transparent', text: colors.textSecondary },
  ai: { bg: colors.aiSurface, text: colors.ai, border: colors.aiBorder },
  danger: { bg: colors.errorSurface, text: colors.error },
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  ...props
}: ButtonProps) {
  const s = sizeMap[size];
  const v = variantStyles[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        {
          height: s.height,
          paddingHorizontal: s.paddingX,
          backgroundColor: v.bg,
          borderRadius: radii.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing[2],
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        } satisfies ViewStyle,
        fullWidth && { width: '100%' as any },
      ]}
      {...props}
    >
      {icon}
      <Text variant={size === 'sm' ? 'labelMd' : 'titleMd'} color={v.text} style={{ fontWeight: '700' }}>
        {title}
      </Text>
    </Pressable>
  );
}
