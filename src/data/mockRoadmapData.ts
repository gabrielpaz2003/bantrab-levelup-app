import { RoadmapModule, UserProgress } from '../types';

// Import image assets for roadmap icons
const bookIcon = require('../../assets/images/book.png');
const dumbbellIcon = require('../../assets/images/dumbell.png');
const beeIcon = require('../../assets/images/abeja13.png');
const storeIcon = require('../../assets/images/store.png');

export const mockRoadmapData: RoadmapModule[] = [
  {
    id: 'credit-cards',
    title: 'Tarjetas de Crédito',
    color: '#1CB0F6',
    nodes: [
      {
        id: 'cc-node-1',
        title: 'Contenido',
        description: 'Aprende los conceptos básicos.',
        status: 'available',
        position: { x: 0, y: 0 },
        moduleId: 'credit-cards',
        icon: bookIcon,
        points: 80,
        connectedTo: ['cc-node-2'],
      },
      {
        id: 'cc-node-2',
        title: 'Ejercicios',
        description: 'Pon a prueba tus conocimientos.',
        status: 'in_progress',
        position: { x: 1, y: 1 },
        moduleId: 'credit-cards',
        icon: dumbbellIcon,
        points: 85,
        connectedTo: ['cc-node-3'],
      },
      {
        id: 'cc-node-3',
        title: 'Minijuegos',
        description: 'Aprende jugando.',
        status: 'available',
        position: { x: 0, y: 2 },
        moduleId: 'credit-cards',
        icon: beeIcon,
        points: 90,
        connectedTo: ['cc-node-4'],
      },
      {
        id: 'cc-node-4',
        title: 'Productos Bantrab',
        description: 'Descubre los productos que Bantrab tiene para ti.',
        status: 'available',
        position: { x: 1, y: 3 },
        moduleId: 'credit-cards',
        icon: storeIcon,
        points: 100,
        connectedTo: [],
      },
    ],
  },
  {
    id: 'checking-account',
    title: 'Cuenta de Cheques',
    color: '#58CC02',
    nodes: [
      {
        id: 'ca-node-1',
        title: 'Contenido',
        description: 'Aprende los conceptos básicos.',
        status: 'available',
        position: { x: 0, y: 0 },
        moduleId: 'checking-account',
        icon: bookIcon,
        points: 80,
        connectedTo: ['ca-node-2'],
      },
      {
        id: 'ca-node-2',
        title: 'Ejercicios',
        description: 'Pon a prueba tus conocimientos.',
        status: 'locked',
        position: { x: 1, y: 1 },
        moduleId: 'checking-account',
        icon: dumbbellIcon,
        points: 85,
        connectedTo: ['ca-node-3'],
      },
      {
        id: 'ca-node-3',
        title: 'Minijuegos',
        description: 'Aprende jugando.',
        status: 'locked',
        position: { x: 0, y: 2 },
        moduleId: 'checking-account',
        icon: beeIcon,
        points: 90,
        connectedTo: ['ca-node-4'],
      },
      {
        id: 'ca-node-4',
        title: 'Productos Bantrab',
        description: 'Descubre los productos que Bantrab tiene para ti.',
        status: 'locked',
        position: { x: 1, y: 3 },
        moduleId: 'checking-account',
        icon: storeIcon,
        points: 100,
        connectedTo: [],
      },
    ],
  },
];

export const mockUserProgress: UserProgress = {
  completedNodes: [],
  currentNode: 'cc-node-1',
  totalPoints: 0,
};
