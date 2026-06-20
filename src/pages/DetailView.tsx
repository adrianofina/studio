import { useState, useMemo } from "react"
import { ArrowLeft, Copy, Check, Bookmark } from "lucide-react"
import type { ComponentSpec } from "../types"
import { ComponentPreview } from "../components/previews/ComponentPreview"
import { ImagePicker } from "../components/ui/ImagePicker"
import { useVariants } from "../hooks/useVariants"

interface Props {
  comp: ComponentSpec
  starred: boolean
  onToggleStar: () => void
  onClose: () => void
  onUpdateUsedIn: (id: string, value: string) => void
}

// Layout:
// - Full width, split into two columns on desktop: left=preview, right=details
// - Preview column: takes as much vertical space as possible, never clips
// - Right column: scrollable independently -- name, desc, customize panel, code
// - Code block: always shows, always regenerates on every control change
// - Customize panel: every control from the spec's controls[] array, scrollable

export function DetailView({ comp, starred, onToggleStar, onClose, onUpdateUsedIn }: Props) {
  const controls = comp.controls ?? []
  const [values, setValues] = useState<Record<string, unknown>>(
    Object.fromEntries(controls.map(c => [c.key, c.default]))
  )
  const [copied, setCopied] = useState(false)
  const [editingUsedIn, setEditingUsedIn] = useState(false)
  const [usedInDraft, setUsedInDraft] = useState(comp.usedIn)
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [savingName, setSavingName] = useState("")
  const { saveVariant, variantsFor } = useVariants()
  const savedVariants = variantsFor(comp.id)

  const set = (key: string, val: unknown) => setValues(prev => ({ ...prev, [key]: val }))

  // Generated code: always recalculates when values change
  const generatedCode = useMemo(() => {
    const propsStr = controls.map(c => {
      const v = values[c.key]
      if (v === "" || v === null || v === undefined) return ""
      if (c.type === "boolean") return v ? c.key : ""
      if (c.type === "number") return `${c.key}={${v}}`
      return `${c.key}="${v}"`
    }).filter(Boolean).join("\n  ")

    const componentName = comp.name.replace(/[^a-zA-Z0-9]/g, "")
    if (comp.preview === "shadow") {
      return `<div className="your-card">\n  {/* your card content */}\n</div>\n<${componentName}\n  ${propsStr}\n/>`
    }
    return `<${componentName}\n  ${propsStr}\n/>`
  }, [values, controls, comp.name, comp.preview])

  const copyCode = () => {
    const fullCode = comp.code
      ? `// Full component source:\n${comp.code}\n\n// Usage:\n${generatedCode}`
      : generatedCode
    navigator.clipboard.writeText(fullCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const saveUsedIn = () => {
    onUpdateUsedIn(comp.id, usedInDraft)
    setEditingUsedIn(false)
  }

  const handleSaveVariant = () => {
    if (!savingName.trim()) return
    saveVariant(comp.id, savingName.trim(), values)
    setSavingName("")
    setShowSaveInput(false)
  }

  return (
    <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
      {/* LEFT: Live preview -- gets the most space */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "var(--studio-text-secondary)" }}
          >
            <ArrowLeft size={12} /> Back
          </button>
          <div className="flex-1" />
          <span className="text-[10px] font-mono" style={{ color: "var(--studio-text-dim)" }}>
            click to interact
          </span>
        </div>

        {/* Preview area -- fills remaining vertical space */}
        <div
          className="flex-1 flex items-center justify-center p-8 overflow-auto"
          style={{ background: "var(--studio-canvas)" }}
        >
          <ComponentPreview comp={comp} size="large" values={values} />
        </div>

        {/* Customize controls -- below the preview, still in left column */}
        <div
          className="flex-shrink-0 overflow-y-auto"
          style={{
            maxHeight: "35vh",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "14px 20px",
          }}
        >
          <div className="text-[9px] uppercase tracking-[0.14em] font-mono mb-3" style={{ color: "var(--studio-text-dim)" }}>
            Customize component parameters
          </div>

          {controls.length === 0 && (
            <div className="text-[11px]" style={{ color: "var(--studio-text-dim)" }}>
              No configurable parameters for this component.
            </div>
          )}

          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {controls.map(ctrl => (
              <div
                key={ctrl.key}
                className="rounded-xl p-3"
                style={{ background: "var(--studio-surface)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-medium" style={{ color: "var(--studio-text-secondary)" }}>
                    {ctrl.label}
                  </label>
                  {ctrl.type === "number" && (
                    <span className="text-[10px] font-mono" style={{ color: "var(--studio-primary)" }}>
                      {String(values[ctrl.key])}
                    </span>
                  )}
                  {ctrl.type === "select" && (
                    <span className="text-[10px] font-mono" style={{ color: "var(--studio-text-dim)" }}>
                      {String(values[ctrl.key])}
                    </span>
                  )}
                </div>

                {ctrl.type === "number" && (
                  <input
                    type="range" min={ctrl.min ?? 0} max={ctrl.max ?? 100}
                    step={ctrl.max && ctrl.max <= 2 ? 0.1 : 1}
                    value={values[ctrl.key] as number}
                    onChange={e => set(ctrl.key, Number(e.target.value))}
                    style={{ accentColor: "var(--studio-primary)" }}
                  />
                )}

                {ctrl.type === "select" && (
                  <select
                    value={values[ctrl.key] as string}
                    onChange={e => set(ctrl.key, e.target.value)}
                    className="w-full text-[11px] px-2 py-1.5 rounded-lg outline-none"
                    style={{ background: "var(--studio-canvas)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--studio-text)" }}
                  >
                    {ctrl.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                )}

                {ctrl.type === "text" && (
                  <input
                    type="text"
                    value={values[ctrl.key] as string}
                    onChange={e => set(ctrl.key, e.target.value)}
                    className="w-full text-[11px] px-2 py-1.5 rounded-lg outline-none"
                    style={{ background: "var(--studio-canvas)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--studio-text)" }}
                  />
                )}

                {ctrl.type === "color" && (
                  <div className="flex gap-1.5 flex-wrap mt-1">
                    {["var(--studio-primary)","var(--studio-violet)","var(--studio-cyan)","var(--studio-amber)","var(--studio-emerald)","var(--studio-crimson)"].map(c => (
                      <button
                        key={c}
                        onClick={() => set(ctrl.key, c)}
                        className="w-7 h-7 rounded-md border-2 transition-all"
                        style={{
                          background: c,
                          borderColor: values[ctrl.key] === c ? "#fff" : "transparent",
                          boxShadow: values[ctrl.key] === c ? `0 0 6px ${c}` : "none",
                        }}
                      />
                    ))}
                  </div>
                )}

                {ctrl.type === "boolean" && (
                  <button
                    onClick={() => set(ctrl.key, !values[ctrl.key])}
                    className="text-[11px] px-3 py-1 rounded-lg"
                    style={{
                      background: values[ctrl.key] ? "rgba(131,42,93,0.2)" : "var(--studio-canvas)",
                      color: values[ctrl.key] ? "var(--studio-primary)" : "var(--studio-text-dim)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {values[ctrl.key] ? "On" : "Off"}
                  </button>
                )}

                {ctrl.type === "image" && (
                  <ImagePicker value={values[ctrl.key] as string} onChange={v => set(ctrl.key, v)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Component info + code + variants */}
      <div
        className="overflow-y-auto flex-shrink-0"
        style={{ width: 280, background: "var(--studio-canvas-alt)", padding: "16px 18px" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[16px] font-bold tracking-tight">{comp.name}</div>
            <div className="text-[9px] font-mono uppercase tracking-widest mt-0.5" style={{ color: "var(--studio-primary)" }}>
              {comp.type}
            </div>
          </div>
          <button
            onClick={onToggleStar}
            className="text-[10px] px-2 py-1 rounded-md flex items-center gap-1"
            style={{
              background: starred ? "rgba(245,158,11,0.12)" : "var(--studio-surface)",
              color: starred ? "#F59E0B" : "var(--studio-text-dim)",
            }}
          >
            {starred ? "? Saved" : "? Save"}
          </button>
        </div>

        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "var(--studio-text-secondary)" }}>
          {comp.desc}
        </p>

        {/* Used in */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] uppercase tracking-wider font-mono" style={{ color: "var(--studio-text-dim)" }}>Used in</span>
            {!editingUsedIn && (
              <button onClick={() => setEditingUsedIn(true)} className="text-[9px]" style={{ color: "var(--studio-primary)" }}>Edit</button>
            )}
          </div>
          {editingUsedIn ? (
            <div className="flex gap-1.5">
              <input
                value={usedInDraft}
                onChange={e => setUsedInDraft(e.target.value)}
                className="flex-1 text-[11px] px-2 py-1 rounded outline-none"
                style={{ background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--studio-text)" }}
              />
              <button onClick={saveUsedIn} className="text-[10px] px-2 rounded" style={{ background: "var(--studio-primary)", color: "#fff" }}>Save</button>
            </div>
          ) : (
            <p className="text-[11px]" style={{ color: "var(--studio-text-secondary)" }}>{comp.usedIn}</p>
          )}
        </div>

        {/* Motion specs */}
        {comp.motion && Object.keys(comp.motion).length > 0 && (
          <div className="mb-4">
            <div className="text-[9px] uppercase tracking-wider font-mono mb-2" style={{ color: "var(--studio-text-dim)" }}>Motion</div>
            {Object.entries(comp.motion).map(([k, v]) => (
              <div key={k} className="grid text-[11px] mb-1" style={{ gridTemplateColumns: "80px 1fr" }}>
                <span className="font-mono text-[10px]" style={{ color: "var(--studio-text-dim)" }}>{k}</span>
                <span style={{ color: "var(--studio-text-secondary)" }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Saved variants */}
        {savedVariants.length > 0 && (
          <div className="mb-4">
            <div className="text-[9px] uppercase tracking-wider font-mono mb-2" style={{ color: "var(--studio-text-dim)" }}>Your variants</div>
            <div className="flex flex-wrap gap-1.5">
              {savedVariants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setValues(v.values)}
                  className="text-[10px] px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(131,42,93,0.12)", color: "var(--studio-primary)", border: "1px solid rgba(131,42,93,0.25)" }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live compiled source -- always shows, always updates */}
        <div className="mb-3">
          <div className="text-[9px] uppercase tracking-wider font-mono mb-2" style={{ color: "var(--studio-text-dim)" }}>
            Live compiled source
          </div>
          <div
            className="rounded-xl p-3 overflow-x-auto"
            style={{
              background: "var(--studio-canvas)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "2px solid var(--studio-primary)",
            }}
          >
            <pre className="text-[10px] font-mono whitespace-pre-wrap" style={{ color: "#a8c0ff" }}>
              {generatedCode}
              <span className="animate-pulse" style={{ color: "var(--studio-primary)" }}>¦</span>
            </pre>
          </div>
        </div>

        {/* Copy + Save variant buttons */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={copyCode}
            className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold py-2 rounded-lg"
            style={{ background: "var(--studio-primary)", color: "#fff" }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy code"}
          </button>

          {!showSaveInput ? (
            <button
              onClick={() => setShowSaveInput(true)}
              className="flex items-center justify-center gap-1 text-[11px] px-3 py-2 rounded-lg"
              style={{ background: "var(--studio-surface)", color: "var(--studio-text-secondary)" }}
            >
              <Bookmark size={11} /> Save
            </button>
          ) : (
            <div className="flex gap-1.5 flex-1">
              <input
                autoFocus
                value={savingName}
                onChange={e => setSavingName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSaveVariant()}
                placeholder="Variant name..."
                className="flex-1 text-[11px] px-2 py-1.5 rounded-lg outline-none"
                style={{ background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--studio-text)" }}
              />
              <button onClick={handleSaveVariant} className="text-[10px] px-2 rounded-lg" style={{ background: "var(--studio-primary)", color: "#fff" }}>OK</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
