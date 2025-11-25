import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { colors, spacing, radii } from '@/constants/theme';

interface ComparisonItem {
  id: string;
  label: string;
  description: string;
  barColor: string;
  barPercentage: number;
  resultText: string;
}

interface SliderResult {
  months: number;
  interestLevel: 'low' | 'medium' | 'high';
}

interface ContentComparisonScreenProps {
  title: string;
  items: ComparisonItem[];
  sliderConfig?: {
    leftLabel: string;
    rightLabel: string;
    calculateResult: (value: number) => SliderResult;
  };
  buttonText?: string;
  onContinue: () => void;
}

const ContentComparisonScreen: React.FC<ContentComparisonScreenProps> = ({
  title,
  items,
  sliderConfig,
  buttonText = 'Continuar',
  onContinue,
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const sliderResult = sliderConfig?.calculateResult(sliderValue);

  const getInterestIcon = (level: string) => {
    switch (level) {
      case 'low':
        return '😊';
      case 'medium':
        return '😐';
      case 'high':
        return '😰';
      default:
        return '💰';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>

      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            style={styles.itemCard}
            entering={FadeInUp.delay(300 + index * 100)}
          >
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            <View style={styles.barContainer}>
              <View style={styles.barBackground}>
                <Animated.View
                  style={[
                    styles.barFill,
                    {
                      width: `${item.barPercentage}%`,
                      backgroundColor: item.barColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barLabel}>{item.resultText}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {sliderConfig && (
        <Animated.View style={styles.sliderSection} entering={FadeInUp.delay(500)}>
          <Text style={styles.sliderTitle}>Desliza para ver el impacto:</Text>

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{sliderConfig.leftLabel}</Text>
            <Text style={styles.sliderLabel}>{sliderConfig.rightLabel}</Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={colors.primary}
          />

          {sliderResult && (
            <View style={styles.resultContainer}>
              <View style={styles.resultRow}>
                <Text style={styles.resultEmoji}>
                  {getInterestIcon(sliderResult.interestLevel)}
                </Text>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultLabel}>
                    Meses estimados para salir de la deuda:
                  </Text>
                  <Text style={styles.resultValue}>
                    {sliderResult.months === 1
                      ? '1 mes'
                      : sliderResult.months === 999
                      ? 'Muuucho tiempo...'
                      : `~${sliderResult.months} meses`}
                  </Text>
                </View>
              </View>
              <View style={styles.interestIndicator}>
                <Text style={styles.interestLabel}>Intereses:</Text>
                <View style={styles.interestBars}>
                  {[1, 2, 3].map((bar) => (
                    <View
                      key={bar}
                      style={[
                        styles.interestBar,
                        {
                          backgroundColor:
                            (sliderResult.interestLevel === 'low' && bar === 1) ||
                            (sliderResult.interestLevel === 'medium' && bar <= 2) ||
                            sliderResult.interestLevel === 'high'
                              ? bar === 1
                                ? '#4CAF50'
                                : bar === 2
                                ? colors.accentYellow
                                : colors.accentMagenta
                              : '#E0E0E0',
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      )}

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
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  itemsContainer: {
    gap: spacing.md,
  },
  itemCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.graySoft,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  barContainer: {
    marginTop: spacing.xs,
  },
  barBackground: {
    height: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 12,
    color: colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  sliderSection: {
    marginTop: spacing.xl,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
  },
  sliderTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.graySoft,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: spacing.md,
  },
  resultContainer: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radii.sm,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultEmoji: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  resultInfo: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 13,
    color: colors.graySoft,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  interestIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  interestLabel: {
    fontSize: 13,
    color: colors.graySoft,
    marginRight: spacing.sm,
  },
  interestBars: {
    flexDirection: 'row',
    gap: 4,
  },
  interestBar: {
    width: 24,
    height: 16,
    borderRadius: 4,
  },
  bottomSection: {
    marginTop: spacing.xl,
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

export default ContentComparisonScreen;
