import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import MotorcycleModel from './MotorcycleModel'
import SectionHandoff from './SectionHandoff'

const STATIC_PROGRESS = Object.freeze({ get: () => 0.58 })
const RIDE_START_X = 8.5
const RIDE_PARK_X = 1.65
const seeded = (index) => {
  const value = Math.sin(index * 91.713 + 14.17) * 43758.5453
  return value - Math.floor(value)
}

// Soft orange horizon glow — a radial gradient sprite so the night scene keeps
// Harley's warmth without a hard-edged background plane.
function makeGlowTexture() {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(244,114,22,0.9)')
  g.addColorStop(0.4, 'rgba(196,90,22,0.45)')
  g.addColorStop(1, 'rgba(12,9,7,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  return tex
}

function HorizonGlow() {
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])
  return (
    <mesh position={[1.4, -0.25, -8]} scale={[26, 13, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={glow} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function RoadStreaks({ progress, count = 18 }) {
  const instances = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: -7 + seeded(index) * 14,
    y: -1.3 + seeded(index + 31) * 0.5,
    z: -9 + seeded(index + 67) * 14,
    length: 0.6 + seeded(index + 101) * 2.4,
  })), [count])

  useFrame(() => {
    if (!instances.current) return
    const travel = THREE.MathUtils.smoothstep(progress.get(), 0, 0.38) * 8
    data.forEach((streak, index) => {
      dummy.position.set(streak.x, streak.y, THREE.MathUtils.euclideanModulo(streak.z + travel + 10, 20) - 10)
      dummy.scale.set(streak.length, 0.012, 0.012)
      dummy.updateMatrix()
      instances.current.setMatrixAt(index, dummy.matrix)
    })
    instances.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={instances} args={[null, null, count]}>
      <boxGeometry />
      <meshBasicMaterial color="#C75A16" transparent opacity={0.42} toneMapped={false} />
    </instancedMesh>
  )
}

function MotorcycleHero({ progress }) {
  const ride = useRef()
  const bike = useRef()
  const headlight = useRef()
  useFrame((state, delta) => {
    if (!ride.current || !bike.current || !headlight.current) return
    const value = progress.get()
    // narrative progress sets the arrival TARGET; damp glides the bike there over
    // real time, so the ride-in plays whenever the world becomes active.
    const arrival = THREE.MathUtils.smoothstep(value, 0.04, 0.34)
    // Hold the bike off-screen until the canvas has faded in (~0.7s after the
    // scene mounts), then ride it in — so the whole arrival is actually seen.
    const revealed = state.clock.elapsedTime > 0.7
    const targetX = revealed ? THREE.MathUtils.lerp(RIDE_START_X, RIDE_PARK_X, arrival) : RIDE_START_X
    ride.current.position.x = THREE.MathUtils.damp(ride.current.position.x, targetX, 2.6, delta)
    ride.current.rotation.y = THREE.MathUtils.damp(ride.current.rotation.y, THREE.MathUtils.lerp(-0.12, 0.06, revealed ? arrival : 0), 3.4, delta)

    // how close the bike actually is, right now — drives the headlight + idle
    const proximity = THREE.MathUtils.clamp(THREE.MathUtils.inverseLerp(RIDE_START_X, RIDE_PARK_X, ride.current.position.x), 0, 1)
    const shudder = Math.sin(state.clock.elapsedTime * 16) * 0.006 * proximity
    bike.current.position.y = THREE.MathUtils.damp(bike.current.position.y, -0.2 + shudder, 20, delta)
    headlight.current.intensity = THREE.MathUtils.damp(headlight.current.intensity, THREE.MathUtils.lerp(1.5, 24, proximity), 10, delta)
  })
  return (
    <group ref={ride} position={[RIDE_START_X, 0.28, 0]}>
      <MotorcycleModel groupRef={bike} />
      {/* headlight on the (now-flipped) front, leading the direction of travel */}
      <group position={[-1.05, 0.06, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.12, 24, 16]} />
          <meshPhysicalMaterial color="#FFE1AE" emissive="#FF9B45" emissiveIntensity={3.2} roughness={0.16} transmission={0.18} toneMapped={false} />
        </mesh>
        <pointLight ref={headlight} color="#FFB066" intensity={1.5} distance={16} decay={1.6} />
      </group>
    </group>
  )
}

export default function HarleyRide({ progress = STATIC_PROGRESS, quality = 'high' }) {
  return (
    <>
      {/* own dark night backdrop so the bright 2D world doesn't bleed through */}
      <color attach="background" args={['#0c0907']} />
      <fog attach="fog" args={['#0c0907', 7, 26]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[4, 6, 5]} angle={0.42} penumbra={0.9} intensity={5} color="#FFE6CF" />
      <pointLight position={[-3, 1, 2]} color="#F47216" intensity={9} distance={12} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[1, 4, 4]} scale={[7, 2, 1]} color="#FFE7D2" />
        <Lightformer intensity={4} position={[-4, 1, -2]} scale={[3, 7, 1]} color="#F47216" />
      </Environment>
      <HorizonGlow />
      <RoadStreaks progress={progress} />
      <MotorcycleHero progress={progress} />
      <SectionHandoff progress={progress} mode="harley" />
      {/* large floor that recedes into the fog — no visible edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial color="#0c0907" roughness={0.62} metalness={0.22} />
      </mesh>
      <ContactShadows position={[1.65, -1.47, 0]} opacity={0.72} scale={10} blur={2.2} far={4} color="#000000" />
      {quality === 'high' && <EffectComposer disableNormalPass><Bloom luminanceThreshold={0.5} intensity={0.78} mipmapBlur /></EffectComposer>}
    </>
  )
}
