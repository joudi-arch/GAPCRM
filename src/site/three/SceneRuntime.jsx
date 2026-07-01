import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePerf } from './usePerfGuard'

const STORAGE_KEY = 'gap-pitch-3d-mode'
const SceneRuntimeContext = createContext(null)

export function SceneRuntimeProvider({ children }) {
  const { lowPower, ready, reason: capabilityReason } = usePerf()
  const [visibility, setVisibility] = useState({})
  const [perSceneDowngrade, setPerSceneDowngrade] = useState({})

  // Fresh page load = fresh 3D attempt. Clears any stale downgrade from a
  // previous session so the R3F scenes (Zara, Harley, etc.) aren't stuck in
  // poster mode. Runtime downgrades within the current session still apply.
  useEffect(() => {
    window.sessionStorage?.removeItem(STORAGE_KEY)
  }, [])

  const registerVisibility = useCallback((id, value) => {
    if (!id) return
    const ratio = Math.max(0, Math.min(1, Number(value) || 0))
    setVisibility((current) => {
      if (current[id] === ratio) return current
      if (ratio === 0) {
        const next = { ...current }
        delete next[id]
        return next
      }
      return { ...current, [id]: ratio }
    })
  }, [])

  const activeSceneId = useMemo(() => {
    return Object.entries(visibility)
      .filter(([, ratio]) => ratio >= 0.15)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null
  }, [visibility])

  const requestDowngrade = useCallback((sceneId, reason) => {
    const nextReason = reason || 'runtime'
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem(STORAGE_KEY, `poster:${nextReason}`)
    }
    setPerSceneDowngrade((current) => ({ ...current, [sceneId]: nextReason }))
  }, [])

  const getMode = useCallback((sceneId) => {
    if (!ready || lowPower) return 'poster'
    if (perSceneDowngrade[sceneId]) return 'poster'
    return 'live'
  }, [ready, lowPower, perSceneDowngrade])

  const value = useMemo(() => ({
    activeSceneId,
    registerVisibility,
    requestDowngrade,
    getMode,
    downgradeReasons: perSceneDowngrade,
  }), [activeSceneId, registerVisibility, requestDowngrade, getMode, perSceneDowngrade])

  return <SceneRuntimeContext.Provider value={value}>{children}</SceneRuntimeContext.Provider>
}

export function useSceneRuntime() {
  const runtime = useContext(SceneRuntimeContext)
  if (!runtime) throw new Error('useSceneRuntime must be used inside SceneRuntimeProvider')
  return runtime
}
