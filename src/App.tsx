import { useState, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import Legend from './components/Legend';
import BarChart from './components/BarChart';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  heapSort,
} from './algorithms';
import type { SortStep } from './algorithms';

const getRandomArray = (size: number) => Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 40);

const algoMap: Record<string, (arr: number[]) => Generator<SortStep>> = {
  'Bubble Sort': bubbleSort,
  'Insertion Sort': insertionSort,
  'Selection Sort': selectionSort,
  'Quick Sort': quickSort,
  'Merge Sort': mergeSort,
  'Heap Sort': heapSort,
};

const speedMap: Record<string, number> = {
  'Slow': 300,
  'Medium': 80,
  'Fast': 20,
};

function App() {
  const [algorithm, setAlgorithm] = useState('Heap Sort');
  const [arraySize, setArraySize] = useState(25);
  const [speed, setSpeed] = useState('Fast');
  const [array, setArray] = useState<number[]>(getRandomArray(25));
  const [comparing, setComparing] = useState<number[]>([]);
  const [finalIndices, setFinalIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleRandomize = () => {
    if (isSorting) return;
    setArray(getRandomArray(arraySize));
    setComparing([]);
    setFinalIndices([]);
  };

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    const gen = algoMap[algorithm](array);
    function step() {
      const next = gen.next();
      if (next.done) {
        setIsSorting(false);
        setComparing([]);
        setFinalIndices(Array.from({ length: array.length }, (_, i) => i));
        return;
      }
      setArray(next.value.array);
      setComparing(next.value.comparing);
      setFinalIndices(next.value.finalIndices);
      timeoutRef.current = window.setTimeout(step, speedMap[speed]);
    }
    step();
  };

  // Cancel animation on unmount
  // @ts-ignore
  if (typeof window !== 'undefined') {
    window.onbeforeunload = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }

  const handleArraySize = (size: number) => {
    if (isSorting) return;
    setArraySize(size);
    setArray(getRandomArray(size));
    setComparing([]);
    setFinalIndices([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 mt-2 tracking-wide text-center border-b-2 border-black pb-2 w-full max-w-4xl bg-white shadow rounded">A SORTING VISUALIZER</h1>
      <ControlPanel
        algorithm={algorithm}
        setAlgorithm={isSorting ? () => {} : setAlgorithm}
        arraySize={arraySize}
        setArraySize={handleArraySize}
        speed={speed}
        setSpeed={isSorting ? () => {} : setSpeed}
        onRandomize={handleRandomize}
        onSort={handleSort}
      />
      <Legend />
      <div className="w-full max-w-4xl flex-1 bg-gray-100 rounded shadow flex items-end justify-center p-6 min-h-[300px]">
        <BarChart array={array} comparing={comparing} finalIndices={finalIndices} />
      </div>
    </div>
  );
}

export default App;
