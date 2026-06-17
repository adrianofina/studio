interface Props {
  score: number
  maxScore?: number
}

export function CradleBlade({ score, maxScore = 850 }: Props) {
  const pct = (score / maxScore) * 100
  const borderline = pct > 55 && pct < 65
  return (
    <div className="w-full">
      <div className="flex justify-between text-[9px] mb-1" style={{ color: "var(--finna-text-dim)" }}>
        <span>High risk</span>
        <span>Medium</span>
        <span>Low risk</span>
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, var(--finna-crimson), var(--finna-amber), var(--finna-emerald))" }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[3px] h-3.5 bg-white rounded-sm transition-all duration-400 ${borderline ? "animate-breathing" : ""}`}
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="text-right text-[11px] font-mono mt-1" style={{ color: "var(--finna-text)" }}>
        Score: {score}
      </div>
    </div>
  )
}
