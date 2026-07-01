import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const files = ['GapDenim.jsx', 'ZaraWalk.jsx', 'HarleyRide.jsx', 'BigIdeaScan.jsx']

function readScene(file) {
  return readFileSync(`src/site/three/scenes/${file}`, 'utf8')
}

describe('scene source contracts', () => {
  it.each(files)('%s contains no origin-root 3d asset URL', (file) => {
    expect(readScene(file)).not.toMatch(/['"]\/3d\//)
  })

  it.each(files)('%s does not trigger React state from useFrame', (file) => {
    const frameBodies = readScene(file).match(/useFrame\([\s\S]*?\n\s*}\)/g) || []
    expect(frameBodies.join('\n')).not.toMatch(/\n\s*set[A-Z][A-Za-z0-9_]*\(/)
  })

  it('disposes every explicitly owned procedural resource', () => {
    expect(readScene('GapDenim.jsx')).toContain('denim.dispose()')
    expect(readScene('ZaraWalk.jsx')).toContain('material.dispose()')
    expect(readScene('BigIdeaScan.jsx')).toContain('bodyMaterial.dispose()')
  })

  it('clones cached GLTF scenes before mutation', () => {
    expect(readScene('ZaraWalk.jsx')).toContain('skeletonClone(scene)')
  })
})
