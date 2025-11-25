import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';
import ChatBubble from './ChatBubble';

const { width: screenWidth } = Dimensions.get('window');

interface ChatMessage {
  id: string;
  message: string;
  sender: 'friend' | 'self' | 'other';
  senderName?: string;
}

interface ContentChatScreenProps {
  title?: string;
  messages: ChatMessage[];
  keyPoint: string;
  buttonText?: string;
  onContinue: () => void;
  interaction?: {
    type: 'binary' | 'none';
    label?: string;
    leftOption?: string;
    rightOption?: string;
    correctAnswer?: 'left' | 'right';
  };
}

const ContentChatScreen: React.FC<ContentChatScreenProps> = ({
  title,
  messages,
  keyPoint,
  buttonText = 'Entendido, sigamos',
  onContinue,
  interaction,
}) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'left' | 'right' | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const requiresInteraction = interaction?.type === 'binary';

  useEffect(() => {
    if (visibleMessages < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, messages.length]);

  const handleAnswerSelect = (answer: 'left' | 'right') => {
    setSelectedAnswer(answer);
    if (interaction?.correctAnswer === answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const canContinue = !requiresInteraction || isCorrect;
  const allMessagesVisible = visibleMessages >= messages.length;

  return (
    <View style={styles.container}>
      {title && (
        <Animated.View entering={FadeIn.delay(200)}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
      )}

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.slice(0, visibleMessages).map((msg, index) => (
          <Animated.View
            key={msg.id}
            entering={FadeInDown.delay(100).springify()}
          >
            <ChatBubble
              message={msg.message}
              sender={msg.sender}
              senderName={msg.senderName}
            />
          </Animated.View>
        ))}
      </ScrollView>

      {allMessagesVisible && (
        <Animated.View
          style={styles.bottomSection}
          entering={FadeInDown.delay(300)}
        >
          <View style={styles.keyPointContainer}>
            <Text style={styles.keyPointText}>{keyPoint}</Text>
          </View>

          {interaction?.type === 'binary' && (
            <View style={styles.interactionContainer}>
              <Text style={styles.interactionLabel}>{interaction.label}</Text>
              <View style={styles.binaryButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.binaryButton,
                    selectedAnswer === 'left' && styles.binaryButtonSelected,
                    selectedAnswer === 'left' && !isCorrect && styles.binaryButtonWrong,
                  ]}
                  onPress={() => handleAnswerSelect('left')}
                >
                  <Text
                    style={[
                      styles.binaryButtonText,
                      selectedAnswer === 'left' && styles.binaryButtonTextSelected,
                    ]}
                  >
                    {interaction.leftOption}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.binaryButton,
                    selectedAnswer === 'right' && styles.binaryButtonSelected,
                    selectedAnswer === 'right' && isCorrect && styles.binaryButtonCorrect,
                  ]}
                  onPress={() => handleAnswerSelect('right')}
                >
                  <Text
                    style={[
                      styles.binaryButtonText,
                      selectedAnswer === 'right' && styles.binaryButtonTextSelected,
                    ]}
                  >
                    {interaction.rightOption}
                  </Text>
                </TouchableOpacity>
              </View>
              {selectedAnswer && !isCorrect && (
                <Text style={styles.feedbackText}>Intenta de nuevo</Text>
              )}
              {isCorrect && (
                <Text style={styles.feedbackTextCorrect}>Correcto!</Text>
              )}
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.continueButton,
              !canContinue && styles.continueButtonDisabled,
            ]}
            onPress={onContinue}
            disabled={!canContinue}
          >
            <Text style={styles.continueButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  chatContainer: {
    flex: 1,
    marginBottom: spacing.md,
  },
  chatContent: {
    paddingVertical: spacing.sm,
  },
  bottomSection: {
    paddingBottom: spacing.lg,
  },
  keyPointContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  keyPointText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  interactionContainer: {
    marginBottom: spacing.md,
  },
  interactionLabel: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  binaryButtonsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  binaryButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  binaryButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  binaryButtonCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  binaryButtonWrong: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  binaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  binaryButtonTextSelected: {
    color: colors.primary,
  },
  feedbackText: {
    fontSize: 14,
    color: '#F44336',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  feedbackTextCorrect: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.graySoft,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContentChatScreen;
