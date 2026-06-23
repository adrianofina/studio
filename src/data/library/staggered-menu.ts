import type { ComponentSpec } from '../../types'

export const staggeredMenuSpec: ComponentSpec = {
  id: "staggered-menu",
  name: "Staggered Menu",
  type: "NAVIGATION",
  tags: ["navigation", "motion", "gsap"],
  starred: false,
  desc: "Full-screen menu with staggered GSAP animations. Items appear with layered effects.",
  usedIn: "Studio (navigation experiments)",
  motion: {
    "Stagger": "Items animate in sequence",
    "Layer": "Multiple layers with depth"
  },
  props: [
    { key: "position", type: "string", desc: "Menu position: left or right" }
  ],
  controls: [
    { key: "position", type: "select", label: "Position", default: "right", options: ["left", "right"] },
    { key: "displayItemNumbering", type: "boolean", label: "Show numbering", default: true },
    { key: "displaySocials", type: "boolean", label: "Show socials", default: true }
  ],
  code: `import StaggeredMenu from "./components/ui/StaggeredMenu"

const items = [
  { label: 'Home', link: '/' },
  { label: 'Archive', link: '/archive' }
]

<StaggeredMenu items={items} position="right" />`,
  preview: "staggered-menu"
}
