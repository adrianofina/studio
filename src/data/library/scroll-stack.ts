import type { ComponentSpec } from '../../types'

export const scrollStackSpec: ComponentSpec = {
  id: "scroll-stack",
  name: "Scroll Stack",
  type: "LAYOUT",
  tags: ["layout", "scroll", "stack"],
  starred: false,
  desc: "Cards that stack on scroll. Each card scales and blurs as it moves through the stack.",
  usedIn: "Studio (scroll experiences)",
  motion: {
    "Stack": "Cards stack on top of each other",
    "Scale": "Cards scale as they stack",
    "Blur": "Cards blur with depth"
  },
  props: [
    { key: "itemDistance", type: "number", desc: "Space between items" },
    { key: "itemScale", type: "number", desc: "Scale factor for stacked items" }
  ],
  controls: [
    { key: "itemDistance", type: "number", label: "Item distance (px)", default: 80, min: 20, max: 200 },
    { key: "itemScale", type: "number", label: "Scale factor", default: 0.03, min: 0.01, max: 0.1 },
    { key: "blurAmount", type: "number", label: "Blur (px)", default: 2, min: 0, max: 10 }
  ],
  code: `import ScrollStack, { ScrollStackItem } from "./components/ui/ScrollStack"

<ScrollStack itemDistance={80} itemScale={0.03}>
  <ScrollStackItem><div>Card 1</div></ScrollStackItem>
  <ScrollStackItem><div>Card 2</div></ScrollStackItem>
</ScrollStack>`,
  preview: "scroll-stack"
}
