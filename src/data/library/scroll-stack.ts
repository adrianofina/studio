import type { ComponentSpec } from "../../types"
export const scrollStackSpec: ComponentSpec = {
  id: "scroll-stack",
  name: "Scroll Stack",
  type: "Smooth Scroll Card Stack",
  tags: ["motion", "layout"],
  starred: false,
  desc: "Cards stack and scale as you scroll using Lenis smooth scroll. Cards pin, scale, blur, and rotate as they enter the stack zone. Highly configurable physics.",
  usedIn: "Finna (showcase sections)",
  motion: { Lenis: "smooth scroll with spring easing", Stack: "cards pin and scale on scroll" },
  props: [
    { key: "itemDistance", type: "number", desc: "gap between stacked items in px" },
    { key: "baseScale", type: "number", desc: "scale of first item in stack" },
    { key: "blurAmount", type: "number", desc: "blur applied to items further back" },
    { key: "rotationAmount", type: "number", desc: "rotation of each stacked item" },
  ],
  controls: [
    { key: "itemDistance", type: "number", label: "Item gap (px)", default: 100, min: 40, max: 200 },
    { key: "baseScale", type: "number", label: "Base scale", default: 0.85, min: 0.5, max: 1 },
    { key: "blurAmount", type: "number", label: "Blur depth", default: 0, min: 0, max: 4 },
    { key: "rotationAmount", type: "number", label: "Rotation (deg)", default: 0, min: 0, max: 10 },
  ],
  code: "",
  preview: "scroll-stack",
}
