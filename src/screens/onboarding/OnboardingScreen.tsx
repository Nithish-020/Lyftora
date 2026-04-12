import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { RootStackScreenProps } from '../../types/navigation';

const { width } = Dimensions.get('window');

const STEPS = [
  {
    title: 'AI-Powered Training',
    description: 'Get personalized workout and nutrition plans from your AI coach, powered by Claude.',
    icon: '🧠',
  },
  {
    title: 'Track Everything',
    description: 'Log workouts, meals, and progress. 100+ Indian foods with accurate macros built in.',
    icon: '📊',
  },
  {
    title: 'One Price. Forever.',
    description: 'No subscriptions. Pay once, own it forever. All features included.',
    icon: '💪',
  },
];

export function OnboardingScreen({ navigation }: RootStackScreenProps<'Onboarding'>) {
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      navigation.replace('Main', { screen: 'Dashboard' });
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <Typography variant="displayLarge" align="center" style={styles.icon}>
            {current.icon}
          </Typography>
          <Typography variant="displayMedium" align="center" style={styles.title}>
            {current.title}
          </Typography>
          <Typography
            variant="bodyLarge"
            color={colors.textSecondary}
            align="center"
            style={styles.description}
          >
            {current.description}
          </Typography>
        </View>

        <View style={styles.indicators}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === step ? colors.primary : colors.border,
                  width: i === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            title={step === STEPS.length - 1 ? 'Get Started' : 'Continue'}
            onPress={handleNext}
            fullWidth
          />
          {step < STEPS.length - 1 && (
            <Button
              title="Skip"
              variant="ghost"
              onPress={() => navigation.replace('Main', { screen: 'Dashboard' })}
              fullWidth
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  icon: {
    fontSize: 64,
    marginBottom: spacing['2xl'],
  },
  title: {
    marginBottom: spacing.base,
  },
  description: {
    maxWidth: width * 0.8,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    paddingBottom: spacing['2xl'],
    gap: spacing.sm,
  },
});
