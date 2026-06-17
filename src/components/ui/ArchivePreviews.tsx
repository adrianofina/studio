import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Fully Animated Reactive List Preview
export function MiniAnimatedListPreview() {
  const [items, setItems] = useState([
    { id: 1, text: 'System Initialized', active: true },
    { id: 2, text: 'Query Shards Indexed', active: true },
    { id: 3, text: 'Aura Core Loaded', active: false }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const targets = listRef.current.children;

    const interval = setInterval(() => {
      // Loop a slick GSAP fade-shift cycle every iteration
      gsap.fromTo(targets, 
        { opacity: 0.4, y: 4 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={listRef} className="w-full flex flex-col gap-2 p-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="text-[11px] font-mono px-3 py-2 rounded-xl border border-zinc-800/80 bg-black/40 text-zinc-300 flex items-center justify-between"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-purple-500 shadow-[0_0_8px_#8400ff]' : 'bg-zinc-700'}`} />
            <span>{item.text}</span>
          </div>
          <span className="text-[9px] text-zinc-600">01</span>
        </div>
      ))}
    </div>
  );
}

// True Radiant Aura text element matching the brand layout signature
export function MiniTextGlowPreview() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-6">
      <span 
        className="text-3xl font-extrabold tracking-[0.25em] text-white relative select-none"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(132, 0, 255, 0.85)) drop-shadow(0 0 24px rgba(132, 0, 255, 0.4))',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        FINNA
      </span>
      <span className="text-[9px] font-mono text-purple-400/60 mt-2 tracking-widest">AURA CORE ENGINE</span>
    </div>
  );
}

// Micro Bento Hover Preview Mapping
export function MiniBentoPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div className="w-full p-1">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-xl border border-purple-500/10 bg-[#120F17] p-4 overflow-hidden group/mini-bento cursor-crosshair"
        style={{
          '--x': '0px',
          '--y': '0px'
        } as React.CSSProperties}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover/mini-bento:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(140px circle at var(--x) var(--y), rgba(132, 0, 255, 0.25), transparent 70%)'
          }}
        />
        <div className="text-[9px] font-mono text-purple-400 mb-1">GRID.VIEW</div>
        <div className="text-xs font-medium text-white">Bento Cell Asset</div>
        <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Tracks global mouse position variants cleanly.</p>
      </div>
    </div>
  );
}
