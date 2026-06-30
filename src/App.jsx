import { Suspense, lazy, useEffect } from 'react'

const SiteScroll = lazy(() => import('./site/SiteScroll'))
const DemoHero = lazy(() => import('./site/DemoHero'))
const LegacyDeckRoute = lazy(() => import('./routes/LegacyDeckRoute'))
const PrintRoute = lazy(() => import('./routes/PrintRoute'))

export function getPresentationRoute(search = '') {
  const params = new URLSearchParams(search)
  if (params.has('demo')) return 'demo'
  if (params.has('print')) return 'print'
  if (params.has('deck')) return 'deck'
  return 'site'
}

function RouteFallback() {
  return <div className="min-h-screen bg-[#05070D]" aria-label="Loading presentation" />
}

export default function App() {
  const search = typeof window !== 'undefined' ? window.location.search : ''
  const route = getPresentationRoute(search)

  // The legacy deck view locks body scroll; the scroll site manages its own.
  useEffect(() => {
    if (route === 'deck') {
      document.body.style.overflow = 'hidden'
      document.body.style.background = '#2b2722'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [route])

  let content
  if (route === 'demo') content = <DemoHero />
  else if (route === 'print') content = <PrintRoute />
  else if (route === 'deck') content = <LegacyDeckRoute />
  else content = <SiteScroll />

  return <Suspense fallback={<RouteFallback />}>{content}</Suspense>
}
