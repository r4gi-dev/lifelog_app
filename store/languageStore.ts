import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LanguageType = 'en' | 'ja' | 'system';

interface LanguageState {
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    getEffectiveLanguage: () => 'en' | 'ja';
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            language: 'system',
            setLanguage: (lang) => set({ language: lang }),
            getEffectiveLanguage: () => {
                const { language } = get();
                if (language === 'system') {
                    const locale = Localization.getLocales()[0].languageCode;
                    return locale === 'ja' ? 'ja' : 'en';
                }
                return language;
            },
        }),
        {
            name: 'language-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
