import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles, Layers, BarChart3, Notebook, Palette } from "lucide-react"

interface Props {
  tags: string[]
  activeTag: string
  onSelectTag: (tag: string) => void
  view: string
  onSelectView: (view: string) => void
  onOpenColorLab: () => void
}

const TAG_ICON: Record<string, JSX.Element> = {
  all: <LayoutGrid size={15} />,
  motion: <Sparkles size={15} />,
  data: <BarChart3 size={15} />,
  layout: <Layers size={15} />,
}

const STORAGE_KEY = "finna-sidebar-collapsed"

// Always rendered -- this was previously a hidden rail you had to
// summon from the Dock. Now it is part of the default layout, with a
// persisted collapse state so the user's preference survives reloads.
// On narrow viewports it hides automatically and the Dock becomes the
// only navigation, since there isn't room for both.

export function PersistentSidebar({ tags, activeTag, onSelectTag, view, onSelectView, onOpenColorLab }: Props) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "true" } catch { return false }
  })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const check = () => setHidden(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(collapsed)) } catch {}
  }, [collapsed])

  if (hidden) return null

  return (
    <aside
      className="flex flex-col flex-shrink-0 transition-all duration-200"
      style={{ width: collapsed ? 56 : 196, borderRight: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center justify-between px-3 py-3">
        {!collapsed && <span className="text-[9px] uppercase tracking-wider font-mono" style={{ color: "var(--finna-text-dim)" }}>Collections</span>}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-5 h-5 rounded flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        <NavRow icon={<LayoutGrid size={15} />} label="Archive" active={view === "archive" && activeTag === "all"} collapsed={collapsed} onClick={() => { onSelectView("archive"); onSelectTag("all") }} />
        {tags.filter(t => t !== "all").map(tag => (
          <NavRow
            key={tag}
            icon={TAG_ICON[tag] || <Sparkles size={15} />}
            label={tag}
            active={view === "archive" && activeTag === tag}
            collapsed={collapsed}
            onClick={() => { onSelectView("archive"); onSelectTag(tag) }}
          />
        ))}
        <div className="h-px my-2 mx-3" style={{ background: "rgba(255,255,255,0.05)" }} />
        <NavRow icon={<Notebook size={15} />} label="Diary" active={view === "diary"} collapsed={collapsed} onClick={() => onSelectView("diary")} />
        <NavRow icon={<Palette size={15} />} label="Color Lab" collapsed={collapsed} onClick={onOpenColorLab} />
      </div>
    </aside>
  )
}

function NavRow({
  icon, label, active, collapsed, onClick,
}: { icon: JSX.Element; label: string; active?: boolean; collapsed: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-1.5 text-left text-[12px] capitalize rounded-lg transition-all mb-0.5"
      style={{
        background: active ? "rgba(131,42,93,0.16)" : "transparent",
        color: active ? "var(--finna-primary)" : "var(--finna-text-secondary)",
      }}
    >
      {icon}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
    </button>
  )
}
