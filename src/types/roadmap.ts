export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  status: NodeStatus;
  position: {
    x: number;
    y: number;
  };
  level: number;
  icon?: string;
  points?: number;
  connectedTo?: string[];
}

export interface RoadmapLevel {
  id: string;
  title: string;
  nodes: RoadmapNode[];
  color?: string;
}

export interface UserProgress {
  completedNodes: string[];
  currentNode: string | null;
  totalPoints: number;
}
