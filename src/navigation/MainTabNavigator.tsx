import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/common/Typography';
import { useTheme } from '../hooks/useTheme';
import { spacing, MIN_TOUCH_TARGET } from '../theme/spacing';
import type { MainTabParamList } from '../types/navigation';

import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { WorkoutScreen } from '../screens/workout/WorkoutScreen';
import { DietScreen } from '../screens/diet/DietScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  Dashboard: '🏠',
  Workout: '💪',
  Add: '➕',
  Diet: '🥗',
  Progress: '📈',
};

function PlaceholderScreen() {
  return <View />;
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tabStyles.container,
        {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom || spacing.sm,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCenter = route.name === 'Add';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (isCenter) {
              navigation.navigate('ActiveWorkout', {});
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        if (isCenter) {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityLabel="Start workout"
              style={[tabStyles.centerTab, { backgroundColor: colors.primary }]}
            >
              <Typography variant="displaySmall" color="#0A0E1A">
                {TAB_ICONS[route.name as keyof MainTabParamList]}
              </Typography>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
            style={tabStyles.tab}
          >
            <Typography
              variant="bodyLarge"
              style={tabStyles.icon}
            >
              {TAB_ICONS[route.name as keyof MainTabParamList]}
            </Typography>
            <Typography
              variant="labelSmall"
              color={isFocused ? colors.primary : colors.textTertiary}
            >
              {route.name}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Add" component={PlaceholderScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: MIN_TOUCH_TARGET,
    paddingVertical: spacing.xs,
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  centerTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
