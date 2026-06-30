import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { assetUrl } from '../assetUrl'
import { getBigIdeaState } from './bigIdeaTimeline'

export const BIG_IDEA_MODEL_URL = assetUrl('3d/models/soldier.glb')
const STATIC_PROGRESS = Object.freeze({ get: () => 0 })

useGLTF.preload(BIG_IDEA_MODEL_URL)

function FitFigure({ progress }) {
  const group = useRef()
  const { scene, animations } = useGLTF(BIG_IDEA_MODEL_URL)
  const cloned = useMemo(() => skeletonClone(scene), [scene])
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0B1F42',
    emissive: '#163C88',
    emissiveIntensity: 0.18,
    roughness: 0.56,
    metalness: 0.08,
  }), [])
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    cloned.traverse((object) => {
      if (!object.isMesh) return
      object.material = bodyMaterial
      object.castShadow = true
      object.receiveShadow = true
    })
    return () => bodyMaterial.dispose()
  }, [cloned, bodyMaterial])

  useEffect(() => {
    const idleName = names.find((name) => /idle/i.test(name)) || names[0]
    const action = actions[idleName]
    action?.reset().fadeIn(0.35).play()
    return () => action?.stop()
  }, [actions, names])

  useFrame((_, delta) => {
    if (!group.current) return
    const state = getBigIdeaState(progress.get())
    bodyMaterial.emissiveIntensity = THREE.MathUtils.damp(
      bodyMaterial.emissiveIntensity,
      THREE.MathUtils.lerp(0.18, 0.56, state.profile),
      10,
      delta,
    )
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      THREE.MathUtils.lerp(-0.42, -0.12, state.outcome),
      8,
      delta,
    )
  })

  return (
    <group ref={group} position={[1.35, -1.72, 0]} rotation={[0, -0.42, 0]} scale={1.34}>
      <primitive object={cloned} />
    </group>
  )
}

function Scanner({ progress }) {
  const beam = useRef()
  const glow = useRef()
  const rings = useRef()
  const beamMaterial = useRef()
  const glowMaterial = useRef()
  const ringMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#73B8FF',
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  }), [])

  useEffect(() => () => ringMaterial.dispose(), [ringMaterial])

  useFrame((_, delta) => {
    const state = getBigIdeaState(progress.get())
    const targetY = THREE.MathUtils.lerp(-1.45, 1.55, state.scan)
    beam.current.position.y = THREE.MathUtils.damp(beam.current.position.y, targetY, 14, delta)
    glow.current.position.y = beam.current.position.y

    const scanning = state.phase === 'scan'
    beamMaterial.current.opacity = THREE.MathUtils.damp(beamMaterial.current.opacity, scanning ? 0.92 : 0, 16, delta)
    glowMaterial.current.opacity = THREE.MathUtils.damp(glowMaterial.current.opacity, scanning ? 0.14 : 0, 14, delta)

    const ringOpacity = state.profile * (1 - state.outcome * 0.35)
    ringMaterial.opacity = THREE.MathUtils.damp(ringMaterial.opacity, ringOpacity * 0.7, 10, delta)
    const ringScale = THREE.MathUtils.lerp(0.82, 1, state.profile)
    rings.current.scale.setScalar(THREE.MathUtils.damp(rings.current.scale.x, ringScale, 10, delta))
  })

  return (
    <group position={[1.35, 0, 0]}>
      <mesh ref={beam} position={[0, -1.45, 0]}>
        <boxGeometry args={[2.65, 0.025, 2.65]} />
        <meshBasicMaterial ref={beamMaterial} color="#D7EEFF" transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={glow} position={[0, -1.45, 0]}>
        <boxGeometry args={[2.9, 0.46, 2.9]} />
        <meshBasicMaterial ref={glowMaterial} color="#2F6BE0" transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>

      <group ref={rings} scale={0.82}>
        {[
          { y: 1.05, radius: 0.62 },
          { y: 0.08, radius: 0.54 },
          { y: -0.92, radius: 0.48 },
        ].map(({ y, radius }) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.012, 8, 72]} />
            <primitive object={ringMaterial} attach="material" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Platform() {
  return (
    <group position={[1.35, -1.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[1.38, 1.43, 96]} />
        <meshBasicMaterial color="#4D83F3" transparent opacity={0.82} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.015]}>
        <circleGeometry args={[1.38, 96]} />
        <meshStandardMaterial color="#071329" roughness={0.82} metalness={0.18} />
      </mesh>
    </group>
  )
}

export default function BigIdeaScan({ progress = STATIC_PROGRESS, quality = 'high' }) {
  return (
    <>
      <fog attach="fog" args={['#05070D', 7, 16]} />
      <ambientLight intensity={0.28} />
      <spotLight position={[3.8, 4.5, 4]} angle={0.42} penumbra={0.9} color="#DCEBFF" intensity={5.5} castShadow />
      <pointLight position={[-3, 0.5, -2]} color="#1E3A8A" intensity={7} distance={16} />
      <pointLight position={[2.7, -0.5, 2]} color="#5B8DEF" intensity={4} distance={10} />
      <FitFigure progress={progress} />
      <Scanner progress={progress} />
      <Platform />
      {quality === 'high' && (
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.65} intensity={0.45} mipmapBlur />
        </EffectComposer>
      )}
    </>
  )
}
