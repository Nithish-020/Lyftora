import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useThemeStore } from './src/store/themeStore';
import { colors as themeColors } from './src/theme/colors';

SplashScreen.preventAutoHideAsync();

const LyftoraDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: themeColors.dark.primary,
    background: themeColors.dark.background,
    card: themeColors.dark.card,
    text: themeColors.dark.textPrimary,
    border: themeColors.dark.border,
    notification: themeColors.dark.accent,
  },
};

const LyftoraLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themeColors.light.primary,
    background: themeColors.light.background,
    card: themeColors.light.card,
    text: themeColors.light.textPrimary,
    border: themeColors.light.border,
    notification: themeColors.light.accent,
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const activeScheme = useThemeStore((s) => s.activeScheme);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'InstrumentSerif-Regular': require('./src/assets/fonts/InstrumentSerif-Regular.ttf'),
          'InstrumentSerif-Italic': require('./src/assets/fonts/InstrumentSerif-Italic.ttf'),
          'SpaceGrotesk-Regular': require('./src/assets/fonts/SpaceGrotesk-Regular.ttf'),
          'SpaceGrotesk-Medium': require('./src/assets/fonts/SpaceGrotesk-Medium.ttf'),
          'SpaceGrotesk-SemiBold': require('./src/assets/fonts/SpaceGrotesk-SemiBold.ttf'),
          'SpaceGrotesk-Bold': require('./src/assets/fonts/SpaceGrotesk-Bold.ttf'),
          'GeistMono-Regular': require('./src/assets/fonts/GeistMono-Regular.ttf'),
          'GeistMono-Medium': require('./src/assets/fonts/GeistMono-Medium.ttf'),
        });
      } catch {
        // Fonts failed to load — continue with system fonts
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer theme={activeScheme === 'dark' ? LyftoraDarkTheme : LyftoraLightTheme}>
        <StatusBar style={activeScheme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
