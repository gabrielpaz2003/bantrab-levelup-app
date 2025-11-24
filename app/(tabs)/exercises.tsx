import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { mockExerciseData } from '../../src/data/mockExerciseData';
import { ExerciseModule, Question, Answer } from '../../src/types';

const ExerciseScreen = () => {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();
  const [exerciseModule, setExerciseModule] = useState<ExerciseModule | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const module = mockExerciseData.find((m) => m.moduleId === moduleId);
    setExerciseModule(module);
  }, [moduleId]);

  const handleAnswerPress = (answer: Answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQuestionIndex < (exerciseModule?.questions.length || 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        router.back();
      }
    }, 2000);
  };

  if (!exerciseModule || exerciseModule.questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No exercises found for this module.</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion: Question = exerciseModule.questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer?.text === answer.text &&
                (selectedAnswer.isCorrect ? styles.correctAnswer : styles.wrongAnswer),
            ]}
            onPress={() => handleAnswerPress(answer)}
            disabled={showFeedback}
          >
            <Text style={styles.answerText}>{answer.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <View
          style={[
            styles.feedbackContainer,
            selectedAnswer?.isCorrect ? styles.correctFeedback : styles.wrongFeedback,
          ]}
        >
          <Text style={styles.feedbackText}>
            {selectedAnswer?.isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  answersContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  answerButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  answerText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  correctAnswer: {
    backgroundColor: '#58CC02',
    borderColor: '#58CC02',
  },
  wrongAnswer: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  correctFeedback: {
    backgroundColor: '#58CC02',
  },
  wrongFeedback: {
    backgroundColor: '#FF6B6B',
  },
});

export default ExerciseScreen;
