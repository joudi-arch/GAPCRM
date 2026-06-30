import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useGLTF, useAnimations, ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { assetUrl } from '../assetUrl'

export const ZARA_MODEL_URL = assetUrl('3d/models/mannequin.glb')

useGLTF.preload(ZARA_MODEL_URL)

// A monochrome figure walking on the spot — an editorial "moving sculpture"
// for the Zara runway. (Rigged walk cycle baked into the model.)
function Walker() {
  const group = useRef()
  const { scene, animations } = useGLTF(ZARA_MODEL_URL)
  const cloned = useMemo(() => skeletonClone(scene), [scene])
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#11100E',
    roughness: 0.34,
    metalness: 0.22,
  }), [])
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    // near-black so a backlight rims it into an editorial walking silhouette
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.material = material
        o.castShadow = true
      }
    })
    return () => material.dispose()
  }, [cloned, material])

  useEffect(() => {
    const walk = names.find((n) => /walk/i.test(n)) || names[0]
    const a = actions[walk]
    if (a) a.reset().fadeIn(0.4).setEffectiveTimeScale(0.9).play()
    return () => a?.fadeOut(0.3)
  }, [actions, names])

  return (
    <group ref={group} position={[1.35, -1.7, 0]} rotation={[0, -0.35, 0]} scale={1.42}>
      <primitive object={cloned} />
    </group>
  )
}

export default function ZaraWalk() {
  return (
    <>
      <ambientLight intensity={0.12} />
      {/* strong backlight = rim halo silhouette; faint front fill */}
      <pointLight position={[0.6, 2.2, -4]} color="#fbf4e2" intensity={42} distance={20} />
      <spotLight position={[-3, 5, 2]} angle={0.5} penumbra={1} intensity={0.7} color="#efe9dc" />
      <Environment resolution={128}>
        <Lightformer intensity={1.8} position={[0, 3, -4]} scale={[5, 6, 1]} color="#fff6e6" />
        <Lightformer intensity={0.5} position={[3, 0, 3]} scale={[4, 4, 1]} color="#bfb9aa" />
      </Environment>
      <Walker />
      <ContactShadows position={[1.35, -1.72, 0]} opacity={0.5} scale={10} blur={3} far={3} color="#000000" />
    </>
  )
}
