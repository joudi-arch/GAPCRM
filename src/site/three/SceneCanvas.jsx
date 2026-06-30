import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import FrameHealthProbe from './FrameHealthProbe'

function ReadySignal({ onReady }) {
  useEffect(() => onReady?.(), [onReady])
  return null
}

function ContextLossGuard({ onContextLoss }) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    const canvas = gl.domElement
    const handleLoss = (event) => {
      event.preventDefault()
      onContextLoss?.()
    }
    canvas.addEventListener('webglcontextlost', handleLoss)
    return () => canvas.removeEventListener('webglcontextlost', handleLoss)
  }, [gl, onContextLoss])
  return null
}

// Isolated so it (and all of three.js/fiber) lives in a lazy chunk — the 2D
// site loads with no 3D weight; this loads only when a scene first comes in view.
export default function SceneCanvas({ children, camera, onReady, onDowngrade }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={camera || { position: [0, 0, 6], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ContextLossGuard onContextLoss={() => onDowngrade?.('context-loss')} />
      <FrameHealthProbe onLowFps={() => onDowngrade?.('low-fps')} />
      <Suspense fallback={null}>
        {children}
        <ReadySignal onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
