import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { colors } from '@/constants/theme';

const MultipleChoice = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerPress = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const isCorrect = selectedAnswer === exercise.correctAnswerIndex;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{exercise.title}</ThemedText>
      <ThemedText style={styles.statement}>{exercise.statement}</ThemedText>
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
            ]}
            onPress={() => handleAnswerPress(index)}
            disabled={showFeedback}
          >
            <Text style={[styles.optionText, selectedAnswer === index && styles.selectedOptionText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <ThemedText style={styles.feedbackText}>
            {isCorrect
              ? exercise.feedback.correct
              : exercise.feedback.incorrect[selectedAnswer]}
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
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.graySoft,
  },
  optionText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.white,
  },
  correctAnswer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  wrongAnswer: {
    backgroundColor: colors.accentMagenta,
    borderColor: colors.accentMagenta,
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
});

export default MultipleChoice;
