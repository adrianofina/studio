import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

// Animated gradient text sweep -- inspired by React Bits' gradient/
// aurora text treatments. Pure CSS, no canvas, cheap to render.
// Good for page titles and the Finna wordmark.

export function AuroraText({ children, className = "" }: Props) {
  return (
    <span
      className={`finna-aurora-text font-bold ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, var(--finna-primary), var(--finna-violet), var(--finna-cyan), var(--finna-primary))",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  )
}
