import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Card } from '../../components/common/Card';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { MainTabScreenProps } from '../../types/navigation';

export function ProgressScreen(_props: MainTabScreenProps<'Progress'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">Progress</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary}>
          Track your personal records and body measurements
        </Typography>
      </View>

      <Card variant="elevated" style={styles.card}>
        <Typography variant="headingMedium">Personal Records</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.body}>
          Complete workouts to see your PRs here. Every new personal best gets celebrated.
        </Typography>
      </Card>

      <Card variant="elevated" style={styles.card}>
        <Typography variant="headingMedium">Body Measurements</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.body}>
          Track weight, body fat, and measurements over time.
        </Typography>
      </Card>

      <Card variant="outlined" style={styles.card}>
        <Typography variant="headingMedium">Charts</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.body}>
          Volume trends and progress charts will appear as you log more data.
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
