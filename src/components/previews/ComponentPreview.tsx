import type { ComponentSpec } from "../../types"
import { SungJinwooShadow } from "../ui/SungJinwooShadow"
import { MercuryWobbleRing } from "../ui/MercuryWobbleRing"
import { TextGlow } from "../ui/TextGlow"
import { AuroraText } from "../ui/AuroraText"
import { StatusSpine } from "../ui/StatusSpine"
import { SparklineBars } from "../ui/SparklineBars"
import { BreathingElement } from "../ui/BreathingElement"
import { CradleBlade } from "../ui/CradleBlade"
import { LordOfTheRings } from "../ui/LordOfTheRings"
import { GlassCard } from "../ui/GlassCard"
import { CardFlip } from "../ui/CardFlip"
import { TheStack } from "../ui/TheStack"
import { AnimatedList } from "../ui/AnimatedList"
import { MagicBento } from "../ui/MagicBento"
import Dock from "../ui/Dock"
import Carousel from "../ui/Carousel"
import StaggeredMenu from "../ui/StaggeredMenu"
import Stepper, { Step } from "../ui/Stepper"
import SpotlightCard from "../ui/SpotlightCard"
import BorderGlow from "../ui/BorderGlow"
import GlassSurface from "../ui/GlassSurface"
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack"
import { COMPONENTS } from "../../data/library"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
  values?: Record<string, unknown>
}

const RING_SIZE = { compact: 36, small: 56, large: 120 }

// ── Thumbnail for InfiniteMenu ──────────────────────────────────────
function InfiniteMenuThumbnail({ large = false }: { large?: boolean }) {
  const s = large ? 160 : 70
  const r = s * 0.38
  const count = large ? 12 : 7
  return (
    <div style={{ width: s, height: s, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: r * 2, height: r * 2, borderRadius: "50%", border: "1px solid rgba(131,42,93,0.25)", position: "absolute" }} />
      <div style={{ width: r * 1.3, height: r * 1.3, borderRadius: "50%", border: "1px dashed rgba(131,42,93,0.15)", position: "absolute" }} />
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const x = Math.cos(angle) * r
        const y = Math.sin(angle) * r
        const dotSize = large ? (4 + Math.abs(Math.cos(angle)) * 8) : (3 + Math.abs(Math.cos(angle)) * 4)
        return (
          <div key={i} style={{
            position: "absolute",
            width: dotSize, height: dotSize,
            borderRadius: "50%",
            background: `rgba(131,42,93,${0.3 + Math.abs(Math.cos(angle)) * 0.6})`,
            transform: `translate(${x}px,${y}px)`,
            border: "1px solid rgba(131,42,93,0.3)",
          }} />
        )
      })}
      <div style={{
        width: large ? 14 : 7,
        height: large ? 14 : 7,
        borderRadius: "50%",
        background: "var(--studio-primary)",
        boxShadow: "0 0 8px var(--studio-primary)",
      }} />
    </div>
  )
}

export function ComponentPreview({ comp, size = "small", values = {} }: Props) {
  const isLarge = size === "large"
  const isCompact = size === "compact"

  // ── FULL SIZE: detail view ───────────────────────────────────────
  if (isLarge) {
    switch (comp.preview) {

      case "shadow":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{
              width: 200, height: 90, borderRadius: 12,
              background: "var(--studio-surface)",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>
                your card here
              </span>
            </div>
            <SungJinwooShadow progress={(values.progress as number) ?? 72} status={(values.status as never) ?? "active"}><div style={{padding: 8, color: "var(--studio-text-dim)", fontSize: 11}}>shadow</div></SungJinwooShadow>
          </div>
        )

      case "ring":
        return (
          <MercuryWobbleRing
            progress={(values.progress as number) ?? 75}
            status={(values.status as never) ?? "active"}
            size={(values.size as number) ?? 120}
          />
        )

      case "textglow":
        return (
          <TextGlow
            text={(values.text as string) ?? "Hello World"}
            intensity={(values.intensity as never) ?? "medium"}
            color={(values.color as string) ?? "var(--studio-primary)"}
          />
        )

      case "aurora-text":
        return (
          <AuroraText className={(values.size as string) ?? "text-4xl"}>
            {(values.text as string) ?? "Aurora Text"}
          </AuroraText>
        )

      case "spine":
        return (
          <div style={{ height: 120, display: "flex", gap: 12, alignItems: "stretch" }}>
            {(["active", "overdue", "pending", "completed", "inactive"] as const).map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1 }}>
                  <StatusSpine status={s} />
                </div>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>{s}</span>
              </div>
            ))}
          </div>
        )

      case "sparkline":
        return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />

      case "breathing":
        return (
          <BreathingElement>
            <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: "rgba(131,42,93,0.2)",
              border: "1px solid var(--studio-primary)",
            }} />
          </BreathingElement>
        )

      case "cradle":
        return <div style={{ width: 280 }}><CradleBlade score={(values.score as number) ?? 520} /></div>

      case "lotr":
        return (
          <LordOfTheRings
            size={120}
            segments={[
              { label: "Normal", value: 70, color: "var(--studio-indigo)", pct: 70 },
              { label: "Hazina", value: 30, color: "var(--studio-emerald)", pct: 30 },
            ]}
            centerText="70/30"
          />
        )

      case "glasscard":
      case "glass":
        return (
          <GlassCard>
            <div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>
              Glass surface content
            </div>
          </GlassCard>
        )

      case "stack":
        return (
          <TheStack
            overlap={(values.overlap as number) ?? 20}
            action1Label={(values.action1Label as string) ?? "Primary"}
            action2Label={(values.action2Label as string) ?? "Secondary"}
            action3Label={(values.action3Label as string) ?? "Remove"}
          />
        )

      case "cardflip":
        return (
          <CardFlip
            title={(values.title as string) ?? "Item Title"}
            subtitle={(values.subtitle as string) ?? "2026"}
            description={(values.description as string) ?? "This is the back face of the card."}
            accentColor={(values.accentColor as string) ?? "var(--studio-primary)"}
            backLabel1={(values.backLabel1 as string) ?? "Primary Action"}
            backLabel2={(values.backLabel2 as string) ?? "Secondary Action"}
            image={(values.image as string) ?? ""}
          />
        )

      case "animated-list":
        return (
          <div style={{ width: "100%", maxHeight: 360, overflow: "hidden" }}>
            <AnimatedList
              items={COMPONENTS.slice(0, 5)}
              stars={new Set()}
              onToggleStar={() => {}}
              onOpen={() => {}}
            />
          </div>
        )

      case "magic-bento":
        return (
          <MagicBento
            comp={COMPONENTS[0]}
            starred={false}
            onToggleStar={() => {}}
            onOpen={() => {}}
          />
        )

      case "dock":
        return (
          <div style={{ position: "relative", height: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%" }}>
            <Dock items={[]} />
          </div>
        )

      case "carousel":
        return (
          <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
            <Carousel baseWidth={320} autoplay loop />
          </div>
        )

      case "staggered-menu": return <div style={{ width: "100%", maxHeight: 400, overflow: "hidden" }}><StaggeredMenu items={[{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]} position="right" /></div>

      case "stepper":
        return (
          <Stepper>
            <Step>Step one content</Step>
            <Step>Step two content</Step>
            <Step>Step three content</Step>
          </Stepper>
        )

      case "spotlight-card":
        return (
          <SpotlightCard>
            <div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>
              Hover to see the spotlight follow your cursor
            </div>
          </SpotlightCard>
        )

      case "border-glow":
        return (
          <BorderGlow>
            <div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>
              Move cursor near the edges to see the glow
            </div>
          </BorderGlow>
        )

      case "glass-surface":
        return (
          <GlassSurface>
            <div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>
              Glassmorphic surface with cursor displacement
            </div>
          </GlassSurface>
        )

      case "scroll-stack":
        return (
          <div style={{ height: 420, overflow: "hidden", width: "100%", position: "relative" }}>
            <ScrollStack
              itemDistance={100}
              itemScale={0.03}
              blurAmount={2}
              stackPosition="15%"
            >
              <ScrollStackItem>
                <div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Card 1</h3>
                  <p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Scroll to stack cards on top of each other</p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Card 2</h3>
                  <p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Cards scale and blur as they stack</p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Card 3</h3>
                  <p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Lenis smooth scroll makes it feel premium</p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Card 4</h3>
                  <p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Keep scrolling to see the stack effect</p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        )

      case "infinite-menu":
        return <InfiniteMenuThumbnail large />

      default:
        return (
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>
            [{comp.type}]
          </span>
        )
    }
  }

  // ── SMALL / COMPACT: archive grid cards ─────────────────────────
  switch (comp.preview) {

    // Live renders -- small enough to fit naturally
    case "shadow":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{
            width: isCompact ? 48 : 70,
            height: isCompact ? 28 : 40,
            borderRadius: 6,
            background: "var(--studio-surface)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 7, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>card</span>
          </div>
          <SungJinwooShadow progress={72} status="active" />
        </div>
      )

    case "ring":
      return <MercuryWobbleRing progress={75} status="active" size={RING_SIZE[size]} />

    case "textglow":
      return <TextGlow text="Hello World" intensity="high" color="var(--studio-primary)" />

    case "aurora-text":
      return <AuroraText className="text-base font-bold">Aurora</AuroraText>

    case "spine":
      return (
        <div style={{ display: "flex", gap: 5, height: isCompact ? 32 : 50 }}>
          {(["active", "overdue", "pending"] as const).map(s => (
            <StatusSpine key={s} status={s} />
          ))}
        </div>
      )

    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />

    case "breathing":
      return (
        <BreathingElement>
          <div style={{
            width: isCompact ? 24 : 36,
            height: isCompact ? 24 : 36,
            borderRadius: 8,
            background: "rgba(131,42,93,0.2)",
            border: "1px solid var(--studio-primary)",
          }} />
        </BreathingElement>
      )

    case "cradle":
      return <div style={{ width: "80%" }}><CradleBlade score={520} /></div>

    case "lotr":
      return (
        <LordOfTheRings
          size={isCompact ? 44 : 68}
          segments={[
            { label: "A", value: 70, color: "var(--studio-indigo)", pct: 70 },
            { label: "B", value: 30, color: "var(--studio-emerald)", pct: 30 },
          ]}
        />
      )

    case "glasscard":
    case "glass":
      return (
        <GlassCard>
          <div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)", padding: 6 }}>
            Glass
          </div>
        </GlassCard>
      )

    case "cardflip":
      return (
        <div style={{ position: "relative", width: isCompact ? 40 : 56, height: isCompact ? 56 : 80 }}>
          <div style={{ position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 8, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(160deg,var(--studio-canvas-alt),var(--studio-surface))", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "flex-end", padding: 5 }}>
            <span style={{ fontSize: 7, color: "var(--studio-text-dim)", fontFamily: "monospace" }}>flip</span>
          </div>
        </div>
      )

    case "stack":
      return (
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: isCompact ? 22 : 30,
              height: isCompact ? 30 : 44,
              borderRadius: 5,
              background: `linear-gradient(160deg,hsl(${270+i*20},30%,${18+i*3}%),hsl(${260+i*20},25%,${12+i*2}%))`,
              border: "1px solid rgba(255,255,255,0.07)",
              marginLeft: i === 0 ? 0 : -(isCompact ? 8 : 12),
              position: "relative",
              zIndex: 4 - i,
            }} />
          ))}
        </div>
      )

    case "animated-list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: isCompact ? 56 : 76 }}>
          {[100, 75, 50].map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: 2, background: "var(--studio-primary)", opacity: 1 - i * 0.25, flexShrink: 0 }} />
              <div style={{ height: 3, borderRadius: 2, background: "var(--studio-surface)", width: `${w}%` }} />
            </div>
          ))}
        </div>
      )

    case "magic-bento":
      return (
        <div style={{
          width: isCompact ? 56 : 76,
          height: isCompact ? 40 : 54,
          borderRadius: 8,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(176,0,255,0.35)",
          boxShadow: "0 0 12px rgba(176,0,255,0.15),inset 0 0 12px rgba(176,0,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "55%", height: "35%", borderRadius: 4, background: "rgba(176,0,255,0.2)" }} />
        </div>
      )

    case "dock":
      return (
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 3, padding: "4px 8px",
          background: "rgba(26,15,26,0.7)", borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
        }}>
          {["⊞", "⊟", "◎", "◈"].map((icon, i) => (
            <div key={i} style={{
              width: isCompact ? 14 : 20,
              height: isCompact ? 14 : 20,
              borderRadius: 5,
              background: "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isCompact ? 7 : 10,
              color: "var(--studio-text-dim)",
            }}>{icon}</div>
          ))}
        </div>
      )

    case "carousel":
      return (
        <div style={{
          width: isCompact ? 56 : 80,
          height: isCompact ? 40 : 56,
          borderRadius: 8,
          background: "var(--studio-canvas-alt)",
          border: "1px solid rgba(255,255,255,0.07)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <div style={{ display: "flex", gap: 3, transform: "perspective(60px) rotateY(-8deg)" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: isCompact ? 14 : 20,
                height: isCompact ? 22 : 32,
                borderRadius: 3,
                background: i === 1 ? "var(--studio-surface)" : `rgba(47,27,56,${0.5 + i * 0.1})`,
                border: `1px solid rgba(255,255,255,${i === 1 ? 0.12 : 0.05})`,
                flexShrink: 0,
              }} />
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 4, display: "flex", gap: 2 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 1 ? "var(--studio-primary)" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
      )

    case "staggered-menu":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 3, width: isCompact ? 56 : 76 }}>
          {[90, 70, 80, 60].map((w, i) => (
            <div key={i} style={{
              height: isCompact ? 5 : 7,
              borderRadius: 3,
              background: i === 0 ? "var(--studio-primary)" : "var(--studio-surface)",
              width: `${w}%`,
              opacity: 1 - i * 0.15,
            }} />
          ))}
        </div>
      )

    case "stepper":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{
                width: isCompact ? 12 : 18,
                height: isCompact ? 12 : 18,
                borderRadius: "50%",
                background: i === 0 ? "var(--studio-primary)" : i === 1 ? "var(--studio-surface)" : "transparent",
                border: `1px solid ${i === 2 ? "rgba(255,255,255,0.1)" : "transparent"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isCompact ? 6 : 8,
                color: "#fff",
              }}>
                {i === 0 ? "✓" : i + 1}
              </div>
              {i < 2 && <div style={{ width: isCompact ? 8 : 12, height: 1, background: i === 0 ? "var(--studio-primary)" : "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </div>
      )

    case "spotlight-card":
      return (
        <div style={{
          width: isCompact ? 56 : 76,
          height: isCompact ? 40 : 54,
          borderRadius: 8,
          background: "radial-gradient(circle at 60% 40%, rgba(131,42,93,0.25), var(--studio-canvas-alt) 65%)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: "40%", height: "30%", borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
        </div>
      )

    case "border-glow":
      return (
        <div style={{
          width: isCompact ? 56 : 76,
          height: isCompact ? 40 : 54,
          borderRadius: 8,
          background: "var(--studio-canvas-alt)",
          border: "1px solid var(--studio-primary)",
          boxShadow: "0 0 8px var(--studio-primary), inset 0 0 8px rgba(131,42,93,0.08)",
        }} />
      )

    case "glass-surface":
      return (
        <div style={{
          width: isCompact ? 56 : 76,
          height: isCompact ? 40 : 54,
          borderRadius: 8,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: "30%", height: "30%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
          }} />
        </div>
      )

    case "scroll-stack":
      return (
        <div style={{ position: "relative", width: "100%", height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "80%", height: "80%" }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                position: "absolute",
                left: i * 8,
                right: i * 8,
                height: 80 - i * 12,
                top: i * 12 + 10,
                borderRadius: 10,
                background: `rgba(47,27,56,${0.6 + i * 0.1})`,
                border: "1px solid rgba(255,255,255,0.06)",
                transform: `scale(${1 - i * 0.04})`,
                transformOrigin: "top center",
                backdropFilter: "blur(2px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: i === 0 ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
              }}>
                {i === 0 && <span style={{ fontSize: 11, color: "var(--studio-text-secondary)" }}>Stacking cards</span>}
                {i > 0 && <div style={{ width: "60%", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />}
              </div>
            ))}
            <div style={{ position: "absolute", bottom: 0, right: 8, display: "flex", gap: 3 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? "var(--studio-primary)" : "rgba(255,255,255,0.15)" }} />)}
            </div>
          </div>
        </div>
      )

    case "infinite-menu":
      return <InfiniteMenuThumbnail />

    default:
      return (
        <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>
          [{comp.type}]
        </span>
      )
  }
}


