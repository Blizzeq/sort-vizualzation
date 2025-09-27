'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSortingStore } from '@/lib/store/sortingStore';
import { AlgorithmSelector } from './AlgorithmSelector';
import { ArraySizeSlider } from './ArraySizeSlider';
import { SpeedControl } from './SpeedControl';
import { Play, Pause, RotateCcw, Shuffle, SkipForward } from 'lucide-react';

export function ControlPanel() {
  const {
    sortingState,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    generateNewArray,
    nextStep
  } = useSortingStore();

  const handlePlayPause = () => {
    if (sortingState === 'idle' || sortingState === 'completed') {
      startSorting();
    } else if (sortingState === 'sorting') {
      pauseSorting();
    } else if (sortingState === 'paused') {
      resumeSorting();
    }
  };

  const getPlayButtonText = () => {
    if (sortingState === 'idle' || sortingState === 'completed') return 'Start';
    if (sortingState === 'sorting') return 'Pause';
    if (sortingState === 'paused') return 'Resume';
    return 'Start';
  };

  const getPlayButtonIcon = () => {
    if (sortingState === 'sorting') return <Pause className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Algorithm & Size Controls */}
          <div className="space-y-4">
            <AlgorithmSelector />
            <ArraySizeSlider />
          </div>

          {/* Speed Control */}
          <div className="space-y-4">
            <SpeedControl />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 col-span-full lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handlePlayPause}
                variant="default"
                size="lg"
                className="flex items-center gap-2"
              >
                {getPlayButtonIcon()}
                {getPlayButtonText()}
              </Button>

              <Button
                onClick={resetSorting}
                variant="outline"
                size="lg"
                disabled={sortingState === 'idle'}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>

              <Button
                onClick={generateNewArray}
                variant="outline"
                size="lg"
                disabled={sortingState === 'sorting' || sortingState === 'paused'}
                className="flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Generate New
              </Button>

              <Button
                onClick={nextStep}
                variant="outline"
                size="lg"
                disabled={sortingState !== 'paused'}
                className="flex items-center gap-2"
              >
                <SkipForward className="w-4 h-4" />
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}