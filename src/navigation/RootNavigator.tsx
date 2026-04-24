import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LL } from '../components/light';
import type { RootStackParamList } from '../types/navigation';

import {
  OnboardingWelcomeScreen,
  OnboardingCoachScreen,
  OnboardingTrackingScreen,
  OnboardingProfileScreen,
} from '../screens/onboarding/OnboardingScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { ActiveWorkoutScreen } from '../screens/workout/ActiveWorkoutScreen';
import { ExercisePickerScreen } from '../screens/workout/ExercisePickerScreen';
import { RestTimerScreen } from '../screens/workout/RestTimerScreen';
import { PostWorkoutScreen } from '../screens/workout/PostWorkoutScreen';
import { CoachChatScreen } from '../screens/coach/CoachChatScreen';
import { FoodSearchScreen } from '../screens/diet/FoodSearchScreen';
import { FoodDetailScreen } from '../screens/diet/FoodDetailScreen';
import { ProfileScreen } from '../screens/social/ProfileScreen';
import { CommunityScreen } from '../screens/social/CommunityScreen';
import { AchievementsScreen } from '../screens/social/AchievementsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: LL.bg },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="OnboardingCoach" component={OnboardingCoachScreen} />
      <Stack.Screen name="OnboardingTracking" component={OnboardingTrackingScreen} />
      <Stack.Screen name="OnboardingProfile" component={OnboardingProfileScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="ExercisePicker" component={ExercisePickerScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="RestTimer" component={RestTimerScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="PostWorkout" component={PostWorkoutScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="CoachChat" component={CoachChatScreen} />
      <Stack.Screen name="FoodSearch" component={FoodSearchScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
}
