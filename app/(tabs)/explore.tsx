import { colors, radii, spacing, typography } from '@/constants/theme';
import { mockRoadmapData, mockUserProgress } from '@/src/data/mockRoadmapData';
import { NodeStatus } from '@/src/types/roadmap';
import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TimelineEvent {
  id: string;
  title: string;
  type: 'completed' | 'started';
  points: number;
  date: string;
  moduleColor: string;
  icon: string;
}

interface ModuleStats {
  id: string;
  title: string;
  color: string;
  totalNodes: number;
  completedNodes: number;
  inProgressNodes: number;
  totalPoints: number;
  earnedPoints: number;
  progress: number;
}

export default function ExploreScreen() {
  // Calculate overall statistics
  const stats = useMemo(() => {
    const allNodes = mockRoadmapData.flatMap(module => module.nodes);
    const totalNodes = allNodes.length;
    const completedCount = allNodes.filter(node => node.status === 'completed').length;
    const inProgressCount = allNodes.filter(node => node.status === 'in_progress').length;
    const availableCount = allNodes.filter(node => node.status === 'available').length;
    const lockedCount = allNodes.filter(node => node.status === 'locked').length;
    const totalPossiblePoints = allNodes.reduce((sum, node) => sum + (node.points || 0), 0);

    return {
      totalNodes,
      completedCount,
      inProgressCount,
      availableCount,
      lockedCount,
      totalPoints: mockUserProgress.totalPoints,
      totalPossiblePoints,
      completionPercentage: Math.round((completedCount / totalNodes) * 100),
    };
  }, []);

  // Calculate module-specific statistics
  const moduleStats: ModuleStats[] = useMemo(() => {
    return mockRoadmapData.map(module => {
      const completedNodes = module.nodes.filter(node =>
        mockUserProgress.completedNodes.includes(node.id)
      ).length;
      const inProgressNodes = module.nodes.filter(node => node.status === 'in_progress').length;
      const earnedPoints = module.nodes
        .filter(node => mockUserProgress.completedNodes.includes(node.id))
        .reduce((sum, node) => sum + (node.points || 0), 0);
      const totalPoints = module.nodes.reduce((sum, node) => sum + (node.points || 0), 0);

      return {
        id: module.id,
        title: module.title,
        color: module.color || colors.primary,
        totalNodes: module.nodes.length,
        completedNodes,
        inProgressNodes,
        totalPoints,
        earnedPoints,
        progress: Math.round((completedNodes / module.nodes.length) * 100),
      };
    });
  }, []);

  // Mock timeline events (in a real app, this would come from a database)
  const timelineEvents: TimelineEvent[] = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Add completed nodes
    mockRoadmapData.forEach(module => {
      module.nodes.forEach(node => {
        if (mockUserProgress.completedNodes.includes(node.id)) {
          events.push({
            id: node.id,
            title: `${module.title} - ${node.title}`,
            type: 'completed',
            points: node.points || 0,
            date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            moduleColor: module.color || colors.primary,
            icon: getIconForNodeType(node.title),
          });
        } else if (node.status === 'in_progress') {
          events.push({
            id: `${node.id}-started`,
            title: `${module.title} - ${node.title}`,
            type: 'started',
            points: 0,
            date: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            moduleColor: module.color || colors.primary,
            icon: getIconForNodeType(node.title),
          });
        }
      });
    });

    // Sort by date (most recent first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>Track your learning journey</Text>
        </View>

        {/* Overall Stats Cards */}
        <View style={styles.overallStatsContainer}>
          <View style={styles.largeStatCard}>
            <Text style={styles.largeStatValue}>{stats.completionPercentage}%</Text>
            <Text style={styles.largeStatLabel}>Overall Progress</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${stats.completionPercentage}%` }
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.accentYellow }]}>
            <Text style={styles.statValue}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[styles.statValue, { color: '#4CAF50' }]}>{stats.completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.statValue, { color: '#FF9800' }]}>{stats.inProgressCount}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F5F5F5' }]}>
            <Text style={[styles.statValue, { color: colors.graySoft }]}>{stats.lockedCount}</Text>
            <Text style={styles.statLabel}>Locked</Text>
          </View>
        </View>

        {/* Module Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Module Statistics</Text>
          {moduleStats.map(module => (
            <View key={module.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <View style={styles.moduleTitleContainer}>
                  <View style={[styles.moduleColorIndicator, { backgroundColor: module.color }]} />
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                </View>
                <Text style={styles.moduleProgress}>{module.progress}%</Text>
              </View>

              <View style={styles.moduleStatsRow}>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatValue}>{module.completedNodes}/{module.totalNodes}</Text>
                  <Text style={styles.moduleStatLabel}>Nodes</Text>
                </View>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatValue}>{module.earnedPoints}/{module.totalPoints}</Text>
                  <Text style={styles.moduleStatLabel}>Points</Text>
                </View>
                <View style={styles.moduleStatItem}>
                  <Text style={styles.moduleStatValue}>{module.inProgressNodes}</Text>
                  <Text style={styles.moduleStatLabel}>Active</Text>
                </View>
              </View>

              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${module.progress}%`, backgroundColor: module.color }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Activity Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Timeline</Text>
          <View style={styles.timeline}>
            {timelineEvents.map((event, index) => (
              <View key={event.id} style={styles.timelineItem}>
                <View style={styles.timelineIconContainer}>
                  <View style={[styles.timelineIcon, { backgroundColor: event.moduleColor }]}>
                    <Text style={styles.timelineEmoji}>{event.icon}</Text>
                  </View>
                  {index < timelineEvents.length - 1 && <View style={styles.timelineLine} />}
                </View>

                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>{event.title}</Text>
                    <Text style={styles.timelineDate}>{event.date}</Text>
                  </View>
                  <View style={styles.timelineDetails}>
                    <View style={[
                      styles.timelineStatus,
                      event.type === 'completed'
                        ? styles.timelineStatusCompleted
                        : styles.timelineStatusStarted
                    ]}>
                      <Text style={[
                        styles.timelineStatusText,
                        event.type === 'completed'
                          ? styles.timelineStatusTextCompleted
                          : styles.timelineStatusTextStarted
                      ]}>
                        {event.type === 'completed' ? 'Completed' : 'Started'}
                      </Text>
                    </View>
                    {event.type === 'completed' && event.points > 0 && (
                      <View style={styles.timelinePoints}>
                        <Text style={styles.timelinePointsText}>+{event.points} XP</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep up the great work!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getIconForNodeType(title: string): string {
  if (title.includes('Contenido')) return '📚';
  if (title.includes('Ejercicios')) return '💪';
  if (title.includes('Minijuegos')) return '🎮';
  if (title.includes('Productos')) return '💳';
  return '✨';
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.title,
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.graySoft,
  },
  overallStatsContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  largeStatCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radii.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  largeStatValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  largeStatLabel: {
    ...typography.body,
    color: colors.white,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: radii.full,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  statLabel: {
    ...typography.body,
    fontSize: 12,
    color: colors.graySoft,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    fontSize: 20,
    marginBottom: spacing.md,
  },
  moduleCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  moduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: radii.xs,
    marginRight: spacing.sm,
  },
  moduleTitle: {
    ...typography.subtitle,
    fontSize: 16,
  },
  moduleProgress: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
  },
  moduleStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  moduleStatItem: {
    alignItems: 'center',
  },
  moduleStatValue: {
    ...typography.body,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: spacing.xs / 2,
  },
  moduleStatLabel: {
    ...typography.body,
    fontSize: 11,
    color: colors.graySoft,
  },
  timeline: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineEmoji: {
    fontSize: 20,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.graySoft,
    opacity: 0.3,
    marginTop: spacing.xs,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    marginBottom: spacing.xs,
  },
  timelineTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  timelineDate: {
    ...typography.body,
    fontSize: 11,
    color: colors.graySoft,
  },
  timelineDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  timelineStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.sm,
  },
  timelineStatusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  timelineStatusStarted: {
    backgroundColor: '#FFF3E0',
  },
  timelineStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timelineStatusTextCompleted: {
    color: '#4CAF50',
  },
  timelineStatusTextStarted: {
    color: '#FF9800',
  },
  timelinePoints: {
    backgroundColor: colors.accentYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.sm,
  },
  timelinePointsText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text,
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    ...typography.body,
    color: colors.graySoft,
  },
});
