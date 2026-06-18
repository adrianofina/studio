import { useState } from "react"

interface Props {
  progress: number
  size?: number
  strokeWidth?: number
  status?: "active" | "overdue" | "completed" | "pending"
}

const STATUS_COLOR: Record<string, string> = {
  active: "var(--finna-indigo)",
  completed: "var(--finna-emerald)",
  pending: "var(--finna-amber)",
  overdue: "var(--finna-crimson)",
}

// Mercury wobble: on hover, the ring oscillates like liquid settling --
// 2.5 cycles, decaying amplitude, NOT a single clean rotation. Built
// with a CSS animation driven by custom properties so the wobble can
// restart cleanly every time hover begins.

export function MercuryWobbleRing({ progress, size = 64, strokeWidth, status = "active" }: Props) {
  const [wobbleKey, setWobbleKey] = useState(0)
  const sw = strokeWidth ?? Math.max(4, size * 0.08)
  const r = (size - sw) / 2
  const circumference = 2 * Math.PI * r
  const color = STATUS_COLOR[status]
  const breathing = status === "overdue" ? "animate-breathing" : ""

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setWobbleKey(k => k + 1)}
      style={{ width: size, height: size }}
    >
      <svg
        key={wobbleKey}
        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className={`cursor-pointer finna-wobble ${breathing}`}
        style={{ display: "block", transformOrigin: "50% 50%" }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--finna-surface)" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={`${circumference * (progress / 100)} ${circumference}`}
          strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 0px ${color})` }}
        />
        <text x={size / 2} y={size / 2 + size * 0.06} textAnchor="middle" fill="var(--finna-text)" fontSize={size * 0.2} fontFamily="monospace" fontWeight="700">
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  )
}
