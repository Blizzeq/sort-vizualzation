# 🎯 Sorting Algorithm Visualization App - Project Plan

## 📋 Overview
Single Page Application (SPA) for visualizing sorting algorithms with interactive controls and real-time statistics.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Charts**: Recharts (for statistics)

## 📁 Project Structure
```
sort-visualization/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── visualization/
│   │   │   ├── SortingCanvas.tsx
│   │   │   ├── ArrayBar.tsx
│   │   │   └── AnimationController.tsx
│   │   ├── controls/
│   │   │   ├── ControlPanel.tsx
│   │   │   ├── AlgorithmSelector.tsx
│   │   │   ├── ArraySizeSlider.tsx
│   │   │   └── SpeedControl.tsx
│   │   └── statistics/
│   │       ├── StatsPanel.tsx
│   │       └── ComparisonChart.tsx
│   ├── lib/
│   │   ├── algorithms/
│   │   │   ├── bubbleSort.ts
│   │   │   ├── quickSort.ts
│   │   │   ├── mergeSort.ts
│   │   │   ├── insertionSort.ts
│   │   │   ├── selectionSort.ts
│   │   │   └── types.ts
│   │   ├── store/
│   │   │   └── sortingStore.ts
│   │   └── utils/
│   │       └── arrayGenerator.ts
│   └── types/
│       └── index.ts
├── public/
├── package.json
├── tsconfig.json
└── PROJECT_PLAN.md
```

## 🎨 UI Layout Design

### Main Layout Components:
1. **Header**: App title and theme toggle
2. **Control Panel** (Top): 
   - Algorithm selector (dropdown)
   - Array size slider (10-100 elements)
   - Speed control slider
   - Action buttons (Generate New, Sort, Pause, Reset)
3. **Visualization Area** (Center):
   - Bar chart representation
   - Color coding: comparing (red), swapping (yellow), sorted (green)
   - Smooth animations
4. **Statistics Panel** (Bottom):
   - Real-time counters (comparisons, swaps, time)
   - Algorithm complexity info
   - Comparison chart (after completion)

## ⚙️ Core Features

1. **Algorithm Implementation**:
   - Generator functions for step-by-step execution
   - Yield at each comparison/swap
   - Track statistics during execution

2. **Visualization System**:
   - Dynamic bar heights based on array values
   - Color transitions for operations
   - Smooth animations using Framer Motion
   - Pause/resume functionality

3. **Control System**:
   - Generate random arrays
   - Adjustable array size
   - Variable animation speed
   - Start/pause/reset controls

4. **Statistics Tracking**:
   - Number of comparisons
   - Number of swaps
   - Execution time
   - Space complexity display
   - Time complexity display

## 🔄 Implementation Phases

### Phase 1: Project Setup ✅
- Initialize Next.js with TypeScript
- Install dependencies (shadcn/ui, Framer Motion, Zustand)
- Set up project structure
- Configure Tailwind CSS

### Phase 2: Core Algorithm Implementation
- Implement sorting algorithms as generators
- Create algorithm type definitions
- Build array generation utilities
- Set up state management store

### Phase 3: UI Components
- Install shadcn/ui components (Button, Slider, Select, Card)
- Create control panel components
- Build visualization canvas
- Implement array bar components

### Phase 4: Animation System
- Set up Framer Motion animations
- Implement step-by-step visualization
- Add pause/resume functionality
- Create smooth transitions

### Phase 5: Statistics & Polish
- Add real-time statistics tracking
- Implement comparison charts
- Add responsive design
- Performance optimizations
- Dark mode support

## 📊 Data Flow
1. User selects algorithm and array size
2. Generate random array
3. Start sorting process
4. Algorithm yields at each step
5. Visualization updates with animations
6. Statistics update in real-time
7. Display final results and comparisons

## 🎯 Key Components Details

### SortingCanvas
- Renders array as vertical bars
- Manages animation states
- Handles color coding

### ControlPanel
- Algorithm selection
- Speed/size controls
- Action buttons

### StatsPanel
- Live statistics
- Performance metrics
- Algorithm complexity info

### Store Structure
```typescript
{
  array: number[]
  sortingState: 'idle' | 'sorting' | 'paused' | 'completed'
  algorithm: AlgorithmType
  statistics: {
    comparisons: number
    swaps: number
    timeElapsed: number
  }
  speed: number
  arraySize: number
}
```

## 📱 Responsive Design
- Mobile: Vertical layout, simplified controls
- Tablet: Adjusted bar widths
- Desktop: Full features with side panels

## 🎨 Color Scheme
- **Idle bars**: bg-blue-400
- **Comparing**: bg-red-500
- **Swapping**: bg-yellow-500
- **Sorted**: bg-green-500
- **Current pivot**: bg-purple-500

## 📈 Performance Considerations
- Use `useMemo` for expensive calculations
- Implement virtual scrolling for large arrays
- Optimize re-renders with proper key props
- Use `requestAnimationFrame` for smooth animations