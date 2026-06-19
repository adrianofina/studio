import { useState } from "react"

interface Props {
  title?: string
  year?: number
  rating?: number
  description?: string
  accentColor?: string
  image?: string
}

// Front: poster image (or gradient placeholder), title, year, rating.
// Back: description text + two action buttons (Trailer primary,
// Save secondary). Genuine 3D rotateY flip on click -- matching
// the KakaFlix reference exactly.

export function CardFlip({
  title = "Obsession",
  year = 2026,
  rating = 7.9,
  description = "A gripping psychological thriller that blurs the lines between desire and danger.",
  accentColor = "var(--finna-primary)",
  image,
}: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      className="cursor-pointer"
      style={{ width: 160, height: 240, perspective: "1000px" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 12,
            overflow: "hidden",
            background: image ? `url(${image}) center/cover` : "linear-gradient(160deg, var(--finna-surface), var(--finna-canvas))",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Bottom info bar */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "24px 10px 10px",
              background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{title}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{year}</span>
              <span style={{ fontSize: 11, color: "#F59E0B" }}>? {rating}</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 12,
            overflow: "hidden",
            background: "rgba(20,12,28,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{description}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            <button
              onClick={e => e.stopPropagation()}
              style={{
                padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: accentColor, color: "#fff", fontSize: 11, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}
            >
              ? Trailer
            </button>
            <button
              onClick={e => e.stopPropagation()}
              style={{
                padding: "7px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.6)",
                fontSize: 11,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}
            >
              ?? Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
