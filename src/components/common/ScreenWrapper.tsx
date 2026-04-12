import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';

interface ScreenWrapperProps {
  children: React.ReactNode;
  padding?: boolean;
  style?: ViewStyle;
}

export function ScreenWrapper({ children, padding = true, style }: ScreenWrapperProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.container,
          padding && styles.padded,
          { backgroundColor: colors.background },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.base,
  },
});
