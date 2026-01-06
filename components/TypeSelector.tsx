import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeLogType } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TypeSelectorProps {
    selected: LifeLogType;
    onSelect: (type: LifeLogType) => void;
}

export function TypeSelector({ selected, onSelect }: TypeSelectorProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { t } = useTranslation();

    const types: LifeLogType[] = ['task', 'schedule', 'photo'];

    const getIcon = (t: LifeLogType) => {
        switch (t) {
            case 'task': return 'checkmark.circle.fill';
            case 'schedule': return 'calendar';
            case 'photo': return 'photo.fill';
        }
    };

    return (
        <View style={styles.container}>
            {types.map((typeKey) => {
                const isSelected = selected === typeKey;
                const color = theme.types[typeKey];

                return (
                    <TouchableOpacity
                        key={typeKey}
                        onPress={() => onSelect(typeKey)}
                        style={[
                            styles.option,
                            { backgroundColor: isSelected ? color : theme.card },
                            isSelected && styles.optionSelected,
                            !isSelected && { borderWidth: 1, borderColor: theme.border }
                        ]}
                    >
                        <IconSymbol
                            size={20}
                            name={getIcon(typeKey)}
                            color={isSelected ? '#FFF' : color}
                        />
                        <Text style={[
                            styles.label,
                            { color: isSelected ? '#FFF' : theme.icon }
                        ]}>
                            {t(`timeline.filter.${typeKey}`)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    option: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
    optionSelected: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 0,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
    }
});
