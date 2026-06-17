import { useState } from "react"
import AnimatedList from "../components/AnimatedList"
import { TextGlow } from "../components/TextGlow"

interface DiaryEntry {
  title: string;
  subtitle: string;
  category: string;
}

export function DiaryArchiveView() {
  const [viewLayout, setViewLayout] = useState<"list" | "tabs">("tabs")
  const [activeTab, setActiveTab] = useState(0)

  const sampleEntries: DiaryEntry[] = [
    { title: "Insights", subtitle: "Analytics // Track user behavior", category: "analytics" },
    { title: "Overview", subtitle: "Dashboard // Centralized data view", category: "system" },
    { title: "Teamwork", subtitle: "Collaboration // Work together seamlessly", category: "social" },
    { title: "Efficiency", subtitle: "Automation // Streamline workflows", category: "system" },
    { title: "Connectivity", subtitle: "Integration // Connect favorite tools", category: "network" },
    { title: "Protection", subtitle: "Security // Enterprise-grade protection", category: "security" }
  ]

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6" style={{ background: "var(--finna-canvas)" }}>
      
      {/* Structural Toggle Header Block */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--finna-border)" }}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Archive Ledger</div>
        <div className="flex p-0.5 rounded-lg bg-black/30 border border-zinc-800">
          <button 
            onClick={() => setViewLayout("list")}
            className={`text-[10px] font-mono px-3 py-1 rounded transition-all ${viewLayout === "list" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
          >
            List Frame
          </button>
          <button 
            onClick={() => setViewLayout("tabs")}
            className={`text-[10px] font-mono px-3 py-1 rounded transition-all ${viewLayout === "tabs" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
          >
            Bento Tabs
          </button>
        </div>
      </div>

      {/* Dynamic Render Matrix */}
      <div className="flex-1 min-h-0">
        {viewLayout === "list" ? (
          <div className="max-w-xl mx-auto mt-4">
            <AnimatedList 
              items={sampleEntries.map(e => `${e.title} — ${e.subtitle}`)}
              showGradients={true}
              displayScrollbar={false}
            />
          </div>
        ) : (
          /* High-Fidelity Bento Grid Layout Match (Ref: image_898120.png) */
          <div className="grid grid-cols-3 gap-4 auto-rows-[160px] max-w-5xl mx-auto p-2">
            {sampleEntries.map((entry, idx) => {
              const isLarge = idx === 2 || idx === 3
              const hasTextGlow = idx === 1 // "Overview / Dashboard" tile targets the TextGlow module

              return (
                <div 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 flex flex-col justify-between cursor-pointer rounded-xl border transition-all duration-300 bg-[#120F17]/40 hover:border-zinc-700
                    ${isLarge ? "col-span-2" : "col-span-1"} row-span-1`}
                  style={{ borderColor: "var(--finna-border)" }}
                >
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                      {entry.category}
                    </span>
                    <h3 className="text-base font-medium tracking-tight text-white">
                      {hasTextGlow ? (
                        <TextGlow intensity="medium">{entry.title}</TextGlow>
                      ) : (
                        entry.title
                      )}
                    </h3>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-[11px] font-mono leading-tight text-zinc-400">
                      {hasTextGlow ? (
                        <TextGlow intensity="low" className="text-xs">
                          {entry.subtitle.split(" // ")[1] || entry.subtitle}
                        </TextGlow>
                      ) : (
                        entry.subtitle.split(" // ")[1] || entry.subtitle
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
