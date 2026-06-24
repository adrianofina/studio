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
import { Home, Archive, User, Settings } from "lucide-react"
import { COMPONENTS } from "../../data/library"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
  values?: Record<string, unknown>
}

const RING_SIZE = { compact: 36, small: 56, large: 120 }

export function ComponentPreview({ comp, size = "small", values = {} }: Props) {
  const isLarge = size === "large"
  const isCompact = size === "compact"

  // ── FULL SIZE: detail view ───────────────────────────────────────
  if (isLarge) {
    switch (comp.preview) {

      case "shadow":
        return (
          <SungJinwooShadow progress={(values.progress as number) ?? 72} status={(values.status as never) ?? "active"}>
            <div style={{ width: 200, height: 90, borderRadius: 12, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>your card here</span>
            </div>
          </SungJinwooShadow>
        )

      case "ring":
        return <MercuryWobbleRing progress={(values.progress as number) ?? 75} status={(values.status as never) ?? "active"} size={(values.size as number) ?? 120} />

      case "textglow":
        return <TextGlow text={(values.text as string) ?? "Hello World"} intensity={(values.intensity as never) ?? "medium"} color={(values.color as string) ?? "var(--studio-primary)"} />

      case "aurora-text":
        return <AuroraText className={(values.size as string) ?? "text-4xl"}>{(values.text as string) ?? "Aurora Text"}</AuroraText>

      case "spine":
        return (
          <div style={{ height: 120, display: "flex", gap: 12, alignItems: "stretch" }}>
            {(["active", "overdue", "pending", "completed", "inactive"] as const).map(s => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ flex: 1 }}><StatusSpine status={s} /></div>
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
            <div style={{ width: 80, height: 80, borderRadius: 16, background: "rgba(131,42,93,0.2)", border: "1px solid var(--studio-primary)" }} />
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
        return <GlassCard><div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>Glass surface content</div></GlassCard>

      case "stack":
        return <TheStack overlap={(values.overlap as number) ?? 20} />

      case "cardflip":
        return <CardFlip title={(values.title as string) ?? "Item Title"} subtitle={(values.subtitle as string) ?? "2026"} description={(values.description as string) ?? "Back face"} accentColor={(values.accentColor as string) ?? "var(--studio-primary)"} />

      case "animated-list":
        return <div style={{ width: "100%", maxHeight: 360, overflow: "hidden" }}><AnimatedList items={COMPONENTS.slice(0, 5)} stars={new Set()} onToggleStar={() => {}} onOpen={() => {}} /></div>

      case "magic-bento":
        return <MagicBento comp={COMPONENTS[0]} starred={false} onToggleStar={() => {}} onOpen={() => {}} />

      case "dock": {
        const dockItems = [
          { icon: <Home size={18} />, label: "Home", onClick: () => {} },
          { icon: <Archive size={18} />, label: "Archive", onClick: () => {} },
          { icon: <User size={18} />, label: "Profile", onClick: () => {} },
          { icon: <Settings size={18} />, label: "Settings", onClick: () => {} },
        ]
        return (
          <div style={{ position: "relative", height: 120, display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", padding: "0 20px" }}>
            <Dock items={dockItems} magnification={70} panelHeight={68} baseItemSize={50} />
          </div>
        )
      }

      case "carousel":
        return <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}><Carousel baseWidth={320} autoplay loop /></div>

      case "staggered-menu": {
        const menuItems = [
          { label: "Home", link: "/" },
          { label: "Archive", link: "/archive" },
          { label: "Diary", link: "/diary" },
          { label: "Settings", link: "/settings" }
        ]
        return (
          <div style={{ width: "100%", height: 350, position: "relative", overflow: "hidden", background: "var(--studio-canvas)" }}>
            <StaggeredMenu
              items={menuItems}
              position="right"
              displayItemNumbering={true}
              displaySocials={true}
              socialItems={[
                { label: "Twitter", link: "#" },
                { label: "GitHub", link: "#" },
                { label: "LinkedIn", link: "#" }
              ]}
              menuButtonColor="#fff"
              accentColor="var(--studio-primary)"
            />
          </div>
        )
      }

      case "stepper":
        return (
          <Stepper initialStep={1} backButtonText="Back" nextButtonText="Next">
            <Step><div className="text-white p-4">Step 1</div></Step>
            <Step><div className="text-white p-4">Step 2</div></Step>
            <Step><div className="text-white p-4">Step 3</div></Step>
          </Stepper>
        )

      case "spotlight-card":
        return (
          <SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
            <div style={{ padding: 30, fontSize: 14, color: "var(--studio-text-secondary)", textAlign: "center" }}>
              Hover to see the spotlight follow your cursor
            </div>
          </SpotlightCard>
        )

      case "border-glow":
        return (
          <BorderGlow edgeSensitivity={30} glowIntensity={1.0} coneSpread={25}>
            <div style={{ padding: 30, fontSize: 14, color: "var(--studio-text-secondary)", textAlign: "center" }}>
              Move cursor near the edges to see the glow
            </div>
          </BorderGlow>
        )

      case "glass-surface":
        return (
          <GlassSurface width={320} height={160} borderRadius={24} tearDrop={0.5}>
            <div style={{ padding: 24, fontSize: 13, color: "var(--studio-text-secondary)" }}>Glass surface with cursor displacement</div>
          </GlassSurface>
        )

      case "scroll-stack":
        return (
          <div style={{ height: 420, overflow: "hidden", width: "100%", position: "relative" }}>
            <ScrollStack itemDistance={100} itemScale={0.03} blurAmount={2} stackPosition="15%">
              <ScrollStackItem><div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}><h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Card 1</h3><p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Scroll to stack</p></div></ScrollStackItem>
              <ScrollStackItem><div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}><h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Card 2</h3><p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Cards scale and blur</p></div></ScrollStackItem>
              <ScrollStackItem><div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}><h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Card 3</h3><p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Lenis smooth scroll</p></div></ScrollStackItem>
              <ScrollStackItem><div style={{ padding: "24px 28px", background: "#1A151A", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", minHeight: 120 }}><h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Card 4</h3><p style={{ color: "var(--studio-text-secondary)", fontSize: 13 }}>Stack effect</p></div></ScrollStackItem>
            </ScrollStack>
          </div>
        )

      case "infinite-menu":
        return (
          <div style={{ height: 400, width: "100%", position: "relative", background: "var(--studio-canvas-alt)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌐</div>
              <div style={{ fontSize: 14, color: "var(--studio-text-secondary)" }}>Infinite Menu</div>
              <div style={{ fontSize: 11, color: "var(--studio-text-dim)" }}>3D WebGL Sphere — Click to view</div>
            </div>
          </div>
        )

      default:
        return <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>[{comp.type}]</span>
    }
  }

  // ── SMALL / COMPACT: archive grid cards ─────────────────────────
  switch (comp.preview) {

    case "shadow":
      return (
        <SungJinwooShadow progress={72} status="active">
          <div style={{ width: isCompact ? 48 : 70, height: isCompact ? 28 : 40, borderRadius: 6, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>card</span>
          </div>
        </SungJinwooShadow>
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
          {(["active", "overdue", "pending"] as const).map(s => <StatusSpine key={s} status={s} />)}
        </div>
      )

    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />

    case "breathing":
      return (
        <BreathingElement>
          <div style={{ width: isCompact ? 24 : 36, height: isCompact ? 24 : 36, borderRadius: 8, background: "rgba(131,42,93,0.2)", border: "1px solid var(--studio-primary)" }} />
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
      return <GlassCard><div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)", padding: 6 }}>Glass</div></GlassCard>

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
            <div key={i} style={{ width: isCompact ? 22 : 30, height: isCompact ? 30 : 44, borderRadius: 5, background: `linear-gradient(160deg,hsl(${270+i*20},30%,${18+i*3}%),hsl(${260+i*20},25%,${12+i*2}%))`, border: "1px solid rgba(255,255,255,0.07)", marginLeft: i === 0 ? 0 : -(isCompact ? 8 : 12), position: "relative", zIndex: 4 - i }} />
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
        <div style={{ width: isCompact ? 56 : 76, height: isCompact ? 40 : 54, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(176,0,255,0.35)", boxShadow: "0 0 12px rgba(176,0,255,0.15),inset 0 0 12px rgba(176,0,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "55%", height: "35%", borderRadius: 4, background: "rgba(176,0,255,0.2)" }} />
        </div>
      )

    case "dock": {
      const dockItems = [
        { icon: <Home size={12} />, label: "Home", onClick: () => {} },
        { icon: <Archive size={12} />, label: "Archive", onClick: () => {} },
        { icon: <User size={12} />, label: "Profile", onClick: () => {} },
        { icon: <Settings size={12} />, label: "Settings", onClick: () => {} },
      ]
      return (
        <div style={{ position: "relative", height: isCompact ? 50 : 70, display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%" }}>
          <Dock items={dockItems} magnification={isCompact ? 40 : 55} panelHeight={isCompact ? 40 : 55} baseItemSize={isCompact ? 28 : 38} />
        </div>
      )
    }

    case "carousel":
      return <div style={{ width: "100%" }}><Carousel baseWidth={isCompact ? 120 : 180} autoplay={false} loop={false} /></div>

    case "staggered-menu": {
      const menuItems = [{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]
      return (
        <div style={{ width: "100%", height: isCompact ? 100 : 140, position: "relative", overflow: "hidden" }}>
          <StaggeredMenu items={menuItems} position="right" displayItemNumbering={false} displaySocials={false} menuButtonColor="#fff" />
        </div>
      )
    }

    case "stepper":
      return (
        <Stepper initialStep={1} backButtonText="" nextButtonText="">
          <Step><div className="text-white text-[8px] p-1">1</div></Step>
          <Step><div className="text-white text-[8px] p-1">2</div></Step>
          <Step><div className="text-white text-[8px] p-1">3</div></Step>
        </Stepper>
      )

    case "spotlight-card":
      return (
        <SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
          <div style={{ padding: isCompact ? 12 : 18, fontSize: isCompact ? 8 : 10, color: "var(--studio-text-secondary)", textAlign: "center" }}>Spotlight</div>
        </SpotlightCard>
      )

    case "border-glow":
      return (
        <BorderGlow edgeSensitivity={30} glowIntensity={0.8}>
          <div style={{ padding: isCompact ? 12 : 18, fontSize: isCompact ? 8 : 10, color: "var(--studio-text-secondary)", textAlign: "center" }}>Glow</div>
        </BorderGlow>
      )

    case "glass-surface":
      return (
        <GlassSurface width={isCompact ? 80 : 120} height={isCompact ? 50 : 70} borderRadius={16} tearDrop={0.3}>
          <div style={{ fontSize: isCompact ? 8 : 10, color: "var(--studio-text-secondary)" }}>Glass</div>
        </GlassSurface>
      )

    case "scroll-stack":
      return (
        <div style={{ height: 160, overflow: "hidden", width: "100%" }}>
          <ScrollStack itemDistance={60} itemScale={0.02} blurAmount={1} stackPosition="10%">
            <ScrollStackItem><div style={{ padding: "12px 16px", background: "#1A151A", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}><span style={{ color: "#fff", fontSize: 12 }}>Card 1</span></div></ScrollStackItem>
            <ScrollStackItem><div style={{ padding: "12px 16px", background: "#1A151A", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}><span style={{ color: "#fff", fontSize: 12 }}>Card 2</span></div></ScrollStackItem>
            <ScrollStackItem><div style={{ padding: "12px 16px", background: "#1A151A", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}><span style={{ color: "#fff", fontSize: 12 }}>Card 3</span></div></ScrollStackItem>
          </ScrollStack>
        </div>
      )

    case "infinite-menu":
      return (
        <div style={{ height: isCompact ? 80 : 120, width: "100%", background: "var(--studio-canvas-alt)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: isCompact ? 20 : 30, opacity: 0.5 }}>🌐</span>
        </div>
      )

    default:
      return <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>[{comp.type}]</span>
  }
}




