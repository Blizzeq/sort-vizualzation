import { ControlPanel } from '@/components/controls/ControlPanel';
import { SortingCanvas } from '@/components/visualization/SortingCanvas';
import { StatsPanel } from '@/components/statistics/StatsPanel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how different sorting algorithms work step by step. 
            Compare their performance, understand their complexity, and learn through interactive visualization.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Controls */}
          <ControlPanel />
          
          {/* Visualization */}
          <SortingCanvas />
          
          {/* Statistics */}
          <StatsPanel />
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </footer>
      </div>
    </div>
  );
}
