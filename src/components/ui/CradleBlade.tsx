import { useState } from 'react';

interface Props {
  score: number;
  minScore?: number;
  maxScore?: number;
  showLabels?: boolean;
}

export function CradleBlade({ score = 50, minScore = 0, maxScore = 100, showLabels = true }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = ((score - minScore) / (maxScore - minScore)) * 100;
  
  return (
    <div 
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showLabels && (
        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
          <span>High Risk</span>
          <span>Medium Risk</span>
          <span>Low Risk</span>
        </div>
      )}
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #EF4444, #F59E0B, #10B981)' }} />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-full transition-all duration-400"
          style={{ 
            left: `${percentage}%`,
            boxShadow: isHovered ? '0 0 12px white' : 'none',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs font-mono">{minScore}</span>
        <span className="text-xs font-bold" style={{ color: score >= 70 ? '#10B981' : score >= 30 ? '#F59E0B' : '#EF4444' }}>
          {score >= 70 ? 'Low Risk' : score >= 30 ? 'Medium Risk' : 'High Risk'}
        </span>
        <span className="text-xs font-mono">{maxScore}</span>
      </div>
    </div>
  );
}
