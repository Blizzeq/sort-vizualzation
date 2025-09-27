'use client';

import { Slider } from '@/components/ui/slider';
import { useSortingStore } from '@/lib/store/sortingStore';

export function ArraySizeSlider() {
  const { arraySize, setArraySize, sortingState } = useSortingStore();
  const isDisabled = sortingState === 'sorting' || sortingState === 'paused';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Array Size: {arraySize}
      </label>
      <Slider
        value={[arraySize]}
        onValueChange={([value]) => setArraySize(value)}
        min={10}
        max={100}
        step={5}
        disabled={isDisabled}
        className="w-[200px]"
      />
    </div>
  );
}