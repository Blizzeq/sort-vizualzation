'use client';

import { memo } from 'react';
import { Slider } from '@/components/ui/slider';
import { useSortingStore } from '@/lib/store/sortingStore';

export const ArraySizeSlider = memo(function ArraySizeSlider() {
  const { arraySize, setArraySize, sortingState } = useSortingStore();
  const isDisabled = sortingState === 'sorting' || sortingState === 'paused';
  
  const maxSize = 50;
  const step = 5;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Array Size: {arraySize.toLocaleString()}
      </label>
      <Slider
        value={[arraySize]}
        onValueChange={([value]) => setArraySize(value)}
        min={10}
        max={maxSize}
        step={step}
        disabled={isDisabled}
        className="w-full [&>span:first-child]:bg-blue-200 [&>span:first-child]:h-2 [&_[role=slider]]:border-blue-400 [&_[role=slider]]:bg-white [&_[role=slider]]:ring-blue-500"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>10</span>
        <span>{maxSize}</span>
      </div>
    </div>
  );
});