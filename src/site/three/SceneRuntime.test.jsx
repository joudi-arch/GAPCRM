import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { SceneRuntimeProvider, useSceneRuntime } from './SceneRuntime'

describe('SceneRuntime', () => {
  beforeEach(() => sessionStorage.clear())

  it('selects exactly one stage with the greatest intersection ratio', () => {
    const wrapper = ({ children }) => <SceneRuntimeProvider>{children}</SceneRuntimeProvider>
    const { result } = renderHook(() => useSceneRuntime(), { wrapper })

    act(() => {
      result.current.registerVisibility('nike', 0.42)
      result.current.registerVisibility('harley', 0.71)
    })

    expect(result.current.activeSceneId).toBe('harley')
  })

  it('removes a stage from ownership when its ratio returns to zero', () => {
    const wrapper = ({ children }) => <SceneRuntimeProvider>{children}</SceneRuntimeProvider>
    const { result } = renderHook(() => useSceneRuntime(), { wrapper })

    act(() => {
      result.current.registerVisibility('nike', 0.6)
      result.current.registerVisibility('nike', 0)
    })

    expect(result.current.activeSceneId).toBeNull()
  })

  it('persists a per-scene downgrade reason for the session', () => {
    const wrapper = ({ children }) => <SceneRuntimeProvider>{children}</SceneRuntimeProvider>
    const { result } = renderHook(() => useSceneRuntime(), { wrapper })
    act(() => result.current.requestDowngrade('harley', 'low-fps'))
    expect(result.current.getMode('harley')).toBe('poster')
    expect(result.current.getMode('zara')).toBe('live')
    expect(sessionStorage.getItem('gap-pitch-3d-mode')).toBe('poster:low-fps')
  })
})
