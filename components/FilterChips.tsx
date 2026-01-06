import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeLogType } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export type FilterType = LifeLogType | 'all';

interface FilterOption {
    label: string;
    value: FilterType;
}

const FILTER_OPTIONS: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Tasks', value: 'task' },
    { label: 'Schedule', value: 'schedule' },
    { label: 'Photos', value: 'photo' },
];

interface FilterChipsProps {
    selected: FilterType;
    onSelect: (type: FilterType) => void;
}

export function FilterChips({ selected, onSelect }: FilterChipsProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { t } = useTranslation();

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
                            {t(`timeline.filter.${opt.value}`)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 70,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});
