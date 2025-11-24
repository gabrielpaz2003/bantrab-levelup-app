import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PathLineProps {
  color?: string;
  isCompleted?: boolean;
}

const PathLine: React.FC<PathLineProps> = ({ color = '#E5E5E5', isCompleted = false }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.line,
          { backgroundColor: isCompleted ? '#58CC02' : color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 4,
    height: '100%',
    borderRadius: 2,
  },
});

export default PathLine;
