interface Props {
  data: number[];
  color?: string;
}

export function SparklineBars({ data, color = '#6366F1' }: Props) {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((val, idx) => (
        <div 
          key={idx} 
          className="w-1.5 rounded-sm transition-all duration-300"
          style={{ 
            height: `${(val / max) * 100}%`,
            background: color,
            opacity: idx === data.length - 1 ? 1 : 0.4
          }} 
        />
      ))}
    </div>
  );
}
