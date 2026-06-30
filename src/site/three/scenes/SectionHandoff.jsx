import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const STATIC_PROGRESS = Object.freeze({ get: () => 0 })

export default function SectionHandoff({ progress = STATIC_PROGRESS, mode = 'harley' }) {
  const streak = useRef()
  const material = useRef()
  useFrame((_, delta) => {
    if (!streak.current || !material.current) return
    const value = progress.get()
    const amount = mode === 'harley'
      ? THREE.MathUtils.smoothstep(value, 0.84, 1)
      : 1 - THREE.MathUtils.smoothstep(value, 0, 0.2)
    streak.current.scale.x = THREE.MathUtils.damp(streak.current.scale.x, Math.max(0.001, amount), 18, delta)
    material.current.opacity = THREE.MathUtils.damp(material.current.opacity, amount * 0.92, 18, delta)
  })
  return (
    <mesh ref={streak} position={[0, -0.12, 0.7]} scale={[0.001, 1, 1]}>
      <planeGeometry args={[14, 0.035]} />
      <meshBasicMaterial ref={material} color={mode === 'harley' ? '#F47216' : '#5B8DEF'} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}
