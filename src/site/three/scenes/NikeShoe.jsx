import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  useGLTF,
  PresentationControls,
  Float,
  ContactShadows,
  Environment,
  Lightformer,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

useGLTF.preload('/3d/models/shoe.glb')

function Shoe() {
  const { scene } = useGLTF('/3d/models/shoe.glb')
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.004
  })
  return <primitive ref={ref} object={scene} />
}

// Nike world: a sneaker on a black stage, volt rim light + bloom, mouse-orbit.
export default function NikeShoe() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[6, 9, 6]} angle={0.3} penumbra={1} intensity={2.4} />
      <pointLight position={[-5, 2, -3]} color="#CEFF00" intensity={9} distance={16} />

      {/* self-contained studio reflections (no external HDRI fetch) */}
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer intensity={3} position={[-4, 1, -2]} scale={[5, 5, 1]} color="#CEFF00" />
        <Lightformer intensity={1.4} position={[4, -1, 2]} scale={[4, 2, 1]} color="#bfe000" />
      </Environment>

      <PresentationControls
        global
        cursor
        polar={[-0.25, 0.25]}
        azimuth={[-0.7, 0.7]}
        config={{ mass: 1, tension: 120 }}
      >
        <Float rotationIntensity={0.35} floatIntensity={0.7} speed={1.4}>
          <group position={[1.35, -0.35, 0]} scale={6.4} rotation={[0.12, -0.5, 0]}>
            <Shoe />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows position={[1.4, -1.5, 0]} opacity={0.55} scale={14} blur={2.6} far={4} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.55} intensity={0.7} mipmapBlur />
      </EffectComposer>
    </>
  )
}
