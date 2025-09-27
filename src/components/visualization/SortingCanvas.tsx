'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSortingStore } from '@/lib/store/sortingStore';
import { ArrayBar } from './ArrayBar';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';

export function SortingCanvas() {
  const { array, algorithm, sortingState, currentMessage } = useSortingStore();

  const { maxValue, containerWidth, barWidth } = useMemo(() => {
    if (array.length === 0) return { maxValue: 1, containerWidth: 800, barWidth: 20 };
    
    const max = Math.max(...array.map(el => el.value));
    const containerW = Math.min(1200, Math.max(600, array.length * 30));
    const barW = Math.max(10, (containerW - 40) / array.length);
    
    return { 
      maxValue: max, 
      containerWidth: containerW, 
      barWidth: barW 
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
          <div 
            className="flex items-end justify-center gap-1 mx-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-4"
            style={{ 
              width: containerWidth,
              minHeight: maxHeight + 80
            }}
          >
            <AnimatePresence mode="wait">
              {array.map((element, index) => (
                <ArrayBar
                  key={`${element.index}-${element.value}`}
                  element={element}
                  maxValue={maxValue}
                  maxHeight={maxHeight}
                  width={barWidth}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
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
}