interface Segment {
  label: string
  value: number
  color: string
  pct: number
}

interface Props {
  segments: Segment[]
  size?: number
  centerText?: string
}

// Each segment gets its OWN ring at a progressively smaller radius --
// truly concentric, like tree rings, not multiple arcs sharing one
// radius. Previously every "ring" was drawn at the same radius which
// made it look like a single ring with colored arcs, not a stack of
// rings. This is the actual fix.

export function LordOfTheRings({ segments, size = 120, centerText }: Props) {
  const strokeWidth = Math.max(5, size * 0.06)
  const gap = strokeWidth + 3

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const r = size / 2 - strokeWidth / 2 - i * gap
          if (r <= 0) return null
          const circumference = 2 * Math.PI * r
          const opacity = seg.pct < 15 ? 0.5 : 1
          return (
            <g key={seg.label} className="transition-transform duration-300" style={{ transformOrigin: "center" }}>
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--finna-surface)" strokeWidth={strokeWidth} opacity={0.4} />
              <circle
                cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color} strokeWidth={strokeWidth}
                strokeDasharray={`${circumference * (seg.pct / 100)} ${circumference}`}
                strokeLinecap="round" opacity={opacity}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: "stroke-dasharray 0.8s ease" }}
              />
            </g>
          )
        })}
      </svg>
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-mono font-bold" style={{ color: "var(--finna-text)" }}>{centerText}</span>
        </div>
      )}
    </div>
  )
}
