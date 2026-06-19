import type { ComponentSpec } from "../../types"
export const animatedListSpec: ComponentSpec = {
  id: "animated-list",
  name: "Animated List",
  type: "Staggered Container",
  tags: ["motion", "list"],
  starred: true,
  desc: "A custom list container displaying items dynamically with scale and stagger interpolation via motion/react.",
  usedIn: "Diary Board",
  motion: { Scroll: "Dynamic entry scale up" },
  props: [{ key: "items", type: "any[]", desc: "Array of items" }],
  controls: [],
  code: "",
  preview: "animated-list"
};