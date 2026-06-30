import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei'

// Procedurally woven denim — a canvas twill texture on a softly billowing sheet.
function seededRandom(seed = 0x474150) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 0x100000000
  }
}

function makeDenimTexture(anisotropy) {
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
  // Seeded fibre variation keeps captures stable across browsers and sessions.
  const random = seededRandom()
  for (let i = 0; i < 2200; i++) {
    ctx.fillStyle = random() > 0.5 ? 'rgba(150,185,235,0.10)' : 'rgba(5,12,30,0.18)'
    ctx.fillRect(random() * s, random() * s, 1, 1)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = anisotropy
  return tex
}

export default function GapDenim() {
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy())
  const denim = useMemo(() => makeDenimTexture(Math.min(4, maxAnisotropy)), [maxAnisotropy])
  const group = useRef()

  useEffect(() => () => denim.dispose(), [denim])

  // gentle mouse parallax
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.5 + state.pointer.x * 0.3, 6, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.15 - state.pointer.y * 0.2, 6, delta)
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
