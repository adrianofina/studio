import type { ComponentSpec } from "../../types"
export const infiniteMenuSpec: ComponentSpec = {
  id: "infinite-menu",
  name: "Infinite Menu",
  type: "WebGL Sphere Navigation",
  tags: ["motion", "aesthetic", "layout"],
  starred: false,
  desc: "A 3D WebGL sphere populated with images from any source. Drag to rotate. Items snap to the front face. Click the action button to navigate to links. Built with gl-matrix and WebGL 2.",
  usedIn: "Finna (archive showcase)",
  motion: { Rotation: "arcball drag with spring physics", Snap: "nearest vertex auto-snaps to front" },
  props: [
    { key: "items", type: "array", desc: "[{image, link, title, description}]" },
    { key: "scale", type: "number", desc: "camera zoom, default 1.0" },
  ],
  controls: [
    { key: "scale", type: "number", label: "Camera zoom", default: 1, min: 0.5, max: 2 },
  ],
  code: "",
  preview: "infinite-menu",
}
