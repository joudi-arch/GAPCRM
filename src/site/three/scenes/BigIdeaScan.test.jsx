import { describe, expect, it, vi } from 'vitest'
import BigIdeaScan, { BIG_IDEA_MODEL_URL } from './BigIdeaScan'

vi.mock('@react-three/fiber', () => ({ useFrame: () => {} }))
vi.mock('@react-three/drei', () => ({
  useGLTF: Object.assign(() => ({ scene: {}, animations: [] }), { preload: () => {} }),
  useAnimations: () => ({ actions: {}, names: [] }),
}))
vi.mock('@react-three/postprocessing', () => ({ EffectComposer: () => null, Bloom: () => null }))
vi.mock('three/examples/jsm/utils/SkeletonUtils.js', () => ({ clone: (scene) => scene }))

describe('BigIdeaScan', () => {
  it('exports a renderable scene component', () => {
    expect(BigIdeaScan).toBeTypeOf('function')
  })

  it('resolves the figure model through the Vite base', () => {
    expect(BIG_IDEA_MODEL_URL).toContain('3d/models/mannequin.glb')
    expect(BIG_IDEA_MODEL_URL).not.toMatch(/^\/3d\//)
  })
})
