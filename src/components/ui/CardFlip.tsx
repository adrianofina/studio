import { useState } from "react"

interface Props {
  title?: string
  subtitle?: string
  year?: number | string
  rating?: number
  description?: string
  image?: string
  accentColor?: string
  backLabel1?: string
  backLabel2?: string
}

// A 3D flip card. Generic -- not movie-specific.
// Front: image (or gradient), title, subtitle/year, optional rating.
// Back: description text + two customizable action buttons.
// Click anywhere on the card to flip. Click buttons without flipping back.
// The flip is a genuine CSS rotateY transform, 0.5s cubic-bezier spring.

export function CardFlip({
  title = "Item Title",
  subtitle = "2026",
  year,
  rating,
  description = "Add a description for the back face of this card.",
  image,
  accentColor = "var(--studio-primary)",
  backLabel1 = "Primary Action",
  backLabel2 = "Secondary Action",
}: Props) {
  const [flipped, setFlipped] = useState(false)

  const displaySubtitle = year != null ? String(year) : subtitle

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{ width: 160, height: 240, perspective: "1000px", cursor: "pointer" }}
    >
      <div
        style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            borderRadius: 12, overflow: "hidden",
            background: image
              ? `url(${image}) center/cover no-repeat`
              : "linear-gradient(160deg, var(--studio-surface), var(--studio-canvas))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "32px 10px 10px",
              background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{displaySubtitle}</span>
              {rating != null && <span style={{ fontSize: 11, color: "#F59E0B" }}>? {rating}</span>}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", borderRadius: 12, overflow: "hidden",
            background: "rgba(20,12,28,0.97)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 14, display: "flex", flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{description}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <button
              onClick={e => e.stopPropagation()}
              style={{
                padding: "8px 0", borderRadius: 8, border: "none",
                cursor: "pointer", background: accentColor,
                color: "#fff", fontSize: 11, fontWeight: 600,
              }}
            >
              {backLabel1}
            </button>
            <button
              onClick={e => e.stopPropagation()}
              style={{
                padding: "7px 0", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", background: "transparent",
                color: "rgba(255,255,255,0.6)", fontSize: 11,
              }}
            >
              {backLabel2}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
