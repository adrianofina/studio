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
import { AuroraText } from "../ui/AuroraText"
import { CardFlip } from "../ui/CardFlip"
import { TheStack } from "../ui/TheStack"
import { AnimatedList } from "../ui/AnimatedList"
import { MagicBento } from "../ui/MagicBento"
import { COMPONENTS } from "../../data/library"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
  values?: Record<string, unknown>
}

const RING_SIZE = { compact: 36, small: 56, large: 96 }

// HYBRID APPROACH:
// Small, self-contained components (ring, shadow, text, spine, sparkline,
// breathing, glass, cradle) render live -- they fit naturally in a card.
// Large layout components (stack, cardflip, animated-list, magic-bento)
// render a CRAFTED THUMBNAIL that communicates what they do without
// trying to cram a horizontal scroll list into a 100px card.
// When size="large" (detail view), ALL components render full-size and live.

export function ComponentPreview({ comp, size = "small", values = {} }: Props) {
  // Full-size live render for the detail view
  if (size === "large") {
    switch (comp.preview) {
      case "shadow":
        return (
          <SungJinwooShadow status={(values.status as never) ?? "active"} intensity={(values.intensity as number) ?? 1}>
            <div className="rounded-xl flex items-center justify-center" style={{ width: 180, height: 100, background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>wrapped card</span>
            </div>
          </SungJinwooShadow>
        )
      case "ring":
        return <MercuryWobbleRing progress={(values.progress as number) ?? 75} status={(values.status as never) ?? "active"} size={(values.size as number) ?? 120} />
      case "textglow":
        return <TextGlow text={(values.text as string) ?? "Hello World"} intensity={(values.intensity as never) ?? "medium"} color={(values.color as string) ?? "var(--finna-primary)"} />
      case "aurora-text":
        return <AuroraText className={(values.size as string) ?? "text-4xl"}>{(values.text as string) ?? "Aurora Text"}</AuroraText>
      case "spine":
        return <div style={{ height: 80 }}><StatusSpine status={(values.status as never) ?? "active"} /></div>
      case "stack":
        return <TheStack overlap={(values.overlap as number) ?? 20} />
      case "cardflip":
        return (
          <CardFlip
            title={(values.title as string) ?? "Obsession"}
            year={(values.year as number) ?? 2026}
            rating={(values.rating as number) ?? 7.9}
            accentColor={(values.accentColor as string) ?? "var(--finna-primary)"}
          />
        )
      case "animated-list":
        return (
          <div style={{ width: "100%", maxHeight: 360, overflow: "hidden" }}>
            <AnimatedList items={COMPONENTS.slice(0, 5)} stars={new Set()} onToggleStar={() => {}} onOpen={() => {}} />
          </div>
        )
      case "magic-bento":
        return (
          <MagicBento comp={COMPONENTS[0]} starred={false} onToggleStar={() => {}} onOpen={() => {}} />
        )
      case "glasscard":
      case "glass":
        return (
          <GlassCard>
            <div style={{ padding: 20, fontSize: 12, color: "var(--finna-text-secondary)" }}>Glass surface content</div>
          </GlassCard>
        )
      case "cradle":
        return <div style={{ width: 280 }}><CradleBlade score={(values.score as number) ?? 520} /></div>
      default:
        return <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
    }
  }

  // Small / compact previews for the archive grid
  switch (comp.preview) {
    case "shadow":
      return (
        <SungJinwooShadow status="active" intensity={size === "compact" ? 0.5 : 0.8}>
          <div className="rounded-lg flex items-center justify-center" style={{ width: size === "compact" ? 48 : 70, height: size === "compact" ? 30 : 44, background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>card</span>
          </div>
        </SungJinwooShadow>
      )

    case "ring":
      return <MercuryWobbleRing progress={75} status="active" size={RING_SIZE[size]} />

    case "textglow":
      return <TextGlow text="Hello World" intensity="medium" />

    case "aurora-text":
      return <AuroraText className="text-sm">Aurora</AuroraText>

    case "spine":
      return <div style={{ height: size === "compact" ? 32 : 56 }}><StatusSpine status="active" /></div>

    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />

    case "breathing":
      return (
        <BreathingElement>
          <div style={{ width: size === "compact" ? 24 : 36, height: size === "compact" ? 24 : 36, borderRadius: 8, background: "rgba(131,42,93,0.2)", border: "1px solid var(--finna-primary)" }} />
        </BreathingElement>
      )

    case "cradle":
      return <div style={{ width: "80%" }}><CradleBlade score={520} /></div>

    case "lotr":
      return (
        <LordOfTheRings
          size={size === "compact" ? 44 : 68}
          segments={[
            { label: "A", value: 70, color: "var(--finna-indigo)", pct: 70 },
            { label: "B", value: 30, color: "var(--finna-emerald)", pct: 30 },
          ]}
        />
      )

    case "glasscard":
    case "glass":
      return (
        <GlassCard>
          <div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--finna-text-dim)", padding: 6 }}>Glass</div>
        </GlassCard>
      )

    // Layout components -- crafted thumbnails communicating what they do
    case "cardflip":
      return (
        <div style={{ position: "relative", width: size === "compact" ? 40 : 60, height: size === "compact" ? 56 : 84 }}>
          {/* Back card slightly offset */}
          <div style={{ position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 8, background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }} />
          {/* Front card */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(160deg, var(--finna-canvas-alt), var(--finna-surface))", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "flex-end", padding: 5 }}>
            <div style={{ fontSize: 7, color: "var(--finna-text-dim)", fontFamily: "monospace" }}>flip</div>
          </div>
        </div>
      )

    case "stack":
      return (
        <div style={{ display: "flex", alignItems: "flex-end", marginLeft: -4 }}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: size === "compact" ? 22 : 32,
                height: size === "compact" ? 32 : 46,
                borderRadius: 5,
                background: `linear-gradient(160deg, hsl(${270 + i * 20}, 30%, ${18 + i * 3}%), hsl(${260 + i * 20}, 25%, ${12 + i * 2}%))`,
                border: "1px solid rgba(255,255,255,0.07)",
                marginLeft: i === 0 ? 0 : -(size === "compact" ? 8 : 12),
                zIndex: 4 - i,
                position: "relative",
              }}
            />
          ))}
        </div>
      )

    case "animated-list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: size === "compact" ? 56 : 80 }}>
          {[100, 75, 50].map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: "var(--finna-primary)", opacity: 1 - i * 0.25, flexShrink: 0 }} />
              <div style={{ height: 4, borderRadius: 2, background: "var(--finna-surface)", width: `${w}%` }} />
            </div>
          ))}
        </div>
      )

    case "magic-bento":
      return (
        <div style={{
          width: size === "compact" ? 56 : 80, height: size === "compact" ? 40 : 56,
          borderRadius: 8, background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(176,0,255,0.35)",
          boxShadow: "0 0 12px rgba(176,0,255,0.15), inset 0 0 12px rgba(176,0,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "60%", height: "40%", borderRadius: 4, background: "rgba(176,0,255,0.15)" }} />
        </div>
      )

    default:
      return <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
  }
}
