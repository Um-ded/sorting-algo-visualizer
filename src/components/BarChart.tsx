import React from 'react';

interface BarChartProps {
  array: number[];
  comparing: number[];
  finalIndices: number[];
}

const BarChart: React.FC<BarChartProps> = ({ array, comparing, finalIndices }) => {
  return (
    <div className="w-full h-full flex items-end gap-1">
      {array.map((value, i) => {
        let color = 'bg-gray-800';
        if (finalIndices.includes(i)) color = 'bg-green-500';
        else if (comparing.includes(i)) color = 'bg-yellow-400';
        return (
          <div
            key={i}
            className={`${color} rounded-t`}
            style={{ height: `${value}px`, width: '16px' }}
          ></div>
        );
      })}
    </div>
  );
};

export default BarChart; 