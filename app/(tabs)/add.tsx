import { StyledInput } from '@/components/StyledInput';
import { TypeSelector } from '@/components/TypeSelector';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLifeLogStore } from '@/store';
import { LifeLog, LifeLogType } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function AddLogScreen() {
    const router = useRouter();
    const addLog = useLifeLogStore((state) => state.addLog);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { t } = useTranslation();

    const [type, setType] = useState<LifeLogType>('task');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleSave = async () => {
        if (!title && type !== 'photo') {
            Alert.alert(t('add.errorTitle'), t('add.errorNoTitle'));
            return;
        }
        if (type === 'photo' && !imageUri) {
            Alert.alert(t('add.errorTitle'), t('add.photo')); // Select photo
            return;
        }

        const newLog: LifeLog = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            title: title || (type === 'photo' ? 'Photo Log' : ''),
            description,
            date,
            createdAt: new Date().toISOString(),
            ...(type === 'photo' ? { uri: imageUri } : {}),
        } as LifeLog;

        addLog(newLog);

        // Clear form
        setTitle('');
        setDescription('');
        setImageUri(null);
        router.push('/(tabs)');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.formContainer}>
                <TypeSelector selected={type} onSelect={setType} />

                {/* Date Selector */}
                <View style={styles.inputSection}>
                    <Text style={[styles.label, { color: theme.text }]}>{t('add.date')}</Text>
                    <TouchableOpacity
                        onPress={() => setIsCalendarVisible(true)}
                        style={[
                            styles.dateSelector,
                            { backgroundColor: theme.card, borderColor: theme.border }
                        ]}
                    >
                        <View style={styles.dateSelectorContent}>
                            <Text style={[styles.dateText, { color: theme.text }]}>{date}</Text>
                            <IconSymbol name="calendar" size={20} color={theme.tint} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Calendar Modal */}
                <Modal
                    visible={isCalendarVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsCalendarVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: theme.text }]}>{t('add.selectDate')}</Text>
                                <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                                    <IconSymbol name="xmark" size={20} color={theme.icon} />
                                </TouchableOpacity>
                            </View>
                            <Calendar
                                current={date}
                                onDayPress={(day: any) => {
                                    setDate(day.dateString);
                                    setIsCalendarVisible(false);
                                }}
                                markedDates={{
                                    [date]: { selected: true, selectedColor: theme.tint }
                                }}
                                theme={{
                                    calendarBackground: theme.card,
                                    textSectionTitleColor: theme.icon,
                                    selectedDayBackgroundColor: theme.tint,
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: theme.tint,
                                    dayTextColor: theme.text,
                                    textDisabledColor: theme.border,
                                    monthTextColor: theme.text,
                                    arrowColor: theme.tint,
                                }}
                            />
                            <TouchableOpacity
                                style={[styles.closeButton, { backgroundColor: theme.border }]}
                                onPress={() => setIsCalendarVisible(false)}
                            >
                                <Text style={[styles.closeButtonText, { color: theme.text }]}>{t('common.close')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {type === 'photo' && (
                    <View style={styles.imageSection}>
                        <Text style={[styles.label, { color: theme.text }]}>{t('add.photo')}</Text>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={[
                                styles.imagePicker,
                                { borderColor: theme.border, backgroundColor: theme.card }
                            ]}
                        >
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <IconSymbol name="camera.fill" size={32} color={theme.icon} />
                                    <Text style={{ color: theme.icon, marginTop: 8 }}>{t('add.choosePhoto')}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                <StyledInput
                    label={t('add.logTitle')}
                    value={title}
                    onChangeText={setTitle}
                    placeholder={t('add.logTitlePlaceholder')}
                />

                <StyledInput
                    label={t('add.description')}
                    value={description}
                    onChangeText={setDescription}
                    placeholder={t('add.descriptionPlaceholder')}
                    multiline
                    style={{ height: 100, textAlignVertical: 'top' }}
                />

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: theme.tint, shadowColor: theme.tint }]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>{t('add.save')}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 24,
    },
    inputSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    dateSelector: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dateSelectorContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
    },
    imageSection: {
        marginBottom: 20,
    },
    imagePicker: {
        height: 200,
        borderWidth: 2,
        borderRadius: 16,
        overflow: 'hidden',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    saveButton: {
        marginTop: 12,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        gap: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        fontWeight: '600',
    }
});
