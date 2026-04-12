import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';

type Variant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
  uppercase?: boolean;
}

export function Text({
  variant = 'bodyMd',
  color = colors.textPrimary,
  align,
  uppercase,
  style,
  ...props
}: TextProps) {
  const token = typography[variant];
  return (
    <RNText
      style={[
        token,
        { color },
        align && { textAlign: align },
        uppercase && { textTransform: 'uppercase' },
        style,
      ]}
      {...props}
    />
  );
}
