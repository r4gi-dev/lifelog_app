import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeMode, useThemeStore } from '@/store/themeStore';
import Constants from 'expo-constants';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function SettingsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { mode, setMode } = useThemeStore();

    const handleModeSelect = (newMode: ThemeMode) => {
        setMode(newMode);
    };

    const modes: { label: string; value: ThemeMode; icon: string }[] = [
        { label: 'Light', value: 'light', icon: 'sun.max.fill' },
        { label: 'Dark', value: 'dark', icon: 'moon.fill' },
        { label: 'System', value: 'system', icon: 'gear' }, // Using gear as generic system icon
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
                <View style={[styles.card, { backgroundColor: theme.card }]}>
                    {modes.map((m, index) => {
                        const isSelected = mode === m.value;
                        return (
                            <TouchableOpacity
                                key={m.value}
                                style={[
                                    styles.option,
                                    { borderBottomWidth: index !== modes.length - 1 ? 1 : 0, borderColor: theme.border }
                                ]}
                                onPress={() => handleModeSelect(m.value)}
                            >
                                <View style={styles.optionLeft}>
                                    <IconSymbol name={m.icon as any} size={20} color={theme.icon} />
                                    <Text style={[styles.optionLabel, { color: theme.text }]}>{m.label}</Text>
                                </View>
                                {isSelected && (
                                    <IconSymbol name="checkmark.circle.fill" size={20} color={theme.tint} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.version, { color: theme.icon }]}>LifeLog v{Constants.expoConfig?.version ?? '1.0.0'}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        opacity: 0.7,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionLabel: {
        fontSize: 16,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    version: {
        fontSize: 12,
    }
});
