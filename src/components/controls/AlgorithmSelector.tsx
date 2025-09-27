'use client';

import { memo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSortingStore } from '@/lib/store/sortingStore';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';
import { AlgorithmType } from '@/types';

export const AlgorithmSelector = memo(function AlgorithmSelector() {
  const { algorithm, setAlgorithm, sortingState } = useSortingStore();
  const isDisabled = sortingState === 'sorting' || sortingState === 'paused';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Algorithm</label>
      <Select
        value={algorithm}
        onValueChange={(value: AlgorithmType) => setAlgorithm(value)}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ALGORITHM_INFO).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              <div className="flex flex-col">
                <span>{info.name}</span>
                <span className="text-xs text-muted-foreground">
                  Avg: {info.timeComplexity.average}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});