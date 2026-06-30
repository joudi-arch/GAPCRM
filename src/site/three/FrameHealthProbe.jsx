import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const WARMUP_SECONDS = 1
const SAMPLE_SECONDS = 2
const MINIMUM_FPS = 42

export default function FrameHealthProbe({ onLowFps }) {
  const sample = useRef({ elapsed: 0, frames: 0, complete: false })

  useFrame((_, delta) => {
    const current = sample.current
    if (current.complete) return

    current.elapsed += Math.min(delta, 0.25)
    if (current.elapsed <= WARMUP_SECONDS) return

    current.frames += 1
    const sampledFor = current.elapsed - WARMUP_SECONDS
    if (sampledFor < SAMPLE_SECONDS) return

    current.complete = true
    const fps = current.frames / sampledFor
    if (fps < MINIMUM_FPS) onLowFps?.(fps)
  })

  return null
}
