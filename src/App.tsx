import { useState, useEffect } from "react"
import { ThemeProvider } from "./theme/ThemeContext"
import { AmbientField } from "./components/bg/AmbientField"
import { Dock } from "./components/dock/Dock"
import { PersistentSidebar } from "./components/layout/PersistentSidebar"
import { ArchivePage } from "./pages/ArchivePage"
import { DiaryPage } from "./pages/DiaryPage"
import { DetailView } from "./pages/DetailView"
import { ColorLab } from "./components/colorlab/ColorLab"
import { AuroraText } from "./components/ui/AuroraText"
import { COMPONENTS } from "./data/library"
import type { ComponentSpec } from "./types"

type View = "archive" | "diary" | "detail"

const STARS_KEY = "studio-stars"

function loadStars(): Set<string> {
  try {
    const raw = localStorage.getItem(STARS_KEY)
    if (raw) return new Set(JSON.parse(raw))
  } catch {}
  // Only use spec defaults on first ever load (empty localStorage)
  return new Set<string>()
}

export default function App() {
  const [view, setView] = useState<View>("archive")
  const [activeTag, setActiveTag] = useState("all")
  const [selected, setSelected] = useState<ComponentSpec | null>(null)
  const [colorLabOpen, setColorLabOpen] = useState(false)
  const [stars, setStars] = useState<Set<string>>(loadStars)
  const [usedInOverrides, setUsedInOverrides] = useState<Record<string, string>>({})

  // Persist stars every time they change
  useEffect(() => {
    localStorage.setItem(STARS_KEY, JSON.stringify([...stars]))
  }, [stars])

  const tags = ["all", ...new Set(COMPONENTS.flatMap(c => c.tags))]

  const toggleStar = (id: string) => {
    setStars(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const updateUsedIn = (id: string, value: string) =>
    setUsedInOverrides(prev => ({ ...prev, [id]: value }))

  const openComponent = (comp: ComponentSpec) => {
    setSelected({ ...comp, usedIn: usedInOverrides[comp.id] ?? comp.usedIn })
    setView("detail")
  }

  const handleDockSelect = (key: string) => {
    if (key === "colorlab") { setColorLabOpen(true); return }
    if (key === "collections") return
    setView(key as View)
  }

  return (
    <ThemeProvider>
      <div className="relative h-screen overflow-hidden" style={{ color: "var(--studio-text)" }}>
        <AmbientField />

        <div className="relative z-10 h-full flex flex-col">
          <header
            className="flex items-center px-4 sm:px-6 h-14 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="text-[14px] tracking-[0.1em]">
              <AuroraText>STUDIO</AuroraText>
            </div>
            <div className="flex-1" />
            <button
              onClick={() => setColorLabOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              Color Lab
            </button>
          </header>

          <div className="flex flex-1 min-h-0">
            {view !== "detail" && (
              <PersistentSidebar
                tags={tags}
                activeTag={activeTag}
                onSelectTag={setActiveTag}
                view={view}
                onSelectView={v => setView(v as View)}
                onOpenColorLab={() => setColorLabOpen(true)}
              />
            )}

            {view === "archive" && (
              <ArchivePage
                activeTag={activeTag}
                stars={stars}
                onToggleStar={toggleStar}
                onOpen={openComponent}
              />
            )}
            {view === "diary" && <DiaryPage />}
            {view === "detail" && selected && (
              <DetailView
                comp={selected}
                starred={stars.has(selected.id)}
                onToggleStar={() => toggleStar(selected.id)}
                onClose={() => setView("archive")}
                onUpdateUsedIn={updateUsedIn}
              />
            )}
          </div>
        </div>

        <Dock active={view === "detail" ? "archive" : view} onSelect={handleDockSelect} />
      </div>

      {colorLabOpen && <ColorLab onClose={() => setColorLabOpen(false)} />}
    </ThemeProvider>
  )
}
