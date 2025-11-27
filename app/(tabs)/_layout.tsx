import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView 
        style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}
        edges={["top", "left", "right"]}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,

          }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Aprender',
            tabBarIcon: ({ color }) => <IconSymbol size={typography.title.fontSize} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="streak"
          options={{
            title: 'Racha',
            tabBarIcon: ({ color }) => <IconSymbol size={typography.title.fontSize} name="flame.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: 'Premios',
            tabBarIcon: ({ color }) => <IconSymbol size={typography.title.fontSize} name="gift.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <IconSymbol size={typography.title.fontSize} name="person.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            href: null, // Hide from tabs
          }}
        />
      </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
