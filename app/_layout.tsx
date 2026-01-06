import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import '@/i18n';
import i18n from '@/i18n';
import { useLanguageStore } from '@/store/languageStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const getEffectiveLanguage = useLanguageStore((state) => state.getEffectiveLanguage);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    const lang = getEffectiveLanguage();
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [language, getEffectiveLanguage]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
