import type { ComponentSpec } from '../../types'

export const dockSpec: ComponentSpec = {
  id: "dock",
  name: "Dock",
  type: "NAVIGATION",
  tags: ["navigation", "motion", "interactive"],
  starred: false,
  desc: "Mac-style dock with magnifying icons. Items grow on hover with spring physics.",
  usedIn: "Studio (navigation)",
  motion: {
    "Hover": "Items scale up with spring easing",
    "Magnification": "Nearest items grow, farther items shrink"
  },
  props: [
    { key: "magnification", type: "number", desc: "Maximum size when hovered" },
    { key: "panelHeight", type: "number", desc: "Height of the dock panel" }
  ],
  controls: [
    { key: "magnification", type: "number", label: "Magnification (px)", default: 70, min: 40, max: 120 },
    { key: "panelHeight", type: "number", label: "Panel height (px)", default: 68, min: 40, max: 100 },
    { key: "baseItemSize", type: "number", label: "Base size (px)", default: 50, min: 30, max: 80 }
  ],
  code: `import Dock from "./components/ui/Dock"
import { Home, Archive, User, Settings } from "lucide-react"

const items = [
  { icon: <Home size={18} />, label: 'Home', onClick: () => {} },
  { icon: <Archive size={18} />, label: 'Archive', onClick: () => {} },
  { icon: <User size={18} />, label: 'Profile', onClick: () => {} },
  { icon: <Settings size={18} />, label: 'Settings', onClick: () => {} },
]

<Dock items={items} magnification={70} panelHeight={68} baseItemSize={50} />`,
  preview: "dock"
}
