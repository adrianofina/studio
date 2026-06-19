import type { ComponentSpec } from "../../types"
export const textGlowSpec: ComponentSpec = {
  id: "textglow",
  name: "Text Glow",
  type: "Glowing Text Treatment",
  tags: ["aesthetic", "motion"],
  starred: false,
  desc: "Layered text-shadow glow around any string. Intensity controls how many light layers stack and how far the blur spreads. Color is fully customizable.",
  usedIn: "Finna (headlines, hero text, component names)",
  motion: {},
  props: [
    { key: "text", type: "string", desc: "the text string to render" },
    { key: "intensity", type: "string", desc: "low | medium | high" },
    { key: "color", type: "string", desc: "glow color -- theme var or hex" },
  ],
  controls: [
    { key: "text", type: "text", label: "Text", default: "Hello World" },
    { key: "intensity", type: "select", label: "Intensity", default: "medium", options: ["low", "medium", "high"] },
    { key: "color", type: "color", label: "Glow color", default: "var(--finna-primary)" },
  ],
  code: "",
  preview: "textglow",
}
