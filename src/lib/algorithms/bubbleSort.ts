import { ArrayElement, SortingGenerator } from '@/types';

export function* bubbleSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  const n = array.length;
  let swapped = true;

  for (let i = 0; i < n - 1 && swapped; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';

      yield {
        array: [...array],
        comparing: [j, j + 1],
        action: 'compare',
        message: `Comparing elements at positions ${j} and ${j + 1}: ${array[j].value} and ${array[j + 1].value}`
      };

      // Reset states
      array[j].state = 'normal';
      array[j + 1].state = 'normal';

      // Swap if necessary
      if (array[j].value > array[j + 1].value) {
        array[j].state = 'swapping';
        array[j + 1].state = 'swapping';

        yield {
          array: [...array],
          swapping: [j, j + 1],
          action: 'swap',
          message: `Swapping ${array[j].value} and ${array[j + 1].value}`
        };

        // Perform the swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        // Reset states after swap
        array[j].state = 'normal';
        array[j + 1].state = 'normal';
      }
    }

    // Mark the last element as sorted
    array[n - 1 - i].state = 'sorted';
    yield {
      array: [...array],
      sorted: [n - 1 - i],
      action: 'sorted',
      message: `Element at position ${n - 1 - i} is now in its final position`
    };
  }

  // Mark remaining elements as sorted
  for (let i = 0; i < array.length; i++) {
    if (array[i].state !== 'sorted') {
      array[i].state = 'sorted';
    }
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}