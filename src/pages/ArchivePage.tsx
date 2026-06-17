import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { COMPONENTS } from "../data/library"
import type { ComponentSpec } from "../types"
import { Masonry } from "../components/archive/Masonry"

interface Props {
  activeTag: string
  stars: Set<string>
  onToggleStar: (id: string) => void
  onOpen: (comp: ComponentSpec) => void
}

export function ArchivePage({ activeTag, stars, onToggleStar, onOpen }: Props) {
  const [query, setQuery] = useState("")

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
        <div className="flex items-center gap-3 mb-6">
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
          <span className="text-[11px] hidden sm:inline" style={{ color: "var(--finna-text-dim)" }}>
            {filtered.length} pieces
          </span>
        </div>

        <Masonry items={filtered} stars={stars} onToggleStar={onToggleStar} onOpen={onOpen} />
      </div>
    </div>
  )
}
