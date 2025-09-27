'use client';

import { useMemo, memo } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSortingStore } from '@/lib/store/sortingStore';
import { ArrayBar } from './ArrayBar';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';

export const SortingCanvas = memo(function SortingCanvas() {
  const { array, algorithm, sortingState, currentMessage } = useSortingStore();

  const { maxValue, containerWidth, barWidth, shouldShowLabels } = useMemo(() => {
    if (array.length === 0) return { maxValue: 1, containerWidth: 800, barWidth: 20, shouldShowLabels: true };
    
    const max = Math.max(...array.map(el => el.value));
    
    // Dynamic container width based on screen size and array length
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const maxContainerWidth = Math.min(screenWidth - 100, 1400);
    
    // Minimum bar width for readability
    const minBarWidth = array.length > 50 ? 8 : 12;
    const idealBarWidth = array.length > 50 ? 12 : 20;
    
    // First calculate if we should show labels
    const tempBarW = Math.max(minBarWidth, (maxContainerWidth - 80) / array.length);
    const showLabels = array.length <= 50 && tempBarW >= 15;
    
    // Calculate optimal width with appropriate padding
    const paddingForLabels = showLabels ? 80 : 40;
    const idealContainerWidth = array.length * idealBarWidth + paddingForLabels;
    const containerW = Math.min(maxContainerWidth, Math.max(400, idealContainerWidth));
    
    // Calculate actual bar width
    const barW = Math.max(minBarWidth, (containerW - paddingForLabels) / array.length);
    
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
        
        {/* Current action message */}
        <motion.div 
          className="text-sm text-muted-foreground font-mono p-2 bg-muted rounded-md"
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
          {/* Info for large arrays */}
          {array.length > 50 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              <p className="font-medium">💡 Large array ({array.length} elements)</p>
              <p>Labels have been hidden for better readability. You can scroll horizontally to see the full array.</p>
            </div>
          )}
          
          <LayoutGroup>
            <div 
              className="flex items-end justify-center gap-1 mx-auto bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg p-6"
              style={{ 
                width: containerWidth,
                minHeight: shouldShowLabels ? maxHeight + 80 : maxHeight + 20
              }}
            >
              {array.map((element, index) => (
                <ArrayBar
                  key={`bar-${element.value}-${index}-${sortingState}`}
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