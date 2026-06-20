import { useRef, useCallback } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  fillOpacity?: number;
}

export function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  fillOpacity = 0.3,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy) / Math.min(cx, cy);
    const proximity = Math.min(1, 1 / (dist + 0.1));
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    card.style.setProperty('--edge-proximity', `${proximity * 100}`);
    card.style.setProperty('--cursor-angle', `${angle}deg`);
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        '--glow-color': `hsl(${glowColor} / ${100 * glowIntensity}%)`,
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        background: backgroundColor,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'visible',
        isolation: 'isolate',
        transform: 'translate3d(0,0,0.01px)',
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: 0,
          transition: 'opacity 0.3s ease-out',
          boxShadow: `
            inset 0 0 20px var(--glow-color),
            0 0 40px var(--glow-color)
          `,
          maskImage: `conic-gradient(from var(--cursor-angle, 45deg) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from var(--cursor-angle, 45deg) at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BorderGlow;
