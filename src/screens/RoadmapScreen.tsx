import { colors, radii, spacing, typography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PathLine, RoadmapNode } from '../components/roadmap';
import { Dropdown } from '../components/ui/Dropdown';
import { mockRoadmapData, mockUserProgress } from '../data/mockRoadmapData';
import { RoadmapModule, RoadmapNode as RoadmapNodeType } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RoadmapScreen: React.FC = () => {
  const [userProgress] = useState(mockUserProgress);
  const [activeModule, setActiveModule] = useState<RoadmapModule>(
    mockRoadmapData[0]
  );

  const handleNodePress = (node: RoadmapNodeType) => {
    if (node.title === 'Contenido') {
      // Navigate to content module (chat-like presentation)
      router.push('/credit-card-content');
      return;
    } else if (node.title === 'Ejercicios') {
      // Navigate to exercises screen
      router.push('/exercises');
      return;
    } else if (node.title === 'Minijuegos') {
      // Navigate to bank map minigame
      router.push('/bank-map-minigame');
      return;
    } else {
      Alert.alert(
        node.title,
        node.description || 'Continue your learning journey!',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Start', onPress: () => console.log('Starting:', node.id) },
        ]
      );
      return;
    }
  };

  const renderNode = (
    node: RoadmapNodeType,
    index: number,
    totalNodes: number
  ) => {
    const isLastNode = index === totalNodes - 1;
    const shouldShowPath = !isLastNode;
    const isPathCompleted = userProgress.completedNodes.includes(node.id);

    return (
      <View key={node.id} style={styles.nodeWrapper}>
        <View
          style={[
            styles.nodeContainer,
            node.position.x === 0 ? styles.alignLeft : styles.alignRight,
          ]}
        >
          <RoadmapNode
            node={node}
            onPress={handleNodePress}
            activeColor={activeModule.color || colors.primary}
          />
        </View>
        {shouldShowPath && (
          <PathLine
            isCompleted={isPathCompleted}
            color={activeModule.color || colors.primary}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Learning Path</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {userProgress.totalPoints} XP
          </Text>
        </View>
      </View>

      <View style={styles.moduleSelector}>
        <Dropdown
          items={mockRoadmapData}
          onSelect={setActiveModule}
          selectedValue={activeModule}
          labelExtractor={(module) => module.title}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {activeModule && (
          <View key={activeModule.id} style={styles.levelSection}>
            <View style={styles.nodesContainer}>
              {activeModule.nodes.map((node, index) =>
                renderNode(node, index, activeModule.nodes.length)
              )}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep going! 🎉</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.graySoft,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.title,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: colors.accentYellow,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radii.md,
  },
  progressText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  moduleSelector: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.graySoft,
    padding: spacing.md - 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.lg,
  },
  levelSection: {
    marginBottom: spacing.lg,
  },
  nodesContainer: {
    alignItems: 'center',
  },
  nodeWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  nodeContainer: {
    width: SCREEN_WIDTH,
  },
  alignLeft: {
    alignItems: 'flex-start',
    paddingLeft: 60,
  },
  alignRight: {
    alignItems: 'flex-end',
    paddingRight: 60,
  },
  footer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    ...typography.subtitle,
    color: colors.graySoft,
  },
});

export default RoadmapScreen;
