import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { ComponentSpec } from "../../types"
import { ComponentPreview } from "../previews/ComponentPreview"

interface Props {
  items: ComponentSpec[]
  stars: Set<string>
  onToggleStar: (id: string) => void
  onOpen: (comp: ComponentSpec) => void
}

// Reuses the exact expand/collapse interaction already proven in
// DiaryPage.tsx's row pattern (StatusSpine + click-to-expand), rather
// than inventing a new list interaction. Each row shows a compact
// inline preview; expanding reveals the description and tags.

export function AnimatedList({ items, stars, onToggleStar, onOpen }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {items.map((comp, idx) => {
        const isOpen = expanded === comp.id
        return (
          <div
            key={comp.id}
            className="rounded-2xl overflow-hidden transition-all"
            style={{
              background: "var(--finna-canvas-alt)",
              border: "1px solid rgba(255,255,255,0.05)",
              opacity: 0,
              animation: `finnaListIn 0.4s ease ${idx * 50}ms forwards`,
            }}
          >
            <div
              onClick={() => setExpanded(prev => (prev === comp.id ? null : comp.id))}
              className="flex items-center gap-4 p-3.5 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--finna-canvas)" }}>
                <ComponentPreview comp={comp} size="compact" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold tracking-tight">{comp.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-wide" style={{ color: "var(--finna-text-dim)" }}>{comp.type}</div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onToggleStar(comp.id) }}
                className="text-sm"
                style={{ color: stars.has(comp.id) ? "#F59E0B" : "var(--finna-text-dim)" }}
              >
                {stars.has(comp.id) ? "\u2605" : "\u2606"}
              </button>
              <ChevronDown size={14} style={{ color: "var(--finna-text-dim)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>

            {isOpen && (
              <div className="px-3.5 pb-3.5 pl-[4.5rem]">
                <p className="text-[12px] leading-relaxed mb-2" style={{ color: "var(--finna-text-secondary)" }}>{comp.desc}</p>
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {comp.tags.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "var(--finna-text-dim)" }}>{t}</span>)}
                </div>
                <button
                  onClick={() => onOpen(comp)}
                  className="text-[11px] px-3 py-1.5 rounded-md"
                  style={{ background: "var(--finna-primary)", color: "#fff" }}
                >
                  Open Customize panel
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
