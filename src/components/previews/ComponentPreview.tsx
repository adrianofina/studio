import type { ComponentSpec } from "../../types"
import { SungJinwooShadow } from "../ui/SungJinwooShadow"
import { MercuryWobbleRing } from "../ui/MercuryWobbleRing"
import { CradleBlade } from "../ui/CradleBlade"
import { LordOfTheRings } from "../ui/LordOfTheRings"
import { SparklineBars } from "../ui/SparklineBars"
import { BreathingElement } from "../ui/BreathingElement"
import { StatusSpine } from "../ui/StatusSpine"
import { GlassCard } from "../ui/GlassCard"
import { TextGlow } from "../ui/TextGlow"
import { AnimatedList } from "../ui/AnimatedList"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
}

const RING_SIZE = { compact: 36, small: 56, large: 96 }

export function ComponentPreview({ comp, size = "small" }: Props) {
  switch (comp.preview) {
    case "shadow":
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
    case "textglow":
      return <TextGlow text="Hello World" intensity="medium" />

    case "animated-list":
      return (
        <div className="w-full max-w-[200px] h-24 overflow-hidden py-1">
          <AnimatedList
            items={[{ id: "item-a", name: "Item A", type: "atom", tags: [], desc: "", code: "", preview: "", usedIn: "" }] as any}
            stars={new Set()}
            onToggleStar={() => {}}
            onOpen={() => {}}
          />
        </div>
      )

    case "magic-bento":
      return (
        <div className="w-full p-2 bg-zinc-950/40 rounded-xl border border-white/5">
          <div className="grid grid-cols-2 gap-1.5 h-16">
            <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[9px] font-mono text-purple-400">Wide</div>
            <div className="rounded-lg bg-zinc-900/60 border border-white/5 flex items-center justify-center text-[9px] font-mono text-zinc-500">Core</div>
          </div>
        </div>
      )

    default:
      return <span className="text-[10px] font-mono" style={{ color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
  }
}