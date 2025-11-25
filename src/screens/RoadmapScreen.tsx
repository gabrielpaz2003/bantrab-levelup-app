import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { Dropdown } from '../components/ui/Dropdown';
import { RoadmapNode, PathLine } from '../components/roadmap';
import { mockRoadmapData, mockUserProgress } from '../data/mockRoadmapData';
import { RoadmapNode as RoadmapNodeType, RoadmapModule } from '../types';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RoadmapScreen: React.FC = () => {
  const [userProgress] = useState(mockUserProgress);
  const [activeModule, setActiveModule] = useState<RoadmapModule>(
    mockRoadmapData[0]
  );

  const handleNodePress = (node: RoadmapNodeType) => {
    let sequence = [];
    if (node.title === 'Ejercicios') {
      sequence = [
        { type: 'exercise', moduleId: activeModule.id },
        { type: 'minigame', minigameId: 'quickfire-game' },
      ];
    } else if (node.title === 'Minijuegos') {
      sequence = [
        { type: 'minigame', minigameId: 'credit-card-guesstimate' },
        { type: 'minigame', minigameId: 'quickfire-game' },
      ];
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

    router.push({
      pathname: '/exercises',
      params: { sequence: JSON.stringify(sequence) },
    });
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
            activeColor={activeModule.color || '#1CB0F6'}
          />
        </View>
        {shouldShowPath && (
          <PathLine
            isCompleted={isPathCompleted}
            color={activeModule.color || '#1CB0F6'}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

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
        showsVerticalScrollIndicator={false}
      >
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
    backgroundColor: '#F0F4F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  moduleSelector: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    padding: 15,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  levelSection: {
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#A0A0A0',
  },
});

export default RoadmapScreen;
