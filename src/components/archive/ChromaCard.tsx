import { useRef, useState } from "react"
import type { MouseEvent } from "react"
import type { ComponentSpec } from "../../types"
import { ComponentPreview } from "../previews/ComponentPreview"

interface Props {
  comp: ComponentSpec
  starred: boolean
  onToggleStar: () => void
  onOpen: () => void
}

// Grayscale by default, color reveals on hover with a spotlight that
// tracks the cursor. Touch devices get a tap-to-reveal fallback since
// there is no hover/cursor position to track.

export function ChromaCard({ comp, starred, onToggleStar, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }

  const handleTap = () => setActive(prev => !prev)

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={onOpen}
      onTouchStart={handleTap}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "var(--finna-canvas-alt)",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "transform 0.4s cubic-bezier(0.2,0.9,0.2,1)",
      }}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(131,42,93,0.18), transparent 60%)`,
        }}
      />

      <button
        onClick={e => { e.stopPropagation(); onToggleStar() }}
        className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-md flex items-center justify-center text-xs"
        style={{ background: "rgba(0,0,0,0.4)", color: starred ? "#F59E0B" : "rgba(255,255,255,0.3)" }}
      >
        {starred ? "\u2605" : "\u2606"}
      </button>

      {/* Preview: grayscale at rest, full color on hover/active */}
      <div
        className="h-28 flex items-center justify-center transition-all duration-500"
        style={{
          background: "var(--finna-canvas)",
          filter: active ? "grayscale(0) saturate(1.1)" : "grayscale(0.85) brightness(0.8)",
        }}
      >
        <ComponentPreview comp={comp} size="small" />
      </div>

      <div className="p-3.5 relative z-20">
        <div className="text-[12px] font-medium tracking-tight" style={{ color: "var(--finna-text)" }}>{comp.name}</div>
        <div className="text-[9px] font-mono uppercase tracking-wider mt-1" style={{ color: "var(--finna-text-dim)" }}>{comp.type}</div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: active ? "var(--finna-primary)" : "rgba(255,255,255,0.05)" }}
      />
    </div>
  )
}
