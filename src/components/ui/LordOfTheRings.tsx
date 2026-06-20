interface Segment {
  label: string;
  value: number;
  color: string;
  pct: number;
}

interface Props {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
  centerText?: string;
}

export function LordOfTheRings({ segments, size = 120, strokeWidth = 8, centerText }: Props) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  
  const softenColor = (color: string, pct: number) => {
    if (pct < 15) return `${color}88`;
    return color;
  };
  
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#2A2A2E" strokeWidth={strokeWidth} />
        {segments.map((seg, idx) => {
          const dash = (seg.value / total) * circumference;
          const gap = circumference - dash;
          const currentOffset = -offset;
          offset += dash;
          const softenedColor = softenColor(seg.color, seg.pct);
          return (
            <circle
              key={idx}
              cx={size/2} cy={size/2} r={radius} fill="none"
              stroke={softenedColor} strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={currentOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`}
              style={{ transition: 'stroke-dasharray 0.7s ease' }}
            />
          );
        })}
      </svg>
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-center">{centerText}</span>
        </div>
      )}
    </div>
  );
}
