'use client';

import { useMemo, memo, useCallback } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSortingStore } from '@/lib/store/sortingStore';
import { ArrayBar } from './ArrayBar';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';
import { AlgorithmSelector } from '@/components/controls/AlgorithmSelector';
import { ArraySizeSlider } from '@/components/controls/ArraySizeSlider';
import { SpeedControl } from '@/components/controls/SpeedControl';
import { Play, Pause, RotateCcw, Shuffle, SkipForward, Database, Zap } from 'lucide-react';

export const SortingCanvas = memo(function SortingCanvas() {
  const { 
    array, 
    algorithm, 
    sortingState, 
    currentMessage,
    realSpeedMode,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    generateNewArray,
    nextStep
  } = useSortingStore();

  const handlePlayPause = useCallback(() => {
    if (sortingState === 'idle' || sortingState === 'completed') {
      startSorting();
    } else if (sortingState === 'sorting') {
      pauseSorting();
    } else if (sortingState === 'paused') {
      resumeSorting();
    }
  }, [sortingState, startSorting, pauseSorting, resumeSorting]);

  const playButtonIcon = useMemo(() => {
    if (sortingState === 'sorting') return <Pause className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  }, [sortingState]);

  const playButtonText = useMemo(() => {
    switch (sortingState) {
      case 'idle':
      case 'completed':
        return 'Start Sorting';
      case 'sorting':
        return 'Pause';
      case 'paused':
        return 'Resume';
      default:
        return 'Start';
    }
  }, [sortingState]);

  const { maxValue, containerWidth, barWidth, shouldShowLabels } = useMemo(() => {
    if (array.length === 0) return { maxValue: 1, containerWidth: 800, barWidth: 20, shouldShowLabels: true };
    
    const max = Math.max(...array.map(el => el.value));
    
    // Always show labels for arrays up to 50 elements
    const showLabels = array.length <= 50;
    
    // Calculate bar width and container width to ensure everything fits
    const minBarWidth = 12;
    const idealBarWidth = array.length <= 25 ? 24 : 20;
    const gap = 4; // gap between bars (matches gap-1 in CSS)
    
    // Calculate required width with generous padding for labels
    const paddingForLabels = showLabels ? 120 : 60;
    const totalBarsWidth = array.length * idealBarWidth;
    const totalGapsWidth = (array.length - 1) * gap;
    const idealContainerWidth = totalBarsWidth + totalGapsWidth + paddingForLabels;
    
    // Ensure container is wide enough - don't limit by screen width for better visualization
    const containerW = Math.max(idealContainerWidth, 600);
    
    // Calculate actual bar width
    const availableWidthForBars = containerW - paddingForLabels - totalGapsWidth;
    const barW = Math.max(minBarWidth, availableWidthForBars / array.length);
    
    return { 
      maxValue: max, 
      containerWidth: containerW, 
      barWidth: barW,
      shouldShowLabels: showLabels 
    };
  }, [array]);

  const maxHeight = 400;
  const algorithmInfo = ALGORITHM_INFO[algorithm];

  const getStatusColor = () => {
    switch (sortingState) {
      case 'idle':
        return 'bg-gray-500';
      case 'sorting':
        return 'bg-blue-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (sortingState) {
      case 'idle':
        return 'Ready';
      case 'sorting':
        return 'Sorting';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      default:
        return 'Ready';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <span>Sorting Visualization</span>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <Badge variant="outline">
              {algorithmInfo.name}
            </Badge>
            <Badge variant="outline">
              Avg: {algorithmInfo.timeComplexity.average}
            </Badge>
            <Badge variant="outline">
              Space: {algorithmInfo.spaceComplexity}
            </Badge>
          </div>
        </div>
        
        {/* Control Panel integrated */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
          {/* Data Configuration Group */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col h-full">
            <div className="text-sm flex items-center gap-1 text-blue-700 mb-3 font-medium">
              <Database className="w-4 h-4" />
              Data Configuration
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <AlgorithmSelector />
              <ArraySizeSlider />
            </div>
          </div>

          {/* Animation Control Group */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-4 flex flex-col h-full">
            <div className="text-sm flex items-center gap-1 text-purple-700 mb-3 font-medium">
              <Zap className="w-4 h-4" />
              Animation Control
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <SpeedControl />
              <Button
                onClick={nextStep}
                variant="outline"
                size="sm"
                disabled={sortingState !== 'paused'}
                className="w-full flex items-center gap-1 text-sm text-purple-700 border-purple-300 hover:bg-purple-50 h-9"
              >
                <SkipForward className="w-4 h-4" />
                Next Step
              </Button>
            </div>
          </div>

          {/* Action Control Group */}
          <div className="bg-green-50/50 border border-green-200 rounded-lg p-4 flex flex-col h-full">
            <div className="text-sm flex items-center gap-1 text-green-700 mb-3 font-medium">
              <Play className="w-4 h-4" />
              Actions
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <Button
                onClick={handlePlayPause}
                variant="default"
                size="sm"
                className="w-full flex items-center gap-1 bg-green-600 hover:bg-green-700 h-10 text-sm font-medium"
              >
                {playButtonIcon}
                {playButtonText}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={resetSorting}
                  variant="outline"
                  size="sm"
                  disabled={sortingState === 'idle'}
                  className="flex items-center gap-1 text-sm text-orange-700 border-orange-300 hover:bg-orange-50 h-9"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>

                <Button
                  onClick={generateNewArray}
                  variant="outline"
                  size="sm"
                  disabled={sortingState === 'sorting' || sortingState === 'paused'}
                  className="flex items-center gap-1 text-sm text-blue-700 border-blue-300 hover:bg-blue-50 h-9"
                >
                  <Shuffle className="w-4 h-4" />
                  New Array
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current action message */}
        <motion.div 
          className="text-sm text-muted-foreground font-mono p-2 bg-muted rounded-md mt-4"
          key={currentMessage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentMessage}
        </motion.div>
      </CardHeader>
      
      <CardContent>
        <div className="w-full overflow-x-auto">
          <LayoutGroup>
            <div 
              className="flex items-end justify-center gap-1 mx-auto bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg p-6"
              style={{ 
                width: containerWidth,
                height: shouldShowLabels ? maxHeight + 80 : maxHeight + 20
              }}
            >
              {array.map((element, index) => (
                <ArrayBar
                  key={`bar-${element.value}-${index}`}
                  element={element}
                  maxValue={maxValue}
                  maxHeight={maxHeight}
                  width={barWidth}
                  index={index}
                  showLabels={shouldShowLabels}
                />
              ))}
            </div>
          </LayoutGroup>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-300 to-blue-500 rounded"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-red-400 to-red-600 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-purple-400 to-purple-600 rounded"></div>
            <span>Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-t from-green-400 to-green-600 rounded"></div>
            <span>Sorted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});