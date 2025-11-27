import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// These constants must match the RoadmapScreen positioning
const NODE_SIZE = 100;
const SIDE_PADDING = 50;

interface CurvedPathProps {
  color?: string;
  isCompleted?: boolean;
  direction: 'left-to-right' | 'right-to-left' | 'straight-left' | 'straight-right';
}

const CurvedPath: React.FC<CurvedPathProps> = ({
  color = '#1CB0F6',
  isCompleted = false,
  direction,
}) => {
  const pathHeight = 100;

  // Calculate the center positions of nodes (matching RoadmapScreen positioning)
  const leftNodeCenterX = SIDE_PADDING + NODE_SIZE / 2;
  const rightNodeCenterX = SCREEN_WIDTH - SIDE_PADDING - NODE_SIZE / 2;

  const getPath = () => {
    const startY = 0;
    const endY = pathHeight;
    const midY = pathHeight / 2;

    switch (direction) {
      case 'left-to-right':
        // Curved S-path from left node to right node
        return `M ${leftNodeCenterX} ${startY} C ${leftNodeCenterX} ${midY}, ${rightNodeCenterX} ${midY}, ${rightNodeCenterX} ${endY}`;

      case 'right-to-left':
        // Curved S-path from right node to left node
        return `M ${rightNodeCenterX} ${startY} C ${rightNodeCenterX} ${midY}, ${leftNodeCenterX} ${midY}, ${leftNodeCenterX} ${endY}`;

      case 'straight-left':
        // Straight vertical path on the left side
        return `M ${leftNodeCenterX} ${startY} L ${leftNodeCenterX} ${endY}`;

      case 'straight-right':
        // Straight vertical path on the right side
        return `M ${rightNodeCenterX} ${startY} L ${rightNodeCenterX} ${endY}`;

      default:
        return '';
    }
  };

  return (
    <View style={[styles.container, { height: pathHeight }]}>
      <Svg width={SCREEN_WIDTH} height={pathHeight}>
        <Path
          d={getPath()}
          stroke={color}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          opacity={isCompleted ? 1 : 0.3}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CurvedPath;
