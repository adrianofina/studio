import React from 'react'

export function MagicBentoGrid({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl border border-white/5 bg-zinc-950/20 max-w-md mx-auto ${className}`}>
      <div className="col-span-2 h-24 rounded-xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm p-3 text-left">
        <div className="h-2 w-8 rounded bg-zinc-800 mb-1" />
        <div className="h-4 w-16 rounded bg-zinc-800/50" />
      </div>
      <div className="col-span-1 h-24 rounded-xl border border-white/5 bg-zinc-900/50 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 text-[10px] font-mono">+</div>
      </div>
      <div className="col-span-3 h-12 rounded-xl border border-white/5 bg-zinc-900/20 flex items-center justify-between px-4">
        <div className="h-2 w-24 rounded bg-zinc-800" />
        <div className="h-4 w-4 rounded-full bg-zinc-800" />
      </div>
      {children}
    </div>
  )
}
