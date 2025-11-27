import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BankMapGame from '../components/exercises/BankMapGame';
import { mockBankMapExercises } from '../data/mockBankMapExercises';
import { ThemedText } from '@/components/themed-text';
import { colors } from '@/constants/theme';
import { StarIcon } from '@/src/assets/icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';

const NODE_POINTS = 90; // Points assigned in roadmap for "Minijuegos" node
const NODE_ID = 'cc-node-3'; // Node ID from roadmap

const BankMapScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = () => {
    if (currentIndex < mockBankMapExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace({
        pathname: '/game-over',
        params: { score: NODE_POINTS.toString(), nodeId: NODE_ID },
      });
    }
  };

  const currentExercise = mockBankMapExercises[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <StarIcon size={24} color={colors.accentYellow} fill={colors.accentYellow} />
          <ThemedText style={styles.scoreText}>+{NODE_POINTS} XP</ThemedText>
        </View>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            {currentIndex + 1} / {mockBankMapExercises.length}
          </ThemedText>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="xmark.circle.fill" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Animated.View style={styles.gameContainer} key={currentIndex} entering={FadeIn} exiting={FadeOut}>
        <BankMapGame exercise={currentExercise} onComplete={handleComplete} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  gameContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default BankMapScreen;
