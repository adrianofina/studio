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
import { MagicBento } from"../ui/MagicBento"
import { AuroraText } from "../ui/AuroraText"  
import { COMPONENTS } from "../../data/library"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
  isFullView?: boolean
}

const RING_SIZE = { compact: 36, small: 56, large: 96 }

export function ComponentPreview({ comp, size = "small", isFullView = false }: Props) {
  if (isFullView) {
    if (comp.id === "animated-list") {
      return (
        <div className="w-full h-[350px] p-4 bg-zinc-950 rounded-2xl border border-white/5">
          <AnimatedList items={COMPONENTS} stars={new Set(["shadow"])} onToggleStar={() => {}} onOpen={() => {}} />
        </div>
      )
    }
    if (comp.id === "magic-bento") {
      return (
        <div className="w-full max-w-xl">
          <MagicBento comp={comp} starred={true} onToggleStar={() => {}} onOpen={() => {}} />
        </div>
      )
    }
  }

  switch (comp.preview) {
    case "shadow":
      return (
        <SungJinwooShadow status="active" intensity={0.8}>
          <div className="rounded-lg bg-[var(--finna-surface)] border border-white/5 w-16 h-10 flex items-center justify-center">
            <span className="text-[8px] font-mono text-zinc-500">card</span>
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
          <div className="w-8 h-8 rounded-md bg-purple-500/20 border border-[var(--finna-primary)]" />
        </BreathingElement>
      )
    case "spine":
      return <div style={{ height: size === "compact" ? 32 : 56 }}><StatusSpine status="active" /></div>
    case "glass":
    case "glasscard":
      return <GlassCard><div className="text-[9px] font-mono text-zinc-500 p-2">Glass</div></GlassCard>
    case "textglow":
      return <TextGlow text="Hello World" intensity="medium" />
    case "animated-list":
      return (
        <div className="w-full px-4 text-center">
          <span className="text-[11px] font-mono text-zinc-400 border border-white/10 px-2 py-1 rounded bg-white/5">
            ? Animated List Container
          </span>
        </div>
      )
    case "magic-bento":
      return (
        <div className="w-full px-4 text-center">
          <span className="text-[11px] font-mono text-purple-400 border border-purple-500/20 px-2 py-1 rounded bg-purple-950/20">
            ? Magic Bento Surface
          </span>
        </div>
      )
    case "aurora-text":
      return (
        <div className="w-full text-center px-4">
          <AuroraText className={isFullView ? "text-3xl tracking-tight" : "text-sm tracking-wide"}>
            {isFullView ? "Finna Identity Engine" : "Aurora Text"}
          </AuroraText>
        </div>
      )
      return <span className="text-[10px] font-mono text-zinc-500">[{comp.type}]</span>
  }
}