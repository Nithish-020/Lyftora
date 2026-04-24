import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LL } from '../components/light';
import type { RootStackParamList } from '../types/navigation';
import { useAuthStore } from '../store/authStore';

import {
  OnboardingWelcomeScreen,
  OnboardingCoachScreen,
  OnboardingTrackingScreen,
  OnboardingProfileScreen,
} from '../screens/onboarding/OnboardingScreen';
import {
  AuthLandingScreen,
  SignUpScreen,
  LogInScreen,
  OtpVerifyScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
} from '../screens/auth';
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

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: LL.bg },
  animation: 'slide_from_right' as const,
};

export function RootNavigator() {
  const status = useAuthStore((s) => s.status);
  const hydrate = useAuthStore((s) => s.hydrate);

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: LL.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={LL.ink} />
      </View>
    );
  }

  if (status === 'onboarding') {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
        <Stack.Screen name="OnboardingCoach" component={OnboardingCoachScreen} />
        <Stack.Screen name="OnboardingTracking" component={OnboardingTrackingScreen} />
        <Stack.Screen name="OnboardingProfile" component={OnboardingProfileScreen} />
      </Stack.Navigator>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
