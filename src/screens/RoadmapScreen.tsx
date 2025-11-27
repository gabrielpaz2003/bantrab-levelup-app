import { colors, radii, spacing, typography } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CurvedPath, RoadmapNode } from '../components/roadmap';
import { Dropdown } from '../components/ui/Dropdown';
import { mockRoadmapData } from '../data/mockRoadmapData';
import { RoadmapModule, RoadmapNode as RoadmapNodeType } from '../types';
import { useUserProgress } from '../context/UserProgressContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// These constants must match CurvedPath positioning
const NODE_SIZE = 100;
const SIDE_PADDING = 50;
const PATH_HEIGHT = 100;

const RoadmapScreen: React.FC = () => {
  const { totalPoints, completedNodes } = useUserProgress();
  const [activeModule, setActiveModule] = useState<RoadmapModule>(
    mockRoadmapData[0]
  );

  const handleNodePress = (node: RoadmapNodeType) => {
    // Only credit-cards module is functional
    if (node.moduleId !== 'credit-cards') {
      Alert.alert(
        'Próximamente',
        'Este módulo estará disponible pronto.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (node.title === 'Contenido') {
      router.push('/credit-card-content');
      return;
    } else if (node.title === 'Ejercicios') {
      router.push('/exercises');
      return;
    } else if (node.title === 'Minijuegos') {
      router.push('/bank-map-minigame');
      return;
    } else if (node.title === 'Productos Bantrab') {
      router.push('/bantrab-products');
      return;
    } else {
      Alert.alert(
        node.title,
        node.description || '¡Continúa tu camino de aprendizaje!',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar', onPress: () => console.log('Starting:', node.id) },
        ]
      );
      return;
    }
  };

  const getPathDirection = (
    currentNode: RoadmapNodeType,
    nextNode: RoadmapNodeType
  ): 'left-to-right' | 'right-to-left' | 'straight-left' | 'straight-right' => {
    const currentX = currentNode.position.x;
    const nextX = nextNode.position.x;

    if (currentX === 0 && nextX === 1) {
      return 'left-to-right';
    } else if (currentX === 1 && nextX === 0) {
      return 'right-to-left';
    } else if (currentX === 0) {
      return 'straight-left';
    } else {
      return 'straight-right';
    }
  };

  const renderNode = (
    node: RoadmapNodeType,
    index: number,
    totalNodes: number
  ) => {
    const isLastNode = index === totalNodes - 1;
    const shouldShowPath = !isLastNode;
    const isPathCompleted = completedNodes.includes(node.id);
    const nextNode = !isLastNode ? activeModule.nodes[index + 1] : null;
    const previousNode = index > 0 ? activeModule.nodes[index - 1] : null;

    // Determine node status dynamically - only update to completed if in completedNodes
    const nodeWithStatus = {
      ...node,
      status: completedNodes.includes(node.id) ? 'completed' as const : node.status,
    };

    return (
      <View key={node.id} style={styles.nodeWrapper}>
        {shouldShowPath && nextNode && (
          <View style={styles.pathContainer}>
            <CurvedPath
              isCompleted={isPathCompleted}
              color={activeModule.color || colors.primary}
              direction={getPathDirection(node, nextNode)}
            />
          </View>
        )}
        <View
          style={[
            styles.nodeContainer,
            node.position.x === 0 ? styles.alignLeft : styles.alignRight,
          ]}
        >
          <RoadmapNode
            node={nodeWithStatus}
            onPress={handleNodePress}
            activeColor={activeModule.color || colors.primary}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require('../../assets/images/lu.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Bantrab Level-Up</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {totalPoints} XP
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: spacing.sm,
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
    marginBottom: PATH_HEIGHT,
  },
  pathContainer: {
    position: 'absolute',
    top: NODE_SIZE,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  nodeContainer: {
    width: SCREEN_WIDTH,
    zIndex: 1,
  },
  alignLeft: {
    alignItems: 'flex-start',
    paddingLeft: SIDE_PADDING,
  },
  alignRight: {
    alignItems: 'flex-end',
    paddingRight: SIDE_PADDING,
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
