import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { colors, radii, spacing } from '@/constants/theme';
import { StarIcon } from '@/src/assets/icons';

const GameOverScreen = () => {
  const { score } = useLocalSearchParams<{ score: string }>();
  const router = useRouter();

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
    color: colors.text,
    marginBottom: spacing.lg - 4,
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 64,
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
