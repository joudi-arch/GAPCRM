import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerf } from './usePerfGuard'
import useInViewport from './useInViewport'

// Lazy so three.js/fiber are split out of the initial bundle.
const SceneCanvas = lazy(() => import('./SceneCanvas'))

// Hosts ONE brand-world 3D scene behind a section's content. Renders the live
// Canvas only when the section is in view AND the machine is capable; otherwise
// the section's 2D mesh world simply shows through (the guaranteed fallback).
// Engine-agnostic: pass any R3F scene as children (a Spline scene could mount
// here too with the same in-view / perf rules).
export default function SceneStage({
  children,
  camera = { position: [0, 0, 6], fov: 40 },
  overlay, // optional custom legibility gradient (CSS string)
  className = '',
}) {
  const { lowPower, ready } = usePerf()
  const [ref, inView] = useInViewport({ rootMargin: '15% 0px', amount: 0.15 })
  const show = ready && !lowPower && inView

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 z-0 ${className}`} aria-hidden>
      <AnimatePresence>
        {show && (
          <motion.div
            key="canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Suspense fallback={null}>
              <SceneCanvas camera={camera}>{children}</SceneCanvas>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* legibility wash — only while live 3D is on screen (lite mode stays pure 2D) */}
      {show && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              overlay ||
              'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)',
          }}
        />
      )}
    </div>
  )
}
