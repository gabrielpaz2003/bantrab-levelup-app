import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RoadmapNode as RoadmapNodeType } from '../../types';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  onPress: (node: RoadmapNodeType) => void;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, onPress }) => {
  const getNodeColor = () => {
    switch (node.status) {
      case 'completed':
        return '#58CC02';
      case 'in_progress':
        return '#1CB0F6';
      case 'available':
        return '#FFD900';
      case 'locked':
        return '#E5E5E5';
      default:
        return '#E5E5E5';
    }
  };

  const isInteractive = node.status === 'available' || node.status === 'in_progress';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getNodeColor() },
        node.status === 'locked' && styles.lockedContainer,
      ]}
      onPress={() => isInteractive && onPress(node)}
      disabled={!isInteractive}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{node.icon || '⭐'}</Text>
      </View>

      <Text style={[
        styles.title,
        node.status === 'locked' && styles.lockedText
      ]} numberOfLines={1}>
        {node.title}
      </Text>

      {node.status === 'completed' && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}

      {node.status === 'locked' && (
        <View style={styles.lockIcon}>
          <Text style={styles.lockText}>🔒</Text>
        </View>
      )}

      {node.points && node.status !== 'locked' && (
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{node.points}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  lockedContainer: {
    opacity: 0.5,
  },
  iconContainer: {
    marginBottom: 2,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 2,
  },
  lockedText: {
    color: '#999',
  },
  checkmark: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#58CC02',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  checkmarkText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lockIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  lockText: {
    fontSize: 20,
  },
  pointsBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#FF9600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  pointsText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default RoadmapNode;
