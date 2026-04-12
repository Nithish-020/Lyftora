import React from 'react';
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, style, ...props }: InputProps) {
  return (
    <View style={{ gap: spacing[1] }}>
      {label && (
        <Text variant="labelMd" color={colors.textSecondary} uppercase>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surfaceHigh,
          borderRadius: radii.default,
          height: 48,
          paddingHorizontal: spacing[4],
          gap: spacing[2],
          borderWidth: 1,
          borderColor: error ? colors.error : 'transparent',
        }}
      >
        {icon}
        <TextInput
          placeholderTextColor={colors.textTertiary}
          style={[
            typography.bodyMd,
            {
              flex: 1,
              color: colors.textPrimary,
              padding: 0,
            },
            style,
          ]}
          {...props}
        />
      </View>
      {error && (
        <Text variant="bodySm" color={colors.error}>
          {error}
        </Text>
      )}
    </View>
  );
}
