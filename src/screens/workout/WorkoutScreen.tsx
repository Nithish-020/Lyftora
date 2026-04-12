import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { MainTabScreenProps } from '../../types/navigation';

export function WorkoutScreen({ navigation }: MainTabScreenProps<'Workout'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">Workouts</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary}>
          Your exercise library and workout history
        </Typography>
      </View>

      <Card variant="elevated" style={styles.card}>
        <Typography variant="headingMedium">Quick Start</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.body}>
          Start an empty workout and add exercises as you go.
        </Typography>
        <Button
          title="Start Empty Workout"
          onPress={() => navigation.navigate('ActiveWorkout', {})}
          fullWidth
        />
      </Card>

      <Card variant="outlined" style={styles.card}>
        <Typography variant="headingMedium">History</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.body}>
          No workouts logged yet. Complete your first workout to see it here.
        </Typography>
      </Card>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.base,
  },
  body: {
    marginVertical: spacing.md,
  },
});
