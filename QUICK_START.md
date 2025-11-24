# Quick Start Guide

## Running the App

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on specific platform**:
   ```bash
   npm run android   # Android
   npm run ios       # iOS
   npm run web       # Web
   ```

## Project Structure Overview

The app now features a **Duolingo-style roadmap** as the main screen with:

- **Roadmap Screen**: Learning path with nodes/levels
- **Interactive Nodes**: Click to view details
- **Progress Tracking**: XP points display
- **Multiple Levels**: Organized learning path

## Key Files to Know

### Screens
- `src/screens/RoadmapScreen.tsx` - Main roadmap view

### Components
- `src/components/roadmap/RoadmapNode.tsx` - Individual node bubble
- `src/components/roadmap/PathLine.tsx` - Connecting path

### Data & Types
- `src/types/roadmap.ts` - TypeScript interfaces
- `src/data/mockRoadmapData.ts` - Sample data

### Routing
- `app/(tabs)/index.tsx` - Entry point (now shows Roadmap)
- `app/(tabs)/_layout.tsx` - Tab navigation config

## Customizing the Roadmap

### Adding New Nodes
Edit `src/data/mockRoadmapData.ts`:

```typescript
{
  id: 'node-9',
  title: 'New Challenge',
  description: 'Your description',
  status: 'locked',
  position: { x: 0, y: 8 },
  level: 3,
  icon: '🎯',
  points: 50,
  connectedTo: ['node-10'],
}
```

### Adding New Levels
```typescript
{
  id: 'level-4',
  title: 'Advanced Topics',
  color: '#CE82FF',
  nodes: [ /* your nodes */ ]
}
```

### Modifying Colors
Node colors are defined in `src/components/roadmap/RoadmapNode.tsx`:
- Completed: `#58CC02` (green)
- In Progress: `#1CB0F6` (blue)
- Available: `#FFD900` (yellow)
- Locked: `#E5E5E5` (gray)

## Next Steps

### Recommended Additions
1. **Add more screens** in `src/screens/`
2. **Create global state** with Context in `src/contexts/`
3. **Add persistence** with AsyncStorage
4. **Create lesson screens** for node interactions
5. **Add animations** with React Native Reanimated

### Navigation
The app uses Expo Router. To add new screens:

1. Create file in `app/` directory
2. It automatically becomes a route
3. Navigate with: `router.push('/screen-name')`

## Development Tips

- Use `@/` prefix for imports (e.g., `@/src/screens/RoadmapScreen`)
- All frontend-only (no backend needed)
- Hot reload enabled - save files to see changes
- Check `FOLDER_STRUCTURE.md` for detailed architecture

## Troubleshooting

### Module not found
- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

### TypeScript errors
- Restart TS server in your IDE
- Check `tsconfig.json` paths

### App won't start
- Check Node version (should be LTS)
- Update Expo: `npm install expo@latest`
