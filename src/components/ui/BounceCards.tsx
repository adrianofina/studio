import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

const defaultImages = [
  'https://picsum.photos/400/400?grayscale',
  'https://picsum.photos/500/500?grayscale',
  'https://picsum.photos/600/600?grayscale',
  'https://picsum.photos/700/700?grayscale',
  'https://picsum.photos/300/300?grayscale',
];

const defaultTransforms = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)',
];

export default function BounceCards({
  className = '',
  images = defaultImages,
  containerWidth = 500,
  containerHeight = 280,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = defaultTransforms,
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotate = baseTransform.replace(/rotate\([^)]*\)/, 'rotate(0deg)');
        gsap.to(target, { transform: noRotate, duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushed = baseTransform.replace(/translate\(([-\d.]+)px\)/, `translate(${parseFloat(RegExp.$1 || '0') + offsetX}px)`);
        gsap.to(target, { transform: pushed, duration: 0.4, ease: 'back.out(1.4)', delay: Math.abs(hoveredIdx - i) * 0.05, overwrite: 'auto' });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, { transform: transformStyles[i] || 'none', duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
  };

  return (
    <div
      className={`bounce-cards-container ${className}`}
      ref={containerRef}
      style={{ position: 'relative', width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`bounce-card bounce-card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? 'none',
            position: 'absolute',
            width: '180px',
            aspectRatio: '1',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img src={src} alt={`card-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </div>
  );
}
