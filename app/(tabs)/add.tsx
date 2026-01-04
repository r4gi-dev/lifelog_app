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
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AddLogScreen() {
    const router = useRouter();
    const addLog = useLifeLogStore((state) => state.addLog);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [type, setType] = useState<LifeLogType>('task');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleSave = async () => {
        if (!title && type !== 'photo') {
            Alert.alert('Required', 'Please enter a title');
            return;
        }
        if (type === 'photo' && !imageUri) {
            Alert.alert('Required', 'Please select a photo');
            return;
        }

        const newLog: LifeLog = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            title: title || 'Photo Log',
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

                <StyledInput
                    label="Date"
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                />

                {type === 'photo' && (
                    <View style={styles.imageSection}>
                        <Text style={[styles.label, { color: theme.text }]}>Photo</Text>
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
                                    <Text style={{ color: theme.icon, marginTop: 8 }}>Tap to select photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                <StyledInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="What's happening?"
                />

                <StyledInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Add details..."
                    multiline
                    style={{ height: 100, textAlignVertical: 'top' }}
                />

                <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: theme.tint, shadowColor: theme.tint }]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Save Log</Text>
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
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
});
