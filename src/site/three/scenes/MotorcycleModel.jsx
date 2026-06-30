import { useEffect, useMemo } from 'react'
import { Center, useGLTF } from '@react-three/drei'
import { assetUrl } from '../assetUrl'

export const MOTORCYCLE_MODEL_URL = assetUrl('3d/models/motorcycle.glb')
useGLTF.preload(MOTORCYCLE_MODEL_URL)

export default function MotorcycleModel({ groupRef }) {
  const { scene } = useGLTF(MOTORCYCLE_MODEL_URL)
  const { clone, materials } = useMemo(() => {
    const next = scene.clone(true)
    const owned = []
    next.traverse((object) => {
      if (!object.isMesh) return
      const material = object.material.clone()
      material.color.multiplyScalar(0.72)
      material.roughness = 0.34
      material.metalness = 0.46
      object.material = material
      object.castShadow = true
      object.receiveShadow = true
      owned.push(material)
    })
    return { clone: next, materials: owned }
  }, [scene])

  useEffect(() => () => materials.forEach((material) => material.dispose()), [materials])

  return (
    <group ref={groupRef} scale={0.34} rotation={[0.02, -0.34, 0]}>
      <Center><primitive object={clone} /></Center>
    </group>
  )
}
