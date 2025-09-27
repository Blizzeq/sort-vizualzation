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

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentAlgorithm(prev => {
        const currentIndex = algorithms.indexOf(prev);
        return algorithms[(currentIndex + 1) % algorithms.length];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextAlgorithm = () => {
    setIsAutoPlay(false);
    const currentIndex = algorithms.indexOf(currentAlgorithm);
    setCurrentAlgorithm(algorithms[(currentIndex + 1) % algorithms.length]);
  };

  const prevAlgorithm = () => {
    setIsAutoPlay(false);
    const currentIndex = algorithms.indexOf(currentAlgorithm);
    setCurrentAlgorithm(algorithms[(currentIndex - 1 + algorithms.length) % algorithms.length]);
  };

  const selectAlgorithm = (algorithm: AlgorithmType) => {
    setIsAutoPlay(false);
    setCurrentAlgorithm(algorithm);
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
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              key={currentAlgorithm}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-blue-600 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {currentInfo.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Average: {currentInfo.timeComplexity.average}
                </p>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevAlgorithm}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextAlgorithm}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Fixed height container to prevent jumping */}
          <div className="min-h-[280px]">
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

                {/* Algorithm Description - Fixed height with scrolling if needed */}
                <div className="h-[60px] overflow-hidden">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {currentInfo.description}
                  </p>
                </div>

                {/* Properties */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 border-green-200">
                    Best: {currentInfo.timeComplexity.best}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 border-blue-200">
                    Avg: {currentInfo.timeComplexity.average}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 border-red-200">
                    Worst: {currentInfo.timeComplexity.worst}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 border-purple-200">
                    Space: {currentInfo.spaceComplexity}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={currentInfo.stable ? "bg-emerald-50 border-emerald-200" : "bg-orange-50 border-orange-200"}
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
  const [bars] = useState([8, 3, 5, 4, 7, 6, 1, 2]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    // Simple animation to show algorithm characteristics
    const animate = () => {
      let step = 0;
      const interval = setInterval(() => {
        switch (algorithm) {
          case 'bubble':
            setActiveIndices([step % 7, (step % 7) + 1]);
            break;
          case 'insertion':
            setActiveIndices([step % 8]);
            break;
          case 'selection':
            setActiveIndices([0, step % 8]);
            break;
          case 'quick':
            setActiveIndices([3, step % 8]); // Pivot and current
            break;
          case 'merge':
            setActiveIndices(step % 2 === 0 ? [0, 1, 2, 3] : [4, 5, 6, 7]);
            break;
        }
        step++;
        if (step > 15) {
          setActiveIndices([]);
          step = 0;
        }
      }, 300);

      return interval;
    };

    const interval = animate();
    return () => clearInterval(interval);
  }, [algorithm]);

  return (
    <div className="flex items-end justify-center gap-1 h-16">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className={`rounded-t transition-colors duration-300 ${
            activeIndices.includes(index)
              ? 'bg-red-400'
              : 'bg-blue-400'
          }`}
          style={{
            width: '12px',
            height: `${height * 6}px`,
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