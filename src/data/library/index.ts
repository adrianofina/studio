import type { ComponentSpec } from "../../types"
import { shadowSpec } from "./shadow"
import { ringSpec } from "./ring"
import { auroraTextSpec } from "./aurora-text"
import { stackSpec } from "./stack"
import { cardFlipSpec } from "./card-flip"
import { animatedListSpec } from "./animated-list"
// Add other spec imports here...

// Raw imports for compile output window
import shadowRaw from "../../components/ui/SungJinwooShadow.tsx?raw"
import ringRaw from "../../components/ui/MercuryWobbleRing.tsx?raw"
import auroraTextRaw from "../../components/ui/AuroraText.tsx?raw"
import stackRaw from "../../components/ui/TheStack.tsx?raw"
import cardFlipRaw from "../../components/ui/CardFlip.tsx?raw"
import animatedListRaw from "../../components/ui/AnimatedList.tsx?raw"

// Inject source code into specs directly before exporting
shadowSpec.code = shadowRaw;
ringSpec.code = ringRaw;
auroraTextSpec.code = auroraTextRaw;
stackSpec.code = stackRaw;
cardFlipSpec.code = cardFlipRaw;
animatedListSpec.code = animatedListRaw;

export const COMPONENTS: ComponentSpec[] = [
  shadowSpec,
  ringSpec,
  auroraTextSpec,
  stackSpec,
  cardFlipSpec,
  animatedListSpec
];
