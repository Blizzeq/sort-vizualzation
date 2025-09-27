'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';
import { AlgorithmType } from '@/types';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const algorithms: AlgorithmType[] = ['bubble', 'insertion', 'selection', 'quick', 'merge'];

export function AlgorithmShowcase() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType>('bubble');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [intervalDuration, setIntervalDuration] = useState(4000);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentAlgorithm(prev => {
        const currentIndex = algorithms.indexOf(prev);
        return algorithms[(currentIndex + 1) % algorithms.length];
      });
      // Reset to normal duration after each auto change
      setIntervalDuration(4000);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [isAutoPlay, intervalDuration]);

  const nextAlgorithm = () => {
    const currentIndex = algorithms.indexOf(currentAlgorithm);
    setCurrentAlgorithm(algorithms[(currentIndex + 1) % algorithms.length]);
    // Extend the interval when user manually navigates
    setIntervalDuration(8000);
  };

  const prevAlgorithm = () => {
    const currentIndex = algorithms.indexOf(currentAlgorithm);
    setCurrentAlgorithm(algorithms[(currentIndex - 1 + algorithms.length) % algorithms.length]);
    // Extend the interval when user manually navigates
    setIntervalDuration(8000);
  };

  const selectAlgorithm = (algorithm: AlgorithmType) => {
    setCurrentAlgorithm(algorithm);
    // Extend the interval when user manually selects
    setIntervalDuration(8000);
  };

  const currentInfo = ALGORITHM_INFO[currentAlgorithm];

  return (
    <div className="relative">
      {/* Algorithm Cards Selector */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {algorithms.map((algorithm) => (
          <motion.button
            key={algorithm}
            onClick={() => selectAlgorithm(algorithm)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              currentAlgorithm === algorithm
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/70 text-gray-700 hover:bg-white/90'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ALGORITHM_INFO[algorithm].name}
          </motion.button>
        ))}
      </div>

      {/* Main Algorithm Display */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-2">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              key={currentAlgorithm}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="p-3 bg-blue-600 rounded-lg">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {currentInfo.name}
                </h3>
                <p className="text-base text-gray-600">
                  Average: {currentInfo.timeComplexity.average}
                </p>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevAlgorithm}
                className="h-10 w-10 p-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextAlgorithm}
                className="h-10 w-10 p-0"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content container with fixed height */}
          <div className="h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAlgorithm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Mini Visualization */}
                <div className="bg-white/50 rounded-lg p-4">
                  <MiniVisualization algorithm={currentAlgorithm} />
                </div>

                {/* Algorithm Description */}
                <div className="h-[48px] flex items-center">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {currentInfo.description}
                  </p>
                </div>

                {/* Properties */}
                <div className="grid grid-cols-3 gap-3">
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-sm py-2 px-3 justify-center">
                    Best: {currentInfo.timeComplexity.best}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-sm py-2 px-3 justify-center">
                    Avg: {currentInfo.timeComplexity.average}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 border-red-200 text-sm py-2 px-3 justify-center">
                    Worst: {currentInfo.timeComplexity.worst}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 border-purple-200 text-sm py-2 px-3 justify-center">
                    Space: {currentInfo.spaceComplexity}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-sm py-2 px-3 justify-center ${currentInfo.stable ? "bg-emerald-50 border-emerald-200" : "bg-orange-50 border-orange-200"}`}
                  >
                    {currentInfo.stable ? "Stable" : "Unstable"}
                  </Badge>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>

        {/* Auto-play indicator */}
        {isAutoPlay && (
          <motion.div
            className="absolute bottom-2 right-2 text-xs text-gray-500 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            Auto-rotating
          </motion.div>
        )}
      </Card>
    </div>
  );
}

function MiniVisualization({ algorithm }: { algorithm: AlgorithmType }) {
  const [bars] = useState([12, 4, 8, 6, 11, 9, 2, 5, 10, 7, 3, 1]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    let step = 0;
    let animationId: number;
    let lastTime = 0;
    
    const updateAnimation = () => {
      switch (algorithm) {
        case 'bubble':
          setActiveIndices([step % 11, (step % 11) + 1]);
          break;
        case 'insertion':
          setActiveIndices([step % 12]);
          break;
        case 'selection':
          setActiveIndices([0, step % 12]);
          break;
        case 'quick':
          setActiveIndices([5, step % 12]); // Pivot and current
          break;
        case 'merge':
          setActiveIndices(step % 2 === 0 ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11]);
          break;
      }
      step++;
      if (step > 15) {
        setActiveIndices([]);
        step = 0;
      }
    };
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 300) { // 300ms interval
        updateAnimation();
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [algorithm]);

  return (
    <div className="flex items-end justify-center gap-2 h-32">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className={`rounded-t transition-colors duration-300 ${
            activeIndices.includes(index)
              ? 'bg-red-400'
              : 'bg-blue-400'
          }`}
          style={{
            width: '20px',
            height: `${height * 10}px`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: activeIndices.includes(index) ? 1.1 : 1,
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}