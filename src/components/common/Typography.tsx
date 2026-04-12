import React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { TypographyKey } from '../../theme/typography';

interface TypographyProps extends TextProps {
  variant?: TypographyKey;
  color?: string;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
}

export function Typography({
  variant = 'bodyMedium',
  color,
  align,
  style,
  children,
  ...rest
}: TypographyProps) {
  const { colors, typography } = useTheme();
  const variantStyle = typography[variant];

  return (
    <Text
      style={[
        variantStyle,
        { color: color ?? colors.textPrimary },
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
