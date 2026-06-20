interface Props {
  status?: 'active' | 'overdue' | 'completed' | 'pending' | 'inactive';
  animated?: boolean;
}

export function StatusSpine({ status = 'inactive', animated = true }: Props) {
  const getColor = () => {
    if (status === 'overdue') return '#EF4444';
    if (status === 'active') return '#10B981';
    if (status === 'completed') return '#8B5CF6';
    if (status === 'pending') return '#F59E0B';
    return '#4A4A5A';
  };
  
  return (
    <div 
      className={`w-1 h-12 rounded-full ${animated && status === 'overdue' ? 'animate-pulse' : ''}`}
      style={{ background: getColor() }}
    />
  );
}
