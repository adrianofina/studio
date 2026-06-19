import { useState } from "react"
import { PROJECTS } from "../data/projects"
import type { ProjectEntry } from "../types"
import { ArrowLeft, LayoutGrid, List as ListIcon } from "lucide-react"
import { SungJinwooShadow } from "../components/ui/SungJinwooShadow"
import { TextGlow } from "../components/ui/TextGlow"
import { AnimatedList } from "../components/ui/AnimatedList"
import { motion } from "motion/react"

const STATUS_MAP: Record<ProjectEntry["status"], "completed" | "active" | "inactive"> = {
  completed: "completed",
  inprogress: "active",
  todo: "inactive",
}

export function DiaryPage() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null)
  const [viewLayout, setViewLayout] = useState<"list" | "tab">("list")
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  if (selected) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 pb-28" style={{ background: "var(--finna-canvas)" }}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-[11px] mb-5 transition-colors hover:text-white" style={{ color: "var(--finna-text-secondary)" }}>
            <ArrowLeft size={12} /> Back to logs
          </button>
          
          <div className="text-xl font-bold tracking-tight mb-3 text-white">
            <TextGlow text={selected.id} intensity="high" />
          </div>
          
          <div className="mb-5">
            <SungJinwooShadow status={STATUS_MAP[selected.status]}>
              <div className="h-1.5 w-full rounded bg-zinc-800" />
            </SungJinwooShadow>
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

  const formatItems = (itemsArray: ProjectEntry[]) => 
    itemsArray.map(p => ({
      id: p.id,
      name: p.id,
      type: p.date,
      raw: p
    }))

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

        <div className="flex-1">
          {viewLayout === "list" ? (
            <div className="flex flex-col gap-8">
              {buckets.map(bucket => {
                const filtered = PROJECTS.filter(p => p.status === bucket.key)
                if (!filtered.length) return null
                return (
                  <section key={bucket.key}>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-mono mb-3" style={{ color: "var(--finna-text-dim)" }}>
                      {bucket.label} � {filtered.length}
                    </div>
                    <div className="max-h-[360px] overflow-hidden">
                      <AnimatedList 
                        items={formatItems(filtered)}
                        onOpen={(item) => setSelected(item.raw)}
                        displayScrollbar={false}
                      />
                    </div>
                  </section>
                )
              })}
            </div>
          ) : (
            /* True Magic Bento Grid System Treatment for Tabs */
            <div className="w-full mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allFlattenedItems.map((p, index) => {
                  const isHovered = hoveredId === p.id
                  return (
                    <motion.div 
                      key={p.id} 
                      onClick={() => setSelected(p)}
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onMouseMove={(e) => handleMouseMove(e, p.id)}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="relative p-5 rounded-2xl border cursor-pointer overflow-hidden group backdrop-blur-md transition-colors duration-300"
                      style={{ 
                        background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)",
                        backgroundColor: "var(--finna-surface, #110e15)",
                        borderColor: isHovered ? "rgba(131, 42, 93, 0.4)" : "rgba(255, 255, 255, 0.04)"
                      }}
                    >
                      {/* Dynamic Neon Background Spotlight Tracking */}
                      {isHovered && (
                        <div 
                          className="absolute pointer-events-none rounded-full blur-[60px] opacity-25 transition-opacity duration-300"
                          style={{
                            width: "140px",
                            height: "140px",
                            background: "var(--finna-primary, #832a5d)",
                            left: `${mousePos.x - 70}px`,
                            top: `${mousePos.y - 70}px`,
                          }}
                        />
                      )}

                      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                        <div>
                          <div className="text-[13px] font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">
                            {p.id}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{p.date}</div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.02]">
                          <span className="text-[9px] px-2 py-0.5 rounded-md font-mono bg-white/5 text-zinc-400 capitalize border border-white/5">
                            {p.status}
                          </span>
                          <span className="text-[10px] font-mono opacity-0 group-hover:opacity-60 group-hover:translate-x-1 transition-all" style={{ color: "var(--finna-primary)" }}>
                            View details ?
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}