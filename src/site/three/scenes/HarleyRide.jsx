import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import MotorcycleModel from './MotorcycleModel'
import SectionHandoff from './SectionHandoff'

const STATIC_PROGRESS = Object.freeze({ get: () => 0.58 })
const seeded = (index) => {
  const value = Math.sin(index * 91.713 + 14.17) * 43758.5453
  return value - Math.floor(value)
}

function RoadStreaks({ progress, count = 18 }) {
  const instances = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: -7 + seeded(index) * 14,
    y: -1.25 + seeded(index + 31) * 0.55,
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
    const arrival = THREE.MathUtils.smoothstep(value, 0.02, 0.36)
    const parked = THREE.MathUtils.smoothstep(value, 0.28, 0.44)
    const shudder = Math.sin(state.clock.elapsedTime * 18) * 0.006 * parked
    ride.current.position.x = THREE.MathUtils.damp(ride.current.position.x, THREE.MathUtils.lerp(6.4, 1.65, arrival), 10, delta)
    bike.current.position.y = THREE.MathUtils.damp(bike.current.position.y, -0.2 + shudder, 20, delta)
    ride.current.rotation.y = THREE.MathUtils.damp(ride.current.rotation.y, THREE.MathUtils.lerp(-0.08, 0.08, arrival), 9, delta)
    headlight.current.intensity = THREE.MathUtils.damp(headlight.current.intensity, THREE.MathUtils.lerp(4, 22, arrival), 12, delta)
  })
  return (
    <group ref={ride} position={[6.4, -0.12, 0]}>
      <MotorcycleModel groupRef={bike} />
      <group position={[1.2, 0.5, 0.72]}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 16]} />
          <meshPhysicalMaterial color="#FFE1AE" emissive="#FF9B45" emissiveIntensity={3.5} roughness={0.16} transmission={0.18} toneMapped={false} />
        </mesh>
        <pointLight ref={headlight} color="#FFB066" intensity={4} distance={15} decay={1.6} />
      </group>
    </group>
  )
}

export default function HarleyRide({ progress = STATIC_PROGRESS, quality = 'high' }) {
  return (
    <>
      <fog attach="fog" args={['#090705', 6, 20]} />
      <ambientLight intensity={0.22} />
      <spotLight position={[4, 6, 5]} angle={0.42} penumbra={0.9} intensity={5} color="#FFE6CF" />
      <pointLight position={[-3, 1, 2]} color="#F47216" intensity={9} distance={12} />
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[1, 4, 4]} scale={[7, 2, 1]} color="#FFE7D2" />
        <Lightformer intensity={4} position={[-4, 1, -2]} scale={[3, 7, 1]} color="#F47216" />
      </Environment>
      <RoadStreaks progress={progress} />
      <MotorcycleHero progress={progress} />
      <SectionHandoff progress={progress} mode="harley" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, 0]}>
        <planeGeometry args={[36, 28]} />
        <meshStandardMaterial color="#090705" roughness={0.72} metalness={0.18} />
      </mesh>
      <ContactShadows position={[1.65, -1.42, 0]} opacity={0.72} scale={10} blur={2.2} far={4} color="#000000" />
      {quality === 'high' && <EffectComposer disableNormalPass><Bloom luminanceThreshold={0.54} intensity={0.72} mipmapBlur /></EffectComposer>}
    </>
  )
}
