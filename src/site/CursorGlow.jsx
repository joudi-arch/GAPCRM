import { useEffect, useRef } from 'react'

// A soft glow + small dot that trail the cursor across a brand world.
// Pass the world's glow color. Disabled on touch devices via CSS.
export default function CursorGlow({ glow = 'rgba(255,255,255,0.18)' }) {
  const glowRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const g = glowRef.current
    const d = dotRef.current
    if (!g || !d) return
    let gx = window.innerWidth / 2
    let gy = window.innerHeight / 2
    let dx = gx
    let dy = gy
    let tx = gx
    let ty = gy
    let raf

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      d.style.opacity = '1'
      g.style.opacity = '1'
    }
    const loop = () => {
      // glow lags (smooth), dot is snappier
      gx += (tx - gx) * 0.12
      gy += (ty - gy) * 0.12
      dx += (tx - dx) * 0.35
      dy += (ty - dy) * 0.35
      g.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`
      d.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" style={{ '--glow': glow, opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </>
  )
}
