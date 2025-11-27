import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';
import { useUserProgress } from '../context/UserProgressContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const StreakScreen: React.FC = () => {
  const { streak, bantrabLevel, totalPoints, transactions } = useUserProgress();

  const renderWeeklyCalendar = () => {
    const today = new Date().getDay();

    return (
      <View style={styles.weekContainer}>
        {DAYS_OF_WEEK.map((day, index) => {
          const isActive = streak.weeklyActiveDays.includes(index);
          const isToday = index === today;

          return (
            <View key={day} style={styles.dayColumn}>
              <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>{day}</Text>
              <View
                style={[
                  styles.dayCircle,
                  isActive && styles.dayCircleActive,
                  isToday && styles.dayCircleToday,
                ]}
              >
                {isActive && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderLevelProgress = () => {
    const levelColors: { [key: string]: string } = {
      'Bronce': '#CD7F32',
      'Plata': '#C0C0C0',
      'Oro': '#FFD700',
      'Platinum': '#E5E4E2',
      'Infinite': '#1a1a1a',
    };

    return (
      <View style={styles.levelContainer}>
        <View style={styles.levelHeader}>
          <View style={[styles.levelBadge, { backgroundColor: levelColors[bantrabLevel.name] || colors.primary }]}>
            <Text style={styles.levelNumber}>{bantrabLevel.level}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>Nivel {bantrabLevel.name}</Text>
            <Text style={styles.levelSubtext}>Sigue usando tu tarjeta y aprendiendo</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View
              style={[
                styles.progressBarFill,
                { width: `${bantrabLevel.progress}%`, backgroundColor: levelColors[bantrabLevel.name] || colors.primary },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{bantrabLevel.progress}% hacia el siguiente nivel</Text>
        </View>
      </View>
    );
  };

  const renderStats = () => (
    <View style={styles.statsGrid}>
      <Animated.View style={styles.statCard} entering={FadeInUp.delay(100)}>
        <Text style={styles.statEmoji}>🔥</Text>
        <Text style={styles.statValue}>{streak.currentStreak}</Text>
        <Text style={styles.statLabel}>Racha actual</Text>
      </Animated.View>

      <Animated.View style={styles.statCard} entering={FadeInUp.delay(200)}>
        <Text style={styles.statEmoji}>🏆</Text>
        <Text style={styles.statValue}>{streak.longestStreak}</Text>
        <Text style={styles.statLabel}>Mejor racha</Text>
      </Animated.View>

      <Animated.View style={styles.statCard} entering={FadeInUp.delay(300)}>
        <Text style={styles.statEmoji}>⭐</Text>
        <Text style={styles.statValue}>{totalPoints}</Text>
        <Text style={styles.statLabel}>XP Total</Text>
      </Animated.View>

      <Animated.View style={styles.statCard} entering={FadeInUp.delay(400)}>
        <Text style={styles.statEmoji}>💳</Text>
        <Text style={styles.statValue}>{transactions.totalTransactions}</Text>
        <Text style={styles.statLabel}>Transacciones</Text>
      </Animated.View>
    </View>
  );

  const renderActivityTips = () => (
    <View style={styles.tipsContainer}>
      <Text style={styles.tipsTitle}>¿Cómo mantener tu racha?</Text>
      <View style={styles.tipRow}>
        <Text style={styles.tipEmoji}>📚</Text>
        <Text style={styles.tipText}>Completa una lección 1-2 veces por semana</Text>
      </View>
      <View style={styles.tipRow}>
        <Text style={styles.tipEmoji}>💳</Text>
        <Text style={styles.tipText}>Usa tu tarjeta Bantrab para compras del día a día</Text>
      </View>
      <View style={styles.tipRow}>
        <Text style={styles.tipEmoji}>🎮</Text>
        <Text style={styles.tipText}>Juega minijuegos para ganar puntos extra</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100)}>
          <Text style={styles.title}>Tu Actividad</Text>
          <Text style={styles.subtitle}>Mantén tu racha y sube de nivel</Text>
        </Animated.View>

        {/* Weekly Calendar */}
        <Animated.View style={styles.section} entering={FadeInDown.delay(200)}>
          <Text style={styles.sectionTitle}>Esta Semana</Text>
          {renderWeeklyCalendar()}
        </Animated.View>

        {/* Bantrab Level */}
        <Animated.View style={styles.section} entering={FadeInDown.delay(300)}>
          <Text style={styles.sectionTitle}>Nivel Bantrab</Text>
          {renderLevelProgress()}
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View style={styles.section} entering={FadeInDown.delay(400)}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          {renderStats()}
        </Animated.View>

        {/* Activity Tips */}
        <Animated.View style={[styles.section, { marginBottom: spacing.xl * 2 }]} entering={FadeInDown.delay(500)}>
          {renderActivityTips()}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.graySoft,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  // Weekly Calendar
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: colors.graySoft,
    marginBottom: spacing.sm,
  },
  dayLabelToday: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.graySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayCircleToday: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  checkmark: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Level Progress
  levelContainer: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  levelSubtext: {
    fontSize: 13,
    color: colors.graySoft,
    marginTop: 2,
  },
  progressBarContainer: {
    marginTop: spacing.sm,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: colors.background,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    color: colors.graySoft,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (SCREEN_WIDTH - spacing.md * 3) / 2,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.graySoft,
    marginTop: 2,
  },
  // Tips
  tipsContainer: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tipEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.graySoft,
    lineHeight: 20,
  },
});

export default StreakScreen;
