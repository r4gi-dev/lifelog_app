import { FilterChips, FilterType } from '@/components/FilterChips';
import { LogCard } from '@/components/LogCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLifeLogStore } from '@/store';
import { LifeLog } from '@/types';
import React, { useState } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function TimelineScreen() {
    const logs = useLifeLogStore((state) => state.logs);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');

    // Filter logs logic
    const filteredLogs = logs.filter((log) => {
        const matchesType = filterType === 'all' || log.type === filterType;
        const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (log.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
        return matchesType && matchesSearch;
    });

    // Group logs by date
    const groupedLogs = filteredLogs.reduce((acc, log) => {
        const date = log.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(log);
        return acc;
    }, {} as Record<string, LifeLog[]>);

    // Convert to SectionList format and sort by date descending
    const sections = Object.keys(groupedLogs)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((date) => ({
            title: date,
            data: groupedLogs[date].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        }));

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

            <View style={styles.header}>
                <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <IconSymbol name="magnifyingglass" size={20} color={theme.icon} />
                    <TextInput
                        style={[styles.searchInput, { color: theme.text }]}
                        placeholder="Search logs..."
                        placeholderTextColor={theme.icon}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Text style={{ color: theme.tint, fontWeight: '600' }} onPress={() => setSearchQuery('')}>Clear</Text>
                    )}
                </View>
                <FilterChips selected={filterType} onSelect={setFilterType} />
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LogCard log={item} />}
                renderSectionHeader={({ section: { title } }) => {
                    const dateObj = new Date(title);
                    const isToday = title === new Date().toISOString().split('T')[0];
                    const displayTitle = isToday ? 'Today' : title;

                    return (
                        <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
                            <Text style={[styles.sectionTitle, { color: theme.icon }]}>{displayTitle}</Text>
                        </View>
                    );
                }}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.text }]}>No logs found.</Text>
                        <Text style={[styles.emptySubText, { color: theme.icon }]}>Try adjusting your search or filters.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 8,
        gap: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    listContent: {
        padding: 16,
        paddingTop: 8,
    },
    sectionHeader: {
        paddingVertical: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptySubText: {
        marginTop: 8,
        fontSize: 16,
    },
});
