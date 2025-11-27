import { colors, radii, spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
          React.cloneElement(node.icon as React.ReactElement, {
            color: node.status === 'locked' ? colors.graySoft : colors.white,
            size: 40
          })
        )}
      </View>

      <Text style={[styles.title, node.status === 'locked' && { color: colors.graySoft }]} numberOfLines={2} ellipsizeMode="tail">
        {node.title}
      </Text>

      {node.status === 'completed' && (
        <View style={styles.checkmark}>
          <CheckIcon color={colors.white} size={16} />
        </View>
      )}

      {node.status === 'locked' && (
        <View style={styles.lockIcon}>
          <LockIcon color={colors.graySoft} size={24} />
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
    marginVertical: spacing.lg,
    marginHorizontal: spacing.lg + 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
    padding: spacing.sm + 2,
  },
  lockedContainer: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.graySoft,
    opacity: 0.8,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.accentYellow,
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
    backgroundColor: 'rgba(161, 171, 180, 0.3)',
    borderRadius: 30,
  },
  pointsBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: colors.accentYellow,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.white,
  },
  pointsText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RoadmapNode;
