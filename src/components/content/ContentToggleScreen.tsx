import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeInUp, Layout } from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';

interface ToggleOption {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  result?: string;
}

interface ContentToggleScreenProps {
  title: string;
  subtitle?: string;
  description?: string;
  options: ToggleOption[];
  buttonText?: string;
  onContinue: () => void;
}

const ContentToggleScreen: React.FC<ContentToggleScreenProps> = ({
  title,
  subtitle,
  description,
  options,
  buttonText = 'Continuar',
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const selectedData = options.find((opt) => opt.id === selectedOption);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Animated.View>

      {description && (
        <Animated.View style={styles.descriptionContainer} entering={FadeIn.delay(300)}>
          <Text style={styles.descriptionText}>{description}</Text>
        </Animated.View>
      )}

      <Animated.View style={styles.toggleContainer} entering={FadeInUp.delay(400)}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.toggleButton,
              selectedOption === option.id && styles.toggleButtonActive,
              selectedOption === option.id && {
                borderColor: option.iconColor,
                backgroundColor: `${option.iconColor}15`,
              },
            ]}
            onPress={() => setSelectedOption(option.id)}
          >
            <Text style={styles.toggleIcon}>{option.icon}</Text>
            <Text
              style={[
                styles.toggleLabel,
                selectedOption === option.id && { color: option.iconColor },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {selectedData && (
        <Animated.View
          style={[
            styles.resultCard,
            { borderLeftColor: selectedData.iconColor },
          ]}
          entering={FadeInUp}
          layout={Layout.springify()}
        >
          <View style={styles.resultHeader}>
            <Text style={styles.resultIcon}>{selectedData.icon}</Text>
            <Text style={styles.resultTitle}>{selectedData.title}</Text>
          </View>
          <Text style={styles.resultDescription}>{selectedData.description}</Text>
          {selectedData.result && (
            <View
              style={[
                styles.resultBadge,
                { backgroundColor: `${selectedData.iconColor}20` },
              ]}
            >
              <Text style={[styles.resultBadgeText, { color: selectedData.iconColor }]}>
                {selectedData.result}
              </Text>
            </View>
          )}
        </Animated.View>
      )}

      {!selectedData && (
        <Animated.View style={styles.hintContainer} entering={FadeIn.delay(600)}>
          <Text style={styles.hintText}>
            Toca una opcion para ver que pasa
          </Text>
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
  },
  subtitle: {
    fontSize: 15,
    color: colors.graySoft,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    marginTop: spacing.md,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  toggleButtonActive: {
    borderWidth: 2,
  },
  toggleIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  resultDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  resultBadge: {
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  resultBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  hintContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    color: colors.graySoft,
    fontStyle: 'italic',
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

export default ContentToggleScreen;
