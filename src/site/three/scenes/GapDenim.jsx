import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei'

// Procedurally woven denim — a canvas twill texture on a softly billowing sheet.
function makeDenimTexture() {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#1b3a6b'
  ctx.fillRect(0, 0, s, s)
  // diagonal twill threads
  ctx.strokeStyle = 'rgba(120,165,225,0.35)'
  ctx.lineWidth = 1
  for (let i = -s; i < s; i += 4) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + s, s)
    ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(8,20,45,0.4)'
  for (let i = -s; i < s; i += 8) {
    ctx.beginPath()
    ctx.moveTo(i + 2, 0)
    ctx.lineTo(i + 2 + s, s)
    ctx.stroke()
  }
  // fibre speckle
  for (let i = 0; i < 2200; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(150,185,235,0.10)' : 'rgba(5,12,30,0.18)'
    ctx.fillRect(Math.random() * s, Math.random() * s, 1, 1)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.anisotropy = 4
  return tex
}

export default function GapDenim() {
  const denim = useMemo(makeDenimTexture, [])
  const group = useRef()

  // gentle mouse parallax
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.5 + state.pointer.x * 0.3, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.15 - state.pointer.y * 0.2, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight position={[5, 6, 5]} angle={0.5} penumbra={1} intensity={4} color="#dbe8ff" />
      <pointLight position={[-4, -1, 3]} color="#5b8def" intensity={12} distance={20} />
      <pointLight position={[3, 3, 4]} color="#ffffff" intensity={5} distance={18} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 3, 3]} scale={[8, 5, 1]} color="#cfe0ff" />
        <Lightformer intensity={2.2} position={[-4, 0, -2]} scale={[5, 6, 1]} color="#3b6ce7" />
      </Environment>

      <group ref={group} position={[1.45, -0.1, 0.4]} rotation={[0.15, -0.5, 0.05]}>
        <mesh>
          <planeGeometry args={[5.2, 6.4, 48, 48]} />
          <MeshDistortMaterial
            map={denim}
            distort={0.32}
            speed={1.6}
            roughness={0.78}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  )
}
