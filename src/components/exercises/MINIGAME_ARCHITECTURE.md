# Minigame & Exercise Architecture

This document outlines the architecture of the minigame and exercise system in the Bantrab LevelUp app. It is intended to guide developers (and other LLMs) in creating and integrating new exercises and minigames into the existing rapid-fire flow.

## 1. Overview

The exercise system is designed to be modular and data-driven. The core of the system is the `ExerciseScreen`, which acts as a "player" for a sequence of exercises. Each exercise is a self-contained component that receives its data and a callback function to signal its completion.

The main parts of the system are:

-   **`ExerciseScreen.tsx`**: The master screen that manages the sequence of exercises, the global score, and renders the current exercise component.
-   **`mockCreditExercises.ts`**: A data file that contains an array of exercise objects. Each object defines the type of the exercise and the data required for it.
-   **Exercise Components**: Individual React components for each type of exercise (e.g., `MultipleChoice.tsx`, `Swipe.tsx`). These components are responsible for rendering the exercise and handling user interaction.

## 2. How to Add a New Exercise

Adding a new exercise involves three main steps:

1.  Create the exercise component.
2.  Add the exercise data to the mock data file.
3.  Integrate the new component into the `ExerciseScreen`.

### Step 1: Create the Exercise Component

1.  Create a new file for your component in the `src/components/exercises` directory (e.g., `MyNewExercise.tsx`).
2.  The component will receive two props: `exercise` (an object containing the data for the exercise) and `onComplete` (a function to be called when the exercise is finished).
3.  Implement the UI and logic for your exercise.
4.  When the exercise is complete (e.g., the user has answered, or a timer has run out), call the `onComplete()` function. You can optionally pass a number to `onComplete` to award points (e.g., `onComplete(20)`).

**Example Component Structure:**

```tsx
// src/components/exercises/MyNewExercise.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const MyNewExercise = ({ exercise, onComplete }) => {
  // Your exercise logic here

  return (
    <View>
      <Text>{exercise.title}</Text>
      {/* Your exercise UI */}
      <Button title="Finish" onPress={() => onComplete(15)} />
    </View>
  );
};

export default MyNewExercise;
```

### Step 2: Add Exercise Data

1.  Open the `src/data/mockCreditExercises.ts` file.
2.  Add a new object to the `mockCreditExercises` array for your new exercise.
3.  The object must have a unique `id` and a `type` that you will use to identify your new exercise component.
4.  Add any other data that your component needs.

**Example Data Object:**

```ts
// src/data/mockCreditExercises.ts

export const mockCreditExercises = [
  // ... existing exercises
  {
    id: '6',
    type: 'my-new-exercise', // Use a unique type
    title: 'My New Exercise',
    // ... any other data your component needs
  },
];
```

### Step 3: Integrate into `ExerciseScreen`

1.  Open the `app/(tabs)/exercises.tsx` file.
2.  Import your new component.
3.  In the `renderExercise` function, add a new `case` to the `switch` statement for your new exercise `type`.

**Example Integration:**

```tsx
// app/(tabs)/exercises.tsx

// ... other imports
import MyNewExercise from '../../src/components/exercises/MyNewExercise';

const ExerciseScreen = () => {
  // ... existing code

  const renderExercise = () => {
    const exercise = sequence[currentIndex];
    switch (exercise.type) {
      // ... existing cases
      case 'my-new-exercise':
        return <MyNewExercise exercise={exercise} onComplete={handleComplete} />;
      default:
        return <ThemedText>Unknown exercise type</ThemedText>;
    }
  };

  // ... existing code
};
```

By following these steps, you can easily extend the exercise system with new and engaging minigames.
