import { ArrayElement, SortingStep, SortingGenerator } from '@/types';

export function* quickSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  yield* quickSortHelper(array, 0, array.length - 1);

  // Mark all elements as sorted
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}

function* quickSortHelper(
  array: ArrayElement[], 
  low: number, 
  high: number
): SortingGenerator {
  if (low < high) {
    yield {
      array: [...array],
      action: 'compare',
      message: `Sorting subarray from position ${low} to ${high}`
    };

    // Partition the array and get pivot index
    const pivotIndex = yield* partition(array, low, high);

    // Recursively sort elements before and after partition
    yield* quickSortHelper(array, low, pivotIndex - 1);
    yield* quickSortHelper(array, pivotIndex + 1, high);
  }
  
  return array;
}

function* partition(
  array: ArrayElement[], 
  low: number, 
  high: number
): Generator<SortingStep, number, unknown> {
  // Choose the rightmost element as pivot
  const pivot = array[high].value;
  array[high].state = 'pivot';
  
  yield {
    array: [...array],
    pivot: high,
    action: 'pivot',
    message: `Choosing pivot: ${pivot} at position ${high}`
  };

  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    array[j].state = 'comparing';
    
    yield {
      array: [...array],
      comparing: [j, high],
      action: 'compare',
      message: `Comparing ${array[j].value} with pivot ${pivot}`
    };

    // If current element is smaller than or equal to pivot
    if (array[j].value <= pivot) {
      i++;
      
      if (i !== j) {
        array[i].state = 'swapping';
        array[j].state = 'swapping';
        
        yield {
          array: [...array],
          swapping: [i, j],
          action: 'swap',
          message: `Swapping ${array[i].value} at position ${i} with ${array[j].value} at position ${j}`
        };

        // Swap elements
        [array[i], array[j]] = [array[j], array[i]];
      }
      
      array[i].state = 'normal';
    }
    
    array[j].state = 'normal';
  }

  // Place pivot in correct position
  array[i + 1].state = 'swapping';
  array[high].state = 'swapping';
  
  yield {
    array: [...array],
    swapping: [i + 1, high],
    action: 'swap',
    message: `Placing pivot ${pivot} in its correct position ${i + 1}`
  };

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  
  // Mark pivot as sorted
  array[i + 1].state = 'sorted';
  
  yield {
    array: [...array],
    sorted: [i + 1],
    action: 'sorted',
    message: `Pivot ${pivot} is now in its final position ${i + 1}`
  };

  return i + 1;
}