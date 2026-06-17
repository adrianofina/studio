import type { ComponentSpec } from "../types"

// `controls` describes the tunable knobs shown in the Customize panel.
// Each control maps to a real prop on the underlying component. The
// Customize panel reads this array to render sliders/selects/color
// pickers without needing component-specific UI code per component.

export const COMPONENTS: ComponentSpec[] = [
  {
    id: "shadow",
    name: "Sung Jinwoo's Shadow",
    type: "Card shadow wrapper",
    tags: ["motion", "status"],
    starred: true,
    desc: "A colored, blurred shadow that lives beneath any card or element. Invisible at rest. As status becomes active, soft colored light blooms underneath it.",
    usedIn: "CIMS (loan tracking), KakaFlix (movie progress)",
    motion: { Flicker: "random intensity shift every 1.8s", Bloom: "opacity transitions over 0.7s" },
    props: [
      { key: "status", type: "string", desc: "inactive | active | overdue | pending | completed" },
      { key: "intensity", type: "number", desc: "0.1 to 2, default 1" },
    ],
    controls: [
      { key: "status", type: "select", label: "Status", default: "active", options: ["inactive", "active", "overdue", "pending", "completed"] },
      { key: "intensity", type: "number", label: "Intensity", default: 1, min: 0.2, max: 2 },
    ],
    code: '<SungJinwooShadow status="active" intensity={1}>\n  <YourCard />\n</SungJinwooShadow>',
    preview: "shadow",
    featured: true,
  },
  {
    id: "ring",
    name: "Mercury Wobble Ring",
    type: "Circular progress",
    tags: ["motion", "progress", "rings"],
    starred: true,
    desc: "SVG ring with a spring wobble on hover -- 2.5 oscillation cycles with decaying amplitude, like liquid settling.",
    usedIn: "CIMS (loan repayment), Finna (component previews)",
    motion: { Wobble: "480ms, 2.5 cycles, decaying amplitude" },
    props: [
      { key: "progress", type: "number", desc: "0-100" },
      { key: "status", type: "string", desc: "active | completed | pending | overdue" },
      { key: "size", type: "number", desc: "pixel size" },
    ],
    controls: [
      { key: "progress", type: "number", label: "Progress", default: 75, min: 0, max: 100 },
      { key: "status", type: "select", label: "Status", default: "active", options: ["active", "completed", "pending", "overdue"] },
      { key: "size", type: "number", label: "Size (px)", default: 96, min: 40, max: 160 },
    ],
    code: '<MercuryWobbleRing progress={75} status="active" size={96} />',
    preview: "ring",
    featured: true,
  },
  {
    id: "cradle",
    name: "Cradle Blade",
    type: "Horizontal risk gauge",
    tags: ["data", "status"],
    starred: true,
    desc: "Gradient blade red to amber to green. White marker slides to the score position.",
    usedIn: "CIMS (credit health)",
    motion: { Marker: "slides 0.4s cubic-bezier(0.2,0.9,0.4,1.1)" },
    props: [
      { key: "score", type: "number", desc: "0-850" },
      { key: "maxScore", type: "number", desc: "default 850" },
    ],
    controls: [
      { key: "score", type: "number", label: "Score", default: 520, min: 0, max: 850 },
      { key: "maxScore", type: "number", label: "Max score", default: 850, min: 100, max: 1000 },
    ],
    code: "<CradleBlade score={520} maxScore={850} />",
    preview: "cradle",
  },
  {
    id: "lotr",
    name: "Lord of the Rings",
    type: "Portfolio split rings",
    tags: ["data", "rings", "chart"],
    starred: false,
    desc: "Each segment is its own concentric ring at a decreasing radius. Segments under 15% go to reduced opacity.",
    usedIn: "CIMS (portfolio breakdown)",
    motion: { Entry: "stroke animates in over 0.8s" },
    props: [
      { key: "segments", type: "array", desc: "[{label, value, color, pct}]" },
      { key: "size", type: "number", desc: "pixel size" },
    ],
    controls: [
      { key: "size", type: "number", label: "Size (px)", default: 100, min: 60, max: 180 },
    ],
    code: '<LordOfTheRings size={100} segments={data} centerText="KES 1.2M" />',
    preview: "lotr",
  },
  {
    id: "sparkline",
    name: "Sparkline Bars",
    type: "Mini trend chart",
    tags: ["data", "chart"],
    starred: false,
    desc: "Seven thin bars. The last is full accent color, the rest faded to 0.4 opacity.",
    usedIn: "CIMS (dashboard previews)",
    motion: { Reveal: "bars grow upward on mount" },
    props: [{ key: "data", type: "number[]", desc: "array of 7 values" }],
    controls: [
      { key: "color", type: "color", label: "Bar color", default: "var(--finna-primary)" },
    ],
    code: '<SparklineBars data={[20,45,30,60,40,80,65]} color="var(--finna-primary)" />',
    preview: "sparkline",
  },
  {
    id: "breathing",
    name: "Breathing Element",
    type: "Organic pulse wrapper",
    tags: ["motion", "status"],
    starred: false,
    desc: "Wraps any element in a slow scale and opacity loop, every 3 seconds. Non-jarring, hypnotic.",
    usedIn: "CIMS (live indicators), Finna (pending states)",
    motion: { Scale: "1.0 to 1.02 to 1.0", Cycle: "3s default" },
    props: [{ key: "duration", type: "string", desc: "CSS duration, default 3s" }],
    controls: [
      { key: "duration", type: "select", label: "Cycle speed", default: "3s", options: ["1.5s", "2s", "3s", "4s", "6s"] },
    ],
    code: '<BreathingElement duration="3s">{children}</BreathingElement>',
    preview: "breathing",
  },
  {
    id: "spine",
    name: "Status Spine",
    type: "Vertical status bar",
    tags: ["status", "layout"],
    starred: false,
    desc: "Thin vertical bar showing status at a glance. Overdue spines breathe.",
    usedIn: "Finna (diary rows)",
    motion: { Overdue: "breathing animation loop" },
    props: [{ key: "status", type: "string", desc: "active | overdue | completed | pending | inactive" }],
    controls: [
      { key: "status", type: "select", label: "Status", default: "active", options: ["active", "overdue", "completed", "pending", "inactive"] },
    ],
    code: '<StatusSpine status="active" />',
    preview: "spine",
  },
  {
    id: "stack",
    name: "The Stack",
    type: "Overlapped card layout",
    tags: ["layout", "motion"],
    starred: false,
    desc: "Cards overlap with varying widths. Hover causes emergence: lift, scale, others dim.",
    usedIn: "KakaFlix (movie collections)",
    motion: { Emerge: "translateY -8px, scale 1.02, 0.3s" },
    props: [{ key: "items", type: "array", desc: "items to render" }],
    controls: [],
    code: "<TheStack items={movies} CardComponent={MovieCard} />",
    preview: "stack",
    featured: true,
  },
  {
    id: "glasscard",
    name: "Glass Card",
    type: "Glassmorphic surface",
    tags: ["card", "aesthetic"],
    starred: false,
    desc: "Frosted glass effect with a hairline border and ambient light blobs drifting behind it.",
    usedIn: "Finna (premium dashboard sections)",
    motion: { Blobs: "slow oscillation" },
    props: [],
    controls: [],
    code: "<GlassCard>{children}</GlassCard>",
    preview: "glass",
  },

  // =========================================================
  // INTEGRATED COMMUNITY SKILL COMPONENTS APPEND MATRIX
  // =========================================================
  {
    id: "animated-list",
    name: "Animated List Container",
    type: "List Layout",
    tags: ["motion", "layout"],
    starred: false,
    desc: "A scrollable list layout featuring scale interpolation based on intersection view states, gradient masking at container boundaries, and full arrow navigation tracking.",
    usedIn: "Diary Page (Animated Tab Flow)",
    motion: {
      ScaleReveal: "Scale transitions from 0.7 to 1 on viewport entrance thresholds.",
      GradientShift: "Dynamic opacity fading based on top/bottom scroll offset distances."
    },
    controls: [
      { key: "showGradients", type: "boolean", label: "Edge Gradients", default: true },
      { key: "enableArrowNavigation", type: "boolean", label: "Arrow Key Tracker", default: true },
      { key: "displayScrollbar", type: "boolean", label: "Show Scrollbar", default: true }
    ],
    code: `<AnimatedList\n  items={["Item 1", "Item 2", "Item 3"]}\n  showGradients={true}\n  enableArrowNavigation={true}\n  displayScrollbar={true}\n/>`,
    preview: "animated-list"
  },
  {
    id: "text-glow",
    name: "Text Glow Engine",
    type: "Typography Core",
    tags: ["motion", "status"],
    starred: false,
    desc: "A text decoration wrapper that drops high-fidelity localized glow matrices onto alphanumeric targets without introducing layout shifts or baseline breaks.",
    usedIn: "Bento System grids, overview tracking node indicators",
    motion: {
      Flicker: "Dynamic opacity scaling on custom accent parameters.",
      ShadowBloom: "Transition intervals scaling across drop-shadow filters on configuration change."
    },
    controls: [
      { key: "intensity", type: "select", label: "Glow Weight", default: "medium", options: ["low", "medium", "high"] },
      { key: "variant", type: "select", label: "Core Blueprint", default: "default", options: ["default", "sungjinwoo"] }
    ],
    code: `<TextGlow intensity="medium" variant="sungjinwoo">\n  Shadow Monarch Level Max\n</TextGlow>`,
    preview: "text-glow"
  }
]
