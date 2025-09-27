'use client';

import { ControlPanel } from '@/components/controls/ControlPanel';
import { SortingCanvas } from '@/components/visualization/SortingCanvas';
import { StatsPanel } from '@/components/statistics/StatsPanel';
import { AlgorithmShowcase } from '@/components/AlgorithmShowcase';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { motion } from 'framer-motion';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Sorting Algorithm
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Visualizer
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Discover how different sorting algorithms work. Compare their performance, 
                  understand their complexity, and learn through interactive visualization.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">5 Algorithms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Real-time Animation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Performance Analysis</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Algorithm Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AlgorithmShowcase />
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Controls */}
          <ControlPanel />
          
          {/* Visualization */}
          <SortingCanvas />
          
          {/* Statistics */}
          <StatsPanel />
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-16 py-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Created by <a 
                href="https://www.linkedin.com/in/krasuski-jakub99/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors underline decoration-blue-300 hover:decoration-blue-500"
              >
                Jakub Krasuski
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </motion.footer>

        {/* Keyboard Shortcuts */}
        <KeyboardShortcuts />
      </div>
    </div>
  );
}
