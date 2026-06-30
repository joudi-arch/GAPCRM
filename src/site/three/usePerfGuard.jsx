import { createContext, useContext, useEffect, useState } from 'react'

// Decides once whether this machine should run live 3D at all. If anything is
// off — reduced motion, touch/mobile, no WebGL, or a weak first-second FPS
// sample — we fall back to the 2D brand worlds (which already look great).
const PerfContext = createContext({ lowPower: false, ready: true, reason: null })

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    const gl = window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return Boolean(gl)
  } catch {
    return false
  }
}

function readCapability() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 820
  const forcedLite = new URLSearchParams(window.location.search).has('lite')

  if (forcedLite) return { lowPower: true, ready: true, reason: 'forced-lite' }
  if (reduce) return { lowPower: true, ready: true, reason: 'reduced-motion' }
  if (coarse) return { lowPower: true, ready: true, reason: 'coarse-pointer' }
  if (small) return { lowPower: true, ready: true, reason: 'small-viewport' }
  if (!hasWebGL()) return { lowPower: true, ready: true, reason: 'no-webgl' }
  return { lowPower: false, ready: true, reason: null }
}

export function PerfProvider({ children }) {
  const [state, setState] = useState({ lowPower: false, ready: false })

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseQuery = window.matchMedia('(pointer: coarse)')
    const update = () => setState(readCapability())
    update()
    reduceQuery.addEventListener('change', update)
    coarseQuery.addEventListener('change', update)
    window.addEventListener('resize', update, { passive: true })
    return () => {
      reduceQuery.removeEventListener('change', update)
      coarseQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <PerfContext.Provider value={state}>{children}</PerfContext.Provider>
}

export const usePerf = () => useContext(PerfContext)
