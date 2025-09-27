import { AlgorithmInfo, AlgorithmType } from '@/types';

export const ALGORITHM_INFO: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Builds the final sorted array one item at a time, inserting each element into its correct position.'
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Finds the minimum element in the unsorted portion and swaps it with the first unsorted element.'
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    description: 'Divides the array into partitions around a pivot element and recursively sorts the partitions.'
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    description: 'Divides the array into halves, recursively sorts them, and merges the sorted halves back together.'
  },
  heap: {
    name: 'Heap Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Builds a max heap from the array, then repeatedly extracts the maximum element to create sorted array.'
  },
  shell: {
    name: 'Shell Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Improves insertion sort by comparing elements separated by larger gaps, gradually reducing to insertion sort.'
  },
  counting: {
    name: 'Counting Sort',
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)'
    },
    spaceComplexity: 'O(k)',
    stable: true,
    description: 'Counts occurrences of each distinct element, then uses these counts to place elements in sorted order.'
  },
  radix: {
    name: 'Radix Sort',
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)'
    },
    spaceComplexity: 'O(n + k)',
    stable: true,
    description: 'Sorts elements digit by digit, starting from least significant to most significant digit.'
  }
};