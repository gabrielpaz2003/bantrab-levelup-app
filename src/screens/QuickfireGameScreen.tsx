
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { colors, spacing, typography } from '@/constants/theme';
import { mockCheckingAccountGameData } from '@/src/data/mockCheckingAccountGameData';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.4;

const QuickfireGameScreen = () => {
  const [questions] = useState(mockCheckingAccountGameData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const router = useRouter();

  const translateX = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(translateX.value, [-screenWidth / 2, screenWidth / 2], [-15, 15], Extrapolate.CLAMP);
    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotation}deg` }],
    };
  });


  const nextCard = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
    translateX.value = 0;
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    const question = questions[currentQuestionIndex];
    if (question.correctAnswer === answer) {
      setScore(prev => prev + 10);
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setIsGameOver(true);
        }
        return newLives;
      });
    }
    nextCard();
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(screenWidth, {}, () => runOnJS(handleAnswer)('yes'));
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-screenWidth, {}, () => runOnJS(handleAnswer)('no'));
      } else {
        translateX.value = withSpring(0);
      }
    });

  const handleGoBack = () => {
    setIsGameOver(false);
    router.back();
  };
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.livesText}>Lives: {'❤️'.repeat(lives)}</Text>
      </View>
      <View style={styles.gameArea}>
        {currentQuestion && (
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.card, cardStyle]}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </Animated.View>
          </GestureDetector>
        )}
      </View>
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>Swipe Left for No</Text>
        <Text style={styles.instructionText}>Swipe Right for Yes</Text>
      </View>
      <Modal visible={isGameOver} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.finalScoreText}>Your score: {score}</Text>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingTop: spacing.xl,
    backgroundColor: colors.primary,
  },
  scoreText: {
    ...typography.subtitle,
    color: colors.white,
  },
  livesText: {
    ...typography.subtitle,
    color: colors.white,
    fontSize: 24,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: screenWidth * 0.8,
    height: screenWidth * 1.2,
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  questionText: {
    ...typography.title,
    textAlign: 'center',
  },
  instructions: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  instructionText: {
    ...typography.body,
    color: colors.graySoft,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
    width: '80%',
  },
  gameOverText: {
    ...typography.title,
    color: colors.accentMagenta,
    marginBottom: spacing.md,
  },
  finalScoreText: {
    ...typography.subtitle,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.white,
  },
});

export default QuickfireGameScreen;