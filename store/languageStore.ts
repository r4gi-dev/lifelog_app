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
                    const locales = Localization.getLocales();
                    const locale = locales && locales.length > 0 ? locales[0].languageCode : 'en';
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
