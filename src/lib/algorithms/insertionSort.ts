import { ArrayElement, SortingGenerator } from '@/types';

export function* insertionSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  // First element is considered sorted
  array[0].state = 'sorted';
  yield {
    array: [...array],
    sorted: [0],
    action: 'sorted',
    message: 'First element is already sorted'
  };

  for (let i = 1; i < array.length; i++) {
    const key = array[i].value;
    let j = i - 1;

    // Highlight the current element being inserted
    array[i].state = 'pivot';
    yield {
      array: [...array],
      pivot: i,
      action: 'pivot',
      message: `Inserting element ${key} into sorted portion`
    };

    // Find the correct position for the key
    while (j >= 0) {
      array[j].state = 'comparing';
      array[i].state = 'comparing';

      yield {
        array: [...array],
        comparing: [j, i],
        action: 'compare',
        message: `Comparing ${array[j].value} with ${key}`
      };

      if (array[j].value <= key) {
        array[j].state = 'sorted';
        break;
      }

      // Shift element to the right
      array[j].state = 'swapping';
      array[j + 1].state = 'swapping';

      yield {
        array: [...array],
        swapping: [j, j + 1],
        action: 'swap',
        message: `Shifting ${array[j].value} to position ${j + 1}`
      };

      array[j + 1] = { ...array[j] };
      array[j].state = 'sorted';
      j--;
    }

    // Insert the key in its correct position
    array[j + 1] = { value: key, index: j + 1, state: 'sorted' };

    // Mark all elements up to i as sorted
    for (let k = 0; k <= i; k++) {
      array[k].state = 'sorted';
    }

    yield {
      array: [...array],
      action: 'sorted',
      message: `Element ${key} inserted at position ${j + 1}`
    };
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}