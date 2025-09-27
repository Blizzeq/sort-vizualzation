'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSortingStore } from '@/lib/store/sortingStore';
import { ALGORITHM_INFO } from '@/lib/algorithms/types';
import { BarChart3, Clock, ArrowUpDown, Eye, CheckCircle } from 'lucide-react';

export function StatsPanel() {
  const { 
    statistics, 
    algorithm, 
    arraySize, 
    currentStep, 
    totalSteps,
    sortingState 
  } = useSortingStore();

  const algorithmInfo = ALGORITHM_INFO[algorithm];
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle 
  }: { 
    icon: React.ComponentType<{ className?: string }>, 
    title: string, 
    value: string | number, 
    subtitle?: string 
  }) => (
    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
      <div className="p-2 bg-primary/10 rounded-md">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Statistics
          </CardTitle>
          {sortingState === 'completed' && (
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        {(sortingState === 'sorting' || sortingState === 'paused') && totalSteps > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentStep} / {totalSteps} steps</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Real-time Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={ArrowUpDown}
            title="Comparisons"
            value={statistics.comparisons.toLocaleString()}
            subtitle="Element comparisons"
          />
          
          <StatCard
            icon={ArrowUpDown}
            title="Swaps"
            value={statistics.swaps.toLocaleString()}
            subtitle="Array swaps"
          />
          
          <StatCard
            icon={Eye}
            title="Array Accesses"
            value={statistics.arrayAccesses.toLocaleString()}
            subtitle="Total array reads/writes"
          />
          
          <StatCard
            icon={Clock}
            title="Time Elapsed"
            value={formatTime(statistics.timeElapsed)}
            subtitle="Visualization time"
          />
        </div>

        {/* Algorithm Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{algorithmInfo.name} Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Time Complexity */}
            <div className="space-y-2">
              <h4 className="font-medium">Time Complexity</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Best:</span>
                  <Badge variant="outline" className="text-green-600">
                    {algorithmInfo.timeComplexity.best}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average:</span>
                  <Badge variant="outline" className="text-blue-600">
                    {algorithmInfo.timeComplexity.average}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Worst:</span>
                  <Badge variant="outline" className="text-red-600">
                    {algorithmInfo.timeComplexity.worst}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Additional Properties */}
            <div className="space-y-2">
              <h4 className="font-medium">Properties</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Space:</span>
                  <Badge variant="outline">
                    {algorithmInfo.spaceComplexity}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stable:</span>
                  <Badge variant={algorithmInfo.stable ? "default" : "secondary"}>
                    {algorithmInfo.stable ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Array Size:</span>
                  <Badge variant="outline">
                    {arraySize} elements
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {algorithmInfo.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}