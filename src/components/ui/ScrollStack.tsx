import { useEffect, useRef } from 'react';

interface ScrollStackItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollStackItem({ children, className = '' }: ScrollStackItemProps) {
  return <div className={`scroll-stack-card ${className}`}>{children}</div>;
}

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

export function ScrollStack({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const childrenArray = Array.isArray(children) ? children : [children];
  const totalItems = childrenArray.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const progress = scrollTop / maxScroll;

      // Check if stack is complete
      if (progress > 0.8 && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (progress <= 0.8 && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onStackComplete]);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-scroller ${className}`}
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '0 1.5rem',
        position: 'relative',
        scrollBehavior: 'smooth',
      }}
    >
      <div
        className="scroll-stack-inner"
        style={{
          padding: '8vh 0 30vh',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        {childrenArray.map((child, idx) => {
          const progress = Math.max(0, Math.min(1, (idx / totalItems) * 1.2));
          const scale = 1 - progress * itemScale;
          const blur = blurAmount * progress * idx;

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${scale})`,
                filter: `blur(${blur}px)`,
                transition: 'transform 0.15s ease-out, filter 0.15s ease-out',
                marginBottom: `${itemDistance}px`,
                position: 'relative',
                zIndex: totalItems - idx,
                transformOrigin: 'top center',
              }}
            >
              <div
                style={{
                  background: 'rgba(26,21,26,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  minHeight: '120px',
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScrollStack;
