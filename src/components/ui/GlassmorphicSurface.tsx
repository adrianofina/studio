import React from 'react'

export function GlassmorphicSurface({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col gap-1 text-left">
        <div className="h-2 w-12 rounded-full bg-white/20 mb-2" />
        <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase font-mono">Atelier System Mask</span>
        <span className="text-xl font-light tracking-tight text-zinc-100">Quiet Confidence</span>
      </div>
      {children}
    </div>
  )
}
