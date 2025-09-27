import { ArrayElement, SortingGenerator } from '@/types';

export function* mergeSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  yield* mergeSortHelper(array, 0, array.length - 1);

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

function* mergeSortHelper(
  array: ArrayElement[], 
  left: number, 
  right: number
): SortingGenerator {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);

    yield {
      array: [...array],
      action: 'compare',
      message: `Dividing array: left=${left}, middle=${middle}, right=${right}`
    };

    // Sort first and second halves
    yield* mergeSortHelper(array, left, middle);
    yield* mergeSortHelper(array, middle + 1, right);

    // Merge the sorted halves
    yield* merge(array, left, middle, right);
  }
  
  return array;
}

function* merge(
  array: ArrayElement[], 
  left: number, 
  middle: number, 
  right: number
): SortingGenerator {
  // Create temporary arrays for left and right subarrays
  const leftArray = array.slice(left, middle + 1);
  const rightArray = array.slice(middle + 1, right + 1);

  yield {
    array: [...array],
    action: 'compare',
    message: `Merging subarrays: [${left}..${middle}] and [${middle + 1}..${right}]`
  };

  let i = 0; // Initial index of left subarray
  let j = 0; // Initial index of right subarray
  let k = left; // Initial index of merged subarray

  // Merge the temporary arrays back into array[left..right]
  while (i < leftArray.length && j < rightArray.length) {
    // Highlight elements being compared
    for (let idx = left; idx <= right; idx++) {
      array[idx].state = 'comparing';
    }

    yield {
      array: [...array],
      comparing: [left + i, middle + 1 + j],
      action: 'compare',
      message: `Comparing ${leftArray[i].value} and ${rightArray[j].value}`
    };

    // Reset states
    for (let idx = left; idx <= right; idx++) {
      array[idx].state = 'normal';
    }

    if (leftArray[i].value <= rightArray[j].value) {
      array[k].state = 'swapping';
      
      yield {
        array: [...array],
        action: 'swap',
        message: `Placing ${leftArray[i].value} at position ${k}`
      };

      array[k] = { ...leftArray[i], index: k, state: 'normal' };
      i++;
    } else {
      array[k].state = 'swapping';
      
      yield {
        array: [...array],
        action: 'swap',
        message: `Placing ${rightArray[j].value} at position ${k}`
      };

      array[k] = { ...rightArray[j], index: k, state: 'normal' };
      j++;
    }
    
    array[k].state = 'normal';
    k++;
  }

  // Copy remaining elements of leftArray[], if any
  while (i < leftArray.length) {
    array[k].state = 'swapping';
    
    yield {
      array: [...array],
      action: 'swap',
      message: `Placing remaining element ${leftArray[i].value} at position ${k}`
    };

    array[k] = { ...leftArray[i], index: k, state: 'normal' };
    i++;
    k++;
  }

  // Copy remaining elements of rightArray[], if any
  while (j < rightArray.length) {
    array[k].state = 'swapping';
    
    yield {
      array: [...array],
      action: 'swap',
      message: `Placing remaining element ${rightArray[j].value} at position ${k}`
    };

    array[k] = { ...rightArray[j], index: k, state: 'normal' };
    j++;
    k++;
  }

  // Mark merged section as temporarily sorted
  for (let idx = left; idx <= right; idx++) {
    array[idx].state = 'sorted';
  }

  yield {
    array: [...array],
    sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
    action: 'sorted',
    message: `Merged section [${left}..${right}] is now sorted`
  };

  // Reset states for further processing
  for (let idx = left; idx <= right; idx++) {
    array[idx].state = 'normal';
  }
  
  return array;
}