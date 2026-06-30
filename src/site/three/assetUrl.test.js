import { describe, expect, it } from 'vitest'
import { assetUrl } from './assetUrl'

describe('assetUrl', () => {
  it('removes a leading slash and prefixes the Vite base', () => {
    expect(assetUrl('/3d/models/shoe.glb', './')).toBe('./3d/models/shoe.glb')
  })

  it('preserves a hosted subdirectory', () => {
    expect(assetUrl('3d/posters/nike-shoe.webp', '/pitch/')).toBe('/pitch/3d/posters/nike-shoe.webp')
  })

  it('keeps the Vite root base relative for offline-safe scene assets', () => {
    expect(assetUrl('/3d/models/soldier.glb', '/')).toBe('./3d/models/soldier.glb')
  })
})
