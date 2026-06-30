import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// Speed streaks rushing past — conveys a night ride at speed.
function Streaks({ count = 26 }) {
  const ref = useRef()
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 14,
        y: (Math.random() - 0.5) * 6,
        z: -Math.random() * 30,
        len: 2 + Math.random() * 4,
        speed: 8 + Math.random() * 10,
      })),
    [count]
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame((_, dt) => {
    if (!ref.current) return
    data.forEach((d, i) => {
      d.z += d.speed * dt
      if (d.z > 6) {
        d.z = -30
        d.x = (Math.random() - 0.5) * 14
        d.y = (Math.random() - 0.5) * 6
      }
      dummy.position.set(d.x, d.y, d.z)
      dummy.scale.set(0.03, 0.03, d.len)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <boxGeometry />
      <meshBasicMaterial color="#ffb066" toneMapped={false} />
    </instancedMesh>
  )
}

// The bike's light signature, charging in from the right on a loop.
function Headlight() {
  const group = useRef()
  useFrame((state) => {
    if (!group.current) return
    const t = (state.clock.elapsedTime % 6) / 6 // 0..1 loop
    const x = THREE.MathUtils.lerp(7, -0.6, Math.min(t * 1.4, 1)) // ride in, then hold
    group.current.position.x = x
    group.current.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 6) * 0.04 // engine shudder
  })
  return (
    <group ref={group} position={[7, -0.3, 0]}>
      {/* main headlight */}
      <mesh>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial color="#fff0d0" toneMapped={false} />
      </mesh>
      <pointLight color="#ffb066" intensity={26} distance={20} />
      {/* low engine glows imply the bike body */}
      <mesh position={[0.15, -0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#F47216" toneMapped={false} />
      </mesh>
      <mesh position={[-0.3, -0.55, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#F47216" toneMapped={false} />
      </mesh>
      {/* dark body silhouette */}
      <mesh position={[-0.1, -0.55, 0]}>
        <boxGeometry args={[1.6, 0.5, 0.6]} />
        <meshStandardMaterial color="#120c08" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function HarleyRide() {
  return (
    <>
      <fog attach="fog" args={['#0b0a09', 5, 22]} />
      <ambientLight intensity={0.18} />
      <Streaks />
      <Headlight />
      {/* ground hint with orange spill */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b0a09" roughness={0.7} metalness={0.2} />
      </mesh>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} intensity={1.3} mipmapBlur />
      </EffectComposer>
    </>
  )
}
