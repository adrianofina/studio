import type { ReactNode, MouseEvent } from "react"
import { useRef, useState } from "react"

interface Props {
  children: ReactNode
  className?: string
}

// A surface that tracks the cursor with a soft radial highlight,
// independent of ChromaCard (which is specifically for archive tiles).
// Useful anywhere you want the "premium dark surface that reacts to
// you" feeling -- e.g. the Color Lab panel, detail view backgrounds.

export function SpotlightSurface({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ background: "var(--finna-canvas-alt)", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(131,42,93,0.15), transparent 55%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
