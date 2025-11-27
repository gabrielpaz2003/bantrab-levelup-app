import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeInRight } from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.75;

interface TipCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  result?: string;
  type: 'warning' | 'tip';
}

interface ContentTipsScreenProps {
  title: string;
  warningCards: TipCard[];
  tipCards: TipCard[];
  buttonText?: string;
  onContinue: () => void;
}

const ContentTipsScreen: React.FC<ContentTipsScreenProps> = ({
  title,
  warningCards,
  tipCards,
  buttonText = 'Listo, ya entiendo los basicos',
  onContinue,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const renderCard = (card: TipCard, index: number) => {
    const isWarning = card.type === 'warning';
    const isExpanded = expandedCard === card.id;

    return (
      <Animated.View
        key={card.id}
        entering={FadeInRight.delay(300 + index * 100)}
      >
        <TouchableOpacity
          style={[
            styles.card,
            isWarning ? styles.warningCard : styles.tipCard,
            isExpanded && styles.cardExpanded,
          ]}
          onPress={() => toggleCard(card.id)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text
              style={[
                styles.cardTitle,
                isWarning ? styles.warningTitle : styles.tipTitle,
              ]}
              numberOfLines={isExpanded ? undefined : 2}
            >
              {card.title}
            </Text>
          </View>

          {isExpanded && (
            <Animated.View entering={FadeIn}>
              <Text style={styles.cardDescription}>{card.description}</Text>
              {card.result && (
                <View
                  style={[
                    styles.resultBadge,
                    isWarning ? styles.warningBadge : styles.tipBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.resultText,
                      isWarning ? styles.warningResultText : styles.tipResultText,
                    ]}
                  >
                    {card.result}
                  </Text>
                </View>
              )}
            </Animated.View>
          )}

          <Text style={styles.tapHint}>
            {isExpanded ? 'Toca para cerrar' : 'Toca para ver mas'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>

      {warningCards.length > 0 && (
        <Animated.View style={styles.section} entering={FadeInUp.delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⚠️</Text>
            <Text style={styles.sectionTitle}>Errores comunes</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {warningCards.map((card, index) => renderCard(card, index))}
          </ScrollView>
        </Animated.View>
      )}

      <Animated.View style={styles.section} entering={FadeInUp.delay(500)}>
        {warningCards.length > 0 && (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>✅</Text>
            <Text style={styles.sectionTitle}>Buenas practicas</Text>
          </View>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}
        >
          {tipCards.map((card, index) => renderCard(card, index + warningCards.length))}
        </ScrollView>
      </Animated.View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  cardsRow: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  card: {
    width: CARD_WIDTH,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 2,
    minHeight: 120,
  },
  warningCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FFD0D0',
  },
  tipCard: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  cardExpanded: {
    minHeight: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardIcon: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  warningTitle: {
    color: '#C53030',
  },
  tipTitle: {
    color: '#276749',
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginTop: spacing.sm,
    marginLeft: 36,
  },
  resultBadge: {
    marginTop: spacing.sm,
    marginLeft: 36,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  warningBadge: {
    backgroundColor: '#FED7D7',
  },
  tipBadge: {
    backgroundColor: '#C6F6D5',
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  warningResultText: {
    color: '#C53030',
  },
  tipResultText: {
    color: '#276749',
  },
  tapHint: {
    fontSize: 11,
    color: colors.graySoft,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  bottomSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContentTipsScreen;
