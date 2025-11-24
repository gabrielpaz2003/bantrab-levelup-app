import React from 'react';
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
  moduleId: string;
  icon?: React.ReactNode;
  points?: number;
  connectedTo?: string[];
}

export interface RoadmapModule {
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
