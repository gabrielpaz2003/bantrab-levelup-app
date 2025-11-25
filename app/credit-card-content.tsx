import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors, spacing } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StarIcon } from '@/src/assets/icons';

import {
  ContentChatScreen,
  ContentCarouselScreen,
  ContentTimelineScreen,
  ContentToggleScreen,
  ContentComparisonScreen,
  ContentTipsScreen,
} from '@/src/components/content';

import { creditCardModuleContent } from '@/src/data/mockCreditCardModuleContent';

const TOTAL_SCREENS = 6;

const CreditCardContentScreen = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);
  const [score, setScore] = useState(0);

  const handleContinue = () => {
    setScore((prev) => prev + 15);

    if (currentScreen < TOTAL_SCREENS) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Module completed - navigate to game over or back to roadmap
      router.replace({
        pathname: '/game-over',
        params: { score: (score + 15).toString() },
      });
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <ContentChatScreen
            title={creditCardModuleContent.screen1.title}
            messages={creditCardModuleContent.screen1.messages}
            keyPoint={creditCardModuleContent.screen1.keyPoint}
            buttonText={creditCardModuleContent.screen1.buttonText}
            interaction={creditCardModuleContent.screen1.interaction}
            onContinue={handleContinue}
          />
        );

      case 2:
        return (
          <ContentCarouselScreen
            title={creditCardModuleContent.screen2.title}
            illustration={creditCardModuleContent.screen2.illustration}
            cards={creditCardModuleContent.screen2.cards}
            keyPoint={creditCardModuleContent.screen2.keyPoint}
            buttonText={creditCardModuleContent.screen2.buttonText}
            onContinue={handleContinue}
          />
        );

      case 3:
        return (
          <ContentTimelineScreen
            title={creditCardModuleContent.screen3.title}
            timelinePoints={creditCardModuleContent.screen3.timelinePoints}
            example={creditCardModuleContent.screen3.example}
            buttonText={creditCardModuleContent.screen3.buttonText}
            onContinue={handleContinue}
          />
        );

      case 4:
        return (
          <ContentToggleScreen
            title={creditCardModuleContent.screen4.title}
            description={creditCardModuleContent.screen4.description}
            options={creditCardModuleContent.screen4.options}
            buttonText={creditCardModuleContent.screen4.buttonText}
            onContinue={handleContinue}
          />
        );

      case 5:
        return (
          <ContentComparisonScreen
            title={creditCardModuleContent.screen5.title}
            items={creditCardModuleContent.screen5.items}
            sliderConfig={creditCardModuleContent.screen5.sliderConfig}
            buttonText={creditCardModuleContent.screen5.buttonText}
            onContinue={handleContinue}
          />
        );

      case 6:
        return (
          <ContentTipsScreen
            title={creditCardModuleContent.screen6.title}
            warningCards={creditCardModuleContent.screen6.warningCards}
            tipCards={creditCardModuleContent.screen6.tipCards}
            buttonText={creditCardModuleContent.screen6.buttonText}
            onContinue={handleContinue}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <StarIcon size={24} color={colors.accentYellow} fill={colors.accentYellow} />
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: TOTAL_SCREENS }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index < currentScreen && styles.progressDotCompleted,
                index === currentScreen - 1 && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="xmark.circle.fill" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Animated.View
        style={styles.contentContainer}
        key={currentScreen}
        entering={FadeIn}
        exiting={FadeOut}
      >
        {renderCurrentScreen()}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressDotCompleted: {
    backgroundColor: colors.white,
  },
  progressDotActive: {
    width: 20,
    backgroundColor: colors.accentYellow,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});

export default CreditCardContentScreen;
