import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import useInViewport from './useInViewport'
import { useSceneRuntime } from './SceneRuntime'
import SceneErrorBoundary from './SceneErrorBoundary'
import { SceneFallback } from './SceneFallback'

// Lazy so three.js/fiber are split out of the initial bundle.
const SceneCanvas = lazy(() => import('./SceneCanvas'))

// Hosts ONE brand-world 3D scene behind a section's content. Renders the live
// Canvas only when the section is in view AND the machine is capable; otherwise
// the section's 2D mesh world simply shows through (the guaranteed fallback).
// Pass any R3F scene as children; the runtime owns lifecycle and fallback.
export default function SceneStage({
  sceneId,
  children,
  camera = { position: [0, 0, 6], fov: 40 },
  poster,
  interactive = false,
  overlay, // optional custom legibility gradient (CSS string)
  className = '',
}) {
  const { activeSceneId, registerVisibility, requestDowngrade, getMode } = useSceneRuntime()
  const { ref, ratio } = useInViewport({ rootMargin: '15% 0px', amount: 0.15 })
  const [sceneReady, setSceneReady] = useState(false)
  const show = getMode(sceneId) === 'live' && activeSceneId === sceneId

  useEffect(() => {
    registerVisibility(sceneId, ratio)
  }, [sceneId, ratio, registerVisibility])

  useEffect(() => () => registerVisibility(sceneId, 0), [sceneId, registerVisibility])

  useEffect(() => {
    if (!show) setSceneReady(false)
  }, [show])

  const handleDowngrade = useCallback(
    (reason) => requestDowngrade(sceneId, reason),
    [sceneId, requestDowngrade],
  )

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 z-0 ${className}`} aria-hidden>
      <SceneFallback src={poster} />
      {show && (
        <SceneErrorBoundary onError={() => handleDowngrade('scene-error')}>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ opacity: sceneReady ? 1 : 0 }}
          >
            <Suspense fallback={null}>
              <SceneCanvas
                sceneId={sceneId}
                camera={camera}
                onReady={() => setSceneReady(true)}
                onDowngrade={handleDowngrade}
              >
                {children}
              </SceneCanvas>
            </Suspense>
          </div>
        </SceneErrorBoundary>
      )}

      {/* legibility wash — only while live 3D is on screen (lite mode stays pure 2D) */}
      {show && sceneReady && (
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
