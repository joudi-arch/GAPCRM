import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

useGLTF.preload('/3d/models/soldier.glb')

// A figure on a platform, swept by a denim scan-beam — the "fit profile" being
// built. Independent clone so it never collides with the Zara walker.
function Figure() {
  const group = useRef()
  const { scene, animations } = useGLTF('/3d/models/soldier.glb')
  const cloned = useMemo(() => skeletonClone(scene), [scene])
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.material = new THREE.MeshStandardMaterial({
          color: '#16335f',
          emissive: '#1e3a8a',
          emissiveIntensity: 0.35,
          roughness: 0.4,
          metalness: 0.2,
        })
      }
    })
  }, [cloned])

  useEffect(() => {
    const idle = names.find((n) => /idle/i.test(n)) || names[0]
    const a = actions[idle]
    if (a) a.reset().fadeIn(0.4).play()
    return () => a?.fadeOut(0.3)
  }, [actions, names])

  return (
    <group ref={group} position={[1.25, -1.7, 0]} rotation={[0, -0.3, 0]} scale={1.35}>
      <primitive object={cloned} />
    </group>
  )
}

function ScanBeam() {
  const ref = useRef()
  const glow = useRef()
  useFrame((state) => {
    const y = -1.5 + ((Math.sin(state.clock.elapsedTime * 0.9) + 1) / 2) * 3 // sweep up/down body
    if (ref.current) ref.current.position.y = y
    if (glow.current) glow.current.position.y = y
  })
  return (
    <group position={[1.25, 0, 0]}>
      <mesh ref={ref}>
        <boxGeometry args={[2.6, 0.03, 2.6]} />
        <meshBasicMaterial color="#7fc8ff" toneMapped={false} />
      </mesh>
      <mesh ref={glow}>
        <boxGeometry args={[2.9, 0.5, 2.9]} />
        <meshBasicMaterial color="#2f6be0" transparent opacity={0.12} toneMapped={false} />
      </mesh>
    </group>
  )
}

export default function BigIdeaScan() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 4]} color="#9cc3ff" intensity={7} distance={18} />
      <pointLight position={[-3, 1, -2]} color="#1e3a8a" intensity={6} distance={16} />
      <Figure />
      <ScanBeam />
      {/* platform ring */}
      <mesh position={[1.25, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.62, 64]} />
        <meshBasicMaterial color="#3b6ce7" toneMapped={false} />
      </mesh>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.3} intensity={1.1} mipmapBlur />
      </EffectComposer>
    </>
  )
}
