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

// New imports
import Dock from "../ui/Dock"
import Carousel from "../ui/Carousel"
import { ScrollStack, ScrollStackItem } from "../ui/ScrollStack"
import StaggeredMenu from "../ui/StaggeredMenu"
import Stepper, { Step } from "../ui/Stepper"
import SpotlightCard from "../ui/SpotlightCard"
import BorderGlow from "../ui/BorderGlow"
import GlassSurface from "../ui/GlassSurface"
import { Home, Archive, User, Settings } from "lucide-react"

interface Props {
  comp: ComponentSpec
  size?: "compact" | "small" | "large"
  values?: Record<string, unknown>
}

const RING_SIZE = { compact: 36, small: 56, large: 96 }

export function ComponentPreview({ comp, size = "small", values = {} }: Props) {
  const isLarge = size === "large"
  const isCompact = size === "compact"

  // ── Full-size live render for the detail view ──
  if (isLarge) {
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

      // ── NEW LARGE PREVIEWS ──
      case "dock": {
        const dockItems = [
          { icon: <Home size={18} />, label: "Home", onClick: () => {} },
          { icon: <Archive size={18} />, label: "Archive", onClick: () => {} },
          { icon: <User size={18} />, label: "Profile", onClick: () => {} },
          { icon: <Settings size={18} />, label: "Settings", onClick: () => {} },
        ]
        return (
          <div className="relative w-full h-24">
            <Dock
              items={dockItems}
              magnification={(values.magnification as number) ?? 70}
              panelHeight={(values.panelHeight as number) ?? 68}
              baseItemSize={(values.baseItemSize as number) ?? 50}
            />
          </div>
        )
      }

      case "carousel":
        return (
          <div className="w-full max-w-md">
            <Carousel
              baseWidth={(values.baseWidth as number) ?? 320}
              autoplay={(values.autoplay as boolean) ?? true}
              loop={(values.loop as boolean) ?? false}
            />
          </div>
        )

      case "scroll-stack":
        return (
          <div className="w-full max-w-md h-96">
            <ScrollStack
              itemDistance={(values.itemDistance as number) ?? 80}
              itemScale={(values.itemScale as number) ?? 0.03}
              blurAmount={(values.blurAmount as number) ?? 2}
            >
              <ScrollStackItem><div className="text-white p-4">Card 1</div></ScrollStackItem>
              <ScrollStackItem><div className="text-white p-4">Card 2</div></ScrollStackItem>
              <ScrollStackItem><div className="text-white p-4">Card 3</div></ScrollStackItem>
            </ScrollStack>
          </div>
        )

      case "staggered-menu": {
        const menuItems = [{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]
        const pos = (values.position as string) === "left" ? "left" : "right"
        return (
          <div className="relative w-full h-40">
            <StaggeredMenu
              items={menuItems}
              position={pos}
              displayItemNumbering={(values.displayItemNumbering as boolean) ?? true}
              displaySocials={(values.displaySocials as boolean) ?? true}
            />
          </div>
        )
      }

      case "stepper":
        return (
          <div className="w-full max-w-md">
            <Stepper
              initialStep={(values.initialStep as number) ?? 1}
              backButtonText="Back"
              nextButtonText="Next"
            >
              <Step><div className="text-white p-4">Step 1</div></Step>
              <Step><div className="text-white p-4">Step 2</div></Step>
              <Step><div className="text-white p-4">Step 3</div></Step>
            </Stepper>
          </div>
        )

      case "spotlight-card":
        return (
          <SpotlightCard spotlightColor={(values.spotlightColor as string) ?? "rgba(176,0,255,0.15)"}>
            <div className="text-white p-6">Spotlight Card</div>
          </SpotlightCard>
        )

      case "border-glow":
        return (
          <BorderGlow
            edgeSensitivity={(values.edgeSensitivity as number) ?? 30}
            glowIntensity={(values.glowIntensity as number) ?? 1.0}
            coneSpread={(values.coneSpread as number) ?? 25}
          >
            <div className="text-white p-6">Border Glow</div>
          </BorderGlow>
        )

      case "glass-surface":
        return (
          <GlassSurface
            width={320}
            height={160}
            borderRadius={(values.borderRadius as number) ?? 24}
            tearDrop={(values.tearDrop as number) ?? 0.5}
          >
            <div className="text-white p-4">Glass Surface</div>
          </GlassSurface>
        )

      default:
        return <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
    }
  }

  // ── Small / compact previews for the archive grid ──
  switch (comp.preview) {
    case "shadow":
      return (
        <SungJinwooShadow status="active" intensity={isCompact ? 0.5 : 0.8}>
          <div className="rounded-lg flex items-center justify-center" style={{ width: isCompact ? 48 : 70, height: isCompact ? 30 : 44, background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
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
      return <div style={{ height: isCompact ? 32 : 56 }}><StatusSpine status="active" /></div>

    case "sparkline":
      return <SparklineBars data={[20, 45, 30, 60, 40, 80, 65]} />

    case "breathing":
      return (
        <BreathingElement>
          <div style={{ width: isCompact ? 24 : 36, height: isCompact ? 24 : 36, borderRadius: 8, background: "rgba(131,42,93,0.2)", border: "1px solid var(--finna-primary)" }} />
        </BreathingElement>
      )

    case "cradle":
      return <div style={{ width: "80%" }}><CradleBlade score={520} /></div>

    case "lotr":
      return (
        <LordOfTheRings
          size={isCompact ? 44 : 68}
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

    case "cardflip":
      return (
        <div style={{ position: "relative", width: isCompact ? 40 : 60, height: isCompact ? 56 : 84 }}>
          <div style={{ position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 8, background: "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)" }} />
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 8, background: "var(--finna-primary)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            <span style={{ fontSize: isCompact ? 6 : 9, color: "#fff", fontWeight: 700, fontFamily: "monospace" }}>Flip</span>
          </div>
        </div>
      )

    case "stack":
      return (
        <div style={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} style={{ width: isCompact ? 14 + i * 4 : 20 + i * 6, height: isCompact ? 18 + i * 4 : 28 + i * 6, borderRadius: 4, background: i === 0 ? "var(--finna-primary)" : "var(--finna-surface)", border: "1px solid rgba(255,255,255,0.06)", marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i }} />
          ))}
        </div>
      )

    case "animated-list":
      return (
        <div style={{ width: "100%", height: isCompact ? 40 : 64, overflow: "hidden", display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: isCompact ? 10 : 16, borderRadius: 4, background: i === 1 ? "var(--finna-primary)" : "var(--finna-surface)", opacity: i === 1 ? 1 : 0.4, border: "1px solid rgba(255,255,255,0.06)", width: `${80 - i * 15}%` }} />
          ))}
        </div>
      )

    case "magic-bento":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
          <div style={{ background: "var(--finna-primary)", borderRadius: 4, gridRow: "span 2" }} />
          <div style={{ background: "var(--finna-surface)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)" }} />
          <div style={{ background: "var(--finna-surface)", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      )

    // ── NEW COMPACT PREVIEWS ──
    case "dock": {
      const dockItems = [
        { icon: <Home size={12} />, label: "Home", onClick: () => {} },
        { icon: <Archive size={12} />, label: "Archive", onClick: () => {} },
        { icon: <User size={12} />, label: "Profile", onClick: () => {} },
        { icon: <Settings size={12} />, label: "Settings", onClick: () => {} },
      ]
      return (
        <div className="relative w-full h-12">
          <Dock
            items={dockItems}
            magnification={isCompact ? 36 : 50}
            panelHeight={isCompact ? 36 : 48}
            baseItemSize={isCompact ? 24 : 32}
          />
        </div>
      )
    }

    case "carousel":
      return (
        <div className="w-full">
          <Carousel
            baseWidth={isCompact ? 120 : 180}
            autoplay={false}
            loop={false}
          />
        </div>
      )

    case "scroll-stack":
      return (
        <ScrollStack
          itemDistance={isCompact ? 20 : 40}
          itemScale={0.02}
          blurAmount={1}
        >
          <ScrollStackItem><div className="text-white text-[8px] p-2">1</div></ScrollStackItem>
          <ScrollStackItem><div className="text-white text-[8px] p-2">2</div></ScrollStackItem>
          <ScrollStackItem><div className="text-white text-[8px] p-2">3</div></ScrollStackItem>
        </ScrollStack>
      )

    case "staggered-menu": {
      const menuItems = [{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]
      return (
        <div className="relative w-full h-16">
          <StaggeredMenu
            items={menuItems}
            position="right"
            displayItemNumbering={false}
            displaySocials={false}
          />
        </div>
      )
    }

    case "stepper":
      return (
        <div className="w-full">
          <Stepper initialStep={1} backButtonText="" nextButtonText="">
            <Step><div className="text-white text-[8px] p-1">1</div></Step>
            <Step><div className="text-white text-[8px] p-1">2</div></Step>
            <Step><div className="text-white text-[8px] p-1">3</div></Step>
          </Stepper>
        </div>
      )

    case "spotlight-card":
      return (
        <SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
          <div className="text-white text-[8px] p-2 text-center">Spotlight</div>
        </SpotlightCard>
      )

    case "border-glow":
      return (
        <BorderGlow edgeSensitivity={30} glowIntensity={0.8} coneSpread={25}>
          <div className="text-white text-[8px] p-2 text-center">Glow</div>
        </BorderGlow>
      )

    case "glass-surface":
      return (
        <GlassSurface width={isCompact ? 80 : 120} height={isCompact ? 50 : 70} borderRadius={16} tearDrop={0.3}>
          <div className="text-white text-[8px] p-1 text-center">Glass</div>
        </GlassSurface>
      )

    default:
      return <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--finna-text-dim)" }}>[{comp.type}]</span>
  }
}
