import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

const OrderDrag = ({ exercise, onComplete }) => {
  const [data, setData] = useState(exercise.items.map((item, index) => ({ key: `item-${index}`, label: item })));
  const [feedback, setFeedback] = useState(null);

  const handleCheckOrder = () => {
    const isCorrect = data.every((item, index) => item.label === exercise.correctOrder[index]);
    setFeedback(isCorrect ? exercise.feedback.correct : exercise.feedback.incorrect);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const renderItem = ({ item, drag, isActive }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: isActive ? colors.graySoft : colors.white }]}
      onLongPress={drag}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>{exercise.title}</ThemedText>
      <ThemedText style={styles.statement}>{exercise.statement}</ThemedText>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          onDragEnd={({ data }) => setData(data)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCheckOrder}>
        <Text style={styles.buttonText}>Check Order</Text>
      </TouchableOpacity>
      {feedback && (
        <View style={styles.feedbackContainer}>
          <ThemedText style={styles.feedbackText}>
            {feedback}
          </ThemedText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  statement: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 18,
    color: colors.text,
  },
  item: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
});

export default OrderDrag;
