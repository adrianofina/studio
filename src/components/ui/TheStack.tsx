import { useState } from "react"

interface StackItem {
  id: string
  title: string
  subtitle?: string
  image?: string
}

interface Props {
  items?: StackItem[]
  overlap?: number
  action1Label?: string
  action2Label?: string
  action3Label?: string
}

const DEMO_ITEMS: StackItem[] = [
  { id: "1", title: "Item One", subtitle: "2026" },
  { id: "2", title: "Item Two", subtitle: "2025" },
  { id: "3", title: "Item Three", subtitle: "2024" },
  { id: "4", title: "Item Four", subtitle: "2023" },
  { id: "5", title: "Item Five", subtitle: "2022" },
  { id: "6", title: "Item Six", subtitle: "2021" },
]

const GRADIENTS = [
  "linear-gradient(160deg, #3B2244, #1A0F1A)",
  "linear-gradient(160deg, #1a2a44, #0f1a2a)",
  "linear-gradient(160deg, #2a1a44, #1a0f2a)",
  "linear-gradient(160deg, #441a2a, #2a0f1a)",
  "linear-gradient(160deg, #1a3a3a, #0f2a2a)",
  "linear-gradient(160deg, #3a2a1a, #2a1a0f)",
]

// Horizontal scroll row of overlapping cards.
// Fully content-agnostic -- not movie-specific.
// Action labels are customizable via props.
// Images come from the studio image pool if provided.

export function TheStack({
  items = DEMO_ITEMS,
  overlap = 20,
  action1Label = "Primary",
  action2Label = "Secondary",
  action3Label = "Remove",
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div style={{ overflowX: "auto", paddingBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", paddingLeft: 8, paddingRight: 8, minWidth: "max-content" }}>
        {items.map((item, idx) => {
          const isActive = activeId === item.id
          return (
            <div
              key={item.id}
              style={{
                position: "relative",
                marginLeft: idx === 0 ? 0 : -overlap,
                zIndex: isActive ? 100 : items.length - idx,
                transition: "transform 0.2s ease",
                transform: isActive ? "translateY(-8px) scale(1.04)" : "none",
              }}
            >
              <div
                onClick={() => setActiveId(isActive ? null : item.id)}
                style={{
                  width: 130, height: 190, borderRadius: 12, overflow: "hidden",
                  background: item.image ? `url(${item.image}) center/cover` : GRADIENTS[idx % GRADIENTS.length],
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer", position: "relative", flexShrink: 0,
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.5)" : "2px 0 8px rgba(0,0,0,0.3)",
                }}
              />

              {isActive && (
                <div
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 200, background: "rgba(18,12,24,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14, padding: "10px 12px",
                    display: "flex", flexDirection: "column", gap: 6,
                    minWidth: 150, boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {[action1Label, action2Label, action3Label].map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setActiveId(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "8px 10px", borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: i === 0 ? "var(--studio-primary)" : "transparent",
                        cursor: "pointer", fontSize: 12, fontWeight: 500,
                        color: i === 0 ? "#fff" : "rgba(255,255,255,0.6)",
                        width: "100%", textAlign: "left",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ padding: "6px 2px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--studio-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>
                  {item.title}
                </div>
                {item.subtitle && <div style={{ fontSize: 9, color: "var(--studio-text-dim)", marginTop: 1 }}>{item.subtitle}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
