import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].card,
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: Platform.OS === 'android' ? 60 + 10 : 60, // Add explicit padding for Android if needed, though SafeArea is better
          paddingBottom: Platform.OS === 'android' ? 10 : 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 24,
          color: Colors[colorScheme ?? 'light'].text,
        },
        headerTitleAlign: 'left',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Log',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
