import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

// Isolated so it (and all of three.js/fiber) lives in a lazy chunk — the 2D
// site loads with no 3D weight; this loads only when a scene first comes in view.
export default function SceneCanvas({ children, camera }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={camera || { position: [0, 0, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
