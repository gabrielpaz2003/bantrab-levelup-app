import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Bantrab Level thresholds
const BANTRAB_LEVELS = [
  { level: 1, name: 'Bronce', minPoints: 0, minTransactions: 0 },
  { level: 2, name: 'Plata', minPoints: 100, minTransactions: 5 },
  { level: 3, name: 'Oro', minPoints: 300, minTransactions: 15 },
  { level: 4, name: 'Platinum', minPoints: 600, minTransactions: 30 },
  { level: 5, name: 'Infinite', minPoints: 1000, minTransactions: 50 },
];

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  weeklyActiveDays: number[];
}

interface TransactionData {
  totalTransactions: number;
  weeklyTransactions: number;
  monthlyTransactions: number;
}

interface BantrabLevel {
  level: number;
  name: string;
  progress: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  requiredPoints: number;
  category: 'cashback' | 'promocion' | 'puntos' | 'experiencia';
  isUnlocked: boolean;
  isClaimed: boolean;
}

interface UserProgressContextType {
  // XP & Nodes
  totalPoints: number;
  completedNodes: string[];
  addPoints: (points: number) => void;
  markNodeCompleted: (nodeId: string) => void;
  isNodeCompleted: (nodeId: string) => boolean;

  // Streak
  streak: StreakData;
  recordActivity: () => void;

  // Transactions & Bantrab Level
  transactions: TransactionData;
  addTransaction: () => void;
  bantrabLevel: BantrabLevel;

  // Rewards
  rewards: Reward[];
  claimReward: (rewardId: string) => void;
}

const getInitialRewards = (): Reward[] => [
  {
    id: 'r1',
    title: '5% Cashback en Comida',
    description: 'Obtén 5% de reintegro en restaurantes de comida rápida',
    requiredLevel: 1,
    requiredPoints: 50,
    category: 'cashback',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r2',
    title: '10% Descuento Streaming',
    description: 'Descuento en tu próximo pago de Netflix, Spotify o Disney+',
    requiredLevel: 2,
    requiredPoints: 150,
    category: 'promocion',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r3',
    title: 'Puntos x2 por 7 días',
    description: 'Duplica tus puntos en todas las compras durante una semana',
    requiredLevel: 2,
    requiredPoints: 200,
    category: 'puntos',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r4',
    title: '15% Cashback Gasolina',
    description: 'Reintegro especial en gasolineras participantes',
    requiredLevel: 3,
    requiredPoints: 350,
    category: 'cashback',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r5',
    title: 'Entrada Cine Gratis',
    description: 'Una entrada de cine en Cinépolis o Cinemark',
    requiredLevel: 3,
    requiredPoints: 400,
    category: 'experiencia',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r6',
    title: 'Q50 en Uber Eats',
    description: 'Crédito para tu próximo pedido de comida',
    requiredLevel: 4,
    requiredPoints: 650,
    category: 'promocion',
    isUnlocked: false,
    isClaimed: false,
  },
  {
    id: 'r7',
    title: 'Experiencia VIP Bantrab',
    description: 'Acceso a eventos exclusivos y atención preferencial',
    requiredLevel: 5,
    requiredPoints: 1000,
    category: 'experiencia',
    isUnlocked: false,
    isClaimed: false,
  },
];

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    weeklyActiveDays: [],
  });
  const [transactions, setTransactions] = useState<TransactionData>({
    totalTransactions: 50,
    weeklyTransactions: 12,
    monthlyTransactions: 50,
  });
  const [rewards, setRewards] = useState<Reward[]>(getInitialRewards());

  // Calculate Bantrab Level
  const calculateBantrabLevel = (): BantrabLevel => {
    let currentLevel = BANTRAB_LEVELS[0];

    for (const level of BANTRAB_LEVELS) {
      if (totalPoints >= level.minPoints && transactions.totalTransactions >= level.minTransactions) {
        currentLevel = level;
      }
    }

    const nextLevel = BANTRAB_LEVELS.find(l => l.level === currentLevel.level + 1);
    let progress = 100;

    if (nextLevel) {
      const pointsProgress = (totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints);
      const transProgress = (transactions.totalTransactions - currentLevel.minTransactions) / (nextLevel.minTransactions - currentLevel.minTransactions);
      progress = Math.min(Math.floor((pointsProgress + transProgress) / 2 * 100), 99);
    }

    return {
      level: currentLevel.level,
      name: currentLevel.name,
      progress,
    };
  };

  const bantrabLevel = calculateBantrabLevel();

  // Update rewards unlock status whenever points or level changes
  useEffect(() => {
    setRewards(prev => prev.map(reward => ({
      ...reward,
      isUnlocked: bantrabLevel.level >= reward.requiredLevel && totalPoints >= reward.requiredPoints,
    })));
  }, [totalPoints, bantrabLevel.level]);

  // XP Functions
  const addPoints = (points: number) => {
    setTotalPoints((prev) => prev + points);
  };

  const markNodeCompleted = (nodeId: string) => {
    setCompletedNodes((prev) => {
      if (prev.includes(nodeId)) {
        return prev;
      }
      return [...prev, nodeId];
    });
  };

  const isNodeCompleted = (nodeId: string) => {
    return completedNodes.includes(nodeId);
  };

  // Streak Functions
  const recordActivity = () => {
    const today = new Date().toDateString();
    const dayOfWeek = new Date().getDay();

    setStreak(prev => {
      if (prev.lastActivityDate === today) {
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasActiveYesterday = prev.lastActivityDate === yesterday.toDateString();

      const newStreak = wasActiveYesterday ? prev.currentStreak + 1 : 1;
      const newWeeklyDays = prev.weeklyActiveDays.includes(dayOfWeek)
        ? prev.weeklyActiveDays
        : [...prev.weeklyActiveDays, dayOfWeek];

      return {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak),
        lastActivityDate: today,
        weeklyActiveDays: newWeeklyDays,
      };
    });
  };

  // Transaction Functions
  const addTransaction = () => {
    setTransactions(prev => ({
      totalTransactions: prev.totalTransactions + 1,
      weeklyTransactions: prev.weeklyTransactions + 1,
      monthlyTransactions: prev.monthlyTransactions + 1,
    }));
  };

  // Rewards Functions
  const claimReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward =>
      reward.id === rewardId && reward.isUnlocked && !reward.isClaimed
        ? { ...reward, isClaimed: true }
        : reward
    ));
  };

  return (
    <UserProgressContext.Provider
      value={{
        totalPoints,
        completedNodes,
        addPoints,
        markNodeCompleted,
        isNodeCompleted,
        streak,
        recordActivity,
        transactions,
        addTransaction,
        bantrabLevel,
        rewards,
        claimReward,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = (): UserProgressContextType => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
