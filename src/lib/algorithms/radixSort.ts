import { ArrayElement, SortingGenerator } from '@/types';

function getDigit(num: number, place: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num: number): number {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums: number[]): number {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

export function* radixSort(initialArray: number[]): SortingGenerator {
  const array: ArrayElement[] = initialArray.map((value, index) => ({
    value,
    index,
    state: 'normal'
  }));

  const maxDigitCount = mostDigits(initialArray);

  yield {
    array: [...array],
    action: 'sorted',
    message: `Starting radix sort - maximum digits: ${maxDigitCount}`
  };

  // Loop through each digit place (0 = units, 1 = tens, 2 = hundreds, etc.)
  for (let k = 0; k < maxDigitCount; k++) {
    yield {
      array: [...array],
      action: 'sorted',
      message: `Sorting by digit position ${k + 1} (${k === 0 ? 'units' : k === 1 ? 'tens' : k === 2 ? 'hundreds' : 'higher'})`
    };

    // Create digit buckets (0-9)
    const digitBuckets: ArrayElement[][] = Array.from({ length: 10 }, () => []);

    // Place each element in the appropriate bucket based on the current digit
    for (let i = 0; i < array.length; i++) {
      const digit = getDigit(array[i].value, k);
      
      array[i].state = 'comparing';
      
      yield {
        array: [...array],
        comparing: [i],
        action: 'compare',
        message: `Element ${array[i].value} has digit ${digit} at position ${k + 1}, placing in bucket ${digit}`
      };

      digitBuckets[digit].push({ ...array[i] });
      array[i].state = 'normal';
    }

    yield {
      array: [...array],
      action: 'sorted',
      message: `All elements distributed into buckets based on digit position ${k + 1}`
    };

    // Collect elements from buckets back into array
    let arrayIndex = 0;
    for (let bucketIndex = 0; bucketIndex < 10; bucketIndex++) {
      const bucket = digitBuckets[bucketIndex];
      
      if (bucket.length > 0) {
        yield {
          array: [...array],
          action: 'sorted',
          message: `Collecting ${bucket.length} elements from bucket ${bucketIndex}`
        };
      }

      for (let j = 0; j < bucket.length; j++) {
        array[arrayIndex] = { ...bucket[j] };
        array[arrayIndex].state = 'swapping';
        array[arrayIndex].index = arrayIndex;

        yield {
          array: [...array],
          swapping: [arrayIndex],
          action: 'swap',
          message: `Placing ${array[arrayIndex].value} back at position ${arrayIndex}`
        };

        array[arrayIndex].state = 'normal';
        arrayIndex++;
      }
    }

    yield {
      array: [...array],
      action: 'sorted',
      message: `Completed sorting by digit position ${k + 1}`
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