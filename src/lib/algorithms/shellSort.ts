import { ArrayElement, SortingGenerator } from '@/types';

export function* shellSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  const n = array.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield {
      array: [...array],
      action: 'sorted',
      message: `Starting gap sequence with gap = ${gap}`
    };

    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = array[i].value;
      const tempElement = { ...array[i] };
      
      // Highlight the element being inserted
      array[i].state = 'pivot';
      
      yield {
        array: [...array],
        pivot: i,
        action: 'pivot',
        message: `Inserting element ${temp} with gap ${gap}`
      };

      let j;
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      for (j = i; j >= gap; j -= gap) {
        array[j - gap].state = 'comparing';
        array[j].state = 'comparing';
        
        yield {
          array: [...array],
          comparing: [j - gap, j],
          action: 'compare',
          message: `Comparing ${array[j - gap].value} with ${temp} (gap = ${gap})`
        };

        if (array[j - gap].value <= temp) {
          array[j - gap].state = 'normal';
          array[j].state = 'normal';
          break;
        }

        // Shift element
        array[j - gap].state = 'swapping';
        array[j].state = 'swapping';

        yield {
          array: [...array],
          swapping: [j - gap, j],
          action: 'swap',
          message: `Moving ${array[j - gap].value} forward by gap ${gap}`
        };

        array[j] = { ...array[j - gap] };
        array[j - gap].state = 'normal';
        array[j].state = 'normal';
      }

      // Put temp (the original array[i]) in its correct location
      array[j] = tempElement;
      array[j].value = temp;
      array[j].state = 'normal';

      yield {
        array: [...array],
        action: 'sorted',
        message: `Placed ${temp} at position ${j}`
      };
    }

    yield {
      array: [...array],
      action: 'sorted',
      message: `Completed gap ${gap} - array is ${gap}-sorted`
    };
  }

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