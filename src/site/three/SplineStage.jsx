import { useState, lazy, Suspense, useEffect } from 'react'
import useInViewport from './useInViewport'
import { useSceneRuntime } from './SceneRuntime'

const Spline = lazy(() => import('@splinetool/react-spline'))

// Hosts a Spline scene behind a section. The Spline runtime renders its own
// WebGL canvas, so it is only mounted while the section is near the viewport,
// and it registers its visibility with the scene runtime — that way it takes
// part in the single-active-scene arbitration and never coexists with a
// neighbouring R3F canvas (which keeps the whole stage at one live canvas).
export default function SplineStage({ scene, sceneId, className = '', style, innerStyle }) {
  const [loaded, setLoaded] = useState(false)
  const { ref, ratio } = useInViewport({ rootMargin: '0px', amount: 0.15 })
  const { registerVisibility } = useSceneRuntime()

  // Mount only once the section is meaningfully on screen — merely touching a
  // viewport edge (the neighbouring slide) must not spin up a second canvas.
  const inView = ratio >= 0.2

  useEffect(() => {
    if (!sceneId) return undefined
    registerVisibility(sceneId, ratio)
    return () => registerVisibility(sceneId, 0)
  }, [sceneId, ratio, registerVisibility])

  return (
    <div ref={ref} className={`absolute inset-0 z-0 overflow-hidden ${className}`} style={style} aria-hidden>
      {inView && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0, ...innerStyle }}
        >
          <Suspense fallback={null}>
            <Spline
              scene={scene}
              onLoad={() => setLoaded(true)}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </Suspense>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)',
          opacity: inView && loaded ? 1 : 0,
        }}
      />
    </div>
  )
}
