import { lazy } from 'react'

// Each scene is its own lazy chunk — loaded only when its section first enters
// view (and only if the perf guard allows live 3D).
export const NikeShoe = lazy(() => import('./NikeShoe'))
export const ZaraWalk = lazy(() => import('./ZaraWalk'))
export const GapDenim = lazy(() => import('./GapDenim'))
export const HarleyRide = lazy(() => import('./HarleyRide'))
export const BigIdeaScan = lazy(() => import('./BigIdeaScan'))
export const SectionHandoff = lazy(() => import('./SectionHandoff'))
