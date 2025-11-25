import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import { colors, spacing, radii } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

interface TimelinePoint {
  id: string;
  label: string;
  icon: string;
  description: string;
  position: number; // 0-1
}

interface ContentTimelineScreenProps {
  title: string;
  subtitle?: string;
  timelinePoints: TimelinePoint[];
  example?: string;
  buttonText?: string;
  onContinue: () => void;
}

const ContentTimelineScreen: React.FC<ContentTimelineScreenProps> = ({
  title,
  subtitle,
  timelinePoints,
  example,
  buttonText = 'Continuar',
  onContinue,
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [activePoint, setActivePoint] = useState<TimelinePoint | null>(null);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);

    // Find the closest timeline point
    const closest = timelinePoints.reduce((prev, curr) => {
      return Math.abs(curr.position - value) < Math.abs(prev.position - value)
        ? curr
        : prev;
    });

    if (Math.abs(closest.position - value) < 0.15) {
      setActivePoint(closest);
    } else {
      setActivePoint(null);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Animated.View>

      <Animated.View style={styles.timelineSection} entering={FadeInUp.delay(400)}>
        <View style={styles.timelineContainer}>
          <View style={styles.timeline}>
            {timelinePoints.map((point) => (
              <View
                key={point.id}
                style={[
                  styles.timelineMarker,
                  { left: `${point.position * 100}%` },
                  activePoint?.id === point.id && styles.timelineMarkerActive,
                ]}
              >
                <Text style={styles.markerIcon}>{point.icon}</Text>
                <Text
                  style={[
                    styles.markerLabel,
                    activePoint?.id === point.id && styles.markerLabelActive,
                  ]}
                >
                  {point.label}
                </Text>
              </View>
            ))}
          </View>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={colors.primary}
          />
        </View>

        {activePoint && (
          <Animated.View style={styles.descriptionBubble} entering={FadeIn}>
            <Text style={styles.descriptionText}>{activePoint.description}</Text>
          </Animated.View>
        )}
      </Animated.View>

      <View style={styles.infoSection}>
        {timelinePoints.map((point, index) => (
          <Animated.View
            key={point.id}
            style={styles.infoCard}
            entering={FadeInUp.delay(500 + index * 100)}
          >
            <View style={styles.infoHeader}>
              <Text style={styles.infoIcon}>{point.icon}</Text>
              <Text style={styles.infoTitle}>{point.label}</Text>
            </View>
            <Text style={styles.infoDescription}>{point.description}</Text>
          </Animated.View>
        ))}
      </View>

      {example && (
        <Animated.View style={styles.exampleContainer} entering={FadeIn.delay(700)}>
          <Text style={styles.exampleLabel}>Ejemplo:</Text>
          <Text style={styles.exampleText}>{example}</Text>
        </Animated.View>
      )}

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
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
  },
  subtitle: {
    fontSize: 15,
    color: colors.graySoft,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  timelineSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  timelineContainer: {
    height: 100,
    position: 'relative',
  },
  timeline: {
    position: 'absolute',
    top: 0,
    left: spacing.md,
    right: spacing.md,
    height: 60,
  },
  timelineMarker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }],
  },
  timelineMarkerActive: {
    transform: [{ translateX: -20 }, { scale: 1.1 }],
  },
  markerIcon: {
    fontSize: 28,
  },
  markerLabel: {
    fontSize: 11,
    color: colors.graySoft,
    marginTop: 4,
    textAlign: 'center',
    width: 80,
  },
  markerLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  descriptionBubble: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radii.md,
    marginTop: spacing.sm,
  },
  descriptionText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  infoDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 28,
  },
  exampleContainer: {
    backgroundColor: '#FFF9E6',
    padding: spacing.md,
    borderRadius: radii.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accentYellow,
    marginBottom: spacing.md,
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  exampleText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bottomSection: {
    paddingBottom: spacing.lg,
    marginTop: 'auto',
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

export default ContentTimelineScreen;
