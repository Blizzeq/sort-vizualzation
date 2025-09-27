export function generateRandomArray(size: number, min: number = 10, max: number = 300): number[] {
  const array: number[] = [];
  
  for (let i = 0; i < size; i++) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    array.push(randomValue);
  }
  
  return array;
}

export function generateSortedArray(size: number, min: number = 10, max: number = 300): number[] {
  const array = generateRandomArray(size, min, max);
  return array.sort((a, b) => a - b);
}

export function generateReverseSortedArray(size: number, min: number = 10, max: number = 300): number[] {
  const array = generateRandomArray(size, min, max);
  return array.sort((a, b) => b - a);
}

export function generateNearlySortedArray(size: number, swaps: number = 3, min: number = 10, max: number = 300): number[] {
  const array = generateSortedArray(size, min, max);
  
  // Perform random swaps to make it nearly sorted
  for (let i = 0; i < swaps; i++) {
    const index1 = Math.floor(Math.random() * size);
    const index2 = Math.floor(Math.random() * size);
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
  
  return array;
}

export function generateArrayWithDuplicates(size: number, uniqueValues: number = 5, min: number = 10, max: number = 300): number[] {
  const values = [];
  const step = Math.floor((max - min) / uniqueValues);
  
  for (let i = 0; i < uniqueValues; i++) {
    values.push(min + i * step);
  }
  
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    array.push(randomValue);
  }
  
  return array;
}