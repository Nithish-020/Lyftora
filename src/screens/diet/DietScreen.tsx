import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Card } from '../../components/common/Card';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { MainTabScreenProps } from '../../types/navigation';

export function DietScreen(_props: MainTabScreenProps<'Diet'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">Nutrition</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary}>
          Track meals and macros with 100+ Indian foods
        </Typography>
      </View>

      {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map((meal) => (
        <Card key={meal} variant="flat" style={styles.mealCard}>
          <View style={styles.mealHeader}>
            <Typography variant="headingSmall">{meal}</Typography>
            <Typography variant="monoSmall" color={colors.textTertiary}>
              0 kcal
            </Typography>
          </View>
          <Typography variant="bodySmall" color={colors.textSecondary}>
            Tap + to add food
          </Typography>
        </Card>
      ))}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  mealCard: {
    marginBottom: spacing.md,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
});
