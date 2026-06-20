import type { ComponentSpec } from "../../types"
export const ringSpec: ComponentSpec = {
  id: "ring",
  name: "Mercury Wobble Ring",
  type: "Circular Progress",
  tags: ["motion", "progress", "rings"],
  starred: false,
  desc: "SVG ring with a spring wobble on hover -- 2.5 oscillation cycles with decaying amplitude, like liquid mercury settling. Color changes by status.",
  usedIn: "CIMS (loan repayment), Finna (component previews)",
  motion: { Wobble: "480ms spring, 2.5 cycles, decaying amplitude", Overdue: "breathing 2400ms loop" },
  props: [
    { key: "progress", type: "number", desc: "0 to 100" },
    { key: "status", type: "string", desc: "active | completed | pending | overdue" },
    { key: "size", type: "number", desc: "pixel size of the ring" },
  ],
  controls: [
    { key: "progress", type: "number", label: "Progress", default: 75, min: 0, max: 100 },
    { key: "status", type: "select", label: "Status", default: "active", options: ["active", "completed", "pending", "overdue"] },
    { key: "size", type: "number", label: "Size (px)", default: 96, min: 40, max: 200 },
    { key: "color", type: "color", label: "Override color", default: "" },
  ],
  code: "",
  preview: "ring",
}

