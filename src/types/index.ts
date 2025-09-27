export type AlgorithmType = 
  | 'bubble'
  | 'quick'
  | 'merge'
  | 'insertion'
  | 'selection'
  | 'heap'
  | 'shell'
  | 'counting'
  | 'radix';

export type SortingState = 
  | 'idle'
  | 'sorting'
  | 'paused'
  | 'completed';

export interface ArrayElement {
  value: number;
  index: number;
  state: 'normal' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export interface SortingStep {
  array: ArrayElement[];
  comparing?: number[];
  swapping?: number[];
  pivot?: number;
  sorted?: number[];
  action: 'compare' | 'swap' | 'pivot' | 'sorted';
  message: string;
}

export interface Statistics {
  comparisons: number;
  swaps: number;
  timeElapsed: number;
  arrayAccesses: number;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  description: string;
}

export interface SortingConfig {
  algorithm: AlgorithmType;
  arraySize: number;
  speed: number;
  array: number[];
}

export type SortingGenerator = Generator<SortingStep, ArrayElement[], unknown>;