import React from 'react';
import { ClassificationResult } from '../types';

interface ResultDisplayProps {
  result: ClassificationResult;
  threshold: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, threshold }) => {
  const percentage = Math.min(100, Math.round((result.score / threshold) * 100));
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-grow">
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${result.isSpam ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="text-sm font-medium">
          Score: {result.score}/{threshold}
        </div>
      </div>
      
      <div className="text-sm text-slate-600">
        {result.isSpam ? (
          <>
            This email contains {result.score} suspicious patterns that match common spam characteristics.
            We recommend reviewing it carefully before taking any action.
          </>
        ) : (
          <>
            This email contains {result.score} potential spam indicators, but falls below the threshold of {threshold}.
            It appears to be legitimate, but always use caution with unexpected messages.
          </>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;