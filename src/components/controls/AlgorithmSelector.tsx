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
      <Select
        value={algorithm}
        onValueChange={(value: AlgorithmType) => setAlgorithm(value)}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full h-12 border-blue-300 bg-white/70 hover:bg-white focus:ring-blue-500 focus:border-blue-500 py-6">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent className="border-blue-300 bg-white/95 backdrop-blur-sm">
          {Object.entries(ALGORITHM_INFO).map(([key, info]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="hover:bg-blue-50 focus:bg-blue-50"
            >
              <div className="flex flex-col py-1">
                <span className="font-medium">{info.name}</span>
                <span className="text-xs text-blue-600">
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