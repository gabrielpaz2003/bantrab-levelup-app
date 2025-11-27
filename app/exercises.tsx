import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { mockCreditExercises } from '../src/data/mockCreditExercises';
import MultipleChoice from '../src/components/exercises/MultipleChoice';
import Swipe from '../src/components/exercises/Swipe';
import GuesstimateSlider from '../src/components/exercises/GuesstimateSlider';
import OrderDrag from '../src/components/exercises/OrderDrag';
import BankMapGame from '../src/components/exercises/BankMapGame';
import { ThemedText } from '@/components/themed-text';
import { colors } from '@/constants/theme';
import { StarIcon } from '@/src/assets/icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IconSymbol } from '@/components/ui/icon-symbol';

const NODE_POINTS = 85; // Points assigned in roadmap for "Ejercicios" node
const NODE_ID = 'cc-node-2'; // Node ID from roadmap

const ExerciseScreen = () => {
  const router = useRouter();
  const [sequence, setSequence] = useState(mockCreditExercises);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = () => {
    if (currentIndex < sequence.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace({
        pathname: '/game-over',
        params: { score: NODE_POINTS.toString(), nodeId: NODE_ID },
      });
    }
  };

  const renderExercise = () => {
    const exercise = sequence[currentIndex];
    switch (exercise.type) {
      case 'multiple-choice':
        return <MultipleChoice exercise={exercise} onComplete={handleComplete} />;
      case 'binary-swipe':
        return <Swipe exercise={exercise} onComplete={handleComplete} />;
      case 'guesstimate-slider':
        return <GuesstimateSlider exercise={exercise} onComplete={handleComplete} />;
      case 'order-drag':
        return <OrderDrag exercise={exercise} onComplete={handleComplete} />;
      case 'bank-map':
        return <BankMapGame exercise={exercise} onComplete={handleComplete} />;
      default:
        return <ThemedText>Unknown exercise type</ThemedText>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <StarIcon size={24} color={colors.accentYellow} fill={colors.accentYellow} />
          <ThemedText style={styles.scoreText}>+{NODE_POINTS} XP</ThemedText>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="xmark.circle.fill" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Animated.View style={styles.exerciseContainer} key={currentIndex} entering={FadeIn} exiting={FadeOut}>
        {renderExercise()}
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
  exerciseContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ExerciseScreen;
