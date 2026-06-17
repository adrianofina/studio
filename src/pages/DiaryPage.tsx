import { useState, useEffect, useRef } from "react"
import { PROJECTS } from "../data/projects"
import type { ProjectEntry } from "../types"
import { ArrowLeft, LayoutGrid, List as ListIcon } from "lucide-react"
import { SungJinwooShadow } from "../components/ui/SungJinwooShadow"
import { StatusSpine } from "../components/ui/StatusSpine"
import { MagicBento } from "../components/ui/MagicBento"
import { TextGlow } from "../components/ui/TextGlow"
import { gsap } from "gsap"

const STATUS_MAP: Record<ProjectEntry["status"], "completed" | "active" | "inactive"> = {
  completed: "completed",
  inprogress: "active",
  todo: "inactive",
}

export function DiaryPage() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null)
  const [viewLayout, setViewLayout] = useState<"list" | "tab">("list")
  
  // Ref array collector for card items
  const cardRefs = useRef<HTMLDivElement[]>([])
  cardRefs.current = []

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  // Trigger high-fidelity entry staggers whenever the list layout mounts
  useEffect(() => {
    if (viewLayout === "list" && cardRefs.current.length > 0 && !selected) {
      // Force initial state to prevent flash of un-animated content
      gsap.set(cardRefs.current, { opacity: 0, y: 20, scale: 0.98 })
      
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        overwrite: "auto"
      })
    }
  }, [viewLayout, selected])

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

  const allFlattenedItems = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28" style={{ background: "var(--finna-canvas)" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* View Layout Switcher */}
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
                    <div className="flex flex-col gap-2">
                      {items.map(p => (
                        <div
                          key={p.id}
                          ref={addToRefs}
                          onClick={() => setSelected(p)}
                          className="flex items-stretch gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:border-zinc-700 bg-zinc-900/20 backdrop-blur-md group"
                          style={{ 
                            background: "var(--finna-canvas-alt)", 
                            border: "1px solid rgba(255,255,255,0.05)",
                            willChange: "transform, opacity"
                          }}
                        >
                          <StatusSpine status={STATUS_MAP[p.status]} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[13px] font-semibold tracking-tight text-white group-hover:text-[var(--finna-primary)] transition-colors">{p.id}</span>
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
                clickEffect={true}
                spotlightRadius={300}
                particleCount={10}
                glowColor="132, 0, 255"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
