import { useState } from "react"
import { motion } from "motion/react"

const MOCK_MOVIES = [
  { id: "m1", title: "How to Make It", year: "2026", bg: "rgba(131,42,93,0.3)" },
  { id: "m2", title: "FROM", year: "2022", bg: "rgba(99,102,241,0.3)" },
  { id: "m3", title: "JUJUTSU KAISEN", year: "2020", bg: "rgba(16,185,129,0.3)" },
  { id: "m4", title: "Perfect Crop", year: "2026", bg: "rgba(245,158,11,0.3)" },
  { id: "m5", title: "The Devil Wears Prada", year: "2026", bg: "rgba(239,68,68,0.3)" },
]

export function TheStack() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 select-none relative min-h-[180px]">
      <div 
        className="relative flex items-center justify-center w-full max-w-md h-[120px] group cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {MOCK_MOVIES.map((movie, idx) => {
          const offset = idx - 2
          return (
            <motion.div
              key={movie.id}
              className="absolute w-[80px] h-[115px] rounded-xl border border-white/10 flex flex-col justify-end p-2 shadow-2xl backdrop-blur-md"
              style={{ 
                background: `linear-gradient(to top, rgba(0,0,0,0.95), transparent), ${movie.bg}`,
                zIndex: 10 + idx,
                transformOrigin: "bottom center"
              }}
              animate={{
                x: isExpanded ? offset * 85 : offset * 16,
                rotate: isExpanded ? offset * 5 : offset * 1.5,
                scale: isExpanded && idx === 2 ? 1.1 : 1,
                y: isExpanded && idx === 2 ? -10 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <span className="text-[8px] font-bold text-white truncate block">{movie.title}</span>
              <span className="text-[6px] text-zinc-400 font-mono block">{movie.year}</span>
            </motion.div>
          )
        })}

        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute z-50 bg-zinc-900/95 border border-white/15 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-2xl min-w-[100px]"
          >
            <button className="bg-amber-500 text-black text-[9px] px-2 py-1 rounded font-bold font-mono tracking-wide">?? Watch Later</button>
            <button className="bg-zinc-800 text-white text-[9px] px-2 py-1 rounded border border-white/5 font-mono">?? Liked</button>
            <button className="bg-red-950/40 text-red-400 text-[9px] px-2 py-1 rounded border border-red-900/20 font-mono">??? Remove</button>
          </motion.div>
        )}
      </div>
    </div>
  )
}