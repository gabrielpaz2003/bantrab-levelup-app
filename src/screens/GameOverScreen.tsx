import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { colors, radii, spacing } from '@/constants/theme';
import { StarIcon } from '@/src/assets/icons';
import { useUserProgress } from '@/src/context/UserProgressContext';

const GameOverScreen = () => {
  const { score, nodeId } = useLocalSearchParams<{ score: string; nodeId: string }>();
  const router = useRouter();
  const { addPoints, markNodeCompleted, recordActivity } = useUserProgress();

  useEffect(() => {
    // Add points, mark node as completed, and record activity for streak
    if (score) {
      addPoints(parseInt(score, 10));
    }
    if (nodeId) {
      markNodeCompleted(nodeId);
    }
    recordActivity();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>¡Juego Terminado!</ThemedText>
        <View style={styles.scoreContainer}>
          <ThemedText style={styles.scoreLabel}>Ganaste</ThemedText>
          <View style={styles.score}>
            <StarIcon size={64} color={colors.accentYellow} fill={colors.accentYellow} />
            <ThemedText style={styles.scoreText}>+{score}</ThemedText>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ThemedView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xl + 8,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl + 28,
  },
  scoreLabel: {
    fontSize: 24,
    color: colors.white,
    marginBottom: spacing.lg - 4,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 64,
    lineHeight: 80,
    fontWeight: 'bold',
    color: colors.accentYellow,
    marginLeft: spacing.lg - 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md - 1,
    paddingHorizontal: spacing.xl + 8,
    borderRadius: radii.full,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;
