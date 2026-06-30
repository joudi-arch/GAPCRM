import { createContext, useContext, useEffect, useState } from 'react'

// Decides once whether this machine should run live 3D at all. If anything is
// off — reduced motion, touch/mobile, no WebGL, or a weak first-second FPS
// sample — we fall back to the 2D brand worlds (which already look great).
const PerfContext = createContext({ lowPower: false, ready: false })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export function PerfProvider({ children }) {
  const [state, setState] = useState({ lowPower: false, ready: false })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const small = window.innerWidth < 820
    const forcedLite = new URLSearchParams(window.location.search).has('lite')

    if (forcedLite || reduce || coarse || small || !hasWebGL()) {
      setState({ lowPower: true, ready: true })
      return
    }

    // Let the page settle first (font/layout/Lenis init causes early jank that
    // would falsely fail the sample), THEN measure FPS for ~1s. Capable machines
    // clear ~35fps comfortably once idle.
    let frames = 0
    let raf
    let startT
    const settle = setTimeout(() => {
      const tick = (t) => {
        if (startT === undefined) startT = t
        frames++
        if (t - startT >= 1000) {
          setState({ lowPower: frames < 35, ready: true })
        } else {
          raf = requestAnimationFrame(tick)
        }
      }
      raf = requestAnimationFrame(tick)
    }, 1600)
    return () => {
      clearTimeout(settle)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <PerfContext.Provider value={state}>{children}</PerfContext.Provider>
}

export const usePerf = () => useContext(PerfContext)
