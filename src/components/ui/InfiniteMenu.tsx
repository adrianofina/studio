import { useState, useRef } from 'react';

interface InfiniteMenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
}

const defaultItems: InfiniteMenuItem[] = [
  { image: 'https://picsum.photos/300/300?grayscale', link: '#', title: 'Item 1', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/400/400?grayscale', link: '#', title: 'Item 2', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/500/500?grayscale', link: '#', title: 'Item 3', description: 'This is pretty cool' },
  { image: 'https://picsum.photos/600/600?grayscale', link: '#', title: 'Item 4', description: 'This is pretty cool' },
];

export function InfiniteMenu({ items = defaultItems, scale = 1.0 }: InfiniteMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = (idx: number) => {
    setActiveIndex(idx);
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 500);
  };

  const activeItem = items[activeIndex] || items[0];

  return (
    <div ref={containerRef} className="infinite-menu-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        className="infinite-menu-grid"
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '2rem',
          height: '100%',
          transform: `scale(${scale})`,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: idx === activeIndex ? '3px solid #B000FF' : '2px solid rgba(255,255,255,0.06)',
              transform: idx === activeIndex ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              boxShadow: idx === activeIndex ? '0 0 30px rgba(176,0,255,0.3)' : 'none',
              position: 'relative',
            }}
          >
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.5rem 0.75rem',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: '0.75rem',
                textAlign: 'center',
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {activeItem && (
        <div
          className="infinite-menu-active"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: '#fff',
            transition: 'opacity 0.5s ease',
            opacity: isMoving ? 0.5 : 1,
          }}
        >
          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{activeItem.title}</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{activeItem.description}</p>
        </div>
      )}
    </div>
  );
}

export default InfiniteMenu;
