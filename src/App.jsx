import { useEffect } from 'react'
import Deck from './components/Deck'
import SiteScroll from './site/SiteScroll'
import DemoHero from './site/DemoHero'
import { slides as slideDefs, slideLabels } from './deck.config'
import { getTheme } from './themes/themes'

import S01Cover from './slides/S01_Cover'
import S02GapToday from './slides/S02_GapToday'
import S03Problem from './slides/S03_Problem'
import S04Gaps from './slides/S04_Gaps'
import S05Insight from './slides/S05_Insight'
import S06Zara from './slides/S06_Zara'
import S07Uniqlo from './slides/S07_Uniqlo'
import S08Nike from './slides/S08_Nike'
import S09Harley from './slides/S09_Harley'
import S10BigIdea from './slides/S10_BigIdea'
import S11Rollout from './slides/S11_Rollout'
import S12KPIs from './slides/S12_KPIs'
import S13WhyNow from './slides/S13_WhyNow'
import S14CTA from './slides/S14_CTA'

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

const total = slideDefs.length

function renderSlide(def, index, theme) {
  const Comp = registry[def.id]
  return <Comp theme={theme} index={index} total={total} label={slideLabels[def.id]} />
}

// Stacked, static layout for browser "Save as PDF". Each slide is its own
// 1280×720 page; animations run on mount and settle to final state.
function PrintView() {
  return (
    <div className="print-stack bg-white">
      <div className="no-print sticky top-0 z-50 flex items-center justify-between bg-ink px-6 py-3 text-paper">
        <span className="label">Print / PDF view · {total} slides</span>
        <span className="label opacity-70">
          Wait ~2s for charts to settle, then File → Print → Save as PDF (Landscape · margins None) · press P to return
        </span>
      </div>
      {slideDefs.map((def, i) => {
        const theme = getTheme(def.theme)
        return (
          <div key={def.id} className="print-slide mx-auto my-6 shadow-xl" style={{ width: 1280, height: 720 }}>
            {renderSlide(def, i, theme)}
          </div>
        )
      })}
    </div>
  )
}

export default function App() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const isDemo = params.has('demo')
  const isDeck = params.has('deck') // legacy editorial deck
  const isPrint = params.has('print')

  // The legacy deck/print views lock body scroll; the scroll site manages its own.
  useEffect(() => {
    if (isDeck && !isPrint) {
      document.body.style.overflow = 'hidden'
      document.body.style.background = '#2b2722'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDeck, isPrint])

  if (isDemo) return <DemoHero />
  if (isPrint) return <PrintView />
  if (isDeck)
    return (
      <div className="h-screen w-screen">
        <Deck renderSlide={renderSlide} />
      </div>
    )
  return <SiteScroll />
}
