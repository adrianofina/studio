import type { ComponentSpec } from '../../types'
import { dockSpec } from './dock'
import { carouselSpec } from './carousel'
import { scrollStackSpec } from './scroll-stack'
import { staggeredMenuSpec } from './staggered-menu'
import { stepperSpec } from './stepper'
import { spotlightCardSpec } from './spotlight-card'
import { borderGlowSpec } from './border-glow'
import { glassSurfaceSpec } from './glass-surface'

// TODO: Add these back when fixed
// import { shadowSpec } from './shadow'
// import { ringSpec } from './ring'
// import { cradleSpec } from './cradle'
// import { lotrSpec } from './lotr'
// import { sparklineSpec } from './sparkline'
// import { textGlowSpec } from './text-glow'
// import { bentoSpec } from './bento'

export const COMPONENTS: ComponentSpec[] = [
  dockSpec,
  carouselSpec,
  scrollStackSpec,
  staggeredMenuSpec,
  stepperSpec,
  spotlightCardSpec,
  borderGlowSpec,
  glassSurfaceSpec
]


