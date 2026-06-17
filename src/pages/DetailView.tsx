import { useState } from "react"
import { ArrowLeft, Copy, Check } from "lucide-react"
import type { ComponentSpec } from "../types"
import { LiveComponentRenderer } from "../components/previews/LiveComponentRenderer"

interface Props {
  comp: ComponentSpec
  starred: boolean
  onToggleStar: () => void
  onClose: () => void
  onUpdateUsedIn: (id: string, value: string) => void
}

export function DetailView({ comp, starred, onToggleStar, onClose, onUpdateUsedIn }: Props) {
  const [copied, setCopied] = useState(false)
  const [editingUsedIn, setEditingUsedIn] = useState(false)
  const [usedInDraft, setUsedInDraft] = useState(comp.usedIn)

  // Seed parameter values from component control spec definitions
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    comp.controls?.forEach(ctrl => {
      initial[ctrl.key] = ctrl.default
    })
    return initial
  })

  // Generates modified component declaration on the fly for copying
  const getModifiedCode = () => {
    let rawCode = comp.code
    Object.entries(values).forEach(([key, val]) => {
      const numRegex = new RegExp(`${key}=\\{[^\\}]+\\}`, "g")
      const strRegex = new RegExp(`${key}=["'][^"']+["']`, "g")
      const boolRegex = new RegExp(`${key}=\\{[a-zA-Z]+\\}`, "g")
      
      if (typeof val === "number") {
        rawCode = rawCode.replace(numRegex, `${key}={${val}}`)
      } else if (typeof val === "boolean") {
        rawCode = rawCode.replace(boolRegex, `${key}={${val}}`)
      } else {
        rawCode = rawCode.replace(strRegex, `${key}="${val}"`)
      }
    })
    return rawCode
  }

  const copyCode = () => {
    navigator.clipboard.writeText(getModifiedCode()).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const saveUsedIn = () => {
    onUpdateUsedIn(comp.id, usedInDraft)
    setEditingUsedIn(false)
  }

  const handleControlChange = (key: string, val: unknown) => {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="flex flex-1 min-h-0 w-full overflow-hidden">
      
      {/* LEFT AREA: Balanced 50/50 Top/Bottom Split Stack */}
      <div className="flex-1 flex flex-col min-h-0" style={{ background: "var(--finna-canvas)" }}>
        
        {/* Top Half: Composed Live Interactive Preview Box */}
        <div 
          className="h-1/2 flex items-center justify-center p-6 relative border-b" 
          style={{ borderColor: "var(--finna-border)" }}
        >
          <div className="absolute top-3 left-4 text-[9px] font-mono tracking-wider text-zinc-500">
            Interactive Lab // Live Target Frame
          </div>
          <div className="w-full max-w-md p-4 rounded-xl border flex items-center justify-center" style={{ borderColor: "rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.15)" }}>
            <LiveComponentRenderer comp={comp} values={values} />
          </div>
        </div>

        {/* Bottom Half: Clean Component Customization Controls */}
        <div className="h-1/2 p-5 overflow-y-auto bg-black/10 flex flex-col">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-3">
            Customize Component Parameters
          </div>
          
          {comp.controls && comp.controls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comp.controls.map(ctrl => {
                const currentVal = values[ctrl.key] ?? ctrl.default

                return (
                  <div key={ctrl.key} className="flex flex-col gap-1 p-2.5 rounded-lg" style={{ background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.02)" }}>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-white tracking-tight">{ctrl.label}</label>
                      <span className="font-mono text-[9px] text-zinc-400">{String(currentVal)}</span>
                    </div>

                    {ctrl.type === "number" && (
                      <input
                        type="range"
                        min={ctrl.min ?? 0}
                        max={ctrl.max ?? 100}
                        step={ctrl.max && ctrl.max <= 1 ? 0.05 : 1}
                        value={currentVal as number}
                        onChange={e => handleControlChange(ctrl.key, Number(e.target.value))}
                        className="w-full mt-1"
                      />
                    )}

                    {ctrl.type === "boolean" && (
                      <button
                        onClick={() => handleControlChange(ctrl.key, !currentVal)}
                        className="w-full text-left text-[10px] px-2 py-1 rounded transition-all font-mono mt-1"
                        style={{
                          background: currentVal ? "rgba(131,42,93,0.12)" : "rgba(0,0,0,0.15)",
                          border: currentVal ? "1px solid var(--finna-primary)" : "1px solid rgba(255,255,255,0.04)",
                          color: currentVal ? "var(--finna-text)" : "var(--finna-text-dim)"
                        }}
                      >
                        {currentVal ? "|| ACTIVE" : "|| INACTIVE"}
                      </button>
                    )}

                    {ctrl.type === "select" && (
                      <select
                        value={currentVal as string}
                        onChange={e => handleControlChange(ctrl.key, e.target.value)}
                        className="w-full text-[10px] p-1 rounded outline-none font-mono mt-1 cursor-pointer"
                        style={{ background: "rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.04)", color: "var(--finna-text)" }}
                      >
                        {ctrl.options?.map(opt => (
                          <option key={opt} value={opt} className="bg-[#150D15]">{opt}</option>
                        ))}
                      </select>
                    )}

                    {ctrl.type === "color" && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <input
                          type="color"
                          value={currentVal as string}
                          onChange={e => handleControlChange(ctrl.key, e.target.value)}
                          className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={currentVal as string}
                          onChange={e => handleControlChange(ctrl.key, e.target.value)}
                          className="flex-1 text-[9px] font-mono px-1.5 py-0.5 rounded outline-none"
                          style={{ background: "rgba(0,0,0,0.15)", border: "1px solid rgba(255,255,255,0.04)", color: "var(--finna-text-secondary)" }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-[11px] text-zinc-500 italic font-mono p-4 border border-dashed border-zinc-800 rounded-lg text-center my-auto">
              This component contains no adjustable properties.
            </div>
          )}
        </div>
      </div>

      {/* RIGHT AREA: Metadata, Code Export, and Context Lanes Stay in Line */}
      <div className="w-80 overflow-y-auto p-5 flex flex-col gap-4 flex-shrink-0 border-l" style={{ background: "var(--finna-canvas-alt)", borderColor: "var(--finna-border)" }}>
        <div>
          <button onClick={onClose} className="flex items-center gap-1 text-[11px] mb-3 transition-colors hover:text-white" style={{ color: "var(--finna-text-secondary)" }}>
            <ArrowLeft size={11} /> Back to Archive
          </button>

          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="text-sm font-bold tracking-tight">{comp.name}</div>
              <div className="text-[9px] font-mono uppercase tracking-wide mt-0.5" style={{ color: "var(--finna-primary)" }}>
                {comp.type}
              </div>
            </div>
            <button
              onClick={onToggleStar}
              className="text-[10px] px-2 py-0.5 rounded flex items-center gap-1 transition-all"
              style={{ 
                background: starred ? "rgba(245,158,11,0.12)" : "var(--finna-surface)", 
                border: starred ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.04)",
                color: starred ? "#F59E0B" : "var(--finna-text-dim)" 
              }}
            >
              {starred ? "★ Saved" : "☆ Save"}
            </button>
          </div>

          <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--finna-text-secondary)" }}>
            {comp.desc}
          </p>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.05)" }} />

        {/* Anchor Block */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-500">Implementation Anchor</span>
            {!editingUsedIn && (
              <button onClick={() => setEditingUsedIn(true)} className="text-[9px]" style={{ color: "var(--finna-primary)" }}>
                Modify
              </button>
            )}
          </div>
          {editingUsedIn ? (
            <div className="flex gap-1.5">
              <input
                value={usedInDraft}
                onChange={e => setUsedInDraft(e.target.value)}
                className="flex-1 text-[10px] px-2 py-1 rounded outline-none font-mono"
                style={{ background: "var(--finna-surface)", border: "1px solid var(--finna-border)", color: "var(--finna-text)" }}
              />
              <button onClick={saveUsedIn} className="text-[10px] px-2.5 rounded font-medium" style={{ background: "var(--finna-primary)", color: "#fff" }}>
                Save
              </button>
            </div>
          ) : (
            <p className="text-[10px] font-mono pl-0.5" style={{ color: "var(--finna-text-secondary)" }}>
              {comp.usedIn}
            </p>
          )}
        </div>

        {/* Live Source Viewport */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="text-[9px] uppercase tracking-wider font-mono text-zinc-500 mb-1">
            Live Compiled Source
          </div>
          <div className="relative flex-1 min-h-[140px] max-h-[220px] flex flex-col rounded-lg overflow-hidden border" style={{ borderColor: "var(--finna-border)" }}>
            <pre
              className="text-[9px] font-mono p-2.5 overflow-auto flex-1 h-full w-full custom-scrollbar"
              style={{ background: "var(--finna-canvas)", color: "#a8c0ff" }}
            >
              {getModifiedCode()}
            </pre>
          </div>
        </div>

        <button
          onClick={copyCode}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold py-2 rounded-lg transition-transform active:scale-[0.98]"
          style={{ background: "var(--finna-primary)", color: "#fff" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />} 
          {copied ? "Copied Modified Code" : "Copy Source Snippet"}
        </button>
      </div>
    </div>
  )
}
