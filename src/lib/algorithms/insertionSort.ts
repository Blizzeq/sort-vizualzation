import { ArrayElement, SortingGenerator } from '@/types';

export function* insertionSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

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

    array[i].state = 'pivot';
    yield {
      array: [...array],
      pivot: i,
      action: 'pivot',
      message: `Inserting element ${key} into sorted portion`
    };

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
        array[i].state = 'normal';
        break;
      }
      array[j].state = 'swapping';
      array[j + 1].state = 'swapping';

      yield {
        array: [...array],
        swapping: [j, j + 1],
        action: 'swap',
        message: `Shifting ${array[j].value} to position ${j + 1}`
      };

        array[j + 1].value = array[j].value;
      array[j + 1].index = j + 1;
      array[j].state = 'normal';
      j--;
    }

    array[j + 1] = { value: key, index: j + 1, state: 'sorted' };
    
    if (array[i] && array[i].state !== 'sorted') {
      array[i].state = 'normal';
    }

    for (let k = 0; k <= i; k++) {
      if (array[k].state !== 'sorted') {
        array[k].state = 'sorted';
      }
    }

    yield {
      array: [...array],
      action: 'sorted',
      message: `Element ${key} inserted at position ${j + 1}`
    };
  }

  for (let k = 0; k < array.length; k++) {
    array[k].state = 'sorted';
  }

  yield {
    array: [...array],
    action: 'sorted',
    message: 'Array is fully sorted!'
  };

  return array;
}