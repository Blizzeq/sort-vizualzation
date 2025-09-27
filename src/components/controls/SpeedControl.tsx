'use client';

import { Slider } from '@/components/ui/slider';
import { useSortingStore } from '@/lib/store/sortingStore';

export function SpeedControl() {
  const { speed, setSpeed } = useSortingStore();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Speed: {speed}%
      </label>
      <Slider
        value={[speed]}
        onValueChange={([value]) => setSpeed(value)}
        min={1}
        max={100}
        step={1}
        className="w-[200px]"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Slow</span>
        <span>Fast</span>
      </div>
    </div>
  );
}