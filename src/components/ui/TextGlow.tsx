interface Props {
  text: string
  intensity?: "low" | "medium" | "high"
  color?: string
}

// Genuinely renders glowing text using layered text-shadow -- this
// previously showed the literal placeholder string "[Typography
// Core]" instead of any real rendering. That was a stub, never a
// finished component, and should never have been wired into the
// archive in that state.

const INTENSITY_MAP: Record<string, { blur: number; layers: number }> = {
  low: { blur: 8, layers: 2 },
  medium: { blur: 14, layers: 3 },
  high: { blur: 22, layers: 4 },
}

export function TextGlow({ text, intensity = "medium", color = "var(--finna-primary)" }: Props) {
  const { blur, layers } = INTENSITY_MAP[intensity]
  const shadow = Array.from({ length: layers }, (_, i) => `0 0 ${blur * (i + 1) * 0.6}px ${color}`).join(", ")

  return (
    <span
      className="font-bold tracking-tight"
      style={{ color: "var(--finna-text)", textShadow: shadow }}
    >
      {text}
    </span>
  )
}
