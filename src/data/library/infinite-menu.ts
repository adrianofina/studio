import type { ComponentSpec } from '../../types'

export const infiniteMenuSpec: ComponentSpec = {
  id: "infinite-menu",
  name: "Infinite Menu",
  type: "LAYOUT",
  tags: ["layout", "3d", "interactive"],
  starred: false,
  desc: "3D rotating sphere of images with click interaction. Items orbit around a central axis.",
  usedIn: "Studio (experimental)",
  motion: {
    "Rotate": "Sphere rotates on drag",
    "Smooth": "Spring-driven rotation"
  },
  props: [
    { key: "scale", type: "number", desc: "Overall scale of the menu" }
  ],
  controls: [
    { key: "scale", type: "number", label: "Scale", default: 1.0, min: 0.5, max: 1.5 }
  ],
  code: `import InfiniteMenu from "./components/ui/InfiniteMenu"

const items = [
  { image: 'https://picsum.photos/300/300?grayscale', link: '#', title: 'Item 1', description: 'Description' }
]

<InfiniteMenu items={items} scale={1.0} />`,
  preview: "infinite-menu"
}
