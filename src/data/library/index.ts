import type { ComponentSpec } from "../../types"

// Original 5 specs
import { shadowSpec } from "./shadow"
import { ringSpec } from "./ring"
import { textGlowSpec } from "./text-glow"
import { auroraTextSpec } from "./aurora-text"
import { spineSpec } from "./spine"

// Batch 1 (added by previous passes)
import { dockSpec } from "./dock"
import { carouselSpec } from "./carousel"
import { scrollStackSpec } from "./scroll-stack"
import { staggeredMenuSpec } from "./staggered-menu"
import { stepperSpec } from "./stepper"
import { spotlightCardSpec } from "./spotlight-card"
import { borderGlowSpec } from "./border-glow"
import { glassSurfaceSpec } from "./glass-surface"

// New in this pass
import { infiniteMenuSpec } from "./infinite-menu"

// Vite ?raw imports -- each spec gets its code field filled with
// the actual component source, so "Copy code" always shows the
// real implementation, never a manually maintained snippet.
import shadowRaw from "../../components/ui/SungJinwooShadow.tsx?raw"
import ringRaw from "../../components/ui/MercuryWobbleRing.tsx?raw"
import textGlowRaw from "../../components/ui/TextGlow.tsx?raw"
import auroraTextRaw from "../../components/ui/AuroraText.tsx?raw"
import spineRaw from "../../components/ui/StatusSpine.tsx?raw"
import dockRaw from "../../components/ui/Dock.tsx?raw"
import carouselRaw from "../../components/ui/Carousel.tsx?raw"
import scrollStackRaw from "../../components/ui/ScrollStack.tsx?raw"
import staggeredMenuRaw from "../../components/ui/StaggeredMenu.tsx?raw"
import stepperRaw from "../../components/ui/Stepper.tsx?raw"
import spotlightCardRaw from "../../components/ui/SpotlightCard.tsx?raw"
import borderGlowRaw from "../../components/ui/BorderGlow.tsx?raw"
import glassSurfaceRaw from "../../components/ui/GlassSurface.tsx?raw"
import infiniteMenuRaw from "../../components/ui/InfiniteMenu.tsx?raw"

shadowSpec.code = shadowRaw
ringSpec.code = ringRaw
textGlowSpec.code = textGlowRaw
auroraTextSpec.code = auroraTextRaw
spineSpec.code = spineRaw
dockSpec.code = dockRaw
carouselSpec.code = carouselRaw
scrollStackSpec.code = scrollStackRaw
staggeredMenuSpec.code = staggeredMenuRaw
stepperSpec.code = stepperRaw
spotlightCardSpec.code = spotlightCardRaw
borderGlowSpec.code = borderGlowRaw
glassSurfaceSpec.code = glassSurfaceRaw
infiniteMenuSpec.code = infiniteMenuRaw

export const COMPONENTS: ComponentSpec[] = [
  shadowSpec,
  ringSpec,
  textGlowSpec,
  auroraTextSpec,
  spineSpec,
  dockSpec,
  carouselSpec,
  scrollStackSpec,
  staggeredMenuSpec,
  stepperSpec,
  spotlightCardSpec,
  borderGlowSpec,
  glassSurfaceSpec,
  infiniteMenuSpec,
]
