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

export const ArrayBar = memo(function ArrayBar({ element, maxValue, maxHeight, width, index, showLabels = true }: ArrayBarProps) {
  const height = Math.max((element.value / maxValue) * maxHeight, 20);
  const shouldShowValue = showLabels && width > 20;
  const shouldShowIndex = showLabels && width > 15;

  return (
    <motion.div
      className="flex flex-col items-center justify-end"
      style={{ 
        width: width, 
        minHeight: showLabels ? maxHeight + 40 : maxHeight + 10 
      }}
      layoutId={`bar-${element.value}-${index}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.01
      }}
    >
      {/* Value label */}
      {shouldShowValue && (
        <motion.div 
          className="text-xs text-center mb-1 font-mono"
          layoutId={`value-${element.value}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.01 + 0.2 }}
        >
          {element.value}
        </motion.div>
      )}
      
      {/* Bar */}
      <motion.div
        className={`bg-gradient-to-t ${getBarGradient(element.state)} rounded-t-md border border-white/20 shadow-lg`}
        style={{ 
          width: Math.max(width - 2, 6),
          minWidth: 6
        }}
        layoutId={`bar-content-${element.value}-${index}`}
        animate={{ 
          height: height,
          scale: element.state === 'comparing' || element.state === 'swapping' ? 1.05 : 1
        }}
        transition={{ 
          height: { type: "spring", stiffness: 400, damping: 30 },
          scale: { type: "spring", stiffness: 600, damping: 25 },
          layout: { type: "spring", stiffness: 400, damping: 30 }
        }}
      />
      
      {/* Index label */}
      {shouldShowIndex && (
        <motion.div 
          className="text-xs text-muted-foreground mt-1 font-mono"
          layoutId={`index-${element.value}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.01 + 0.3 }}
        >
          {index}
        </motion.div>
      )}
    </motion.div>
  );
});