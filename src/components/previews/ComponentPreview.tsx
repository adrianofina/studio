import type { ComponentSpec } from "../../types"
import { SungJinwooShadow } from "../ui/SungJinwooShadow"
import { MercuryWobbleRing } from "../ui/MercuryWobbleRing"
import { TextGlow } from "../ui/TextGlow"
import { AuroraText } from "../ui/AuroraText"
import { StatusSpine } from "../ui/StatusSpine"
import { SparklineBars } from "../ui/SparklineBars"
import { BreathingElement } from "../ui/BreathingElement"
import { CradleBlade } from "../ui/CradleBlade"
import { GlassCard } from "../ui/GlassCard"
import { CardFlip } from "../ui/CardFlip"
import { TheStack } from "../ui/TheStack"
import { AnimatedList } from "../ui/AnimatedList"
import { MagicBento } from "../ui/MagicBento"
import { COMPONENTS } from "../../data/library"

// New components
import Dock from "../ui/Dock"
import Carousel from "../ui/Carousel"
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

const RING_SIZE = { compact: 36, small: 56, large: 120 }

// Thumbnail functions
function InfiniteMenuThumbnail({ large = false }: { large?: boolean }) {
  const s = large ? 140 : 64
  const count = large ? 10 : 6
  const r = s * 0.4
  return (
    <div style={{ width: s, height: s, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: r*2, height: r*2, borderRadius: "50%", border: "1px solid rgba(131,42,93,0.3)", position: "absolute" }} />
      <div style={{ width: r*1.4, height: r*1.4, borderRadius: "50%", border: "1px dashed rgba(131,42,93,0.2)", position: "absolute" }} />
      {Array.from({ length: count }, (_,i) => {
        const angle = (i / count) * Math.PI * 2
        const x = Math.cos(angle) * r
        const y = Math.sin(angle) * r
        const sz = large ? 14 : 7
        return <div key={i} style={{ position: "absolute", width: sz, height: sz, borderRadius: "50%", background: `rgba(131,42,93,${0.4+Math.abs(Math.cos(angle))*0.5})`, transform: `translate(${x}px,${y}px)`, border: "1px solid rgba(131,42,93,0.4)" }} />
      })}
      <div style={{ width: large ? 16 : 8, height: large ? 16 : 8, borderRadius: "50%", background: "var(--studio-primary)", boxShadow: "0 0 8px var(--studio-primary)" }} />
    </div>
  )
}

function ScrollStackThumbnail({ large = false }: { large?: boolean }) {
  const w = large ? 200 : 80
  const h = large ? 260 : 90
  return (
    <div style={{ position: "relative", width: w, height: h }}>
      {[3,2,1,0].map(i => (
        <div key={i} style={{ position: "absolute", left: i*3, right: i*3, height: large ? 70 : 28, top: i*(large?22:8), borderRadius: large ? 14 : 7, background: `rgba(47,27,56,${0.5+i*0.15})`, border: "1px solid rgba(255,255,255,0.06)", transform: `scale(${1-i*0.04})`, transformOrigin: "top center", backdropFilter: "blur(4px)" }}>
          {large && i === 0 && <div style={{ padding: "10px 14px", fontSize: 12, color: "var(--studio-text-secondary)" }}>Scroll to stack</div>}
        </div>
      ))}
    </div>
  )
}

export function ComponentPreview({ comp, size = "small", values = {} }: Props) {
  const isLarge = size === "large"
  const isCompact = size === "compact"

  // ── FULL SIZE (detail view) ──────────────────────────────────────
  if (isLarge) {
    switch (comp.preview) {
      case "shadow":
        return (
          <SungJinwooShadow progress={(values.progress as number) ?? 72} status={(values.status as never) ?? "active"}>
            <div style={{ width: 180, height: 90, borderRadius: 12, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>wrapped card</span>
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
        return <div style={{ height: 80 }}><StatusSpine status={(values.status as never) ?? "active"} /></div>
      case "stack":
        return <TheStack overlap={(values.overlap as number) ?? 20} />
      case "cardflip":
        return <CardFlip title={(values.title as string) ?? "Item Title"} />
      case "animated-list":
        return <div style={{ width: "100%", maxHeight: 360, overflow: "hidden" }}><AnimatedList items={COMPONENTS.slice(0, 5)} stars={new Set()} onToggleStar={() => {}} onOpen={() => {}} /></div>
      case "magic-bento":
        return <MagicBento comp={COMPONENTS[0]} starred={false} onToggleStar={() => {}} onOpen={() => {}} />
      case "glasscard":
      case "glass":
        return <GlassCard><div style={{ padding: 20, fontSize: 12, color: "var(--studio-text-secondary)" }}>Glass surface content</div></GlassCard>
      case "cradle":
        return <div style={{ width: 280 }}><CradleBlade score={(values.score as number) ?? 520} /></div>
      case "sparkline":
        return <SparklineBars data={[20,45,30,60,40,80,65]} />
      case "breathing":
        return <BreathingElement><div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(131,42,93,0.2)", border: "1px solid var(--studio-primary)" }} /></BreathingElement>
      case "dock": {
        const dockItems = [
          { icon: <Home size={18} />, label: "Home", onClick: () => {} },
          { icon: <Archive size={18} />, label: "Archive", onClick: () => {} },
          { icon: <User size={18} />, label: "Profile", onClick: () => {} },
          { icon: <Settings size={18} />, label: "Settings", onClick: () => {} },
        ]
        return (
          <div className="relative w-full h-24">
            <Dock items={dockItems} magnification={70} panelHeight={68} baseItemSize={50} />
          </div>
        )
      }
      case "carousel":
        return <div className="w-full max-w-md"><Carousel baseWidth={320} autoplay={true} loop={false} /></div>
      case "scroll-stack":
        return <ScrollStackThumbnail large />
      case "infinite-menu":
        return <InfiniteMenuThumbnail large />
      case "staggered-menu": {
        const menuItems = [{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]
        return (
          <div className="relative w-full h-40">
            <StaggeredMenu items={menuItems} position="right" displayItemNumbering={true} displaySocials={true} />
          </div>
        )
      }
      case "stepper":
        return (
          <div className="w-full max-w-md">
            <Stepper initialStep={1} backButtonText="Back" nextButtonText="Next">
              <Step><div className="text-white p-4">Step 1</div></Step>
              <Step><div className="text-white p-4">Step 2</div></Step>
              <Step><div className="text-white p-4">Step 3</div></Step>
            </Stepper>
          </div>
        )
      case "spotlight-card":
        return <SpotlightCard spotlightColor="rgba(176,0,255,0.15)"><div className="text-white p-6">Spotlight Card</div></SpotlightCard>
      case "border-glow":
        return <BorderGlow edgeSensitivity={30} glowIntensity={1.0}><div className="text-white p-6">Border Glow</div></BorderGlow>
      case "glass-surface":
        return <GlassSurface width={320} height={160} borderRadius={24} tearDrop={0.5}><div className="text-white p-4">Glass Surface</div></GlassSurface>
      default:
        return <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>[{comp.type}]</span>
    }
  }

  // ── SMALL / COMPACT (archive grid) ────────────────────────────────
  switch (comp.preview) {
    case "shadow":
      return (
        <SungJinwooShadow progress={72} status="active">
          <div style={{ width: isCompact ? 48 : 70, height: isCompact ? 30 : 44, borderRadius: 8, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>card</span>
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
      return <SparklineBars data={[20,45,30,60,40,80,65]} />
    case "breathing":
      return <BreathingElement><div style={{ width: isCompact ? 24 : 36, height: isCompact ? 24 : 36, borderRadius: 8, background: "rgba(131,42,93,0.2)", border: "1px solid var(--studio-primary)" }} /></BreathingElement>
    case "cradle":
      return <div style={{ width: "80%" }}><CradleBlade score={520} /></div>
    case "glasscard":
    case "glass":
      return <GlassCard><div style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)", padding: 6 }}>Glass</div></GlassCard>
    case "cardflip":
      return (
        <div style={{ position: "relative", width: isCompact ? 40 : 60, height: isCompact ? 56 : 84 }}>
          <div style={{ position: "absolute", top: 4, left: 4, right: -4, bottom: -4, borderRadius: 8, background: "var(--studio-surface)", border: "1px solid rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(160deg, var(--studio-canvas-alt), var(--studio-surface))", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "flex-end", padding: 5 }}>
            <span style={{ fontSize: 7, color: "var(--studio-text-dim)", fontFamily: "monospace" }}>flip</span>
          </div>
        </div>
      )
    case "stack":
      return (
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: isCompact ? 22 : 32, height: isCompact ? 32 : 46, borderRadius: 5, background: `linear-gradient(160deg, hsl(${270+i*20},30%,${18+i*3}%),hsl(${260+i*20},25%,${12+i*2}%))`, border: "1px solid rgba(255,255,255,0.07)", marginLeft: i === 0 ? 0 : -(isCompact ? 8 : 12), position: "relative", zIndex: 4-i }} />
          ))}
        </div>
      )
    case "animated-list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: isCompact ? 56 : 80 }}>
          {[100,75,50].map((w,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: "var(--studio-primary)", opacity: 1-i*0.25, flexShrink: 0 }} />
              <div style={{ height: 4, borderRadius: 2, background: "var(--studio-surface)", width: `${w}%` }} />
            </div>
          ))}
        </div>
      )
    case "magic-bento":
      return (
        <div style={{ width: isCompact ? 56 : 80, height: isCompact ? 40 : 56, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(176,0,255,0.35)", boxShadow: "0 0 12px rgba(176,0,255,0.15), inset 0 0 12px rgba(176,0,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "60%", height: "40%", borderRadius: 4, background: "rgba(176,0,255,0.15)" }} />
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
        <div className="relative w-full h-12">
          <Dock items={dockItems} magnification={isCompact ? 36 : 50} panelHeight={isCompact ? 36 : 48} baseItemSize={isCompact ? 24 : 32} />
        </div>
      )
    }
    case "carousel":
      return <div className="w-full"><Carousel baseWidth={isCompact ? 120 : 180} autoplay={false} loop={false} /></div>
    case "scroll-stack":
      return <ScrollStackThumbnail />
    case "infinite-menu":
      return <InfiniteMenuThumbnail />
    case "staggered-menu": {
      const menuItems = [{ label: "Home", link: "/" }, { label: "Archive", link: "/archive" }]
      return (
        <div className="relative w-full h-16">
          <StaggeredMenu items={menuItems} position="right" displayItemNumbering={false} displaySocials={false} />
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
      return <SpotlightCard spotlightColor="rgba(176,0,255,0.15)"><div className="text-white text-[8px] p-2 text-center">Spotlight</div></SpotlightCard>
    case "border-glow":
      return <BorderGlow edgeSensitivity={30} glowIntensity={0.8}><div className="text-white text-[8px] p-2 text-center">Glow</div></BorderGlow>
    case "glass-surface":
      return <GlassSurface width={isCompact ? 80 : 120} height={isCompact ? 50 : 70} borderRadius={16} tearDrop={0.3}><div className="text-white text-[8px] p-1 text-center">Glass</div></GlassSurface>
    default:
      return <span style={{ fontSize: 9, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>[{comp.type}]</span>
  }
}
