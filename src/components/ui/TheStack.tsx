import { useState } from "react"

interface StackItem {
  id: string
  title: string
  year: number
  image?: string
}

interface Props {
  items?: StackItem[]
  overlap?: number
}

const DEMO_ITEMS: StackItem[] = [
  { id: "1", title: "How to Make Killings", year: 2026 },
  { id: "2", title: "FROM", year: 2022 },
  { id: "3", title: "Jujutsu Kaisen", year: 2020 },
  { id: "4", title: "Perfect Crown", year: 2026 },
  { id: "5", title: "The Devil Wears", year: 2026 },
  { id: "6", title: "The Rookie", year: 2018 },
  { id: "7", title: "Constantine", year: 2018 },
]

const GRADIENTS = [
  "linear-gradient(160deg, #3B2244, #1A0F1A)",
  "linear-gradient(160deg, #1a2a44, #0f1a2a)",
  "linear-gradient(160deg, #2a1a44, #1a0f2a)",
  "linear-gradient(160deg, #441a2a, #2a0f1a)",
  "linear-gradient(160deg, #2a3a1a, #1a2a0f)",
  "linear-gradient(160deg, #1a3a3a, #0f2a2a)",
  "linear-gradient(160deg, #3a2a1a, #2a1a0f)",
]

// Horizontal scroll row of overlapping poster cards matching the
// KakaFlix reference: cards overlap by `overlap` pixels, title +
// year shown below each. Clicking a card shows a floating action
// panel (Watch Later, Liked, Remove) positioned over it.

export function TheStack({ items = DEMO_ITEMS, overlap = 20 }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div style={{ overflowX: "auto", paddingBottom: 16, cursor: "grab" }}>
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
                transition: "z-index 0s, transform 0.2s ease",
                transform: isActive ? "translateY(-8px) scale(1.03)" : "none",
              }}
            >
              {/* Card */}
              <div
                onClick={() => setActiveId(isActive ? null : item.id)}
                style={{
                  width: 130,
                  height: 190,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: item.image ? `url(${item.image}) center/cover` : GRADIENTS[idx % GRADIENTS.length],
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.5)" : "2px 0 8px rgba(0,0,0,0.3)",
                }}
              />

              {/* Floating action panel -- appears on click */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 200,
                    background: "rgba(18,12,24,0.97)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    minWidth: 150,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {[
                    { label: "Watch Later", emoji: "??", color: "var(--finna-amber)" },
                    { label: "Liked", emoji: "?", color: "var(--finna-crimson)" },
                    { label: "Remove", emoji: "??", color: "rgba(255,255,255,0.4)" },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => setActiveId(null)}
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "8px 10px", borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: "transparent", cursor: "pointer",
                        fontSize: 12, fontWeight: 500, color: action.color,
                        width: "100%", textAlign: "left",
                      }}
                    >
                      <span>{action.emoji}</span> {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Title + year below card */}
              <div style={{ padding: "6px 2px 0" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--finna-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 9, color: "var(--finna-text-dim)", marginTop: 1 }}>{item.year}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
