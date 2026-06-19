import type { ComponentSpec } from "../../types"
import { shadowSpec } from "./shadow"
import { ringSpec } from "./ring"
import { animatedListSpec } from "./animated-list"
import { magicBentoSpec } from "./magic-bento"
import { auroraTextSpec } from "./aurora-text"
import { stackSpec } from "./stack"
import { cardFlipSpec } from "./card-flip"
import { spineSpec } from "./spine"
import { textGlowSpec } from "./text-glow"
import { glassCardSpec } from "./glass-card"

// Dynamic asset strings using Vite raw macros
import shadowRaw from "../../components/ui/SungJinwooShadow.tsx?raw"
import ringRaw from "../../components/ui/MercuryWobbleRing.tsx?raw"
import animatedListRaw from "../../components/ui/AnimatedList.tsx?raw"
import magicBentoRaw from "../../components/ui/MagicBento.tsx?raw"
import auroraTextRaw from "../../components/ui/AuroraText.tsx?raw"
import spineRaw from "../../components/ui/StatusSpine.tsx?raw"
import textGlowRaw from "../../components/ui/TextGlow.tsx?raw"
import glassCardRaw from "../../components/ui/GlassCard.tsx?raw"

shadowSpec.code = shadowRaw;
ringSpec.code = ringRaw;
animatedListSpec.code = animatedListRaw;
magicBentoSpec.code = magicBentoRaw;
auroraTextSpec.code = auroraTextRaw;
spineSpec.code = spineRaw;
textGlowSpec.code = textGlowRaw;
glassCardSpec.code = glassCardRaw;

export const COMPONENTS: ComponentSpec[] = [
  shadowSpec,
  ringSpec,
  animatedListSpec,
  magicBentoSpec,
  auroraTextSpec,
  stackSpec,
  cardFlipSpec,
  spineSpec,
  textGlowSpec,
  glassCardSpec
];
