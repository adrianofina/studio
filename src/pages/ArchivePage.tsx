import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { COMPONENTS } from "../data/library"
import type { ComponentSpec } from "../types"
import { Masonry } from "../components/archive/Masonry"
import { MagicBento } from "../components/ui/MagicBento"
import { AnimatedList } from "../components/ui/AnimatedList"

interface Props {
  activeTag: string
  stars: Set<string>
  onToggleStar: (id: string) => void
  onOpen: (comp: ComponentSpec) => void
}

type ViewMode = "grid" | "bento" | "list"

// Mirrors DiaryPage.tsx's existing mode-toggle pattern exactly: a
// pill-style segmented control, same sizing and active-state styling
// as the Diary's List/Tabs toggle, so the two parts of the app feel
// like one system rather than two different developers' work.

export function ArchivePage({ activeTag, stars, onToggleStar, onOpen }: Props) {
  const [query, setQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filtered = useMemo(() => {
    let items = COMPONENTS
    if (activeTag !== "all") items = items.filter(c => c.tags.includes(activeTag))
    if (query) {
      const q = query.toLowerCase()
      items = items.filter(c => c.name.toLowerCase().includes(q) || c.type.toLowerCase().includes(q))
    }
    return items
  }, [activeTag, query])

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--finna-text-dim)" }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search the archive..."
                className="w-full text-[12px] py-2 pl-8 pr-3 rounded-lg outline-none"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--finna-text)" }}
              />
            </div>
            <span className="text-[11px] hidden sm:inline" style={{ color: "var(--finna-text-dim)" }}>{filtered.length} pieces</span>
          </div>

          {/* Same visual pattern as DiaryPage's List/Tabs toggle */}
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            {(["grid", "bento", "list"] as ViewMode[]).map(m => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className="text-[11px] px-3 py-1.5 rounded-md capitalize"
                style={{
                  background: viewMode === m ? "rgba(131,42,93,0.2)" : "transparent",
                  color: viewMode === m ? "var(--finna-primary)" : "var(--finna-text-dim)",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "grid" && (
          <Masonry items={filtered} stars={stars} onToggleStar={onToggleStar} onOpen={onOpen} />
        )}

        {viewMode === "bento" && (
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
            {filtered.map((comp, idx) => (
              <MagicBento
                key={comp.id}
                comp={comp}
                starred={stars.has(comp.id)}
                onToggleStar={() => onToggleStar(comp.id)}
                onOpen={() => onOpen(comp)}
                size={idx % 5 === 0 ? "wide" : "normal"}
              />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <AnimatedList items={filtered} stars={stars} onToggleStar={onToggleStar} onOpen={onOpen} />
        )}
      </div>
    </div>
  )
}
