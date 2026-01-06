import { LogCard } from '@/components/LogCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLifeLogStore } from '@/store';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
    const logs = useLifeLogStore((state) => state.logs);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { t } = useTranslation();

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    // Map logs to calendar points
    const markedDates = useMemo(() => {
        const marks: any = {};
        logs.forEach((log) => {
            if (!marks[log.date]) {
                marks[log.date] = {
                    marked: true,
                    dotColor: theme.tint
                };
            }
        });

        // Add selection styling
        marks[selectedDate] = {
            ...marks[selectedDate],
            selected: true,
            selectedColor: theme.tint,
            selectedTextColor: '#FFFFFF',
        };

        return marks;
    }, [logs, selectedDate, theme.tint]);

    // Filter logs for selected day
    const dayLogs = useMemo(() => {
        return logs.filter((log) => log.date === selectedDate)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [logs, selectedDate]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

            <View style={styles.calendarContainer}>
                <Calendar
                    theme={{
                        calendarBackground: theme.background,
                        textSectionTitleColor: theme.icon,
                        selectedDayBackgroundColor: theme.tint,
                        selectedDayTextColor: '#FFFFFF',
                        todayTextColor: theme.tint,
                        dayTextColor: theme.text,
                        textDisabledColor: theme.border,
                        dotColor: theme.tint,
                        selectedDotColor: '#FFFFFF',
                        arrowColor: theme.tint,
                        monthTextColor: theme.text,
                        indicatorColor: theme.tint,
                        textDayFontWeight: '500',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '600',
                    }}
                    markedDates={markedDates}
                    onDayPress={(day: any) => setSelectedDate(day.dateString)}
                    enableSwipeMonths={true}
                />
            </View>

            <View style={styles.listHeader}>
                <Text style={[styles.listTitle, { color: theme.text }]}>
                    {selectedDate === today ? t('calendar.today') : selectedDate}
                </Text>
                <Text style={[styles.count, { color: theme.icon }]}>
                    {t('calendar.logCount', { count: dayLogs.length })}
                </Text>
            </View>

            <FlatList
                data={dayLogs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LogCard log={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.icon }]}>{t('calendar.noLogs')}</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarContainer: {
        paddingBottom: 8,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 14,
        fontWeight: '500',
    },
    listContent: {
        padding: 16,
        paddingTop: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    emptyText: {
        fontSize: 16,
    },
});
