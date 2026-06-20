import type { ComponentSpec } from "../../types"
export const shadowSpec: ComponentSpec = {
  id: "shadow",
  name: "Sung Jinwoo'\''s Shadow",
  type: "Bottom-Edge Underglow",
  tags: ["motion", "status"],
  starred: false,
  desc: "A colored, blurred glow that lives BELOW a card -- like the card is casting light downward onto the surface beneath it. Invisible at 0% or inactive. Color and intensity scale with progress value. Place it as a sibling directly after your card div.",
  usedIn: "CIMS (loan cards), Finna Diary (project rows)",
  motion: { Bloom: "opacity and blur scale with progress over 0.7s", Color: "transitions between crimson/amber/emerald as progress changes" },
  props: [
    { key: "progress", type: "number", desc: "0-100. Controls color, intensity, and width of the glow." },
    { key: "status", type: "string", desc: "active | overdue | pending | completed | inactive" },
  ],
  controls: [
    { key: "progress", type: "number", label: "Progress", default: 72, min: 0, max: 100 },
    { key: "status", type: "select", label: "Status", default: "active", options: ["active", "overdue", "pending", "completed", "inactive"] },
  ],
  code: "",
  preview: "shadow",
}
