import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import { ArrowLeftIcon, ArrowRightIcon } from '@/src/assets/icons';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.2;

const Swipe = ({ exercise, onComplete }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const translateX = useSharedValue(0);

  const handleAnswer = (answer) => {
    const correct = answer === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(screenWidth, {}, () => runOnJS(handleAnswer)(exercise.options[1]));
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-screenWidth, {}, () => runOnJS(handleAnswer)(exercise.options[0]));
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(translateX.value, [-screenWidth / 2, screenWidth / 2], [-15, 15], Extrapolate.CLAMP);
    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotation}deg` }],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{exercise.title}</ThemedText>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Text style={styles.cardText}>{exercise.statement}</Text>
        </Animated.View>
      </GestureDetector>

      <View style={styles.instructions}>
        <ArrowLeftIcon size={32} color={colors.text} />
        <Text style={styles.instructionText}>Simple</Text>
        <Text style={styles.instructionText}>Compuesto</Text>
        <ArrowRightIcon size={32} color={colors.text} />
      </View>

      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <ThemedText style={styles.feedbackText}>
            {isCorrect ? exercise.feedback.correct : exercise.feedback.incorrect}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  card: {
    width: screenWidth * 0.8,
    height: screenWidth * 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 120,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
});

export default Swipe;
