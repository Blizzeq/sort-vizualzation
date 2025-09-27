'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSortingStore } from '@/lib/store/sortingStore';
import { AlgorithmSelector } from './AlgorithmSelector';
import { ArraySizeSlider } from './ArraySizeSlider';
import { SpeedControl } from './SpeedControl';
import { Play, Pause, RotateCcw, Shuffle, SkipForward, Settings, Zap, Database } from 'lucide-react';

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
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Data Configuration Group */}
          <Card className="bg-blue-50/50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-blue-700">
                <Database className="w-4 h-4" />
                Data Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlgorithmSelector />
              <ArraySizeSlider />
            </CardContent>
          </Card>

          {/* Animation Control Group */}
          <Card className="bg-purple-50/50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-purple-700">
                <Zap className="w-4 h-4" />
                Animation Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SpeedControl />
              <div className="pt-2">
                <Button
                  onClick={nextStep}
                  variant="outline"
                  size="sm"
                  disabled={sortingState !== 'paused'}
                  className="w-full flex items-center gap-2 text-purple-700 border-purple-300 hover:bg-purple-50"
                >
                  <SkipForward className="w-4 h-4" />
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons Group */}
          <Card className="bg-green-50/50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-green-700">
                <Play className="w-4 h-4" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handlePlayPause}
                variant="default"
                size="lg"
                className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {getPlayButtonIcon()}
                {getPlayButtonText()}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={resetSorting}
                  variant="outline"
                  size="sm"
                  disabled={sortingState === 'idle'}
                  className="flex items-center gap-2 text-orange-700 border-orange-300 hover:bg-orange-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>

                <Button
                  onClick={generateNewArray}
                  variant="outline"
                  size="sm"
                  disabled={sortingState === 'sorting' || sortingState === 'paused'}
                  className="flex items-center gap-2 text-blue-700 border-blue-300 hover:bg-blue-50"
                >
                  <Shuffle className="w-4 h-4" />
                  New Array
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}