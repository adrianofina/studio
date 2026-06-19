import type { ComponentSpec } from "../../types"
export const ringSpec: ComponentSpec = {
  id: "ring",
  name: "Mercury Wobble Ring",
  type: "Circular Progress",
  tags: ["motion", "progress"],
  starred: true,
  desc: "SVG progress ring with a decaying spring wobble on hover.",
  usedIn: "CIMS (loan repayment)",
  motion: { Wobble: "480ms decaying amplitude" },
  props: [{ key: "progress", type: "number", desc: "0-100" }],
  controls: [],
  code: "",
  preview: "ring"
};