import Deck from '../components/Deck'
import { slides as slideDefs, slideLabels } from '../deck.config'
import { getTheme } from '../themes/themes'

import S01Cover from '../slides/S01_Cover'
import S02GapToday from '../slides/S02_GapToday'
import S03Problem from '../slides/S03_Problem'
import S04Gaps from '../slides/S04_Gaps'
import S05Insight from '../slides/S05_Insight'
import S06Zara from '../slides/S06_Zara'
import S07Uniqlo from '../slides/S07_Uniqlo'
import S08Nike from '../slides/S08_Nike'
import S09Harley from '../slides/S09_Harley'
import S10BigIdea from '../slides/S10_BigIdea'
import S11Rollout from '../slides/S11_Rollout'
import S12KPIs from '../slides/S12_KPIs'
import S13WhyNow from '../slides/S13_WhyNow'
import S14CTA from '../slides/S14_CTA'

const registry = {
  cover: S01Cover,
  'gap-today': S02GapToday,
  problem: S03Problem,
  gaps: S04Gaps,
  insight: S05Insight,
  zara: S06Zara,
  uniqlo: S07Uniqlo,
  nike: S08Nike,
  harley: S09Harley,
  'big-idea': S10BigIdea,
  rollout: S11Rollout,
  kpis: S12KPIs,
  'why-now': S13WhyNow,
  cta: S14CTA,
}

export const totalSlides = slideDefs.length

export function renderLegacySlide(def, index, theme = getTheme(def.theme)) {
  const Comp = registry[def.id]
  return <Comp theme={theme} index={index} total={totalSlides} label={slideLabels[def.id]} />
}

export default function LegacyDeckRoute() {
  return (
    <div className="h-screen w-screen">
      <Deck renderSlide={renderLegacySlide} />
    </div>
  )
}
