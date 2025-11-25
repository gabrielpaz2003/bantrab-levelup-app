import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Slider from '@react-native-community/slider';
import { colors } from '@/constants/theme';

const GuesstimateSlider = ({ exercise, onComplete }) => {
  const [guess, setGuess] = useState(exercise.initialValue);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleGuess = () => {
    setShowFeedback(true);
    setTimeout(() => {
      onComplete();
    }, 4000);
  };

  const difference = Math.abs(guess - exercise.correctValue);
  const isCorrect = difference < (exercise.correctValue * 0.1); // Within 10%

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{exercise.title}</ThemedText>
      <ThemedText style={styles.statement}>{exercise.statement}</ThemedText>
      <View style={styles.sliderContainer}>
        <ThemedText style={styles.sliderLabel}>Your Guess: Q{guess.toFixed(2)}</ThemedText>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={exercise.min}
          maximumValue={exercise.max}
          value={guess}
          onValueChange={setGuess}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.graySoft}
          thumbTintColor={colors.primary}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuess} disabled={showFeedback}>
        <Text style={styles.buttonText}>Guess</Text>
      </TouchableOpacity>
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <ThemedText style={styles.feedbackText}>
            {isCorrect ? exercise.feedback.correct : exercise.feedback.incorrect}
          </ThemedText>
          <ThemedText style={styles.correctValueText}>
            The real cost is around Q{exercise.correctValue.toFixed(2)}
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
    backgroundColor: colors.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  statement: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 18,
    color: colors.text,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 30,
  },
  sliderLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
  correctValueText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.primary,
  },
});

export default GuesstimateSlider;
