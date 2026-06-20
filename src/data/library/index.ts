import type { ComponentSpec } from "../../types"
import { shadowSpec } from "./shadow"
import { ringSpec } from "./ring"
import { auroraTextSpec } from "./aurora-text"
import { stackSpec } from "./stack"
import { cardFlipSpec } from "./card-flip"
import { animatedListSpec } from "./animated-list"
import { bentoSpec } from "./magic-bento"
import { textGlowSpec } from "./textglow"
import { diaryCardSpec } from "./diary-card"
import { glassCardSpec } from "./glass-card"

export const COMPONENTS: ComponentSpec[] = [
  shadowSpec,
  ringSpec,
  auroraTextSpec,
  stackSpec,
  cardFlipSpec,
  animatedListSpec,
  bentoSpec,
  textGlowSpec,
  diaryCardSpec,
  glassCardSpec
];
