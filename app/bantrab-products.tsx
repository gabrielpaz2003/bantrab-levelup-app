import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { colors, spacing } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StarIcon } from '@/src/assets/icons';

import {
  ContentCarouselScreen,
  ContentToggleScreen,
  ContentComparisonScreen,
  ContentTipsScreen,
} from '@/src/components/content';

import { bantrabProductsContent } from '@/src/data/mockBantrabProductsContent';

const TOTAL_SCREENS = 5;
const NODE_POINTS = 100; // Points assigned in roadmap for "Productos Bantrab" node
const NODE_ID = 'cc-node-4'; // Node ID from roadmap

const BantrabProductsScreen = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(1);

  const handleContinue = () => {
    if (currentScreen < TOTAL_SCREENS) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.replace({
        pathname: '/game-over',
        params: { score: NODE_POINTS.toString(), nodeId: NODE_ID },
      });
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <ContentCarouselScreen
            title={bantrabProductsContent.screen1.title}
            illustration={bantrabProductsContent.screen1.illustration}
            cards={bantrabProductsContent.screen1.cards}
            keyPoint={bantrabProductsContent.screen1.keyPoint}
            buttonText={bantrabProductsContent.screen1.buttonText}
            onContinue={handleContinue}
          />
        );

      case 2:
        return (
          <ContentComparisonScreen
            title={bantrabProductsContent.screen2.title}
            items={bantrabProductsContent.screen2.items}
            sliderConfig={bantrabProductsContent.screen2.sliderConfig}
            buttonText={bantrabProductsContent.screen2.buttonText}
            onContinue={handleContinue}
          />
        );

      case 3:
        return (
          <ContentToggleScreen
            title={bantrabProductsContent.screen3.title}
            description={bantrabProductsContent.screen3.description}
            options={bantrabProductsContent.screen3.options}
            buttonText={bantrabProductsContent.screen3.buttonText}
            onContinue={handleContinue}
          />
        );

      case 4:
        return (
          <ContentTipsScreen
            title={bantrabProductsContent.screen4.title}
            warningCards={bantrabProductsContent.screen4.warningCards}
            tipCards={bantrabProductsContent.screen4.tipCards}
            buttonText={bantrabProductsContent.screen4.buttonText}
            onContinue={handleContinue}
          />
        );

      case 5:
        return (
          <ContentCarouselScreen
            title={bantrabProductsContent.screen5.title}
            illustration={bantrabProductsContent.screen5.illustration}
            cards={bantrabProductsContent.screen5.cards}
            keyPoint={bantrabProductsContent.screen5.keyPoint}
            buttonText={bantrabProductsContent.screen5.buttonText}
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
          <Text style={styles.scoreText}>+{NODE_POINTS} XP</Text>
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

export default BantrabProductsScreen;
