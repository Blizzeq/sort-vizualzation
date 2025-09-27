# Sorting Algorithm Visualizer

![Hero Screenshot](screenshots/Screenshot%202025-09-27%20at%2016.56.38.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-FF0055?style=flat&logo=framer)](https://www.framer.com/motion/)

A sophisticated web application that brings sorting algorithms to life through interactive visualizations and real-time performance analysis. Compare algorithm efficiency, understand complexity theory, and explore computational problem-solving through an intuitive interface.

## Visual Showcase

### Interactive Algorithm Selection
Explore five fundamental sorting algorithms with detailed complexity information and visual explanations.

![Algorithm Selection](screenshots/Screenshot%202025-09-27%20at%2016.56.38.png)

### Real-Time Visualization
Watch algorithms sort data in real-time with color-coded states showing comparisons, swaps, and final sorted positions.

![Main Visualization](screenshots/Screenshot%202025-09-27%20at%2016.56.58.png)

### Dynamic Sorting Process
See algorithms in action with smooth animations highlighting each step of the sorting process.

![Sorting in Action](screenshots/Screenshot%202025-09-27%20at%2016.57.38.png)

### Comprehensive Performance Analytics
Track detailed statistics including comparisons, swaps, array accesses, and execution time.

![Statistics Panel](screenshots/Screenshot%202025-09-27%20at%2016.57.49.png)

## Features

### Interactive Visualization
- **5 Sorting Algorithms**: Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, and Merge Sort
- **Color-Coded States**: Visual indicators for comparing, swapping, pivot, and sorted elements
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Step-by-Step Control**: Pause and advance through sorting manually

### Performance Analysis
- **Real Speed Mode**: Compare actual algorithm performance without animation delays
- **Customizable Array Sizes**: From 10 to 50 elements for optimal visualization
- **Live Statistics**: Real-time tracking of comparisons, swaps, and array accesses
- **Execution Time Measurement**: Precise timing for performance comparison

## Performance Metrics

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Stable |
|-----------|-----------|--------------|------------|------------------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |

### Array Size Optimization
- **Small Arrays (10-25 elements)**: Full visualization with labels and smooth animations
- **Medium Arrays (25-50 elements)**: Optimized rendering with selective labeling

## Technology Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and optimized performance
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking for enhanced development experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling with custom design system
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management solution
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern, accessible UI component library
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icon library

## Quick Start

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd sort-vizualzation

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Author

**Jakub Krasuski**  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/krasuski-jakub99/)