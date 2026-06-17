import type { ComponentSpec } from "../../types"
import { ComponentPreview } from "../previews/ComponentPreview"

interface Props {
  comp: ComponentSpec
  size: "compact" | "small" | "large"
  starred: boolean
  onToggleStar: () => void
  onOpen: () => void
}

const SIZE_CLASSES = {
  large: { preview: "h-36", pad: "p-5", radius: "rounded-2xl" },
  small: { preview: "h-20", pad: "p-4", radius: "rounded-xl" },
  compact: { preview: "h-12", pad: "p-3", radius: "rounded-lg" },
}

export function ComponentCard({ comp, size, starred, onToggleStar, onOpen }: Props) {
  const cls = SIZE_CLASSES[size]
  return (
    <div
      onClick={onOpen}
      className={`relative cursor-pointer transition-all duration-200 hover:-translate-y-1 ${cls.radius}`}
      style={{ background: "var(--finna-canvas-alt)", border: "1px solid var(--finna-border)" }}
    >
      <button
        onClick={e => { e.stopPropagation(); onToggleStar() }}
        className="absolute top-2 right-2 z-10 w-5 h-5 rounded flex items-center justify-center text-xs"
        style={{ background: "rgba(0,0,0,0.4)", color: starred ? "#F59E0B" : "var(--finna-text-dim)" }}
      >
        {starred ? "\u2605" : "\u2606"}
      </button>
      <div className={`flex items-center justify-center ${cls.preview}`} style={{ background: "var(--finna-canvas)" }}>
        <ComponentPreview comp={comp} size={size} />
      </div>
      <div className={cls.pad}>
        <div className="text-[12px] font-semibold truncate">{comp.name}</div>
        {size !== "compact" && (
          <div className="text-[9px] font-mono uppercase tracking-wide mt-0.5" style={{ color: "var(--finna-text-dim)" }}>
            {comp.type}
          </div>
        )}
      </div>
    </div>
  )
}
