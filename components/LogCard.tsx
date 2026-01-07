import { ConfirmationModal } from '@/components/ConfirmationModal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLifeLogStore } from '@/store';
import { LifeLog, PhotoLog } from '@/types';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTranslation } from 'react-i18next';

interface LogCardProps {
    log: LifeLog;
}

export function LogCard({ log }: LogCardProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const isPhoto = log.type === 'photo';
    const photoLog = log as PhotoLog;
    const { removeLog, toggleLogStatus } = useLifeLogStore();
    const { t } = useTranslation();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const typeColor = theme.types[log.type];

    const getStatusConfig = (status: LifeLog['status']) => {
        switch (status) {
            case 'todo': return { label: t('status.todo'), color: '#8E8E93' };
            case 'in_progress': return { label: t('status.in_progress'), color: theme.tint };
            case 'completed': return { label: t('status.completed'), color: '#34C759' };
            default: return { label: '', color: '#8E8E93' };
        }
    };

    const statusConfig = getStatusConfig(log.status);

    const getIcon = () => {
        switch (log.type) {
            case 'task': return log.status === 'completed' ? 'checkmark.circle.fill' : 'plus.circle.fill';
            case 'schedule': return 'calendar';
            case 'photo': return 'photo.fill';
        }
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const handleToggleStatus = () => {
        if (log.type !== 'photo') {
            toggleLogStatus(log.id);
        }
    };

    return (
        <>
            <ConfirmationModal
                isVisible={isDeleteModalVisible}
                title={t('common.delete')}
                message={t('common.deleteConfirm')}
                confirmText={t('common.delete')}
                cancelText={t('common.cancel')}
                onConfirm={() => {
                    removeLog(log.id);
                    setIsDeleteModalVisible(false);
                }}
                onCancel={() => setIsDeleteModalVisible(false)}
            />
            <Animated.View
                entering={FadeInDown.springify().damping(15)}
                style={[styles.cardShadow, { shadowColor: theme.text }]}
            >
                <Pressable
                    onLongPress={handleDelete}
                    onPress={handleToggleStatus}
                    style={({ pressed }) => [
                        styles.card,
                        { backgroundColor: theme.card, opacity: pressed ? 0.9 : 1 }
                    ]}
                >
                    <View style={styles.header}>
                        <View style={styles.badgeContainer}>
                            <View style={[styles.iconBadge, { backgroundColor: typeColor }]}>
                                <IconSymbol size={14} name={getIcon()} color="#FFF" />
                            </View>
                            <Text style={[styles.typeText, { color: typeColor }]}>{log.type.toUpperCase()}</Text>

                            {log.status && (
                                <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                                        {statusConfig.label}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <Text style={[styles.time, { color: theme.icon }]}>
                            {log.date}
                        </Text>
                    </View>

                    <Text style={[
                        styles.title,
                        { color: theme.text },
                        log.status === 'completed' && { textDecorationLine: 'line-through', opacity: 0.6 }
                    ]}>{log.title}</Text>

                    {log.description ? (
                        <Text style={[
                            styles.description,
                            { color: theme.icon },
                            log.status === 'completed' && { opacity: 0.5 }
                        ]}>{log.description}</Text>
                    ) : null}

                    {isPhoto && photoLog.uri && (
                        <Image source={{ uri: photoLog.uri }} style={styles.image} />
                    )}
                </Pressable>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    cardShadow: {
        marginBottom: 16,
        borderRadius: 16,
        elevation: 2,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    card: {
        borderRadius: 16,
        padding: 16,
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
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
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
