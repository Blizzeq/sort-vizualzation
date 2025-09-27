import { ArrayElement, SortingGenerator } from '@/types';

export function* selectionSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    array[i].state = 'pivot';

    yield {
      array: [...array],
      pivot: i,
      action: 'pivot',
      message: `Finding minimum element in unsorted portion starting from position ${i}`
    };

    // Find minimum element in remaining unsorted array
    for (let j = i + 1; j < n; j++) {
      array[j].state = 'comparing';
      
      yield {
        array: [...array],
        comparing: [minIndex, j],
        action: 'compare',
        message: `Comparing ${array[minIndex].value} (current min) with ${array[j].value}`
      };

      if (array[j].value < array[minIndex].value) {
        // Reset previous minimum
        if (minIndex !== i) {
          array[minIndex].state = 'normal';
        }
        minIndex = j;
        array[minIndex].state = 'pivot';
        
        yield {
          array: [...array],
          pivot: minIndex,
          action: 'pivot',
          message: `New minimum found: ${array[minIndex].value} at position ${minIndex}`
        };
      } else {
        array[j].state = 'normal';
      }
    }

    // Swap if minimum is not at current position
    if (minIndex !== i) {
      array[i].state = 'swapping';
      array[minIndex].state = 'swapping';

      yield {
        array: [...array],
        swapping: [i, minIndex],
        action: 'swap',
        message: `Swapping ${array[i].value} at position ${i} with ${array[minIndex].value} at position ${minIndex}`
      };

      // Perform the swap
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    // Mark current position as sorted
    array[i].state = 'sorted';
    
    yield {
      array: [...array],
      sorted: [i],
      action: 'sorted',
      message: `Position ${i} is now sorted with value ${array[i].value}`
    };
  }

  // Mark the last element as sorted
  array[n - 1].state = 'sorted';
  
  yield {
    array: [...array],
    sorted: [n - 1],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}