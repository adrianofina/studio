import type { ComponentSpec } from "../../types"
export const auroraTextSpec: ComponentSpec = {
  id: "aurora-text",
  name: "Aurora Text",
  type: "Animated Gradient Text",
  tags: ["aesthetic", "motion"],
  starred: false,
  desc: "Animated gradient sweep across text. The gradient cycles through theme colors continuously. Works on any text size.",
  usedIn: "Finna (FINNA wordmark in header)",
  motion: { Sweep: "300% background-position cycle, 6s linear infinite" },
  props: [
    { key: "children", type: "string", desc: "text content" },
    { key: "className", type: "string", desc: "additional CSS classes for sizing" },
  ],
  controls: [
    { key: "text", type: "text", label: "Text", default: "Aurora Text" },
    { key: "size", type: "select", label: "Size", default: "text-2xl", options: ["text-sm", "text-lg", "text-2xl", "text-4xl", "text-6xl"] },
  ],
  code: "",
  preview: "aurora-text",
}
