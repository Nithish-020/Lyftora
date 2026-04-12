import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { MainTabScreenProps } from '../../types/navigation';

export function DashboardScreen({ navigation }: MainTabScreenProps<'Dashboard'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Typography variant="bodyMedium" color={colors.textSecondary}>
            Good morning
          </Typography>
          <Typography variant="displaySmall">
            Welcome to Lyftora
          </Typography>
        </View>

        <Card variant="elevated" style={styles.card}>
          <Typography variant="headingMedium">Today&apos;s Workout</Typography>
          <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.cardBody}>
            No workout scheduled. Start one now or let AI Coach create a plan for you.
          </Typography>
          <Button
            title="Start Workout"
            onPress={() => navigation.navigate('ActiveWorkout', {})}
          />
        </Card>

        <Card variant="elevated" style={styles.card}>
          <Typography variant="headingMedium">Nutrition</Typography>
          <View style={styles.macroRow}>
            <MacroItem label="Calories" value="--" unit="kcal" color={colors.primary} />
            <MacroItem label="Protein" value="--" unit="g" color={colors.accent} />
            <MacroItem label="Carbs" value="--" unit="g" color={colors.warning} />
            <MacroItem label="Fat" value="--" unit="g" color={colors.error} />
          </View>
        </Card>

        <Card variant="outlined" style={styles.card}>
          <Typography variant="headingMedium">AI Coach</Typography>
          <Typography variant="bodyMedium" color={colors.textSecondary} style={styles.cardBody}>
            Get personalized workout and nutrition advice powered by AI.
          </Typography>
          <Button
            title="Chat with Coach"
            variant="secondary"
            onPress={() => navigation.navigate('CoachChat', {})}
          />
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

function MacroItem({ label, value, unit, color }: {
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  const { colors } = useTheme();

  return (
    <View style={macroStyles.item}>
      <View style={[macroStyles.dot, { backgroundColor: color }]} />
      <Typography variant="monoSmall" color={colors.textSecondary}>{label}</Typography>
      <Typography variant="headingLarge">{value}</Typography>
      <Typography variant="bodySmall" color={colors.textTertiary}>{unit}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: spacing['3xl'],
  },
  header: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.base,
  },
  cardBody: {
    marginVertical: spacing.md,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
});

const macroStyles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
});
