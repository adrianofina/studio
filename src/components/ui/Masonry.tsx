import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface MasonryProps {
  items?: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const defaultItems: MasonryItem[] = [
  { id: '1', img: 'https://picsum.photos/id/1015/600/900?grayscale', url: '#', height: 400 },
  { id: '2', img: 'https://picsum.photos/id/1011/600/750?grayscale', url: '#', height: 250 },
  { id: '3', img: 'https://picsum.photos/id/1020/600/800?grayscale', url: '#', height: 600 },
  { id: '4', img: 'https://picsum.photos/id/1018/600/400?grayscale', url: '#', height: 350 },
  { id: '5', img: 'https://picsum.photos/id/1019/600/500?grayscale', url: '#', height: 450 },
  { id: '6', img: 'https://picsum.photos/id/1024/600/300?grayscale', url: '#', height: 200 },
];

const useMedia = (queries: string[], values: any[], defaultValue: any) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

export default function Masonry({
  items = defaultItems,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        items.map(
          (item) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = item.img;
              img.onload = img.onerror = () => resolve(undefined);
            })
        )
      );
      setImagesReady(true);
    };
    preloadImages();
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        let initialX = item.x, initialY = item.y;
        switch (animateFrom) {
          case 'top': initialY = -200; break;
          case 'bottom': initialY = window.innerHeight + 200; break;
          case 'left': initialX = -200; break;
          case 'right': initialX = window.innerWidth + 200; break;
          default: initialY = item.y + 100;
        }

        gsap.fromTo(selector,
          { opacity: 0, x: initialX, y: initialY, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animationProps, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger }
        );
      } else {
        gsap.to(selector, { ...animationProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          style={{
            position: 'absolute',
            padding: '6px',
            cursor: 'pointer',
            top: 0,
            left: 0,
            width: item.w,
            height: item.h,
          }}
          onMouseEnter={(e) => {
            if (scaleOnHover) {
              gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
            }
          }}
          onMouseLeave={() => {
            if (scaleOnHover) {
              gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
            }
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '10px',
              boxShadow: '0px 10px 50px -10px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
