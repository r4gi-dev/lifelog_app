import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LifeLog, PhotoLog } from '@/types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface LogCardProps {
    log: LifeLog;
}

export function LogCard({ log }: LogCardProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const isPhoto = log.type === 'photo';
    const photoLog = log as PhotoLog;

    const typeColor = theme.types[log.type];

    const getIcon = () => {
        switch (log.type) {
            case 'task': return 'checkmark.circle.fill';
            case 'schedule': return 'calendar';
            case 'photo': return 'photo.fill';
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
            <View style={styles.header}>
                <View style={styles.badgeContainer}>
                    <View style={[styles.iconBadge, { backgroundColor: typeColor }]}>
                        <IconSymbol size={14} name={getIcon()} color="#FFF" />
                    </View>
                    <Text style={[styles.typeText, { color: typeColor }]}>{log.type.toUpperCase()}</Text>
                </View>
                <Text style={[styles.time, { color: theme.icon }]}>
                    {log.date}
                </Text>
            </View>

            <Text style={[styles.title, { color: theme.text }]}>{log.title}</Text>

            {log.description ? (
                <Text style={[styles.description, { color: theme.icon }]}>{log.description}</Text>
            ) : null}

            {isPhoto && photoLog.uri && (
                <Image source={{ uri: photoLog.uri }} style={styles.image} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconBadge: {
        padding: 6,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    time: {
        fontSize: 12,
        fontWeight: '500',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 8,
        resizeMode: 'cover',
    },
});
