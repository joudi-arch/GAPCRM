import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { usePerf } from './usePerfGuard'

const STORAGE_KEY = 'gap-pitch-3d-mode'
const SceneRuntimeContext = createContext(null)

function readPersistedDowngrade() {
  if (typeof window === 'undefined') return null
  const value = window.sessionStorage?.getItem(STORAGE_KEY)
  return value?.startsWith('poster:') ? value.slice('poster:'.length) : null
}

export function SceneRuntimeProvider({ children }) {
  const { lowPower, ready, reason: capabilityReason } = usePerf()
  const [visibility, setVisibility] = useState({})
  const [downgradeReason, setDowngradeReason] = useState(readPersistedDowngrade)

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

  const requestDowngrade = useCallback((reason) => {
    const nextReason = reason || 'runtime'
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem(STORAGE_KEY, `poster:${nextReason}`)
    }
    setDowngradeReason(nextReason)
  }, [])

  const mode = ready && !lowPower && !downgradeReason ? 'live' : 'poster'
  const effectiveReason = downgradeReason || capabilityReason || (!ready ? 'checking-capability' : null)

  const value = useMemo(() => ({
    activeSceneId,
    registerVisibility,
    requestDowngrade,
    mode,
    downgradeReason: effectiveReason,
  }), [activeSceneId, registerVisibility, requestDowngrade, mode, effectiveReason])

  return <SceneRuntimeContext.Provider value={value}>{children}</SceneRuntimeContext.Provider>
}

export function useSceneRuntime() {
  const runtime = useContext(SceneRuntimeContext)
  if (!runtime) throw new Error('useSceneRuntime must be used inside SceneRuntimeProvider')
  return runtime
}
