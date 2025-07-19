import React from 'react';

interface ControlPanelProps {
  algorithm: string;
  setAlgorithm: (algo: string) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: string;
  setSpeed: (speed: string) => void;
  onRandomize: () => void;
  onSort: () => void;
}

const algorithms = [
  'Heap Sort',
  'Merge Sort',
  'Quick Sort',
  'Insertion Sort',
  'Bubble Sort',
  'Selection Sort',
];

const speeds = ['Slow', 'Medium', 'Fast'];

const ControlPanel: React.FC<ControlPanelProps> = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  onRandomize,
  onSort,
}) => (
  <div className="w-full max-w-4xl bg-gray-200 rounded shadow flex flex-wrap items-center justify-between p-4 mb-6 gap-4">
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold">ALGORITHM</label>
      <select className="rounded border px-2 py-1" value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
        {algorithms.map(algo => (
          <option key={algo}>{algo}</option>
        ))}
      </select>
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold">ARRAY SIZE (1 to 100)</label>
      <input type="number" className="rounded border px-2 py-1 w-25" min={5} max={100} value={arraySize} onChange={e => setArraySize(Number(e.target.value))} />
    </div>
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold">SORTING SPEED</label>
      <select className="rounded border px-2 py-1" value={speed} onChange={e => setSpeed(e.target.value)}>
        {speeds.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
    <div className="flex gap-2 mt-5 md:mt-0">
      <button className="px-4 py-2 border rounded bg-white font-semibold hover:bg-gray-100" onClick={onRandomize}>Randomize</button>
      <button className="px-4 py-2 border rounded bg-black text-white font-semibold hover:bg-gray-800" onClick={onSort}>Sort</button>
    </div>
  </div>
);

export default ControlPanel; 