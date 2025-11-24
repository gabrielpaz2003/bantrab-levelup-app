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
import { RoadmapNode, PathLine } from '../components/roadmap';
import { mockRoadmapData, mockUserProgress } from '../data/mockRoadmapData';
import { RoadmapNode as RoadmapNodeType } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RoadmapScreen: React.FC = () => {
  const [userProgress] = useState(mockUserProgress);

  const handleNodePress = (node: RoadmapNodeType) => {
    Alert.alert(
      node.title,
      node.description || 'Continue your learning journey!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => console.log('Starting:', node.id) },
      ]
    );
  };

  const renderNode = (node: RoadmapNodeType, index: number, totalNodes: number) => {
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
          <RoadmapNode node={node} onPress={handleNodePress} />
        </View>
        {shouldShowPath && <PathLine isCompleted={isPathCompleted} />}
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockRoadmapData.map((level) => (
          <View key={level.id} style={styles.levelSection}>
            <View style={styles.levelHeader}>
              <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
                <Text style={styles.levelTitle}>{level.title}</Text>
              </View>
            </View>

            <View style={styles.nodesContainer}>
              {level.nodes.map((node, index) =>
                renderNode(node, index, level.nodes.length)
              )}
            </View>
          </View>
        ))}

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
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
    backgroundColor: '#FFD900',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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
  levelHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
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
    color: '#999',
  },
});

export default RoadmapScreen;
