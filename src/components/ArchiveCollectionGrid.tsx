import { useState } from 'react';
import { Star } from 'lucide-react';
import { StatusSpine } from './ui/StatusSpine';
import { MiniAnimatedListPreview, MiniTextGlowPreview, MiniBentoPreview } from './ui/ArchivePreviews';

export function ArchiveCollectionGrid() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const componentsList = [
    { id: 'status-spine', title: 'Status Spine', sub: 'VERTICAL STATUS BAR', preview: <div className="p-4 flex justify-center"><StatusSpine status="active" /></div> },
    { id: 'animated-list', title: 'Animated List Container', sub: 'LIST LAYOUT', preview: <MiniAnimatedListPreview /> },
    { id: 'text-glow', title: 'Text Glow Engine', sub: 'TYPOGRAPHY CORE', preview: <MiniTextGlowPreview /> },
    { id: 'magic-bento', title: 'Magic Bento Grid', sub: 'INTERACTIVE GSAP LAYOUT', preview: <MiniBentoPreview /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
      {componentsList.map((comp) => (
        <div
          key={comp.id}
          className="group relative rounded-2xl border border-zinc-800/60 bg-[#120F17]/40 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80"
          style={{ minHeight: '220px' }}
        >
          {/* Header Action Row */}
          <div className="p-3 flex justify-between items-start z-10">
            <div>
              <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{comp.title}</h3>
              <p className="text-[10px] font-mono tracking-wider text-zinc-500 mt-0.5">{comp.sub}</p>
            </div>
            <button 
              onClick={(e) => toggleFavorite(comp.id, e)} 
              className="text-zinc-600 hover:text-yellow-500 transition-colors p-1"
            >
              <Star size={14} fill={favorites.includes(comp.id) ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Interactive Live Stage Viewport */}
          <div className="flex-1 w-full flex items-center justify-center p-3 bg-black/20 border-t border-b border-zinc-900/40">
            {comp.preview}
          </div>

          {/* Luxury Minimalist footer anchor bar */}
          <div className="px-4 py-2 text-[9px] font-mono text-zinc-600 flex justify-between items-center bg-black/10">
            <span>READY STATE</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--finna-primary)]">EXPLORE →</span>
          </div>
        </div>
      ))}
    </div>
  );
}
