import { ArrayElement, SortingGenerator } from '@/types';

function* heapify(array: ArrayElement[], n: number, i: number): Generator<{ array: ArrayElement[]; comparing?: number[]; swapping?: number[]; action: 'compare' | 'swap'; message: string }, void, unknown> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n) {
    array[i].state = 'comparing';
    array[left].state = 'comparing';
    
    yield {
      array: [...array],
      comparing: [i, left],
      action: 'compare',
      message: `Comparing parent ${array[i].value} with left child ${array[left].value}`
    };

    if (array[left].value > array[largest].value) {
      largest = left;
    }

    array[i].state = 'normal';
    array[left].state = 'normal';
  }

  // Compare with right child
  if (right < n) {
    array[largest].state = 'comparing';
    array[right].state = 'comparing';

    yield {
      array: [...array],
      comparing: [largest, right],
      action: 'compare',
      message: `Comparing ${array[largest].value} with right child ${array[right].value}`
    };

    if (array[right].value > array[largest].value) {
      largest = right;
    }

    array[largest].state = 'normal';
    array[right].state = 'normal';
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== i) {
    array[i].state = 'swapping';
    array[largest].state = 'swapping';

    yield {
      array: [...array],
      swapping: [i, largest],
      action: 'swap',
      message: `Swapping ${array[i].value} with ${array[largest].value} to maintain heap property`
    };

    // Perform the swap
    [array[i], array[largest]] = [array[largest], array[i]];

    array[i].state = 'normal';
    array[largest].state = 'normal';

    // Recursively heapify the affected sub-tree
    yield* heapify(array, n, largest);
  }
}

export function* heapSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  const n = array.length;

  // Build max heap (heapify)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(array, n, i);
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Max heap built successfully!'
  };

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end (largest element)
    array[0].state = 'swapping';
    array[i].state = 'swapping';

    yield {
      array: [...array],
      swapping: [0, i],
      action: 'swap',
      message: `Moving max element ${array[0].value} to sorted position ${i}`
    };

    // Perform the swap
    [array[0], array[i]] = [array[i], array[0]];

    // Mark as sorted
    array[i].state = 'sorted';
    array[0].state = 'normal';

    yield {
      array: [...array],
      sorted: [i],
      action: 'sorted',
      message: `Element ${array[i].value} is now in its final position`
    };

    // Call heapify on the reduced heap
    yield* heapify(array, i, 0);
  }

  // Mark the first element as sorted
  array[0].state = 'sorted';

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}