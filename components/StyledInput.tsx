import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface StyledInputProps extends TextInputProps {
    label: string;
}

export function StyledInput({ label, style, ...props }: StyledInputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.card,
                        color: theme.text,
                        borderColor: isFocused ? theme.tint : theme.border,
                    },
                    style
                ]}
                placeholderTextColor={theme.icon}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
});
