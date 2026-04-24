import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingCoach: undefined;
  OnboardingTracking: undefined;
  OnboardingProfile: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  ActiveWorkout: { workoutId?: string };
  ExercisePicker: undefined;
  RestTimer: { exerciseName?: string; seconds?: number } | undefined;
  PostWorkout: { workoutId?: string } | undefined;
  CoachChat: { sessionId?: string };
  FoodSearch: undefined;
  FoodDetail: { foodId?: string } | undefined;
  Profile: undefined;
  Community: undefined;
  Achievements: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Workout: undefined;
  Add: undefined;
  Diet: undefined;
  Progress: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
