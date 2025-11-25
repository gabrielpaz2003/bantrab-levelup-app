
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { colors, spacing, typography, radii } from '@/constants/theme';
import { mockCreditCardData, CreditCard } from '@/src/data/mockCreditCardData';
import { mockItemData, Item } from '@/src/data/mockItemData';

const MINIMUM_PAYMENT_PERCENTAGE = 0.02; // 2%

const calculateRealCost = (price: number, annualInterestRate: number) => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  let balance = price;
  let totalPaid = 0;
  let months = 0;

  while (balance > 0) {
    const interest = balance * monthlyInterestRate;
    const minimumPayment = Math.max(balance * MINIMUM_PAYMENT_PERCENTAGE, 25);
    const principalPaid = minimumPayment - interest;

    if (principalPaid <= 0) {
      return { totalPaid: Infinity, months: Infinity }; // Debt never gets paid off
    }

    balance -= principalPaid;
    totalPaid += minimumPayment;
    months++;
    if (months > 1200) break; // Safety break after 100 years
  }

  return { totalPaid, months };
};

const getRandomItem = (items: Item[]) => items[Math.floor(Math.random() * items.length)];
const getRandomCard = (cards: CreditCard[]) => cards[Math.floor(Math.random() * cards.length)];

const CreditCardGuesstimateScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const [item, setItem] = useState(getRandomItem(mockItemData));
  const [card, setCard] = useState(getRandomCard(mockCreditCardData));
  const [guess, setGuess] = useState(item.price);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const realCostData = useMemo(() => calculateRealCost(item.price, card.interestRate), [item, card]);
  const realCost = realCostData.totalPaid;

  const otherCardsComparison = useMemo(() => {
    return mockCreditCardData
      .filter(c => c.id !== card.id)
      .map(c => ({
        ...c,
        ...calculateRealCost(item.price, c.interestRate),
      }));
  }, [item, card]);

  const handleGuess = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    setItem(getRandomItem(mockItemData));
    setCard(getRandomCard(mockCreditCardData));
    setGuess(item.price);
    setShowResult(false);
  };

  const handleGoBack = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.back();
    }
  };

  const getScore = () => {
    const difference = Math.abs(guess - realCost);
    const percentageOff = (difference / realCost) * 100;

    if (percentageOff < 5) return { points: 100, message: "Excellent!" };
    if (percentageOff < 15) return { points: 50, message: "Good job!" };
    if (percentageOff < 30) return { points: 25, message: "Not bad!" };
    return { points: 10, message: "Better luck next time!" };
  };
  
  const score = getScore();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
            <Text style={styles.title}>The Real Cost</Text>
        </View>

        <View style={styles.itemContainer}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
            <Text style={styles.cardName}>on {card.name} ({card.interestRate}%)</Text>
        </View>

        <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Your Guess: ${guess.toFixed(2)}</Text>
            <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={item.price}
            maximumValue={item.price * 2}
            value={guess}
            onValueChange={setGuess}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.graySoft}
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuess}>
            <Text style={styles.buttonText}>Guess</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showResult} transparent animationType="fade">
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.resultTitle}>{score.message}</Text>
                <Text style={styles.resultText}>Real Cost: ${realCost.toFixed(2)}</Text>
                <Text style={styles.resultText}>Your Guess: ${guess.toFixed(2)}</Text>
                <Text style={styles.scoreText}>You earned {score.points} points!</Text>
                
                <View style={styles.comparisonContainer}>
                    <Text style={styles.comparisonTitle}>How other cards compare:</Text>
                    {otherCardsComparison.map(c => (
                        <Text key={c.id} style={styles.comparisonText}>
                            {c.name}: ${c.totalPaid.toFixed(2)}
                        </Text>
                    ))}
                </View>

                <TouchableOpacity style={styles.modalButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next Item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    header: {
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.title,
        textAlign: 'center',
    },
    itemContainer: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    emoji: {
        fontSize: 80,
    },
    itemName: {
        ...typography.subtitle,
        marginTop: spacing.md,
    },
    itemPrice: {
        ...typography.body,
        fontSize: 18,
        color: colors.graySoft,
    },
    cardName: {
        ...typography.body,
        marginTop: spacing.sm,
        fontStyle: 'italic',
    },
    sliderContainer: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    sliderLabel: {
        ...typography.body,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: radii.full,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.white,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: radii.md,
        padding: spacing.lg,
        alignItems: 'center',
        width: '90%',
    },
    resultTitle: {
        ...typography.title,
        color: colors.accentMagenta,
        marginBottom: spacing.md,
    },
    resultText: {
        ...typography.subtitle,
        marginBottom: spacing.sm,
    },
    scoreText: {
        ...typography.body,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.accentYellow,
        marginVertical: spacing.md,
    },
    comparisonContainer: {
        marginTop: spacing.md,
        alignItems: 'center',
    },
    comparisonTitle: {
        ...typography.subtitle,
        fontSize: 16,
        marginBottom: spacing.sm,
    },
    comparisonText: {
        ...typography.body,
    },
    modalButton: {
        backgroundColor: colors.primary,
        borderRadius: radii.full,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
        width: '80%',
    },
});

export default CreditCardGuesstimateScreen;
