import React from 'react';

const Legend: React.FC = () => (
  <div className="w-full max-w-4xl flex gap-4 mb-2 justify-center">
    <div className="flex items-center gap-2"><span className="w-6 h-3 bg-blue-500 rounded"></span><span className="text-xs font-semibold">Initial</span></div>
    <div className="flex items-center gap-2"><span className="w-6 h-3 bg-green-500 rounded"></span><span className="text-xs font-semibold">Final</span></div>
    <div className="flex items-center gap-2"><span className="w-6 h-3 bg-yellow-400 rounded"></span><span className="text-xs font-semibold">Comparing</span></div>
  </div>
);

export default Legend; 