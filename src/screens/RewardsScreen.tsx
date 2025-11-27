import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { colors, spacing, radii } from '@/constants/theme';
import { useUserProgress } from '../context/UserProgressContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CATEGORY_EMOJIS: { [key: string]: string } = {
  cashback: '💰',
  promocion: '🏷️',
  puntos: '⭐',
  experiencia: '🎁',
};

const CATEGORY_COLORS: { [key: string]: string } = {
  cashback: '#4CAF50',
  promocion: '#FF9800',
  puntos: '#9C27B0',
  experiencia: '#E91E63',
};

const LEVEL_COLORS: { [key: string]: string } = {
  'Bronce': '#CD7F32',
  'Plata': '#C0C0C0',
  'Oro': '#FFD700',
  'Platinum': '#E5E4E2',
  'Infinite': '#1a1a1a',
};

const RewardsScreen: React.FC = () => {
  const { rewards, bantrabLevel, totalPoints, claimReward } = useUserProgress();
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const categories = ['cashback', 'promocion', 'puntos', 'experiencia'];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredRewards = activeCategory
    ? rewards.filter(r => r.category === activeCategory)
    : rewards;

  const handleClaimReward = (reward: any) => {
    if (reward.isUnlocked && !reward.isClaimed) {
      setSelectedReward(reward);
      setShowClaimModal(true);
    }
  };

  const confirmClaim = () => {
    if (selectedReward) {
      claimReward(selectedReward.id);
      setShowClaimModal(false);
      setSelectedReward(null);
    }
  };

  const renderLevelHeader = () => (
    <Animated.View style={styles.levelHeader} entering={FadeInDown.delay(100)}>
      <View style={styles.levelCard}>
        <View style={[styles.levelBadgeLarge, { backgroundColor: LEVEL_COLORS[bantrabLevel.name] }]}>
          <Text style={styles.levelNumberLarge}>{bantrabLevel.level}</Text>
        </View>
        <View style={styles.levelDetails}>
          <Text style={styles.levelTitle}>Nivel {bantrabLevel.name}</Text>
          <Text style={styles.levelPoints}>{totalPoints} XP acumulados</Text>
          <View style={styles.miniProgressBar}>
            <View
              style={[
                styles.miniProgressFill,
                { width: `${bantrabLevel.progress}%`, backgroundColor: LEVEL_COLORS[bantrabLevel.name] },
              ]}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderCategoryFilters = () => (
    <Animated.View entering={FadeInDown.delay(200)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[styles.categoryChip, !activeCategory && styles.categoryChipActive]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.categoryChipText, !activeCategory && styles.categoryChipTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              activeCategory === cat && styles.categoryChipActive,
              activeCategory === cat && { backgroundColor: CATEGORY_COLORS[cat] },
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={styles.categoryEmoji}>{CATEGORY_EMOJIS[cat]}</Text>
            <Text
              style={[
                styles.categoryChipText,
                activeCategory === cat && styles.categoryChipTextActive,
              ]}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const renderRewardCard = (reward: any, index: number) => {
    const isLocked = !reward.isUnlocked;
    const isClaimed = reward.isClaimed;

    return (
      <Animated.View
        key={reward.id}
        entering={FadeInUp.delay(300 + index * 100)}
      >
        <TouchableOpacity
          style={[
            styles.rewardCard,
            isLocked && styles.rewardCardLocked,
            isClaimed && styles.rewardCardClaimed,
          ]}
          onPress={() => handleClaimReward(reward)}
          disabled={isLocked || isClaimed}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.rewardIconContainer,
              { backgroundColor: isLocked ? colors.graySoft : CATEGORY_COLORS[reward.category] },
            ]}
          >
            <Text style={styles.rewardIcon}>
              {isClaimed ? '✓' : CATEGORY_EMOJIS[reward.category]}
            </Text>
          </View>

          <View style={styles.rewardContent}>
            <Text style={[styles.rewardTitle, isLocked && styles.rewardTitleLocked]}>
              {reward.title}
            </Text>
            <Text style={[styles.rewardDescription, isLocked && styles.rewardDescriptionLocked]}>
              {reward.description}
            </Text>

            <View style={styles.rewardRequirements}>
              <View style={styles.requirementTag}>
                <Text style={styles.requirementText}>Nivel {reward.requiredLevel}</Text>
              </View>
              <View style={styles.requirementTag}>
                <Text style={styles.requirementText}>{reward.requiredPoints} XP</Text>
              </View>
            </View>
          </View>

          {isLocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}

          {isClaimed && (
            <View style={styles.claimedBadge}>
              <Text style={styles.claimedText}>Canjeado</Text>
            </View>
          )}

          {!isLocked && !isClaimed && (
            <View style={styles.claimButton}>
              <Text style={styles.claimButtonText}>Canjear</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderClaimModal = () => (
    <Modal visible={showClaimModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <Animated.View style={styles.modalContent} entering={ZoomIn}>
          <Text style={styles.modalEmoji}>{CATEGORY_EMOJIS[selectedReward?.category]}</Text>
          <Text style={styles.modalTitle}>¡Felicidades!</Text>
          <Text style={styles.modalRewardTitle}>{selectedReward?.title}</Text>
          <Text style={styles.modalDescription}>{selectedReward?.description}</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowClaimModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmClaim}>
              <Text style={styles.modalConfirmText}>Confirmar Canje</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const unlockedCount = rewards.filter(r => r.isUnlocked && !r.isClaimed).length;
  const claimedCount = rewards.filter(r => r.isClaimed).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown}>
          <Text style={styles.title}>Recompensas</Text>
          <Text style={styles.subtitle}>
            {unlockedCount > 0
              ? `Tienes ${unlockedCount} recompensa${unlockedCount > 1 ? 's' : ''} disponible${unlockedCount > 1 ? 's' : ''}`
              : 'Sube de nivel para desbloquear recompensas'}
          </Text>
        </Animated.View>

        {renderLevelHeader()}

        {/* Stats Row */}
        <Animated.View style={styles.statsRow} entering={FadeInDown.delay(150)}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{rewards.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>Disponibles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{claimedCount}</Text>
            <Text style={styles.statLabel}>Canjeados</Text>
          </View>
        </Animated.View>

        {renderCategoryFilters()}

        {/* Rewards List */}
        <View style={styles.rewardsList}>
          {filteredRewards.map((reward, index) => renderRewardCard(reward, index))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {renderClaimModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.graySoft,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  // Level Header
  levelHeader: {
    marginBottom: spacing.lg,
  },
  levelCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  levelBadgeLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumberLarge: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  levelDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  levelPoints: {
    fontSize: 14,
    color: colors.graySoft,
    marginTop: 2,
  },
  miniProgressBar: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.graySoft,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.graySoft,
    opacity: 0.3,
  },
  // Category Filters
  categoriesContainer: {
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.graySoft,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  categoryChipText: {
    fontSize: 14,
    color: colors.text,
  },
  categoryChipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  // Rewards List
  rewardsList: {
    gap: spacing.md,
  },
  rewardCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  rewardCardLocked: {
    opacity: 0.7,
  },
  rewardCardClaimed: {
    backgroundColor: '#F5F5F5',
  },
  rewardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 24,
  },
  rewardContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  rewardTitleLocked: {
    color: colors.graySoft,
  },
  rewardDescription: {
    fontSize: 13,
    color: colors.graySoft,
    marginTop: 2,
    lineHeight: 18,
  },
  rewardDescriptionLocked: {
    color: colors.graySoft,
  },
  rewardRequirements: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  requirementTag: {
    backgroundColor: colors.background,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  requirementText: {
    fontSize: 11,
    color: colors.graySoft,
  },
  lockOverlay: {
    position: 'absolute',
    right: spacing.md,
  },
  lockIcon: {
    fontSize: 24,
  },
  claimedBadge: {
    position: 'absolute',
    right: spacing.md,
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  claimedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  claimButton: {
    position: 'absolute',
    right: spacing.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
  },
  claimButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  modalRewardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: colors.graySoft,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.graySoft,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.graySoft,
    fontSize: 16,
    fontWeight: '600',
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  modalConfirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: spacing.xl * 2,
  },
});

export default RewardsScreen;
