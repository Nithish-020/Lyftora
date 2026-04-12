import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme';
import type { RootStackParamList } from '../types/navigation';

import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { ActiveWorkoutScreen } from '../screens/workout/ActiveWorkoutScreen';
import { ExercisePickerScreen } from '../screens/workout/ExercisePickerScreen';
import { CoachChatScreen } from '../screens/coach/CoachChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutScreen}
        options={{
          headerShown: true,
          title: 'Workout',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="ExercisePicker"
        component={ExercisePickerScreen}
        options={{
          headerShown: true,
          title: 'Add Exercise',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="CoachChat"
        component={CoachChatScreen}
        options={{
          headerShown: true,
          title: 'AI Coach',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
        }}
      />
    </Stack.Navigator>
  );
}
