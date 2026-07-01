import { useState, lazy, Suspense } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function SplineStage({ scene, className = '', style }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`} style={style} aria-hidden>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            onLoad={() => setLoaded(true)}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        </Suspense>
      </div>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)',
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  )
}
