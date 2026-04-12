import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { RootStackScreenProps } from '../../types/navigation';

export function ActiveWorkoutScreen({ navigation }: RootStackScreenProps<'ActiveWorkout'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">Active Workout</Typography>
        <Typography variant="mono" color={colors.primary}>
          00:00
        </Typography>
      </View>

      <View style={styles.empty}>
        <Typography variant="bodyLarge" color={colors.textSecondary} align="center">
          No exercises added yet.{'\n'}Tap below to add your first exercise.
        </Typography>
      </View>

      <View style={styles.actions}>
        <Button
          title="Add Exercise"
          variant="accent"
          fullWidth
          onPress={() => navigation.navigate('ExercisePicker')}
        />
        <View style={styles.spacer} />
        <Button
          title="Cancel Workout"
          variant="ghost"
          fullWidth
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  actions: {
    paddingBottom: spacing['2xl'],
  },
  spacer: {
    height: spacing.md,
  },
});
