import { useState } from "react"
import { ArrowLeft, Copy, Check } from "lucide-react"
import type { ComponentSpec } from "../types"
import { ComponentPreview } from "../components/previews/ComponentPreview"

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

  const copyCode = () => {
    navigator.clipboard.writeText(comp.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const saveUsedIn = () => {
    onUpdateUsedIn(comp.id, usedInDraft)
    setEditingUsedIn(false)
  }

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6" style={{ background: "var(--finna-canvas)", borderRight: "1px solid var(--finna-border)" }}>
        <div className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>live preview -- hover to interact</div>
        <ComponentPreview comp={comp} size="large" />
      </div>

      <div className="w-72 overflow-y-auto p-4" style={{ background: "var(--finna-canvas-alt)" }}>
        <button onClick={onClose} className="flex items-center gap-1 text-[11px] mb-3" style={{ color: "var(--finna-text-secondary)" }}>
          <ArrowLeft size={12} /> Back
        </button>

        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="text-base font-bold">{comp.name}</div>
            <div className="text-[9px] font-mono uppercase tracking-wide mb-2" style={{ color: "var(--finna-primary)" }}>{comp.type}</div>
          </div>
          <button
            onClick={onToggleStar}
            className="text-[10px] px-2 py-1 rounded flex items-center gap-1"
            style={{ background: starred ? "rgba(245,158,11,0.12)" : "var(--finna-surface)", color: starred ? "#F59E0B" : "var(--finna-text-dim)" }}
          >
            {starred ? "\u2605 Saved" : "\u2606 Save"}
          </button>
        </div>

        <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--finna-text-secondary)" }}>{comp.desc}</p>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase tracking-wider font-mono" style={{ color: "var(--finna-text-dim)" }}>Used in</span>
            {!editingUsedIn && (
              <button onClick={() => setEditingUsedIn(true)} className="text-[9px]" style={{ color: "var(--finna-primary)" }}>Edit</button>
            )}
          </div>
          {editingUsedIn ? (
            <div className="flex gap-1.5">
              <input
                value={usedInDraft}
                onChange={e => setUsedInDraft(e.target.value)}
                className="flex-1 text-[11px] px-2 py-1 rounded outline-none"
                style={{ background: "var(--finna-surface)", border: "1px solid var(--finna-border)", color: "var(--finna-text)" }}
              />
              <button onClick={saveUsedIn} className="text-[10px] px-2 rounded" style={{ background: "var(--finna-primary)", color: "#fff" }}>Save</button>
            </div>
          ) : (
            <p className="text-[11px]" style={{ color: "var(--finna-text-secondary)" }}>{comp.usedIn}</p>
          )}
        </div>

        {comp.motion && (
          <div className="mb-3">
            <div className="text-[9px] uppercase tracking-wider font-mono mb-1.5" style={{ color: "var(--finna-text-dim)" }}>Motion</div>
            {Object.entries(comp.motion).map(([k, v]) => (
              <div key={k} className="grid text-[11px] mb-0.5" style={{ gridTemplateColumns: "70px 1fr" }}>
                <span className="font-mono text-[10px]" style={{ color: "var(--finna-text-dim)" }}>{k}</span>
                <span style={{ color: "var(--finna-text-secondary)" }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-3">
          <div className="text-[9px] uppercase tracking-wider font-mono mb-1.5" style={{ color: "var(--finna-text-dim)" }}>Code</div>
          <pre
            className="text-[10px] font-mono p-2.5 rounded-md overflow-x-auto"
            style={{ background: "var(--finna-canvas)", border: "1px solid var(--finna-border)", color: "#a8c0ff" }}
          >
            {comp.code}
          </pre>
        </div>

        <button
          onClick={copyCode}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold py-2 rounded-md"
          style={{ background: "var(--finna-primary)", color: "#fff" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy code"}
        </button>
      </div>
    </div>
  )
}
