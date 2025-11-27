import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserProgressProvider } from '@/src/context/UserProgressContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProgressProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="exercises" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="credit-card-content" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="bantrab-products" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="bank-map-minigame" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="game-over" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserProgressProvider>
    </GestureHandlerRootView>
  );
}
