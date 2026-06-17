import { useState } from "react"
import { PROJECTS } from "../data/projects"
import type { ProjectEntry } from "../types"
import { ArrowLeft, LayoutGrid, List as ListIcon } from "lucide-react"
import { SungJinwooShadow } from "../components/ui/SungJinwooShadow"
import { StatusSpine } from "../components/ui/StatusSpine"
import { MagicBento } from "../components/ui/MagicBento"
import { TextGlow } from "../components/ui/TextGlow"
import { AnimatedList } from "../components/ui/AnimatedList"

const STATUS_MAP: Record<ProjectEntry["status"], "completed" | "active" | "inactive"> = {
  completed: "completed",
  inprogress: "active",
  todo: "inactive",
}

export function DiaryPage() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null)
  const [viewLayout, setViewLayout] = useState<"list" | "tab">("list")

  if (selected) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28" style={{ background: "var(--finna-canvas)" }}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-[11px] mb-5 transition-colors hover:text-white" style={{ color: "var(--finna-text-secondary)" }}>
            <ArrowLeft size={12} /> Back to logs
          </button>
          
          <div className="text-xl font-bold tracking-tight mb-3 text-white">
            <TextGlow variant="sungjinwoo">{selected.id}</TextGlow>
          </div>
          
          <div className="mb-5">
            <SungJinwooShadow progress={selected.progress} status={STATUS_MAP[selected.status]} height={6} />
          </div>

          {selected.desc && (
            <div className="rounded-2xl p-5 mb-3" style={{ background: "var(--finna-canvas-alt)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[11px] font-semibold mb-2 tracking-wide text-white">About this project</div>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--finna-text-secondary)" }}>{selected.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {selected.tech.map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "var(--finna-text-dim)" }}>{t}</span>
                ))}
              </div>
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

  const allFlattenedItems = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28" style={{ background: "var(--finna-canvas)" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--finna-border)" }}>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Log Views</div>
          <div className="flex p-0.5 rounded-lg bg-black/30 border border-zinc-800/40">
            <button 
              onClick={() => setViewLayout("list")}
              className={`text-[10px] font-mono px-3 py-1 rounded transition-all flex items-center gap-1.5 ${viewLayout === "list" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
            >
              <ListIcon size={11} /> List
            </button>
            <button 
              onClick={() => setViewLayout("tab")}
              className={`text-[10px] font-mono px-3 py-1 rounded transition-all flex items-center gap-1.5 ${viewLayout === "tab" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
            >
              <LayoutGrid size={11} /> Tab
            </button>
          </div>
        </div>

        <div>
          {viewLayout === "list" ? (
            <div className="flex flex-col gap-8">
              {buckets.map(bucket => {
                const items = PROJECTS.filter(p => p.status === bucket.key)
                if (!items.length) return null
                return (
                  <section key={bucket.key}>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-mono mb-3" style={{ color: "var(--finna-text-dim)" }}>
                      {bucket.label} — {items.length}
                    </div>
                    
                    <AnimatedList 
                      items={items}
                      onItemSelect={(project) => setSelected(project)}
                      showGradients={false}
                      displayScrollbar={false}
                      renderItem={(p: ProjectEntry, _, isSelected) => (
                        <div
                          className={`flex items-stretch gap-4 p-4 rounded-2xl transition-all border ${
                            isSelected ? 'border-purple-500/30 bg-[#231c30]' : 'border-white/5 bg-zinc-900/20'
                          }`}
                        >
                          <StatusSpine status={STATUS_MAP[p.status]} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[13px] font-semibold tracking-tight text-white">{p.id}</span>
                              <span className="text-[10px]" style={{ color: "var(--finna-text-dim)" }}>{p.date}</span>
                            </div>
                            <SungJinwooShadow progress={p.progress} status={STATUS_MAP[p.status]} height={4} />
                          </div>
                        </div>
                      )}
                    />
                  </section>
                )
              })}
            </div>
          ) : (
            <div className="w-full mt-2">
              <MagicBento 
                projects={allFlattenedItems}
                onProjectSelect={(project) => setSelected(project)}
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                glowColor="132, 0, 255"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
