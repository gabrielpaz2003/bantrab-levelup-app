import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 60;

interface CarouselCard {
  id: string;
  title?: string;
  content: string;
  icon?: string;
}

interface ContentCarouselScreenProps {
  title: string;
  subtitle?: string;
  illustration?: string;
  cards: CarouselCard[];
  keyPoint: string;
  buttonText?: string;
  onContinue: () => void;
}

const ContentCarouselScreen: React.FC<ContentCarouselScreenProps> = ({
  title,
  subtitle,
  illustration,
  cards,
  keyPoint,
  buttonText = 'Ok, ya entendí',
  onContinue,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / CARD_WIDTH);
    setActiveIndex(index);
  };

  const isLastCard = activeIndex === cards.length - 1;

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Animated.View>

      {illustration && (
        <Animated.View style={styles.illustrationContainer} entering={FadeIn.delay(300)}>
          <Text style={styles.illustration}>{illustration}</Text>
        </Animated.View>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContent}
        snapToInterval={CARD_WIDTH + spacing.md}
        decelerationRate="fast"
      >
        {cards.map((card, index) => (
          <Animated.View
            key={card.id}
            style={styles.card}
            entering={FadeInRight.delay(400 + index * 100)}
          >
            {card.icon && <Text style={styles.cardIcon}>{card.icon}</Text>}
            {card.title && <Text style={styles.cardTitle}>{card.title}</Text>}
            <Text style={styles.cardContent}>{card.content}</Text>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.keyPointContainer}>
          <Text style={styles.keyPointText}>{keyPoint}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !isLastCard && styles.continueButtonSecondary,
          ]}
          onPress={isLastCard ? onContinue : () => {
            scrollRef.current?.scrollTo({
              x: (activeIndex + 1) * (CARD_WIDTH + spacing.md),
              animated: true,
            });
          }}
        >
          <Text
            style={[
              styles.continueButtonText,
              !isLastCard && styles.continueButtonTextSecondary,
            ]}
          >
            {isLastCard ? buttonText : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  subtitle: {
    fontSize: 15,
    color: colors.graySoft,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  illustration: {
    fontSize: 48,
  },
  carouselContent: {
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    minHeight: 150,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardContent: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  bottomSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  keyPointContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: spacing.md,
  },
  keyPointText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  continueButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextSecondary: {
    color: colors.primary,
  },
});

export default ContentCarouselScreen;
