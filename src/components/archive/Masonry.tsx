import { useEffect, useState } from "react"
import type { ComponentSpec } from "../../types"
import { ChromaCard } from "./ChromaCard"

interface Props {
  items: ComponentSpec[]
  stars: Set<string>
  onToggleStar: (id: string) => void
  onOpen: (comp: ComponentSpec) => void
}

// Simple responsive column-balanced masonry. No external layout
// library -- columns are recalculated on resize, items entry-animate
// with a blur-to-focus reveal staggered by index.

export function Masonry({ items, stars, onToggleStar, onOpen }: Props) {
  const [columns, setColumns] = useState(4)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 640) setColumns(1)
      else if (w < 900) setColumns(2)
      else if (w < 1280) setColumns(3)
      else setColumns(4)
    }
    calc()
    window.addEventListener("resize", calc)
    const t = setTimeout(() => setMounted(true), 50)
    return () => { window.removeEventListener("resize", calc); clearTimeout(t) }
  }, [])

  const cols: ComponentSpec[][] = Array.from({ length: columns }, () => [])
  items.forEach((item, i) => cols[i % columns].push(item))

  return (
    <div className="flex gap-3" style={{ alignItems: "flex-start" }}>
      {cols.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-3 min-w-0">
          {col.map((comp, ri) => {
            const idx = ri * columns + ci
            return (
              <div
                key={comp.id}
                style={{
                  opacity: mounted ? 1 : 0,
                  filter: mounted ? "blur(0px)" : "blur(8px)",
                  transform: mounted ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.6s ease ${idx * 40}ms, filter 0.6s ease ${idx * 40}ms, transform 0.6s ease ${idx * 40}ms`,
                }}
              >
                <ChromaCard
                  comp={comp}
                  starred={stars.has(comp.id)}
                  onToggleStar={() => onToggleStar(comp.id)}
                  onOpen={() => onOpen(comp)}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
