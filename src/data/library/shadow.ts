import type { ComponentSpec } from "../../types"
export const shadowSpec: ComponentSpec = {
  id: "shadow",
  name: "Sung Jinwoo's Shadow",
  type: "Card Shadow Wrapper",
  tags: ["motion", "status"],
  starred: true,
  desc: "A colored, blurred shadow that lives beneath elements. As status becomes active, soft colored light blooms underneath it.",
  usedIn: "CIMS (loan tracking)",
  motion: { Bloom: "opacity transitions over 0.7s" },
  props: [{ key: "status", type: "string", desc: "inactive | active | overdue" }],
  controls: [],
  code: "",
  preview: "shadow"
};