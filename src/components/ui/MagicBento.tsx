import { useRef, useState } from "react"
import type { MouseEvent } from "react"
import type { ComponentSpec } from "../../types"
import { ComponentPreview } from "../previews/ComponentPreview"

interface Props {
  comp: ComponentSpec
  starred: boolean
  onToggleStar: () => void
  onOpen: () => void
  size?: "wide" | "normal"
}

// Magic Bento treatment: a deep glass surface with a neon spotlight
// border that intensifies on hover/cursor proximity, rather than
// ChromaCard's grayscale-to-color reveal. Built to the same Props
// contract as ChromaCard so it is a drop-in alternative visual style
// for the exact same data, not a competing grid system.

export function MagicBentoCard({ comp, starred, onToggleStar, onOpen, size = "normal" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${size === "wide" ? "col-span-2" : ""}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.4s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {/* Neon spotlight border -- a radial highlight that traces the
          cursor along the card edge, the signature Magic Bento move */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(176,0,255,0.25), transparent 45%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: "inset 0 0 0 1px rgba(176,0,255,0.4), 0 0 24px rgba(176,0,255,0.15)",
        }}
      />

      <button
        onClick={e => { e.stopPropagation(); onToggleStar() }}
        className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-md flex items-center justify-center text-xs"
        style={{ background: "rgba(0,0,0,0.4)", color: starred ? "#F59E0B" : "rgba(255,255,255,0.3)" }}
      >
        {starred ? "\u2605" : "\u2606"}
      </button>

      <div className={`relative z-10 flex items-center justify-center ${size === "wide" ? "h-36" : "h-28"}`} style={{ background: "var(--finna-canvas)" }}>
        <ComponentPreview comp={comp} size={size === "wide" ? "large" : "small"} />
      </div>

      <div className="relative z-10 p-3.5">
        <div className="text-[12px] font-medium tracking-tight">{comp.name}</div>
        <div className="text-[9px] font-mono uppercase tracking-wider mt-1" style={{ color: "var(--finna-text-dim)" }}>{comp.type}</div>
      </div>
    </div>
  )
}
