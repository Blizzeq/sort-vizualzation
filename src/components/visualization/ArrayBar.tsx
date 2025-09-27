'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrayElement } from '@/types';

interface ArrayBarProps {
  element: ArrayElement;
  maxValue: number;
  maxHeight: number;
  width: number;
  index: number;
  showLabels?: boolean;
}


const getBarGradient = (state: ArrayElement['state']) => {
  switch (state) {
    case 'comparing':
      return 'from-red-400 to-red-600';
    case 'swapping':
      return 'from-yellow-400 to-yellow-600';
    case 'sorted':
      return 'from-green-400 to-green-600';
    case 'pivot':
      return 'from-purple-400 to-purple-600';
    default:
      return 'from-blue-300 to-blue-500';
  }
};

const ArrayBarComponent = function ArrayBar({ element, maxValue, maxHeight, width, index, showLabels = true }: ArrayBarProps) {
  
  const height = Math.max((element.value / maxValue) * maxHeight, 20);
  const shouldShowValue = showLabels;
  const shouldShowIndex = showLabels;
  
  // Performance optimization for large arrays
  const isLargeArray = index > 50;
  const animationDelay = isLargeArray ? 0 : index * 0.005;
  const shouldUseLayout = !isLargeArray;

  const barHeight = element.state === 'comparing' || element.state === 'swapping' ? height * 1.05 : height;
  const labelTopPosition = maxHeight - barHeight - 16;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-end"
      style={{ 
        width: width, 
        height: showLabels ? maxHeight + 40 : maxHeight + 10 
      }}
      layoutId={shouldUseLayout ? `bar-${element.value}-${index}` : undefined}
      initial={isLargeArray ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
      animate={isLargeArray ? { opacity: 1 } : { scale: 1, opacity: 1 }}
      exit={isLargeArray ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
      transition={isLargeArray ? 
        { duration: 0.2, delay: animationDelay } :
        { 
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: animationDelay
        }
      }
    >
      {/* Value label - positioned just above bar */}
      {shouldShowValue && (
        <motion.div 
          className="absolute text-xs text-center font-mono"
          style={{ 
            bottom: barHeight + 2 + 'px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          layoutId={undefined}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            bottom: barHeight + 2 + 'px'
          }}
          transition={{ 
            opacity: { delay: animationDelay + 0.1, duration: isLargeArray ? 0.15 : 0.3 },
            bottom: isLargeArray ? { duration: 0.3 } : { type: "spring", stiffness: 400, damping: 30 }
          }}
        >
          {element.value}
        </motion.div>
      )}
      
      {/* Bar - grows from bottom up */}
      <motion.div
        className={`bg-gradient-to-t ${getBarGradient(element.state)} rounded-t-md border border-white/20 shadow-lg`}
        style={{ 
          width: Math.max(width - 2, 6),
          minWidth: 6
        }}
        layoutId={shouldUseLayout ? `bar-content-${element.value}-${index}` : undefined}
        animate={{ 
          height: barHeight
        }}
        transition={isLargeArray ? 
          { 
            height: { duration: 0.3 }
          } :
          { 
            height: { type: "spring", stiffness: 400, damping: 30 },
            layout: { type: "spring", stiffness: 400, damping: 30 }
          }
        }
      />
      
      {/* Index label - positioned absolutely at bottom */}
      {shouldShowIndex && (
        <motion.div 
          className="absolute bottom-0 text-xs text-muted-foreground font-mono"
          style={{ bottom: '2px' }}
          layoutId={shouldUseLayout ? `index-${element.value}-${index}` : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay + 0.15, duration: isLargeArray ? 0.15 : 0.3 }}
        >
          {index}
        </motion.div>
      )}
    </motion.div>
  );
};

export const ArrayBar = memo(ArrayBarComponent, (prevProps, nextProps) => {
  // Always re-render if state changed to 'sorted' to ensure completion colors show
  if (nextProps.element.state === 'sorted' && prevProps.element.state !== 'sorted') {
    return false; // Force re-render
  }
  
  return !(
    prevProps.element.state === nextProps.element.state &&
    prevProps.element.value === nextProps.element.value &&
    prevProps.maxValue === nextProps.maxValue &&
    prevProps.width === nextProps.width &&
    prevProps.showLabels === nextProps.showLabels
  );
});