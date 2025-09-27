'use client';

import { memo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useSortingStore } from '@/lib/store/sortingStore';

export const SpeedControl = memo(function SpeedControl() {
  const { speed, setSpeed, realSpeedMode, toggleRealSpeedMode, realExecutionTime } = useSortingStore();

  return (
    <div className="space-y-3">
      {/* Real Speed Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Real Speed Mode</label>
        <Switch
          checked={realSpeedMode}
          onCheckedChange={toggleRealSpeedMode}
        />
      </div>
      
      {realSpeedMode && realExecutionTime > 0 && (
        <div className="text-xs text-purple-600 font-medium">
          Execution time: {realExecutionTime}ms
        </div>
      )}

      {/* Regular Speed Control - hidden in real speed mode */}
      {!realSpeedMode && (
        <>
          <label className="text-sm font-medium">
            Speed: {speed}%
          </label>
          <Slider
            value={[speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={1}
            max={100}
            step={1}
            className="w-full [&>span:first-child]:bg-purple-200 [&>span:first-child]:h-2 [&_[role=slider]]:border-purple-400 [&_[role=slider]]:bg-white [&_[role=slider]]:ring-purple-500"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </>
      )}
    </div>
  );
});