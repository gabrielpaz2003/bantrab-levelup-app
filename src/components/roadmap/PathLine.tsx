import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface PathLineProps {
  color?: string;
  isCompleted?: boolean;
}

const PathLine: React.FC<PathLineProps> = ({ color = colors.graySoft, isCompleted = false }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.line,
          {
            backgroundColor: color,
            opacity: isCompleted ? 1 : 0.3,
          },
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
