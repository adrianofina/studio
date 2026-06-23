import type { ComponentSpec } from '../../types'

export const carouselSpec: ComponentSpec = {
  id: "carousel",
  name: "Carousel",
  type: "LAYOUT",
  tags: ["layout", "3d", "carousel"],
  starred: false,
  desc: "3D rotating carousel with drag and autoplay. Cards have perspective tilt as they move.",
  usedIn: "Studio (component showcase)",
  motion: {
    "Drag": "Swipe to scroll through items",
    "Autoplay": "Auto-advances every 3 seconds",
    "3D": "Cards rotate in perspective"
  },
  props: [
    { key: "baseWidth", type: "number", desc: "Width of the carousel" },
    { key: "autoplay", type: "boolean", desc: "Enable autoplay" }
  ],
  controls: [
    { key: "baseWidth", type: "number", label: "Width (px)", default: 300, min: 200, max: 500 },
    { key: "autoplay", type: "boolean", label: "Autoplay", default: true },
    { key: "loop", type: "boolean", label: "Loop", default: false }
  ],
  code: `import Carousel from "./components/ui/Carousel"

<Carousel baseWidth={320} autoplay={true} autoplayDelay={2500} pauseOnHover={true} />`,
  preview: "carousel"
}
