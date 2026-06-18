import type { ReactNode } from "react"
import { useState, useEffect } from "react"

interface Props {
  children: ReactNode
  status?: "active" | "overdue" | "completed" | "pending" | "inactive"
  intensity?: number
  className?: string
}

// This is a SHADOW, not a progress bar. It wraps any element (a card,
// a box, a tile) and casts a colored, blurred glow beneath it. At rest
// (inactive) there is no shadow at all -- the wrapped element looks
// completely flat, like it doesn't exist independently. As status
// becomes active, a soft colored light blooms underneath, like the
// card itself is glowing from below. Random flicker keeps it alive.

export function SungJinwooShadow({ children, status = "inactive", intensity = 1, className = "" }: Props) {
  const [flicker, setFlicker] = useState(1)
  const isActive = status !== "inactive"

  const color =
    status === "overdue" ? "var(--finna-crimson)" :
    status === "completed" ? "var(--finna-emerald)" :
    status === "pending" ? "var(--finna-amber)" :
    status === "active" ? "var(--finna-primary)" : "transparent"

  useEffect(() => {
    if (!isActive) return
    const id = setInterval(() => {
      setFlicker(0.7 + Math.random() * 0.5)
    }, 1800)
    return () => clearInterval(id)
  }, [isActive])

  const blur = 28 * intensity * flicker
  const spread = 6 * intensity * flicker
  const opacity = isActive ? 0.45 * flicker : 0

  return (
    <div className={`relative ${className}`}>
      {/* The shadow itself -- lives BELOW the content, offset downward,
          blurred, colored. Invisible at rest. */}
      <div
        className="absolute left-2 right-2 transition-all duration-700 ease-out pointer-events-none rounded-2xl"
        style={{
          top: "60%",
          bottom: "-14px",
          background: color,
          filter: `blur(${blur}px)`,
          opacity,
          transform: `translateY(${isActive ? spread : 0}px) scaleX(0.9)`,
          zIndex: 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
