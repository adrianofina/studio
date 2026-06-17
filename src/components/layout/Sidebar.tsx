import { useMemo } from "react"
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles, Layers, BarChart3, Notebook } from "lucide-react"
import { COMPONENTS } from "../../data/library"

interface Props {
  collapsed: boolean
  onToggle: () => void
  activeTag: string
  onSelectTag: (tag: string) => void
  onOpenDiary: () => void
}

const TAG_ICON: Record<string, JSX.Element> = {
  all: <LayoutGrid size={15} />,
  motion: <Sparkles size={15} />,
  data: <BarChart3 size={15} />,
  layout: <Layers size={15} />,
}

export function Sidebar({ collapsed, onToggle, activeTag, onSelectTag, onOpenDiary }: Props) {
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { all: COMPONENTS.length }
    COMPONENTS.forEach(c => c.tags.forEach(t => { counts[t] = (counts[t] || 0) + 1 }))
    return counts
  }, [])

  const tags = Object.keys(tagCounts).filter(t => t !== "all")

  return (
    <aside
      className="flex flex-col border-r transition-all duration-200"
      style={{ width: collapsed ? 56 : 200, background: "var(--finna-canvas-alt)", borderColor: "var(--finna-border)" }}
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ borderColor: "var(--finna-border)" }}>
        {!collapsed && <span className="text-[9px] uppercase tracking-wider font-mono" style={{ color: "var(--finna-text-dim)" }}>Collections</span>}
        <button onClick={onToggle} className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "var(--finna-surface)" }}>
          {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <NavItem icon={<LayoutGrid size={15} />} label="All" count={tagCounts.all} active={activeTag === "all"} collapsed={collapsed} onClick={() => onSelectTag("all")} />
        {tags.map(tag => (
          <NavItem
            key={tag}
            icon={TAG_ICON[tag] || <Sparkles size={15} />}
            label={tag}
            count={tagCounts[tag]}
            active={activeTag === tag}
            collapsed={collapsed}
            onClick={() => onSelectTag(tag)}
          />
        ))}
        <div className="h-px my-2 mx-3" style={{ background: "var(--finna-border)" }} />
        <NavItem icon={<Notebook size={15} />} label="Projects diary" collapsed={collapsed} onClick={onOpenDiary} />
      </div>
    </aside>
  )
}

function NavItem({
  icon, label, count, active, collapsed, onClick,
}: { icon: JSX.Element; label: string; count?: number; active?: boolean; collapsed: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-1.5 text-left text-[12px] capitalize transition-all"
      style={{
        borderLeft: active ? "2px solid var(--finna-primary)" : "2px solid transparent",
        background: active ? "rgba(131,42,93,0.15)" : "transparent",
        color: active ? "var(--finna-primary)" : "var(--finna-text-secondary)",
      }}
    >
      {icon}
      {!collapsed && <span className="flex-1">{label}</span>}
      {!collapsed && count !== undefined && (
        <span className="text-[10px] font-mono px-1 rounded" style={{ background: "var(--finna-surface)", color: "var(--finna-text-dim)" }}>
          {count}
        </span>
      )}
    </button>
  )
}
