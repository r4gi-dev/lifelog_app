import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeLogType } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export type FilterType = LifeLogType | 'all';

interface FilterChipsProps {
    selected: FilterType;
    onSelect: (type: FilterType) => void;
}

export const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Tasks', value: 'task' },
    { label: 'Schedule', value: 'schedule' },
    { label: 'Photos', value: 'photo' },
];

export function FilterChips({ selected, onSelect }: FilterChipsProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {FILTER_OPTIONS.map((opt) => {
                const isActive = selected === opt.value;
                const textColor = isActive ? theme.onTint : theme.text;
                return (
                    <TouchableOpacity
                        key={opt.value}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isActive }}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: isActive ? theme.tint : theme.card,
                                borderColor: isActive ? theme.tint : theme.border,
                            }
                        ]}
                        onPress={() => onSelect(opt.value)}
                    >
                        <Text style={[
                            styles.label,
                            { color: textColor }
                        ]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});
