import { AnimatedList } from './AnimatedList';

export function MiniAnimatedListPreview() {
  const dummyLogs = [
    'Layer Modules Synchronized',
    'IFRS Impairment Shards Loaded',
    'Aura Core Live Sync Active',
    'Bento Viewports Initialized'
  ];

  return (
    <div className="w-full max-h-[140px] overflow-hidden scale-95 origin-center">
      <AnimatedList 
        items={dummyLogs}
        showGradients={true}
        displayScrollbar={false}
        enableArrowNavigation={false}
        renderItem={(text, _, isSelected) => (
          <div 
            className={`px-3 py-2 text-[11px] font-mono rounded-lg border transition-all duration-200 ${
              isSelected 
                ? 'bg-[#1b122b] border-purple-500/40 text-purple-200' 
                : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400'
            }`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${isSelected ? 'bg-purple-500 animate-pulse' : 'bg-zinc-600'}`} />
            {text}
          </div>
        )}
      />
    </div>
  );
}

export function MiniTextGlowPreview() {
  return (
    <div className="h-full w-full flex items-center justify-center py-4 relative bg-black/10 rounded-xl overflow-hidden">
      {/* Background physical blur drop shadow container to replicate image_5454eb.jpg color lab depth */}
      <div 
        className="absolute w-[80px] h-[30px] rounded-full bg-[#8400ff]/30 blur-xl pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      <span 
        className="text-3xl font-black tracking-[0.25em] text-white relative z-10"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(132, 0, 255, 0.95)) drop-shadow(0 0 20px rgba(132, 0, 255, 0.45))'
        }}
      >
        FINNA
      </span>
    </div>
  );
}

export function MiniBentoPreview() {
  return (
    <div className="w-full h-full p-1 flex items-center justify-center">
      <div className="relative w-full aspect-[21/9] rounded-xl border border-purple-500/10 bg-[#120F17] p-3 overflow-hidden group/bento">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
        <div className="text-[9px] font-mono text-purple-400">TAB.LAYOUT</div>
        <div className="text-xs font-semibold text-zinc-200 mt-1">Magic Bento Feature</div>
      </div>
    </div>
  );
}
