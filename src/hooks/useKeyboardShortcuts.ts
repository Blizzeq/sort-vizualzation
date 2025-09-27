'use client';

import { useEffect } from 'react';
import { useSortingStore } from '@/lib/store/sortingStore';

export function useKeyboardShortcuts() {
  const {
    sortingState,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    generateNewArray,
    nextStep
  } = useSortingStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      // Prevent default behavior for our shortcuts
      const shortcuts = [' ', 'r', 'R', 'n', 'N', 's', 'S', 'ArrowRight'];
      if (shortcuts.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case ' ': // Spacebar - Play/Pause
          if (sortingState === 'idle' || sortingState === 'completed') {
            startSorting();
          } else if (sortingState === 'sorting') {
            pauseSorting();
          } else if (sortingState === 'paused') {
            resumeSorting();
          }
          break;

        case 'r':
        case 'R': // R - Reset
          if (sortingState !== 'idle') {
            resetSorting();
          }
          break;

        case 'n':
        case 'N': // N - New array
          if (sortingState === 'idle' || sortingState === 'completed') {
            generateNewArray();
          }
          break;

        case 's':
        case 'S': // S - Next step (when paused)
          if (sortingState === 'paused') {
            nextStep();
          }
          break;

        case 'ArrowRight': // Right arrow - Next step (when paused)
          if (sortingState === 'paused') {
            nextStep();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sortingState, startSorting, pauseSorting, resumeSorting, resetSorting, generateNewArray, nextStep]);
}