import { useState, useRef, useEffect } from "react"
import { LayoutGrid, Notebook, Palette, Layers } from "lucide-react"

interface DockItem {
  key: string
  label: string
  icon: JSX.Element
}

const ITEMS: DockItem[] = [
  { key: "archive", label: "Archive", icon: <LayoutGrid size={18} /> },
  { key: "diary", label: "Diary", icon: <Notebook size={18} /> },
  { key: "collections", label: "Collections", icon: <Layers size={18} /> },
  { key: "colorlab", label: "Color Lab", icon: <Palette size={18} /> },
]

interface Props {
  active: string
  onSelect: (key: string) => void
}

export function Dock({ active, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  if (isMobile) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around py-2 px-2"
        style={{
          background: "rgba(26,15,26,0.9)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all"
            style={{ color: active === item.key ? "var(--finna-primary)" : "var(--finna-text-dim)" }}
          >
            {item.icon}
            <span className="text-[9px]">{item.label}</span>
          </button>
        ))}
      </nav>
    )
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-end gap-1 px-3 py-2.5 rounded-2xl"
      style={{
        background: "rgba(26,15,26,0.72)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
      onMouseLeave={() => setHovered(null)}
    >
      {ITEMS.map(item => {
        const isHovered = hovered === item.key
        const isActive = active === item.key
        const scale = isHovered ? 1.25 : isActive ? 1.08 : 1
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            onMouseEnter={() => setHovered(item.key)}
            className="relative flex flex-col items-center justify-center rounded-xl transition-transform duration-200"
            style={{
              width: 46, height: 46,
              transform: `scale(${scale}) translateY(${isHovered ? -6 : 0}px)`,
              transitionTimingFunction: "cubic-bezier(0.2,0.9,0.3,1.3)",
              background: isActive ? "rgba(131,42,93,0.22)" : "transparent",
              color: isActive ? "var(--finna-primary)" : "var(--finna-text-secondary)",
            }}
          >
            {item.icon}
            {isHovered && (
              <span
                className="absolute -top-8 text-[10px] px-2 py-1 rounded-md whitespace-nowrap"
                style={{ background: "rgba(20,12,20,0.95)", color: "var(--finna-text)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {item.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
