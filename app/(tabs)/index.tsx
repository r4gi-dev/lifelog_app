import { LogCard } from '@/components/LogCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLifeLogStore } from '@/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const logs = useLifeLogStore((state) => state.logs);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  // 1. Calculate Weekly Stats
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const stats = last7Days.map(date => {
    const count = logs.filter(l => l.date === date).length;
    return { date, count };
  });

  // 2. Get Recent Topics (Photos & Schedules)
  const recentTopics = logs
    .filter(l => l.type === 'photo' || l.type === 'schedule')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const maxCount = Math.max(...stats.map(s => s.count), 1);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.icon }]}>Welcome back</Text>
        <Text style={[styles.appTitle, { color: theme.text }]}>LifeLog</Text>
      </View>

      {/* Weekly Activity Chart */}
      <View style={[styles.section, styles.chartContainer, { backgroundColor: theme.card }]}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="chart.bar.fill" size={20} color={theme.tint} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly Activity</Text>
        </View>
        <View style={styles.chart}>
          {stats.map((day, index) => {
            const height = (day.count / maxCount) * 100;
            const isToday = index === 6;
            return (
              <View key={day.date} style={styles.barContainer}>
                <View style={[
                  styles.bar,
                  {
                    height: `${Math.max(height, 10)}%`,
                    backgroundColor: isToday ? theme.tint : theme.border
                  }
                ]} />
                <Text style={[styles.dayLabel, { color: theme.icon }]}>
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'narrow' })}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Topics / Recent Highlights */}
      <View style={styles.section}>
        <View style={[styles.sectionHeader, { marginBottom: 12 }]}>
          <IconSymbol name="star.fill" size={20} color="#FFD700" />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Topics</Text>
        </View>

        {recentTopics.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.icon }}>No recent photos or schedules.</Text>
          </View>
        ) : (
          recentTopics.map(log => (
            <LogCard key={log.id} log={log} />
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.viewAllButton, { borderColor: theme.border }]}
        onPress={() => router.push('/(tabs)/timeline')}
      >
        <Text style={[styles.viewAllText, { color: theme.tint }]}>View Full Timeline</Text>
        <IconSymbol name="chevron.right" size={16} color={theme.tint} />
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartContainer: {
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 20,
  },
  viewAllText: {
    fontWeight: '700',
  }
});
