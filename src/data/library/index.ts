import type { ComponentSpec } from '../../types'

export const bentoSpec: ComponentSpec = {
  id: "magic-bento-grid",
  name: "Magic Bento Grid",
  type: "LAYOUT ENGINE",
  desc: "Interactive bento layout structure.",
  usedIn: "Fancy (Workspace Overview)",
  code: "",
  tags: ["layout", "bento"],
  starred: false,
  preview: ""
}

export const textGlowSpec: ComponentSpec = {
  id: "text-glow-accent",
  name: "Text Glow Accent",
  type: "TYPOGRAPHY",
  desc: "Neon typographic treatments.",
  usedIn: "STUDIO Header Branding",
  code: "",
  tags: ["typography", "neon"],
  starred: false,
  preview: ""
}

export const diaryCardSpec: ComponentSpec = {
  id: "diary-card-context",
  name: "Diary Card Context",
  type: "CONTAINER",
  desc: "Private identity archival window context.",
  usedIn: "Fancy (Atelier Module)",
  code: "",
  tags: ["container", "glass"],
  starred: false,
  preview: ""
}

export const glassCardSpec: ComponentSpec = {
  id: "glassmorphic-surface",
  name: "Glassmorphic Surface",
  type: "SURFACE MASK",
  desc: "Quiet luxury archival surface backdrop.",
  usedIn: "Fancy (Wardrobe Archive)",
  code: "",
  tags: ["surface", "blur"],
  starred: false,
  preview: ""
}

// Named export 'COMPONENTS' to align with src/data/library.ts and App.tsx
export const COMPONENTS: ComponentSpec[] = [
  bentoSpec,
  textGlowSpec,
  diaryCardSpec,
  glassCardSpec
]
