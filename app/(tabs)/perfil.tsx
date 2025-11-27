import { colors, radii, spacing, typography } from '@/constants/theme';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'Diego',
    avatar: '👤',
    level: 20,
    totalPoints: 1250,
    tikets: 8,
    completedModules: 3,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.avatar}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.level}</Text>
            <Text style={styles.statLabel}>Nivel</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.totalPoints}</Text>
            <Text style={styles.statLabel}>Puntos XP</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.tikets}</Text>
            <Text style={styles.statLabel}>Cupones</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.completedModules}</Text>
            <Text style={styles.statLabel}>Módulos</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progreso Reciente</Text>
          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressEmoji}>💳</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>Tarjetas de Crédito</Text>
              <Text style={styles.progressDescription}>Completado hace 2 días</Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>+50 XP</Text>
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Text style={styles.progressEmoji}>💰</Text>
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressTitle}>Ahorro Inteligente</Text>
              <Text style={styles.progressDescription}>Completado hace 5 días</Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>+40 XP</Text>
            </View>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros Destacados</Text>
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementEmoji}>🏆</Text>
              <Text style={styles.achievementName}>Principiante</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementEmoji}>⭐</Text>
              <Text style={styles.achievementName}>Primera Racha</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementEmoji}>🎯</Text>
              <Text style={styles.achievementName}>Perfecto</Text>
            </View>
            <View style={[styles.achievementCard, styles.achievementLocked]}>
              <Text style={styles.achievementEmoji}>🔒</Text>
              <Text style={styles.achievementName}>Bloqueado</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
              Configuración
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    fontSize: 48,
  },
  name: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
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
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.body,
    color: colors.graySoft,
    fontSize: 12,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.md,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  progressEmoji: {
    fontSize: 24,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  progressDescription: {
    ...typography.body,
    fontSize: 12,
    color: colors.graySoft,
  },
  progressBadge: {
    backgroundColor: colors.accentYellow,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  progressBadgeText: {
    ...typography.body,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  achievementName: {
    ...typography.body,
    fontSize: 12,
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radii.full,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionButtonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.white,
    fontSize: 16,
  },
  actionButtonTextSecondary: {
    color: colors.primary,
  },
});
