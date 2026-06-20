import { useEffect, useRef, useState } from 'react';

interface GlassSurfaceProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Tear drop effect intensity (0-1) */
  tearDrop?: number;
  /** Tear drop color */
  tearDropColor?: string;
}

export function GlassSurface({
  children,
  width = 300,
  height = 200,
  borderRadius = 24,
  className = '',
  style = {},
  tearDrop = 0.5,
  tearDropColor = 'rgba(176, 0, 255, 0.15)',
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;

  // Tear drop displacement offset
  const dx = (mousePos.x - 0.5) * 2 * tearDrop * 20;
  const dy = (mousePos.y - 0.5) * 2 * tearDrop * 20;

  return (
    <div
      ref={containerRef}
      className={`glass-surface-fallback ${className}`}
      style={{
        width: w,
        height: h,
        borderRadius: `${borderRadius}px`,
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        ...style,
      }}
    >
      {/* Tear drop distortion effect */}
      {tearDrop > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${tearDropColor}, transparent 70%)`,
            transform: `translate(${dx}px, ${dy}px) scale(${1 + tearDrop * 0.05})`,
            transition: 'transform 0.1s ease-out',
            borderRadius: `${borderRadius}px`,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}

export default GlassSurface;
