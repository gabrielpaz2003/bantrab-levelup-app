import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import Svg, { Rect, Path, G, Circle, Ellipse, Defs, LinearGradient, Stop, RadialGradient, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  Easing,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { colors } from '@/constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const MAP_PADDING = 5;

// Frame extends to bottom of screen
const FRAME_WIDTH = screenWidth - (MAP_PADDING * 2);
const FRAME_HEIGHT = screenHeight - 50; // Leave small margin at top for status bar

// Internal borders of the frame image (percentage-based for proportional scaling)
const FRAME_BORDER_LEFT_PCT = 0.11;
const FRAME_BORDER_RIGHT_PCT = 0.11;
const FRAME_BORDER_TOP_PCT = 0.15;
const FRAME_BORDER_BOTTOM_PCT = 0.09;

const FRAME_BORDER_LEFT = FRAME_WIDTH * FRAME_BORDER_LEFT_PCT;
const FRAME_BORDER_RIGHT = FRAME_WIDTH * FRAME_BORDER_RIGHT_PCT;
const FRAME_BORDER_TOP = FRAME_HEIGHT * FRAME_BORDER_TOP_PCT;
const FRAME_BORDER_BOTTOM = FRAME_HEIGHT * FRAME_BORDER_BOTTOM_PCT;

// Map dimensions fit exactly inside the frame borders
const MAP_WIDTH = FRAME_WIDTH - FRAME_BORDER_LEFT - FRAME_BORDER_RIGHT;
const MAP_HEIGHT = FRAME_HEIGHT - FRAME_BORDER_TOP - FRAME_BORDER_BOTTOM;

// Grid configuration - fit grid to available space
const GRID_COLS = 7;
const CELL_SIZE = MAP_WIDTH / GRID_COLS;
const GRID_ROWS = Math.floor(MAP_HEIGHT / CELL_SIZE);

// Station definitions with grid positions - distributed around the bank
const STATIONS = {
  entrance: { gridX: 3, gridY: GRID_ROWS - 1, type: 'entrance' },
  atm: { gridX: 1, gridY: GRID_ROWS - 3, type: 'atm' }, // Left wall, near entrance
  helpDesk: { gridX: 3, gridY: 2, type: 'helpDesk' }, // Top center (horizontal), one row down
  paymentStation: { gridX: 5, gridY: 6, type: 'paymentStation' }, // Right side (moved 5 columns right)
};

// Obstacle cells (counters, walls, furniture, etc.)
const OBSTACLES = new Set([
  // Help desk counter area (horizontal, top center)
  `${STATIONS.helpDesk.gridX - 1},${STATIONS.helpDesk.gridY}`,
  `${STATIONS.helpDesk.gridX},${STATIONS.helpDesk.gridY}`,
  `${STATIONS.helpDesk.gridX + 1},${STATIONS.helpDesk.gridY}`,
  // Payment station counter area (horizontal, like help desk)
  `${STATIONS.paymentStation.gridX - 1},${STATIONS.paymentStation.gridY}`,
  `${STATIONS.paymentStation.gridX},${STATIONS.paymentStation.gridY}`,
  `${STATIONS.paymentStation.gridX + 1},${STATIONS.paymentStation.gridY}`,
  // ATM area
  `${STATIONS.atm.gridX},${STATIONS.atm.gridY}`,
]);

// Global state for player position persistence
// Player starts one row above the entrance
let globalPlayerPosition = { gridX: 3, gridY: GRID_ROWS - 2 };

// A* Pathfinding Algorithm
interface Node {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

const heuristic = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const getNeighbors = (node: { x: number; y: number }): { x: number; y: number }[] => {
  const neighbors: { x: number; y: number }[] = [];
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 },  // right
  ];

  for (const dir of directions) {
    const newX = node.x + dir.x;
    const newY = node.y + dir.y;

    if (newX >= 0 && newX < GRID_COLS && newY >= 0 && newY < GRID_ROWS) {
      if (!OBSTACLES.has(`${newX},${newY}`)) {
        neighbors.push({ x: newX, y: newY });
      }
    }
  }

  return neighbors;
};

const findPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
): { x: number; y: number }[] => {
  const openSet: Node[] = [];
  const closedSet = new Set<string>();

  const startNode: Node = {
    x: start.x,
    y: start.y,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
    parent: null,
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    // Find node with lowest f score
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[currentIndex].f) {
        currentIndex = i;
      }
    }

    const current = openSet[currentIndex];

    // Check if we reached the goal
    if (current.x === end.x && current.y === end.y) {
      const path: { x: number; y: number }[] = [];
      let node: Node | null = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }
      return path;
    }

    // Move current from open to closed
    openSet.splice(currentIndex, 1);
    closedSet.add(`${current.x},${current.y}`);

    // Check neighbors
    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) {
        continue;
      }

      const g = current.g + 1;
      const h = heuristic(neighbor, end);
      const f = g + h;

      const existingNode = openSet.find(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      );

      if (existingNode) {
        if (g < existingNode.g) {
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = current;
        }
      } else {
        openSet.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          h,
          f,
          parent: current,
        });
      }
    }
  }

  return []; // No path found
};

// Helper to get cell center coordinates
const getCellCenter = (gridX: number, gridY: number) => ({
  x: gridX * CELL_SIZE + CELL_SIZE / 2,
  y: gridY * CELL_SIZE + CELL_SIZE / 2,
});

// Duolingo-style 3D Cartoon Character
// x, y = center of the cell where character should be placed
const DuoCharacter = ({
  x,
  y,
  size = CELL_SIZE * 0.8,
  isPlayer = false,
}: {
  x: number;
  y: number;
  size?: number;
  isPlayer?: boolean;
}) => {
  const bodyColor = isPlayer ? '#58CC02' : '#1CB0F6';
  const bodyColorDark = isPlayer ? '#46A302' : '#1899D6';
  const bodyColorLight = isPlayer ? '#7ED321' : '#49C0F8';
  const uniqueId = isPlayer ? 'Player' : `NPC_${Math.round(x)}_${Math.round(y)}`;

  // Character is drawn from top-left, so offset to center it
  // Character visual center is at size/2 horizontally and size*0.6 vertically (roughly torso)
  return (
    <G transform={`translate(${x - size/2}, ${y - size * 0.6})`}>
      <Defs>
        <LinearGradient id={`bodyGrad${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={bodyColorLight} />
          <Stop offset="50%" stopColor={bodyColor} />
          <Stop offset="100%" stopColor={bodyColorDark} />
        </LinearGradient>
        <RadialGradient id={`faceGrad${uniqueId}`} cx="50%" cy="30%" r="60%">
          <Stop offset="0%" stopColor="#FFE5CC" />
          <Stop offset="100%" stopColor="#FFCC99" />
        </RadialGradient>
      </Defs>

      {/* Shadow */}
      <Ellipse
        cx={size/2}
        cy={size * 0.95}
        rx={size * 0.3}
        ry={size * 0.08}
        fill="rgba(0,0,0,0.2)"
      />

      {/* Body (pill shape) */}
      <Path
        d={`
          M${size * 0.25} ${size * 0.55}
          Q${size * 0.25} ${size * 0.9} ${size * 0.5} ${size * 0.9}
          Q${size * 0.75} ${size * 0.9} ${size * 0.75} ${size * 0.55}
          L${size * 0.75} ${size * 0.45}
          Q${size * 0.75} ${size * 0.35} ${size * 0.5} ${size * 0.35}
          Q${size * 0.25} ${size * 0.35} ${size * 0.25} ${size * 0.45}
          Z
        `}
        fill={`url(#bodyGrad${uniqueId})`}
      />

      {/* Body highlight */}
      <Path
        d={`
          M${size * 0.3} ${size * 0.5}
          Q${size * 0.3} ${size * 0.4} ${size * 0.4} ${size * 0.4}
          L${size * 0.35} ${size * 0.55}
          Q${size * 0.3} ${size * 0.55} ${size * 0.3} ${size * 0.5}
        `}
        fill="rgba(255,255,255,0.3)"
      />

      {/* Head */}
      <Circle
        cx={size * 0.5}
        cy={size * 0.22}
        r={size * 0.2}
        fill={`url(#faceGrad${uniqueId})`}
      />

      {/* Hair */}
      <Path
        d={`
          M${size * 0.32} ${size * 0.12}
          Q${size * 0.5} ${size * 0.02} ${size * 0.68} ${size * 0.12}
          Q${size * 0.65} ${size * 0.08} ${size * 0.5} ${size * 0.06}
          Q${size * 0.35} ${size * 0.08} ${size * 0.32} ${size * 0.12}
        `}
        fill={isPlayer ? '#4A3728' : '#2C3E50'}
      />

      {/* Eyes */}
      <G>
        <Ellipse cx={size * 0.42} cy={size * 0.2} rx={size * 0.045} ry={size * 0.055} fill="#1A1A1A" />
        <Circle cx={size * 0.41} cy={size * 0.19} r={size * 0.015} fill="#FFFFFF" />
        <Ellipse cx={size * 0.58} cy={size * 0.2} rx={size * 0.045} ry={size * 0.055} fill="#1A1A1A" />
        <Circle cx={size * 0.57} cy={size * 0.19} r={size * 0.015} fill="#FFFFFF" />
      </G>

      {/* Smile */}
      <Path
        d={`M${size * 0.42} ${size * 0.28} Q${size * 0.5} ${size * 0.33} ${size * 0.58} ${size * 0.28}`}
        stroke="#E07A5F"
        strokeWidth={size * 0.025}
        fill="none"
        strokeLinecap="round"
      />

      {/* Blush */}
      <Ellipse cx={size * 0.35} cy={size * 0.26} rx={size * 0.03} ry={size * 0.02} fill="rgba(255,150,150,0.4)" />
      <Ellipse cx={size * 0.65} cy={size * 0.26} rx={size * 0.03} ry={size * 0.02} fill="rgba(255,150,150,0.4)" />

      {/* Arms */}
      <Ellipse cx={size * 0.18} cy={size * 0.55} rx={size * 0.08} ry={size * 0.12} fill={bodyColor} />
      <Ellipse cx={size * 0.82} cy={size * 0.55} rx={size * 0.08} ry={size * 0.12} fill={bodyColor} />

      {/* Feet */}
      <Ellipse cx={size * 0.38} cy={size * 0.92} rx={size * 0.1} ry={size * 0.05} fill="#1A1A1A" />
      <Ellipse cx={size * 0.62} cy={size * 0.92} rx={size * 0.1} ry={size * 0.05} fill="#1A1A1A" />

      {/* Employee badge for NPCs */}
      {!isPlayer && (
        <G>
          <Rect x={size * 0.44} y={size * 0.38} width={size * 0.12} height={size * 0.15} fill="#FFDF00" rx={2} />
          <Rect x={size * 0.46} y={size * 0.42} width={size * 0.08} height={size * 0.02} fill="#1A1A1A" />
          <Rect x={size * 0.46} y={size * 0.46} width={size * 0.06} height={size * 0.02} fill="#1A1A1A" />
        </G>
      )}
    </G>
  );
};

// ATM Machine
// x, y = center of the cell where ATM should be placed
const ATMMachine = ({ x, y, size = CELL_SIZE }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x - size/2}, ${y - size/2})`}>
    <Defs>
      <LinearGradient id="atmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#4A5568" />
        <Stop offset="50%" stopColor="#2D3748" />
        <Stop offset="100%" stopColor="#1A202C" />
      </LinearGradient>
    </Defs>

    <Rect x={size * 0.1} y={0} width={size * 0.8} height={size * 0.9} fill="url(#atmGrad)" rx={6} />
    <Rect x={size * 0.18} y={size * 0.08} width={size * 0.64} height={size * 0.35} fill="#00b5b0" rx={4} />
    <Rect x={size * 0.2} y={size * 0.1} width={size * 0.6} height={size * 0.31} fill="#00D4C8" rx={3} />
    <Rect x={size * 0.2} y={size * 0.48} width={size * 0.35} height={size * 0.32} fill="#1A1A1A" rx={3} />
    {[0,1,2].map(row => [0,1,2].map(col => (
      <Circle
        key={`${row}-${col}`}
        cx={size * (0.27 + col * 0.1)}
        cy={size * (0.55 + row * 0.1)}
        r={size * 0.03}
        fill="#4A5568"
      />
    )))}
    <Rect x={size * 0.6} y={size * 0.52} width={size * 0.22} height={size * 0.06} fill="#0D0D0D" rx={2} />
    <Rect x={size * 0.6} y={size * 0.65} width={size * 0.22} height={size * 0.1} fill="#0D0D0D" rx={2} />
    <Rect x={size * 0.35} y={size * 0.82} width={size * 0.3} height={size * 0.04} fill="#FFDF00" rx={2} />
  </G>
);

// Sofa/Couch decoration
const Sofa = ({ x, y, width = CELL_SIZE * 1.2, height = CELL_SIZE * 0.5, color = '#8B4513', rotation = 0 }: { x: number; y: number; width?: number; height?: number; color?: string; rotation?: number }) => (
  <G transform={`translate(${x}, ${y}) rotate(${rotation})`}>
    <G transform={`translate(${-width/2}, ${-height/2})`}>
      {/* Sofa base */}
      <Rect x={0} y={height * 0.3} width={width} height={height * 0.7} fill={color} rx={4} />
      {/* Sofa back */}
      <Rect x={0} y={0} width={width} height={height * 0.5} fill={color} rx={4} />
      {/* Cushions */}
      <Rect x={width * 0.05} y={height * 0.35} width={width * 0.4} height={height * 0.5} fill="#A0522D" rx={3} />
      <Rect x={width * 0.55} y={height * 0.35} width={width * 0.4} height={height * 0.5} fill="#A0522D" rx={3} />
      {/* Armrests */}
      <Rect x={-width * 0.05} y={height * 0.2} width={width * 0.12} height={height * 0.7} fill={color} rx={3} />
      <Rect x={width * 0.93} y={height * 0.2} width={width * 0.12} height={height * 0.7} fill={color} rx={3} />
    </G>
  </G>
);

// Plant decoration
const Plant = ({ x, y, size = CELL_SIZE * 0.5 }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x - size/2}, ${y - size/2})`}>
    {/* Pot */}
    <Path
      d={`M${size * 0.25} ${size * 0.6} L${size * 0.3} ${size} L${size * 0.7} ${size} L${size * 0.75} ${size * 0.6} Z`}
      fill="#D2691E"
    />
    <Rect x={size * 0.2} y={size * 0.55} width={size * 0.6} height={size * 0.1} fill="#CD853F" rx={2} />
    {/* Leaves */}
    <Ellipse cx={size * 0.5} cy={size * 0.35} rx={size * 0.25} ry={size * 0.2} fill="#228B22" />
    <Ellipse cx={size * 0.3} cy={size * 0.4} rx={size * 0.18} ry={size * 0.15} fill="#2E8B2E" />
    <Ellipse cx={size * 0.7} cy={size * 0.4} rx={size * 0.18} ry={size * 0.15} fill="#2E8B2E" />
    <Ellipse cx={size * 0.4} cy={size * 0.25} rx={size * 0.15} ry={size * 0.12} fill="#32CD32" />
    <Ellipse cx={size * 0.6} cy={size * 0.25} rx={size * 0.15} ry={size * 0.12} fill="#32CD32" />
    <Ellipse cx={size * 0.5} cy={size * 0.15} rx={size * 0.12} ry={size * 0.1} fill="#3CB371" />
  </G>
);

// Rug/Carpet decoration
const Rug = ({ x, y, width = CELL_SIZE * 2, height = CELL_SIZE * 1.2, color = '#CD5C5C' }: { x: number; y: number; width?: number; height?: number; color?: string }) => (
  <G transform={`translate(${x - width/2}, ${y - height/2})`}>
    {/* Main rug */}
    <Rect x={0} y={0} width={width} height={height} fill={color} rx={4} opacity={0.8} />
    {/* Border */}
    <Rect x={width * 0.05} y={height * 0.08} width={width * 0.9} height={height * 0.84} fill="none" stroke="#8B0000" strokeWidth={2} rx={2} />
    {/* Pattern lines */}
    <Rect x={width * 0.1} y={height * 0.15} width={width * 0.8} height={height * 0.02} fill="#FFD700" opacity={0.6} />
    <Rect x={width * 0.1} y={height * 0.83} width={width * 0.8} height={height * 0.02} fill="#FFD700" opacity={0.6} />
  </G>
);

// Coffee Table
const CoffeeTable = ({ x, y, width = CELL_SIZE * 0.6, height = CELL_SIZE * 0.4 }: { x: number; y: number; width?: number; height?: number }) => (
  <G transform={`translate(${x - width/2}, ${y - height/2})`}>
    {/* Table top */}
    <Rect x={0} y={0} width={width} height={height} fill="#5D4037" rx={3} />
    {/* Table surface highlight */}
    <Rect x={width * 0.1} y={height * 0.1} width={width * 0.8} height={height * 0.3} fill="#6D4C41" rx={2} />
    {/* Magazine/decoration on table */}
    <Rect x={width * 0.3} y={height * 0.2} width={width * 0.4} height={height * 0.25} fill="#FFDF00" rx={1} />
  </G>
);

// Water Dispenser
const WaterDispenser = ({ x, y, size = CELL_SIZE * 0.4 }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x - size/2}, ${y - size})`}>
    {/* Base */}
    <Rect x={size * 0.15} y={size * 0.7} width={size * 0.7} height={size * 0.3} fill="#E0E0E0" rx={2} />
    {/* Body */}
    <Rect x={size * 0.2} y={size * 0.3} width={size * 0.6} height={size * 0.45} fill="#BDBDBD" rx={2} />
    {/* Water bottle */}
    <Ellipse cx={size * 0.5} cy={size * 0.15} rx={size * 0.25} ry={size * 0.15} fill="#87CEEB" opacity={0.7} />
    <Rect x={size * 0.3} y={size * 0.1} width={size * 0.4} height={size * 0.25} fill="#87CEEB" opacity={0.7} rx={2} />
    {/* Tap */}
    <Rect x={size * 0.6} y={size * 0.5} width={size * 0.15} height={size * 0.08} fill="#424242" rx={1} />
  </G>
);

// Wall Poster/Frame decoration
const WallPoster = ({ x, y, width = CELL_SIZE * 0.6, height = CELL_SIZE * 0.5, color = '#FFDF00' }: { x: number; y: number; width?: number; height?: number; color?: string }) => (
  <G transform={`translate(${x - width/2}, ${y - height/2})`}>
    {/* Frame */}
    <Rect x={0} y={0} width={width} height={height} fill="#8B4513" rx={2} />
    {/* Inner content */}
    <Rect x={width * 0.1} y={height * 0.1} width={width * 0.8} height={height * 0.8} fill={color} rx={1} />
    {/* Simple decoration inside */}
    <Rect x={width * 0.2} y={height * 0.3} width={width * 0.6} height={height * 0.1} fill="rgba(0,0,0,0.2)" />
    <Rect x={width * 0.2} y={height * 0.5} width={width * 0.4} height={height * 0.1} fill="rgba(0,0,0,0.2)" />
  </G>
);

// Wall Clock decoration
const WallClock = ({ x, y, size = CELL_SIZE * 0.4 }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x}, ${y})`}>
    {/* Clock face */}
    <Circle cx={0} cy={0} r={size / 2} fill="#FFFFFF" stroke="#333" strokeWidth={2} />
    {/* Hour marks */}
    <Rect x={-1} y={-size * 0.4} width={2} height={size * 0.1} fill="#333" />
    <Rect x={-1} y={size * 0.3} width={2} height={size * 0.1} fill="#333" />
    <Rect x={-size * 0.4} y={-1} width={size * 0.1} height={2} fill="#333" />
    <Rect x={size * 0.3} y={-1} width={size * 0.1} height={2} fill="#333" />
    {/* Hands */}
    <Rect x={-1} y={-size * 0.3} width={2} height={size * 0.3} fill="#333" />
    <Rect x={-1} y={-size * 0.2} width={2} height={size * 0.25} fill="#E31C79" />
    {/* Center dot */}
    <Circle cx={0} cy={0} r={size * 0.06} fill="#333" />
  </G>
);

// Floor Lamp decoration
const FloorLamp = ({ x, y, size = CELL_SIZE * 0.5 }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x - size/2}, ${y - size})`}>
    {/* Base */}
    <Ellipse cx={size / 2} cy={size * 0.95} rx={size * 0.25} ry={size * 0.05} fill="#424242" />
    {/* Pole */}
    <Rect x={size * 0.45} y={size * 0.3} width={size * 0.1} height={size * 0.65} fill="#616161" />
    {/* Lamp shade */}
    <Path
      d={`M${size * 0.2} ${size * 0.3} L${size * 0.3} ${size * 0.05} L${size * 0.7} ${size * 0.05} L${size * 0.8} ${size * 0.3} Z`}
      fill="#FFF9C4"
    />
    {/* Light glow */}
    <Ellipse cx={size / 2} cy={size * 0.2} rx={size * 0.15} ry={size * 0.1} fill="#FFEB3B" opacity={0.5} />
  </G>
);

// Trash bin decoration
const TrashBin = ({ x, y, size = CELL_SIZE * 0.25 }: { x: number; y: number; size?: number }) => (
  <G transform={`translate(${x - size/2}, ${y - size})`}>
    <Rect x={0} y={size * 0.15} width={size} height={size * 0.85} fill="#757575" rx={2} />
    <Rect x={-size * 0.05} y={0} width={size * 1.1} height={size * 0.2} fill="#616161" rx={2} />
  </G>
);

// Help Desk Station - horizontal orientation with label ON the counter
const HelpDeskStation = ({ x, y, size = CELL_SIZE }: { x: number; y: number; size?: number }) => (
  <G>
    {/* Counter desk */}
    <G transform={`translate(${x - size * 1.2}, ${y - size * 0.3})`}>
      <Defs>
        <LinearGradient id="helpDeskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#E8E8E8" />
        </LinearGradient>
      </Defs>
      {/* Main desk */}
      <Rect x={0} y={0} width={size * 2.4} height={size * 0.6} fill="url(#helpDeskGrad)" rx={4} />
      {/* Label ON the white part of the counter */}
      <Rect x={size * 0.3} y={size * 0.08} width={size * 1.8} height={size * 0.28} fill="#1a5f7a" rx={3} />
      <SvgText
        x={size * 1.2}
        y={size * 0.28}
        fontSize={size * 0.15}
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        SERVICIO AL CLIENTE
      </SvgText>
      {/* Yellow accent strip */}
      <Rect x={0} y={size * 0.42} width={size * 2.4} height={size * 0.18} fill="#FFDF00" rx={0} />
      {/* Glass divider */}
      <Rect
        x={size * 0.1}
        y={-size * 0.7}
        width={size * 2.2}
        height={size * 0.65}
        fill="rgba(200, 230, 255, 0.3)"
        stroke="rgba(150, 200, 230, 0.5)"
        strokeWidth={2}
        rx={4}
      />
    </G>
  </G>
);

// Payment Station (Caja) - horizontal orientation like HelpDesk
const PaymentStation = ({ x, y, size = CELL_SIZE }: { x: number; y: number; size?: number }) => (
  <G>
    {/* Counter desk - horizontal orientation */}
    <G transform={`translate(${x - size * 1.2}, ${y - size * 0.3})`}>
      <Defs>
        <LinearGradient id="paymentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#E8E8E8" />
        </LinearGradient>
      </Defs>
      {/* Main desk - horizontal */}
      <Rect x={0} y={0} width={size * 2.4} height={size * 0.6} fill="url(#paymentGrad)" rx={4} />
      {/* Label ON the white part of the counter */}
      <Rect x={size * 0.3} y={size * 0.08} width={size * 1.8} height={size * 0.28} fill="#E31C79" rx={3} />
      <SvgText
        x={size * 1.2}
        y={size * 0.27}
        fontSize={size * 0.2}
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
        rotation={0}
      >
        CAJA
      </SvgText>
      {/* Yellow accent strip */}
      <Rect x={0} y={size * 0.42} width={size * 2.4} height={size * 0.18} fill="#FFDF00" rx={0} />
      {/* Glass divider */}
      <Rect
        x={size * 0.1}
        y={-size * 0.7}
        width={size * 2.2}
        height={size * 0.65}
        fill="rgba(200, 230, 255, 0.3)"
        stroke="rgba(150, 200, 230, 0.5)"
        strokeWidth={2}
        rx={4}
      />
    </G>
  </G>
);

// ATM Machine with label ON the machine
const ATMMachineWithLabel = ({ x, y, size = CELL_SIZE }: { x: number; y: number; size?: number }) => (
  <G>
    {/* ATM Body */}
    <G transform={`translate(${x - size/2}, ${y - size/2})`}>
      <Defs>
        <LinearGradient id="atmGradLabel" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#4A90D9" />
          <Stop offset="100%" stopColor="#2E5C8A" />
        </LinearGradient>
      </Defs>
      {/* Main body */}
      <Rect x={0} y={0} width={size} height={size * 1.2} fill="url(#atmGradLabel)" rx={6} />
      {/* Label ON the ATM body - at top */}
      <Rect x={size * 0.15} y={size * 0.02} width={size * 0.7} height={size * 0.18} fill="#1a5f7a" rx={3} />
      <SvgText
        x={size * 0.5}
        y={size * 0.15}
        fontSize={size * 0.12}
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        ATM
      </SvgText>
      {/* Screen */}
      <Rect x={size * 0.15} y={size * 0.22} width={size * 0.7} height={size * 0.38} fill="#1a1a2e" rx={4} />
      <Rect x={size * 0.2} y={size * 0.26} width={size * 0.6} height={size * 0.3} fill="#00ff88" opacity={0.3} rx={2} />
      {/* Keypad */}
      <Rect x={size * 0.2} y={size * 0.65} width={size * 0.6} height={size * 0.3} fill="#333" rx={3} />
      {/* Card slot */}
      <Rect x={size * 0.35} y={size * 1.0} width={size * 0.3} height={size * 0.08} fill="#222" rx={2} />
      {/* Cash dispenser */}
      <Rect x={size * 0.25} y={size * 1.1} width={size * 0.5} height={size * 0.06} fill="#111" rx={1} />
    </G>
  </G>
);

interface BankMapGameProps {
  exercise: {
    id: string;
    type: 'bank-map';
    title: string;
    statement: string;
    targetStation: keyof typeof STATIONS;
    dialogue: {
      speaker: string;
      messages: string[];
    };
    feedback: {
      correct: string;
      incorrect: string;
    };
  };
  onComplete: (points?: number) => void;
}

const BankMapGame: React.FC<BankMapGameProps> = ({ exercise, onComplete }) => {
  // Use global position for persistence between exercises
  const [playerPos, setPlayerPos] = useState(globalPlayerPosition);
  const [isMoving, setIsMoving] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongStation, setWrongStation] = useState<string | null>(null);

  const playerX = useSharedValue(playerPos.gridX * CELL_SIZE + CELL_SIZE / 2);
  const playerY = useSharedValue(playerPos.gridY * CELL_SIZE + CELL_SIZE / 2);

  const indicatorBounce = useSharedValue(0);

  // Initialize player position from global state
  useEffect(() => {
    playerX.value = globalPlayerPosition.gridX * CELL_SIZE + CELL_SIZE / 2;
    playerY.value = globalPlayerPosition.gridY * CELL_SIZE + CELL_SIZE / 2;
    setPlayerPos(globalPlayerPosition);
  }, []);

  useEffect(() => {
    indicatorBounce.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    return () => {
      cancelAnimation(indicatorBounce);
    };
  }, []);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorBounce.value }],
  }));

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: playerX.value - CELL_SIZE * 0.4,
    top: playerY.value - CELL_SIZE * 0.5,
    zIndex: 100,
  }));

  // Animate along path (for general movement, not to stations)
  const animateAlongPath = useCallback((path: { x: number; y: number }[], index: number) => {
    if (index >= path.length) {
      setIsMoving(false);
      setCurrentPath([]);
      setPathIndex(0);

      const finalPos = path[path.length - 1];

      // Update global position
      globalPlayerPosition = { gridX: finalPos.x, gridY: finalPos.y };
      setPlayerPos(globalPlayerPosition);
      return;
    }

    const nextPos = path[index];
    const currentPos = index > 0 ? path[index - 1] : { x: playerPos.gridX, y: playerPos.gridY };
    const targetX = nextPos.x * CELL_SIZE + CELL_SIZE / 2;
    const targetY = nextPos.y * CELL_SIZE + CELL_SIZE / 2;

    // Check if moving horizontally or vertically
    const isHorizontalMove = nextPos.x !== currentPos.x;
    const moveDuration = isHorizontalMove ? 380 : 180; // Slower horizontal movement

    playerX.value = withTiming(targetX, { duration: moveDuration, easing: Easing.linear });
    playerY.value = withTiming(
      targetY,
      { duration: moveDuration, easing: Easing.linear },
      () => {
        runOnJS(animateAlongPath)(path, index + 1);
      }
    );
  }, [playerPos]);

  // Animate along path and trigger station interaction at the end
  const animateAlongPathToStation = useCallback((path: { x: number; y: number }[], index: number, targetStationKey: keyof typeof STATIONS) => {
    if (index >= path.length) {
      setIsMoving(false);
      setCurrentPath([]);
      setPathIndex(0);

      const finalPos = path[path.length - 1];

      // Update global position
      globalPlayerPosition = { gridX: finalPos.x, gridY: finalPos.y };
      setPlayerPos(globalPlayerPosition);

      // Trigger station interaction
      if (targetStationKey === exercise.targetStation) {
        setHasReachedTarget(true);
        setShowDialogue(true);
      } else {
        setWrongStation(targetStationKey);
        setShowFeedback(true);
        setTimeout(() => {
          setShowFeedback(false);
          setWrongStation(null);
        }, 2500);
      }
      return;
    }

    const nextPos = path[index];
    const currentPos = index > 0 ? path[index - 1] : { x: playerPos.gridX, y: playerPos.gridY };
    const targetX = nextPos.x * CELL_SIZE + CELL_SIZE / 2;
    const targetY = nextPos.y * CELL_SIZE + CELL_SIZE / 2;

    // Check if moving horizontally or vertically
    const isHorizontalMove = nextPos.x !== currentPos.x;
    const moveDuration = isHorizontalMove ? 380 : 180;

    playerX.value = withTiming(targetX, { duration: moveDuration, easing: Easing.linear });
    playerY.value = withTiming(
      targetY,
      { duration: moveDuration, easing: Easing.linear },
      () => {
        runOnJS(animateAlongPathToStation)(path, index + 1, targetStationKey);
      }
    );
  }, [exercise.targetStation, playerPos]);

  const getStationAtPosition = (gridX: number, gridY: number): string | null => {
    for (const [key, station] of Object.entries(STATIONS)) {
      if (station.gridX === gridX && station.gridY === gridY) {
        return key;
      }
    }
    return null;
  };

  // Find the best adjacent cell to a station
  const findAdjacentCell = useCallback((stationX: number, stationY: number): { x: number; y: number } | null => {
    const directions = [
      { x: 0, y: 1 },   // below
      { x: 0, y: -1 },  // above
      { x: -1, y: 0 },  // left
      { x: 1, y: 0 },   // right
    ];

    let bestCell: { x: number; y: number } | null = null;
    let bestDistance = Infinity;

    for (const dir of directions) {
      const adjX = stationX + dir.x;
      const adjY = stationY + dir.y;

      // Check if this adjacent cell is valid (not obstacle, in bounds)
      if (adjX >= 0 && adjX < GRID_COLS && adjY >= 0 && adjY < GRID_ROWS) {
        if (!OBSTACLES.has(`${adjX},${adjY}`)) {
          const distance = Math.abs(adjX - playerPos.gridX) + Math.abs(adjY - playerPos.gridY);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestCell = { x: adjX, y: adjY };
          }
        }
      }
    }

    return bestCell;
  }, [playerPos]);

  const handleStationPress = useCallback((stationKey: keyof typeof STATIONS) => {
    if (isMoving || showDialogue || showFeedback) return;

    const station = STATIONS[stationKey];

    // Find adjacent cell to the station
    const targetCell = findAdjacentCell(station.gridX, station.gridY);
    if (!targetCell) return;

    // Check if player is already adjacent to the station
    const isAdjacent = Math.abs(playerPos.gridX - station.gridX) + Math.abs(playerPos.gridY - station.gridY) === 1;

    if (isAdjacent) {
      // Already at station, trigger interaction
      if (stationKey === exercise.targetStation) {
        setHasReachedTarget(true);
        setShowDialogue(true);
      } else {
        setWrongStation(stationKey);
        setShowFeedback(true);
        setTimeout(() => {
          setShowFeedback(false);
          setWrongStation(null);
        }, 2500);
      }
      return;
    }

    const path = findPath(
      { x: playerPos.gridX, y: playerPos.gridY },
      targetCell
    );

    if (path.length > 1) {
      setIsMoving(true);
      setCurrentPath(path);
      // Store which station we're heading to
      animateAlongPathToStation(path, 1, stationKey);
    }
  }, [isMoving, showDialogue, showFeedback, playerPos, findAdjacentCell, exercise.targetStation]);

  const handleCellPress = useCallback((gridX: number, gridY: number) => {
    if (isMoving || showDialogue || showFeedback) return;
    if (OBSTACLES.has(`${gridX},${gridY}`)) return;

    const path = findPath(
      { x: playerPos.gridX, y: playerPos.gridY },
      { x: gridX, y: gridY }
    );

    if (path.length > 1) {
      setIsMoving(true);
      setCurrentPath(path);
      animateAlongPath(path, 1);
    }
  }, [isMoving, showDialogue, showFeedback, playerPos, animateAlongPath]);

  const handleDialogueNext = () => {
    if (dialogueIndex < exercise.dialogue.messages.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handleDialogueComplete = () => {
    setShowDialogue(false);
    setTimeout(() => {
      onComplete(20);
    }, 500);
  };

  const renderClickableAreas = () => {
    const areas = [];

    // Render clickable cells for the entire grid
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        const isObstacle = OBSTACLES.has(`${x},${y}`);
        const isStation = getStationAtPosition(x, y);
        const isTarget = isStation === exercise.targetStation;

        if (!isObstacle && !isStation) {
          areas.push(
            <TouchableOpacity
              key={`cell-${x}-${y}`}
              style={[
                styles.clickableCell,
                {
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                },
              ]}
              onPress={() => handleCellPress(x, y)}
              disabled={isMoving || showDialogue || showFeedback}
              activeOpacity={0.3}
            />
          );
        }
      }
    }

    // Add station clickable areas
    Object.entries(STATIONS).forEach(([key, station]) => {
      if (key === 'entrance') return;

      const stationKey = key as keyof typeof STATIONS;
      const isTarget = stationKey === exercise.targetStation;

      // Get position and size based on station type
      let clickableStyle;
      if (key === 'atm') {
        // ATM - center the clickable area on the ATM asset
        // ATM is drawn at cell center with size 1.1, so center the box around that
        clickableStyle = {
          left: station.gridX * CELL_SIZE + CELL_SIZE * 0.5 - CELL_SIZE * 0.8,
          top: station.gridY * CELL_SIZE + CELL_SIZE * 0.5 - CELL_SIZE * 0.8,
          width: CELL_SIZE * 1.6,
          height: CELL_SIZE * 1.8,
        };
      } else {
        // Default for other stations
        clickableStyle = {
          left: station.gridX * CELL_SIZE - CELL_SIZE * 0.3,
          top: station.gridY * CELL_SIZE - CELL_SIZE * 0.5,
          width: CELL_SIZE * 1.6,
          height: CELL_SIZE * 1.5,
        };
      }

      areas.push(
        <TouchableOpacity
          key={`station-${key}`}
          style={[
            styles.stationClickable,
            clickableStyle,
            isTarget && !hasReachedTarget && styles.targetStation,
          ]}
          onPress={() => handleStationPress(stationKey)}
          disabled={isMoving || showDialogue || showFeedback}
          activeOpacity={0.6}
        />
      );
    });

    return areas;
  };

  // Render path preview
  const renderPathPreview = () => {
    if (currentPath.length === 0) return null;

    return currentPath.map((point, index) => {
      if (index === 0) return null;
      const centerX = point.x * CELL_SIZE + CELL_SIZE / 2;
      const centerY = point.y * CELL_SIZE + CELL_SIZE / 2;
      const dotSize = CELL_SIZE * 0.2;
      return (
        <Circle
          key={`path-${index}`}
          cx={centerX}
          cy={centerY}
          r={dotSize / 2}
          fill="rgba(88, 204, 2, 0.4)"
        />
      );
    });
  };

  const targetStation = STATIONS[exercise.targetStation];

  // Calculate indicator position based on station type to center it on the asset
  const getIndicatorPosition = () => {
    const baseX = targetStation.gridX * CELL_SIZE;
    const baseY = targetStation.gridY * CELL_SIZE;

    switch (exercise.targetStation) {
      case 'atm':
        // ATM is centered on its cell - indicator centered on ATM body
        return {
          left: baseX + CELL_SIZE / 2 - 16,
          top: baseY - CELL_SIZE * 0.15,
        };
      case 'helpDesk':
        // Help desk is horizontal, spans multiple cells, centered on the NPC
        return {
          left: baseX + CELL_SIZE / 2 - 16,
          top: baseY - CELL_SIZE * 0.8,
        };
      case 'paymentStation':
        // Payment station is vertical, employee on right side
        return {
          left: baseX + CELL_SIZE / 2 - 16,
          top: baseY - CELL_SIZE * 0.5,
        };
      default:
        return {
          left: baseX + CELL_SIZE / 2 - 16,
          top: baseY - 25,
        };
    }
  };

  const indicatorPosition = getIndicatorPosition();

  // Debug logging
  console.log('Frame dimensions:', { FRAME_WIDTH, FRAME_HEIGHT });
  console.log('Map dimensions:', { MAP_WIDTH, MAP_HEIGHT });
  console.log('Grid:', { GRID_COLS, GRID_ROWS, CELL_SIZE });

  return (
    <ThemedView style={styles.container}>
      {/* Frame takes full area */}
      <View style={styles.frameContainer}>
        {/* Frame Image */}
        <Image
          source={require('../../../assets/images/Frame.png')}
          style={styles.frameSvg}
          resizeMode="stretch"
        />
        {/* Map positioned inside the frame */}
        <View style={styles.mapContainer}>
          {/* Bank Map SVG */}
          <Svg width={MAP_WIDTH} height={MAP_HEIGHT} style={styles.map}>
          <Defs>
            <LinearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#F5F5F5" />
              <Stop offset="100%" stopColor="#E0E0E0" />
            </LinearGradient>
          </Defs>

          {/* Floor */}
          <Rect x={0} y={0} width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#floorGrad)" />

          {/* Grid lines (subtle) */}
          {Array.from({ length: GRID_COLS + 1 }).map((_, i) => (
            <Rect key={`v${i}`} x={i * CELL_SIZE - 0.5} y={0} width={1} height={MAP_HEIGHT} fill="rgba(0,0,0,0.03)" />
          ))}
          {Array.from({ length: GRID_ROWS + 1 }).map((_, i) => (
            <Rect key={`h${i}`} x={0} y={i * CELL_SIZE - 0.5} width={MAP_WIDTH} height={1} fill="rgba(0,0,0,0.03)" />
          ))}

          {/* ===== DECORATIONS ===== */}

          {/* ===== WAITING AREA - Bottom right quadrant ===== */}

          {/* Waiting area rug */}
          <Rug
            x={5 * CELL_SIZE + CELL_SIZE / 2}
            y={(GRID_ROWS - 3) * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 2.2}
            height={CELL_SIZE * 2.8}
            color="#8B0000"
          />

          {/* Waiting area sofas */}
          <Sofa
            x={5 * CELL_SIZE + CELL_SIZE / 2}
            y={(GRID_ROWS - 4) * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 1.3}
            height={CELL_SIZE * 0.55}
            color="#4A4A4A"
          />
          <Sofa
            x={5 * CELL_SIZE + CELL_SIZE / 2}
            y={(GRID_ROWS - 2) * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 1.3}
            height={CELL_SIZE * 0.55}
            color="#4A4A4A"
          />

          {/* Coffee table between sofas */}
          <CoffeeTable
            x={5 * CELL_SIZE + CELL_SIZE / 2}
            y={(GRID_ROWS - 3) * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 0.6}
            height={CELL_SIZE * 0.35}
          />

          {/* Left wall sofas - facing right */}
          <Sofa
            x={0 * CELL_SIZE + CELL_SIZE / 2}
            y={5 * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 0.9}
            height={CELL_SIZE * 0.5}
            color="#4A4A4A"
            rotation={90}
          />
          <Sofa
            x={0 * CELL_SIZE + CELL_SIZE / 2}
            y={7 * CELL_SIZE + CELL_SIZE / 2}
            width={CELL_SIZE * 0.9}
            height={CELL_SIZE * 0.5}
            color="#4A4A4A"
            rotation={90}
          />

          {/* ===== WALL DECORATIONS ===== */}

          {/* Plants - against walls */}
          <Plant
            x={0 * CELL_SIZE + CELL_SIZE * 0.5}
            y={0 * CELL_SIZE + CELL_SIZE * 0.9}
            size={CELL_SIZE * 0.5}
          />
          <Plant
            x={(GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.4}
            y={0 * CELL_SIZE + CELL_SIZE * 0.9}
            size={CELL_SIZE * 0.5}
          />
          <Plant
            x={(GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.75}
            y={3 * CELL_SIZE + CELL_SIZE * 0.6}
            size={CELL_SIZE * 0.45}
          />

          {/* Water dispenser - against right wall */}
          <WaterDispenser
            x={(GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.8}
            y={(GRID_ROWS - 5) * CELL_SIZE + CELL_SIZE * 0.8}
            size={CELL_SIZE * 0.8}
          />

          {/* Floor lamp - corner */}
          <FloorLamp
            x={(GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.75}
            y={(GRID_ROWS - 1) * CELL_SIZE + CELL_SIZE * 0.9}
            size={CELL_SIZE * 0.6}
          />

          {/* Path preview */}
          {renderPathPreview()}

          {/* ===== STATIONS ===== */}

          {/* ATM Machine with label - left wall */}
          <ATMMachineWithLabel
            x={STATIONS.atm.gridX * CELL_SIZE + CELL_SIZE / 2}
            y={STATIONS.atm.gridY * CELL_SIZE + CELL_SIZE / 2}
            size={CELL_SIZE * 1.1}
          />

          {/* Help Desk - horizontal at top center */}
          <DuoCharacter
            x={STATIONS.helpDesk.gridX * CELL_SIZE + CELL_SIZE / 2}
            y={(STATIONS.helpDesk.gridY - 0.5) * CELL_SIZE + CELL_SIZE * 0.3}
            size={CELL_SIZE * 0.75}
            isPlayer={false}
          />
          <HelpDeskStation
            x={STATIONS.helpDesk.gridX * CELL_SIZE + CELL_SIZE / 2}
            y={STATIONS.helpDesk.gridY * CELL_SIZE + CELL_SIZE / 2}
            size={CELL_SIZE}
          />

          {/* Payment Station (Caja) - horizontal like HelpDesk */}
          <DuoCharacter
            x={STATIONS.paymentStation.gridX * CELL_SIZE + CELL_SIZE / 2}
            y={(STATIONS.paymentStation.gridY - 0.5) * CELL_SIZE + CELL_SIZE * 0.3}
            size={CELL_SIZE * 0.75}
            isPlayer={false}
          />
          <PaymentStation
            x={STATIONS.paymentStation.gridX * CELL_SIZE + CELL_SIZE / 2}
            y={STATIONS.paymentStation.gridY * CELL_SIZE + CELL_SIZE / 2}
            size={CELL_SIZE}
          />

          {/* Entrance marker */}
          <Rect
            x={STATIONS.entrance.gridX * CELL_SIZE + CELL_SIZE * 0.15}
            y={STATIONS.entrance.gridY * CELL_SIZE + CELL_SIZE * 0.75}
            width={CELL_SIZE * 0.7}
            height={CELL_SIZE * 0.2}
            fill="#00b5b0"
            rx={4}
          />
        </Svg>

        {/* Clickable areas overlay */}
        {renderClickableAreas()}

        {/* Animated Player */}
        <Animated.View style={animatedPlayerStyle}>
          <Svg width={CELL_SIZE * 0.8} height={CELL_SIZE}>
            <DuoCharacter
              x={CELL_SIZE * 0.4}
              y={CELL_SIZE * 0.5}
              size={CELL_SIZE * 0.7}
              isPlayer={true}
            />
          </Svg>
        </Animated.View>

        {/* Animated target indicator */}
        {!hasReachedTarget && (
          <Animated.View
            style={[
              styles.indicatorOverlay,
              indicatorStyle,
              {
                left: indicatorPosition.left,
                top: indicatorPosition.top,
              }
            ]}
          >
            <View style={styles.exclamationBubble}>
              <Text style={styles.exclamationText}>!</Text>
            </View>
            <View style={styles.exclamationPointer} />
          </Animated.View>
        )}
        </View>
      </View>

      {/* Mission box - floating on top of frame */}
      <View style={styles.missionBox}>
        <Text style={styles.missionTitle}>{exercise.title}</Text>
        <Text style={styles.missionText}>{exercise.statement}</Text>
      </View>

      {/* Dialogue box - floating on top of frame */}
      {showDialogue && (
        <View style={styles.dialogueOverlay}>
          <View style={styles.dialogueBubble}>
            <Text style={styles.speakerName}>{exercise.dialogue.speaker}</Text>
            <Text style={styles.dialogueText}>{exercise.dialogue.messages[dialogueIndex]}</Text>
            <View style={styles.dialogueFooter}>
              <Text style={styles.dialogueProgress}>
                {dialogueIndex + 1} / {exercise.dialogue.messages.length}
              </Text>
              <TouchableOpacity
                style={styles.dialogueButton}
                onPress={dialogueIndex === exercise.dialogue.messages.length - 1 ? handleDialogueComplete : handleDialogueNext}
              >
                <Text style={styles.dialogueButtonText}>
                  {dialogueIndex === exercise.dialogue.messages.length - 1 ? 'Entendido ✓' : 'Siguiente →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Wrong station feedback - floating */}
      {showFeedback && wrongStation && (
        <View style={styles.feedbackOverlay}>
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>
              {exercise.feedback.incorrect}
            </Text>
          </View>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  frameContainer: {
    alignSelf: 'center',
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    position: 'relative',
  },
  frameSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
  },
  mapContainer: {
    position: 'absolute',
    top: FRAME_BORDER_TOP,
    left: FRAME_BORDER_LEFT,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  // Mission box - floating on top
  missionBox: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 100,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Dialogue overlay - floating on top
  dialogueOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  // Feedback overlay
  feedbackOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  feedbackBox: {
    backgroundColor: 'rgba(227, 4, 110, 0.95)',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  feedbackText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  clickableCell: {
    position: 'absolute',
  },
  stationClickable: {
    position: 'absolute',
    borderRadius: 8,
  },
  targetStation: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    borderStyle: 'dashed',
  },
  indicatorOverlay: {
    position: 'absolute',
    zIndex: 150,
    alignItems: 'center',
  },
  exclamationBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  exclamationText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  exclamationPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF6B6B',
    marginTop: -2,
  },
  dialogueBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  speakerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  dialogueText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  dialogueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogueProgress: {
    fontSize: 12,
    color: colors.graySoft,
  },
  dialogueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  dialogueButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BankMapGame;
