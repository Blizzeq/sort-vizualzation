import { create } from 'zustand';
import { AlgorithmType, ArrayElement, SortingState, Statistics, SortingStep, SortingGenerator } from '@/types';
import { generateRandomArray } from '@/lib/utils/arrayGenerator';
import { bubbleSort } from '@/lib/algorithms/bubbleSort';
import { insertionSort } from '@/lib/algorithms/insertionSort';
import { selectionSort } from '@/lib/algorithms/selectionSort';
import { quickSort } from '@/lib/algorithms/quickSort';
import { mergeSort } from '@/lib/algorithms/mergeSort';

interface SortingStore {
  // State
  array: ArrayElement[];
  originalArray: number[];
  algorithm: AlgorithmType;
  sortingState: SortingState;
  statistics: Statistics;
  speed: number;
  arraySize: number;
  currentStep: number;
  totalSteps: number;
  currentMessage: string;
  performanceData: {
    fps: number;
    frameTime: number;
  };
  
  // Generator and animation
  sortingGenerator: SortingGenerator | null;
  animationId: number | null;
  
  // Actions
  setAlgorithm: (algorithm: AlgorithmType) => void;
  setArraySize: (size: number) => void;
  setSpeed: (speed: number) => void;
  generateNewArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  resetSorting: () => void;
  nextStep: () => void;
  
  // Internal methods
  initializeArray: (values: number[]) => void;
  resetStatistics: () => void;
  updateStatistics: (step: SortingStep) => void;
  executeNextStep: () => void;
}

const ALGORITHMS = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort,
  quick: quickSort,
  merge: mergeSort,
};

export const useSortingStore = create<SortingStore>((set, get) => ({
  // Initial state
  array: [],
  originalArray: [],
  algorithm: 'bubble',
  sortingState: 'idle',
  statistics: {
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0,
    arrayAccesses: 0,
  },
  speed: 100,
  arraySize: 30,
  currentStep: 0,
  totalSteps: 0,
  currentMessage: 'Ready to sort',
  performanceData: {
    fps: 60,
    frameTime: 16.67,
  },
  sortingGenerator: null,
  animationId: null,

  // Actions
  setAlgorithm: (algorithm) => {
    const state = get();
    if (state.sortingState === 'idle' || state.sortingState === 'completed') {
      set({ algorithm });
    }
  },

  setArraySize: (size) => {
    const state = get();
    if (state.sortingState === 'idle' || state.sortingState === 'completed') {
      set({ arraySize: size });
      get().generateNewArray();
    }
  },

  setSpeed: (speed) => {
    set({ speed });
  },

  generateNewArray: () => {
    const { arraySize } = get();
    const values = generateRandomArray(arraySize);
    get().initializeArray(values);
    get().resetStatistics();
    set({ 
      sortingState: 'idle', 
      currentStep: 0, 
      totalSteps: 0, 
      currentMessage: 'Ready to sort',
      sortingGenerator: null
    });
  },

  startSorting: () => {
    const { algorithm, originalArray, sortingState } = get();
    
    if (sortingState !== 'idle' && sortingState !== 'completed') return;
    
    const generator = ALGORITHMS[algorithm](originalArray);
    
    set({ 
      sortingGenerator: generator,
      sortingState: 'sorting',
      statistics: { ...get().statistics, timeElapsed: 0 }
    });
    
    let lastTime = 0;
    let frameCount = 0;
    let fpsLastTime = 0;
    const stepInterval = 1100 - get().speed * 10;
    
    const animate = (currentTime: number) => {
      const state = get();
      if (state.sortingState === 'sorting') {
        // Performance monitoring
        frameCount++;
        const frameTime = currentTime - lastTime;
        if (fpsLastTime === 0) fpsLastTime = currentTime;
        if (currentTime - fpsLastTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - fpsLastTime));
          set({ 
            performanceData: { 
              fps, 
              frameTime: Math.round(frameTime * 100) / 100 
            } 
          });
          frameCount = 0;
          fpsLastTime = currentTime;
        }
        
        if (currentTime - lastTime >= stepInterval) {
          state.executeNextStep();
          lastTime = currentTime;
          
          // Check if state changed after executeNextStep
          const newState = get();
          if (newState.sortingState !== 'sorting') {
            return; // Don't schedule next frame
          }
        }
        const animationId = requestAnimationFrame(animate);
        set({ animationId });
      }
    };
    
    const animationId = requestAnimationFrame(animate);
    set({ animationId });
  },

  pauseSorting: () => {
    const { animationId } = get();
    if (animationId) {
      cancelAnimationFrame(animationId);
      set({ sortingState: 'paused', animationId: null });
    }
  },

  resumeSorting: () => {
    const state = get();
    if (state.sortingState === 'paused') {
      set({ sortingState: 'sorting' });
      
      let lastTime = 0;
      let frameCount = 0;
      let fpsLastTime = 0;
      const stepInterval = 1100 - get().speed * 10;
      
      const animate = (currentTime: number) => {
        const currentState = get();
        if (currentState.sortingState === 'sorting') {
          // Performance monitoring
          frameCount++;
          const frameTime = currentTime - lastTime;
          if (fpsLastTime === 0) fpsLastTime = currentTime;
          if (currentTime - fpsLastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - fpsLastTime));
            set({ 
              performanceData: { 
                fps, 
                frameTime: Math.round(frameTime * 100) / 100 
              } 
            });
            frameCount = 0;
            fpsLastTime = currentTime;
          }
          
          if (currentTime - lastTime >= stepInterval) {
            currentState.executeNextStep();
            lastTime = currentTime;
          }
          const animationId = requestAnimationFrame(animate);
          set({ animationId });
        }
      };
      
      const animationId = requestAnimationFrame(animate);
      set({ animationId });
    }
  },

  resetSorting: () => {
    const { animationId, originalArray } = get();
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    get().initializeArray(originalArray);
    get().resetStatistics();
    set({ 
      sortingState: 'idle', 
      currentStep: 0, 
      totalSteps: 0, 
      currentMessage: 'Ready to sort',
      sortingGenerator: null,
      animationId: null
    });
  },

  nextStep: () => {
    const state = get();
    if (state.sortingState === 'paused') {
      state.executeNextStep();
    }
  },

  // Internal methods
  initializeArray: (values) => {
    const array: ArrayElement[] = values.map((value, index) => ({
      value,
      index,
      state: 'normal'
    }));
    set({ array, originalArray: [...values] });
  },

  resetStatistics: () => {
    set({
      statistics: {
        comparisons: 0,
        swaps: 0,
        timeElapsed: 0,
        arrayAccesses: 0,
      }
    });
  },

  updateStatistics: (step) => {
    const stats = get().statistics;
    const newStats = { ...stats };
    
    switch (step.action) {
      case 'compare':
        newStats.comparisons++;
        newStats.arrayAccesses += 2;
        break;
      case 'swap':
        newStats.swaps++;
        newStats.arrayAccesses += 4;
        break;
      default:
        newStats.arrayAccesses++;
        break;
    }
    
    set({ statistics: newStats });
  },

  executeNextStep: () => {
    const { sortingGenerator, currentStep } = get();
    
    if (!sortingGenerator) return;
    
    const result = sortingGenerator.next();
    
    if (result.done) {
      // Sorting completed
      const { animationId } = get();
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Ensure all elements are marked as sorted
      const finalArray = result.value.map((element: ArrayElement) => ({
        ...element,
        state: 'sorted' as const
      }));
      
      set({ 
        array: finalArray,
        sortingState: 'completed',
        currentMessage: 'Sorting completed!',
        animationId: null
      });
    } else {
      // Update with new step
      const step = result.value;
      
      // Check if this is the final sorting step
      if (step.message === 'Array is fully sorted!') {
        // Cancel animation first
        const { animationId } = get();
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        
        // Ensure all elements are marked as sorted
        const finalArray = step.array.map((element: ArrayElement) => ({
          ...element,
          state: 'sorted' as const
        }));
        
        set({ 
          array: finalArray,
          sortingState: 'completed',
          currentMessage: step.message,
          animationId: null,
          currentStep: currentStep + 1
        });
      } else {
        // Regular step processing
        get().updateStatistics(step);
        
        set({ 
          array: step.array,
          currentStep: currentStep + 1,
          currentMessage: step.message,
          statistics: {
            ...get().statistics,
            timeElapsed: Date.now() - (Date.now() - currentStep * (1100 - get().speed * 10))
          }
        });
      }
    }
  },
}));

// Initialize with default array
useSortingStore.getState().generateNewArray();