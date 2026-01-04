import { useThemeStore } from '@/store/themeStore';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
    const { mode } = useThemeStore();
    const systemTheme = useNativeColorScheme();

    if (mode === 'system') {
        return systemTheme;
    }
    return mode;
}
