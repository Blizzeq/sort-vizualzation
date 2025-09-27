# Sorting Algorithm Visualizer

An interactive web application for visualizing and comparing different sorting algorithms with both educational animations and real-time performance analysis.

## Features

- **5 Sorting Algorithms**: Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, and Merge Sort
- **Interactive Visualization**: Animated bars showing the sorting process with color-coded states
- **Real Speed Mode**: Compare actual algorithm performance without animation delays
- **Customizable Arrays**: Adjust array size from 10 to 50 elements (or up to 10,000 in Real Speed Mode)
- **Live Statistics**: Track comparisons, swaps, array accesses, and execution time
- **Algorithm Information**: View time and space complexity for each algorithm
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sort-vizualzation
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Controls

- **Algorithm Selection**: Choose from 5 different sorting algorithms
- **Array Size**: Adjust the number of elements to sort (10-50 normally, up to 10,000 in Real Speed Mode)
- **Speed Control**: Change animation speed or enable Real Speed Mode for performance testing
- **Action Buttons**: Start/Pause, Reset, Generate New Array, Next Step (when paused)

### Real Speed Mode

Toggle Real Speed Mode to see the true performance differences between algorithms:
- Removes animation delays to show actual execution speed
- Supports arrays up to 10,000 elements
- Displays execution time in milliseconds
- Automatically disables visualization for arrays >1,000 elements for performance

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Zustand** - Lightweight state management
- **shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/
│   ├── controls/          # UI controls (sliders, buttons, selectors)
│   ├── statistics/        # Statistics and performance panels
│   ├── ui/               # Reusable UI components
│   └── visualization/     # Sorting visualization components
├── lib/
│   ├── algorithms/       # Sorting algorithm implementations
│   ├── store/           # Zustand state management
│   └── utils/           # Utility functions
└── types/               # TypeScript type definitions
```

## Algorithm Implementations

All sorting algorithms are implemented as generator functions that yield step-by-step states:

- **Bubble Sort**: O(n²) - Simple comparison-based algorithm
- **Insertion Sort**: O(n²) - Efficient for small arrays
- **Selection Sort**: O(n²) - Finds minimum and swaps
- **Quick Sort**: O(n log n) - Divide and conquer with pivot
- **Merge Sort**: O(n log n) - Stable divide and conquer

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by **Jakub Krasuski** - [LinkedIn](https://www.linkedin.com/in/krasuski-jakub99/)

Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.