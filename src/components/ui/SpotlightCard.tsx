import { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(176, 0, 255, 0.15)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#1A151A',
        padding: '2rem',
        overflow: 'hidden',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': 'rgba(176,0,255,0.1)',
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)`,
          opacity: 0,
          transition: 'opacity 0.5s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default SpotlightCard;
