# Bantrab Level Up App - Folder Structure

This document explains the folder structure of the React Native Expo application.

## Root Structure

```
bantrab-levelup-app/
├── app/                    # Expo Router app directory (navigation)
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Main tab (Roadmap screen)
│   │   └── explore.tsx    # Explore tab
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screen example
├── src/                   # Main source code directory
│   ├── screens/           # Screen components
│   ├── components/        # Reusable components
│   │   ├── roadmap/       # Roadmap-specific components
│   │   ├── common/        # Common/shared components
│   │   └── ui/            # UI building blocks
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Mock data and constants
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React Context providers
│   ├── styles/            # Global styles and themes
│   └── config/            # App configuration files
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # Expo template components
├── constants/             # App constants
└── hooks/                 # Expo template hooks
```

## Detailed Directory Descriptions

### `/app` - Expo Router
Contains the navigation structure using Expo Router's file-based routing system.
- Routes are automatically generated based on file structure
- `(tabs)` is a route group for tab navigation
- `_layout.tsx` files define layout components

### `/src` - Main Application Code

#### `/src/screens`
Full-screen components that represent entire pages/views.
- **RoadmapScreen.tsx**: Main roadmap view (Duolingo-style learning path)

#### `/src/components`
Reusable component library organized by feature:
- **roadmap/**: Roadmap-specific components
  - `RoadmapNode.tsx`: Individual node/level bubble
  - `PathLine.tsx`: Connecting lines between nodes
- **common/**: Shared components used across features
- **ui/**: Basic UI building blocks (buttons, cards, etc.)

#### `/src/types`
TypeScript type definitions and interfaces:
- **roadmap.ts**: Types for roadmap data structures
  - `NodeStatus`: Status enum for nodes
  - `RoadmapNode`: Individual node interface
  - `RoadmapLevel`: Level/section interface
  - `UserProgress`: User progress tracking

#### `/src/data`
Mock data and static content:
- **mockRoadmapData.ts**: Sample roadmap levels and user progress

#### `/src/utils`
Helper functions and utilities (to be added as needed)

#### `/src/hooks`
Custom React hooks for reusable logic (to be added as needed)

#### `/src/contexts`
React Context providers for global state (to be added as needed)

#### `/src/styles`
Global styles, theme definitions, and style utilities (to be added as needed)

#### `/src/config`
Configuration files for app settings (to be added as needed)

## Key Features

### Roadmap Screen
The main screen features a Duolingo-style learning path with:
- Color-coded nodes based on status (locked, available, in progress, completed)
- Zigzag path layout (alternating left/right)
- Progress tracking with XP points
- Interactive nodes with descriptions
- Level grouping with badges
- Connecting path lines

### Node States
- **Locked**: Gray, not accessible yet
- **Available**: Yellow, ready to start
- **In Progress**: Blue, currently active
- **Completed**: Green with checkmark

## TypeScript Paths
The app uses path aliases configured in `tsconfig.json`:
- `@/*` maps to the root directory
- Example: `import RoadmapScreen from '@/src/screens/RoadmapScreen'`

## Frontend-Only Architecture
This app is designed to work entirely on the frontend with no backend connection:
- All data is stored in local mock files
- State management happens in React (Context API can be added later)
- Data persistence can be added with AsyncStorage if needed

## Future Expansion
The folder structure is designed to scale. You can easily add:
- New screens in `/src/screens`
- New features in `/src/components/[feature-name]`
- Global state with Context in `/src/contexts`
- API integration in `/src/services` (when backend is added)
- Custom hooks in `/src/hooks`
- Utilities in `/src/utils`
