import { useState } from "react"
import { PROJECTS } from "../data/projects"
import type { ProjectEntry } from "../types"
import { ArrowLeft } from "lucide-react"
import { SungJinwooShadow } from "../components/ui/SungJinwooShadow"
import { StatusSpine } from "../components/ui/StatusSpine"

const STATUS_MAP: Record<ProjectEntry["status"], "completed" | "active" | "inactive"> = {
  completed: "completed",
  inprogress: "active",
  todo: "inactive",
}

export function DiaryPage() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null)

  if (selected) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-[11px] mb-5" style={{ color: "var(--finna-text-secondary)" }}>
            <ArrowLeft size={12} /> Back to diary
          </button>
          <div className="text-xl font-bold tracking-tight mb-3">{selected.id}</div>
          <div className="mb-5">
            <SungJinwooShadow progress={selected.progress} status={STATUS_MAP[selected.status]} height={6} />
          </div>
          {selected.desc && (
            <div className="rounded-2xl p-5 mb-3" style={{ background: "var(--finna-canvas-alt)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[11px] font-semibold mb-2 tracking-wide">About this project</div>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--finna-text-secondary)" }}>{selected.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {selected.tech.map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "var(--finna-text-dim)" }}>{t}</span>
                ))}
              </div>
            </div>
          )}
          {selected.lessons && (
            <div className="rounded-r-lg p-4" style={{ background: "var(--finna-canvas-alt)", borderLeft: "3px solid var(--finna-primary)" }}>
              <div className="text-[9px] uppercase tracking-wider font-mono mb-1.5" style={{ color: "var(--finna-text-dim)" }}>Notes</div>
              <p className="text-[12px]" style={{ color: "var(--finna-text-secondary)" }}>{selected.lessons}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const buckets: { key: ProjectEntry["status"]; label: string }[] = [
    { key: "completed", label: "Completed" },
    { key: "inprogress", label: "In progress" },
    { key: "todo", label: "To-do" },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {buckets.map(bucket => {
          const items = PROJECTS.filter(p => p.status === bucket.key)
          if (!items.length) return null
          return (
            <section key={bucket.key}>
              <div className="text-[10px] uppercase tracking-[0.15em] font-mono mb-3" style={{ color: "var(--finna-text-dim)" }}>
                {bucket.label} -- {items.length}
              </div>
              <div className="flex flex-col gap-2">
                {items.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="flex items-stretch gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
                    style={{ background: "var(--finna-canvas-alt)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <StatusSpine status={STATUS_MAP[p.status]} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-semibold tracking-tight">{p.id}</span>
                        <span className="text-[10px]" style={{ color: "var(--finna-text-dim)" }}>{p.date}</span>
                      </div>
                      <SungJinwooShadow progress={p.progress} status={STATUS_MAP[p.status]} height={4} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
