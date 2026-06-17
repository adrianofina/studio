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
  size?: "compact" | "small" | "large"
}

const RING_SIZE = { compact: 36, small: 56, large: 96 }

export function ComponentPreview({ comp, size = "small" }: Props) {
  switch (comp.preview) {
    case "shadow":
      // Demonstrates the shadow wrapping a small card -- this is the
      // actual component now: a box that casts colored light beneath
      // it when active, invisible when not.
      return (
        <SungJinwooShadow status="active" intensity={size === "compact" ? 0.6 : 1}>
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: size === "compact" ? 56 : size === "large" ? 120 : 80,
              height: size === "compact" ? 36 : size === "large" ? 72 : 50,
              background: "var(--finna-surface)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="text-[9px] font-mono" style={{ color: "var(--finna-text-dim)" }}>card</span>
          </div>
        </SungJinwooShadow>
      )
    case "ring":
      return <MercuryWobbleRing progress={75} status="active" size={RING_SIZE[size]} />
    case "cradle":
      return <div className="w-4/5"><CradleBlade score={520} /></div>
    case "lotr":
      return (
        <LordOfTheRings
          size={size === "compact" ? 44 : size === "large" ? 100 : 68}
          segments={[
            { label: "Normal", value: 70, color: "var(--finna-indigo)", pct: 70 },
            { label: "Hazina", value: 30, color: "var(--finna-emerald)", pct: 30 },
          ]}
        />
      )
    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />
    case "breathing":
      return (
        <BreathingElement>
          <div
            className="rounded-lg"
            style={{ width: size === "compact" ? 24 : 40, height: size === "compact" ? 24 : 40, background: "rgba(131,42,93,0.2)", border: "1px solid var(--finna-primary)" }}
          />
        </BreathingElement>
      )
    case "spine":
      return <div style={{ height: size === "compact" ? 32 : 56 }}><StatusSpine status="active" /></div>
    case "stack":
      return (
        <div className="flex">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-md border"
              style={{
                width: size === "compact" ? 28 : 44, height: size === "compact" ? 36 : 60,
                marginLeft: i ? (size === "compact" ? -10 : -16) : 0,
                background: "var(--finna-surface)", borderColor: "rgba(255,255,255,0.06)",
                transform: `rotate(${(i - 1) * 3}deg)`,
              }}
            />
          ))}
        </div>
      )
    case "glass":
      return (
        <GlassCard>
          <div className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>Glass</div>
        </GlassCard>
      )
    default:
      return <span className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
  }
}
