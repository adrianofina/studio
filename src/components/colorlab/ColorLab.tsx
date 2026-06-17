import { useState } from "react"
import { X, Shuffle, RotateCcw, Copy, Check } from "lucide-react"
import { useTheme } from "../../theme/ThemeContext"
import { PRESET_PALETTES, randomTheme, DEFAULT_THEME } from "../../theme/tokens"
import { applyDepthLightness, exportAsCSS, exportAsTailwind, exportAsJSON } from "../../theme/colorUtils"

interface Props {
  onClose: () => void
}

export function ColorLab({ onClose }: Props) {
  const { theme, setTheme, updateColor, history, resetToDefault } = useTheme()
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  const applyPreset = (name: string) => {
    const preset = PRESET_PALETTES.find(p => p.name === name)
    if (!preset) return
    setTheme({ ...DEFAULT_THEME, ...preset.theme, name: preset.name } as FinnaThemeLike)
  }

  type FinnaThemeLike = Parameters<typeof setTheme>[0]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 bg-black/70" onClick={onClose}>
      <div
        className="w-[92vw] max-w-[640px] max-h-[82vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--finna-canvas-alt)", border: "1px solid var(--finna-border)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--finna-border)" }}>
          <div>
            <div className="text-base font-bold">Color Lab</div>
            <div className="text-[10px]" style={{ color: "var(--finna-text-dim)" }}>Changes apply live across the whole app</div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--finna-surface)" }}>
            <X size={14} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {theme.colors.map(c => {
            const finalHex = applyDepthLightness(c.hex, c.depth, c.lightness)
            return (
              <div key={c.key} className="rounded-lg p-3" style={{ background: "var(--finna-surface)" }}>
                <div className="w-full h-8 rounded mb-2 transition-colors duration-150" style={{ background: finalHex }} />
                <div className="text-[11px] font-medium mb-2">{c.label}</div>
                <label className="text-[9px] block mb-1" style={{ color: "var(--finna-text-dim)" }}>Depth {c.depth}%</label>
                <input
                  type="range" min={0} max={100} value={c.depth}
                  onChange={e => updateColor(c.key, { depth: Number(e.target.value) })}
                  className="w-full mb-2"
                />
                <label className="text-[9px] block mb-1" style={{ color: "var(--finna-text-dim)" }}>Lightness {c.lightness}%</label>
                <input
                  type="range" min={0} max={100} value={c.lightness}
                  onChange={e => updateColor(c.key, { lightness: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            )
          })}
        </div>

        <div className="px-5 pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-wider font-mono" style={{ color: "var(--finna-text-dim)" }}>Preset palettes</div>
            <div className="flex gap-2">
              <button onClick={() => setTheme(randomTheme())} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded" style={{ background: "var(--finna-surface)" }}>
                <Shuffle size={12} /> Random
              </button>
              <button onClick={resetToDefault} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded" style={{ background: "var(--finna-surface)" }}>
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {PRESET_PALETTES.map(p => (
              <button key={p.name} onClick={() => applyPreset(p.name)} className="text-[11px] px-3 py-1.5 rounded-md" style={{ background: "var(--finna-surface)", border: "1px solid var(--finna-border)" }}>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {history.length > 0 && (
          <div className="px-5 pb-3">
            <div className="text-[10px] uppercase tracking-wider font-mono mb-2" style={{ color: "var(--finna-text-dim)" }}>Recent palettes</div>
            <div className="flex gap-2 flex-wrap">
              {history.map((h, i) => (
                <button key={i} onClick={() => setTheme(h)} className="flex gap-0.5 p-1 rounded-md" style={{ border: "1px solid var(--finna-border)" }}>
                  {h.colors.slice(0, 4).map(c => (
                    <div key={c.key} style={{ width: 12, height: 12, background: applyDepthLightness(c.hex, c.depth, c.lightness), borderRadius: 2 }} />
                  ))}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-5 py-4 border-t flex flex-col sm:flex-row gap-2" style={{ borderColor: "var(--finna-border)" }}>
          <button onClick={() => copy(exportAsCSS(theme), "css")} className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-md" style={{ background: "var(--finna-surface)" }}>
            {copied === "css" ? <Check size={12} /> : <Copy size={12} />} CSS variables
          </button>
          <button onClick={() => copy(exportAsTailwind(theme), "tw")} className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-md" style={{ background: "var(--finna-surface)" }}>
            {copied === "tw" ? <Check size={12} /> : <Copy size={12} />} Tailwind config
          </button>
          <button onClick={() => copy(exportAsJSON(theme), "json")} className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-md" style={{ background: "var(--finna-surface)" }}>
            {copied === "json" ? <Check size={12} /> : <Copy size={12} />} JSON
          </button>
        </div>
      </div>
    </div>
  )
}
