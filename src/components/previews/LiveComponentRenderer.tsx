import type { ComponentSpec } from "../../types"
import { SungJinwooShadow } from "../ui/SungJinwooShadow"
import { MercuryWobbleRing } from "../ui/MercuryWobbleRing"
import { CradleBlade } from "../ui/CradleBlade"
import { LordOfTheRings } from "../ui/LordOfTheRings"
import { SparklineBars } from "../ui/SparklineBars"
import { BreathingElement } from "../ui/BreathingElement"
import { StatusSpine } from "../ui/StatusSpine"
import { GlassCard } from "../ui/GlassCard"

interface Props {
  comp: ComponentSpec
  values: Record<string, unknown>
}

// Same switch as ComponentPreview, but reads live tuned values from
// the Customize panel instead of hardcoded demo data. This is what
// makes the panel actually "live" -- moving a slider re-renders this
// with the new value immediately.

export function LiveComponentRenderer({ comp, values }: Props) {
  switch (comp.preview) {
    case "shadow":
      return (
        <SungJinwooShadow status={(values.status as never) ?? "active"} intensity={(values.intensity as number) ?? 1}>
          <div className="rounded-xl flex items-center justify-center w-28 h-16" style={{ background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>card</span>
          </div>
        </SungJinwooShadow>
      )
    case "ring":
      return <MercuryWobbleRing progress={(values.progress as number) ?? 75} status={(values.status as never) ?? "active"} size={(values.size as number) ?? 96} />
    case "cradle":
      return <div className="w-full max-w-xs"><CradleBlade score={(values.score as number) ?? 520} maxScore={(values.maxScore as number) ?? 850} /></div>
    case "lotr":
      return (
        <LordOfTheRings
          size={(values.size as number) ?? 100}
          segments={[
            { label: "Normal", value: 70, color: "var(--finna-indigo)", pct: 70 },
            { label: "Hazina", value: 30, color: "var(--finna-emerald)", pct: 30 },
          ]}
        />
      )
    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} color={(values.color as string) ?? "var(--finna-primary)"} />
    case "breathing":
      return (
        <BreathingElement duration={(values.duration as string) ?? "3s"}>
          <div className="w-12 h-12 rounded-lg" style={{ background: "rgba(131,42,93,0.2)", border: "1px solid var(--finna-primary)" }} />
        </BreathingElement>
      )
    case "spine":
      return <div className="h-16"><StatusSpine status={(values.status as never) ?? "active"} /></div>
    case "stack":
      return (
        <div className="flex">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-12 h-16 rounded-md border" style={{ marginLeft: i ? -16 : 0, background: "var(--finna-surface)", borderColor: "rgba(255,255,255,0.06)", transform: `rotate(${(i - 1) * 3}deg)` }} />
          ))}
        </div>
      )
    case "glass":
      return <GlassCard><div className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>Glass</div></GlassCard>
    default:
      return <span className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
  }
}
