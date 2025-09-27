import { ArrayElement, SortingGenerator } from '@/types';

export function* countingSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  // Find the maximum element to determine the range
  let max = array[0].value;
  for (let i = 1; i < array.length; i++) {
    array[i].state = 'comparing';
    yield {
      array: [...array],
      comparing: [i],
      action: 'compare',
      message: `Finding maximum: current max is ${max}, checking ${array[i].value}`
    };
    
    if (array[i].value > max) {
      max = array[i].value;
    }
    array[i].state = 'normal';
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: `Maximum element found: ${max}`
  };

  // Create counting array
  const count = new Array(max + 1).fill(0);
  
  // Count occurrences of each element
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'comparing';
    
    yield {
      array: [...array],
      comparing: [i],
      action: 'compare',
      message: `Counting element ${array[i].value} - count[${array[i].value}] = ${count[array[i].value] + 1}`
    };
    
    count[array[i].value]++;
    array[i].state = 'normal';
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: `Finished counting occurrences`
  };

  // Modify count array such that count[i] contains actual position of element i in output array
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: `Calculated cumulative counts for positioning`
  };

  // Build the output array
  const output: ArrayElement[] = new Array(array.length);
  
  // Build output array from right to left to maintain stability
  for (let i = array.length - 1; i >= 0; i--) {
    const value = array[i].value;
    const outputIndex = count[value] - 1;
    
    array[i].state = 'swapping';
    
    yield {
      array: [...array],
      swapping: [i],
      action: 'swap',
      message: `Placing ${value} at position ${outputIndex} in sorted array`
    };
    
    output[outputIndex] = {
      value: value,
      index: outputIndex,
      state: 'sorted'
    };
    
    count[value]--;
    array[i].state = 'normal';
  }

  // Show the final sorted array
  for (let i = 0; i < output.length; i++) {
    array[i] = output[i];
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}