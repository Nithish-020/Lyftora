import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { Text } from './Text';
import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';

interface ChipProps {
  label: string;
  selected?: boolean;
  variant?: 'default' | 'accent' | 'ai';
  onPress?: () => void;
}

export function Chip({ label, selected = false, variant = 'default', onPress }: ChipProps) {
  const bg = selected
    ? variant === 'ai' ? colors.aiSurface : colors.primary
    : colors.surfaceHigh;

  const text = selected
    ? variant === 'ai' ? colors.ai : colors.textInverse
    : colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: bg,
        borderRadius: radii.full,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        alignSelf: 'flex-start',
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      <Text variant="labelMd" color={text} uppercase>
        {label}
      </Text>
    </Pressable>
  );
}
