import { useState, useRef } from "react"
import type { ReactElement } from "react"
import { LayoutGrid, Notebook, Palette, Layers, ArchiveIcon } from "lucide-react"

interface DockItem {
  key: string
  label: string
  icon: ReactElement
}

const ITEMS: DockItem[] = [
  { key: "archive", label: "Archive", icon: <ArchiveIcon size={18} /> },
  { key: "diary", label: "Diary", icon: <Notebook size={18} /> },
  { key: "collections", label: "Collections", icon: <Layers size={18} /> },
  { key: "colorlab", label: "Color Lab", icon: <Palette size={18} /> },
  { key: "gradients", label: "Gradients", icon: <LayoutGrid  size={18} /> },
]

interface Props {
  active: string
  onSelect: (key: string) => void
}

export function Dock({ active, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  //const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
   */

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end gap-3 px-4 py-3 rounded-2xl bg-zinc-950/80 border border-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300"
      onMouseLeave={() => setHovered(null)}
    >
      {ITEMS.map((item) => {
        const isActive = active === item.key
        const isHovered = hovered === item.key
        
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            onMouseEnter={() => setHovered(item.key)}
            className="relative flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              width: 42,
              height: 42,
              background: isActive ? "var(--finna-primary)" : "transparent",
              color: isActive ? "#fff" : isHovered ? "var(--finna-text-primary)" : "var(--finna-text-dim)",
              transform: isHovered && !isActive ? "translateY(-4px)" : "none",
            }}
          >
            {item.icon}
            {isHovered && (
              <span className="absolute -top-8 px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-white/10 text-white whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}