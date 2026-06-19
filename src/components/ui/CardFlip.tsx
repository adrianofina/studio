import { useState } from "react"
import { motion } from "motion/react"

interface CardFlipProps {
  title?: string
  year?: string
  rating?: string
  synopsis?: string
}

export function CardFlip({ 
  title = "Toy Story 5", 
  year = "2026", 
  rating = "8.7",
  synopsis = "When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder."
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-[100px] h-[140px] cursor-pointer relative select-none"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full rounded-xl border border-white/10 flex flex-col justify-end p-2 backface-hidden"
          style={{ 
            background: "linear-gradient(to top, #000, transparent), rgba(131,42,93,0.4)",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="bg-amber-500 text-black text-[7px] font-bold font-mono px-1 rounded absolute top-2 right-2">? {rating}</div>
          <span className="text-[9px] font-bold text-white block truncate">{title}</span>
          <span className="text-[7px] text-zinc-500 font-mono block">{year}</span>
        </div>

        {/* Back Side (Properly Oriented Context) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-xl border border-amber-500/20 bg-zinc-900 p-2 flex flex-col justify-between backface-hidden"
          style={{ 
            transform: "rotateY(180deg)",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div>
            <span className="text-[8px] font-bold text-amber-500 block mb-1 truncate">{title}</span>
            <p className="text-[6px] leading-tight text-zinc-400 overflow-hidden line-clamp-5">
              {synopsis}
            </p>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <button className="w-full py-0.5 rounded bg-amber-500 text-black text-[7px] font-bold font-mono text-center">? Trailer</button>
            <button className="w-full py-0.5 rounded bg-zinc-800 text-white text-[6px] font-mono text-center border border-white/5">?? Save</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}