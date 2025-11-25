import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RoadmapNode as RoadmapNodeType } from '../../types';
import { CheckIcon } from './CheckIcon';
import { LockIcon } from './LockIcon';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  onPress: (node: RoadmapNodeType) => void;
  activeColor: string;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ node, onPress, activeColor }) => {
  const isInteractive = node.status !== 'locked';

  const containerStyle = [
    styles.container,
    { backgroundColor: activeColor },
    node.status === 'locked' && styles.lockedContainer,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => isInteractive && onPress(node)}
      disabled={!isInteractive}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {typeof node.icon === 'string' ? (
          <Text style={styles.icon}>{node.icon || '⭐'}</Text>
        ) : (
          React.cloneElement(node.icon as React.ReactElement, { color: '#FFF', size: 40 })
        )}
      </View>

      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {node.title}
      </Text>

      {node.status === 'completed' && (
        <View style={styles.checkmark}>
          <CheckIcon color="#FFF" size={16} />
        </View>
      )}

      {node.status === 'locked' && (
        <View style={styles.lockIcon}>
          <LockIcon color="#FFF" size={24} />
        </View>
      )}

      {node.points && node.status !== 'locked' && (
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{node.points} XP</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
    padding: 10,
  },
  lockedContainer: {
    backgroundColor: '#B0B0B0',
    opacity: 0.7,
  },
  iconContainer: {
    marginBottom: 8,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 30,
  },
  pointsBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FF9600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  pointsText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RoadmapNode;
