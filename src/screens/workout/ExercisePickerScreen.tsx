import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { RootStackScreenProps } from '../../types/navigation';

export function ExercisePickerScreen(_props: RootStackScreenProps<'ExercisePicker'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">Exercises</Typography>
      </View>

      <Input
        placeholder="Search exercises..."
        autoCapitalize="none"
        returnKeyType="search"
      />

      <View style={styles.empty}>
        <Typography variant="bodyMedium" color={colors.textSecondary} align="center">
          Exercise library coming soon.{'\n'}This will include 200+ exercises with muscle group filters.
        </Typography>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.base,
    marginBottom: spacing.base,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
});
