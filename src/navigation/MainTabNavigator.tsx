import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import { LL, LS, TL, FL } from '../components/light';
import { LIcon } from '../components/light/Icon';
import type { MainTabParamList, RootStackParamList } from '../types/navigation';

import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { WorkoutScreen } from '../screens/workout/WorkoutScreen';
import { DietScreen } from '../screens/diet/DietScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TABS: { name: keyof MainTabParamList; icon: string; label: string; fab?: boolean }[] = [
  { name: 'Dashboard', icon: 'grid_view', label: 'Home' },
  { name: 'Workout', icon: 'fitness_center', label: 'Train' },
  { name: 'Add', icon: 'play_arrow', label: '', fab: true },
  { name: 'Diet', icon: 'restaurant', label: 'Diet' },
  { name: 'Progress', icon: 'insights', label: 'Progress' },
];

function PlaceholderScreen() {
  return <View />;
}

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { paddingBottom: insets.bottom > 0 ? insets.bottom : 14 }]}>
      <View style={styles.pill}>
        {TABS.map((t, idx) => {
          const route = state.routes.find((r) => r.name === t.name);
          if (!route) return null;
          const focused = state.index === state.routes.findIndex((r) => r.name === t.name);

          if (t.fab) {
            return (
              <Pressable
                key={t.name}
                onPress={() => {
                  const parent = navigation.getParent<NavigationProp<RootStackParamList>>();
                  parent?.navigate('ActiveWorkout', {});
                }}
                style={styles.fab}
                accessibilityRole="button"
                accessibilityLabel="Start workout"
              >
                <LIcon name="play_arrow" size={26} color={LL.ink} />
              </Pressable>
            );
          }

          void idx;
          return (
            <Pressable
              key={t.name}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(t.name);
              }}
              style={styles.tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
            >
              <LIcon name={t.icon} size={20} color={focused ? LL.primary : 'rgba(244,239,228,0.60)'} />
              <Text
                style={[
                  TL.labelSm,
                  { fontFamily: FL.monoMedium, fontSize: 8.5, color: focused ? LL.primary : 'rgba(244,239,228,0.55)' },
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: LL.bg } }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Add" component={PlaceholderScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 0,
  },
  pill: {
    height: 64,
    borderRadius: 999,
    backgroundColor: LL.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    ...LS.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 2,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: LL.primary,
    borderWidth: 3,
    borderColor: LL.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    ...LS.glow,
  },
});
