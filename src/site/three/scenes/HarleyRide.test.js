import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync('src/site/three/scenes/HarleyRide.jsx', 'utf8')

describe('HarleyRide production contract', () => {
  it('uses the sourced motorcycle hero instead of proxy geometry', () => {
    expect(source).toContain("from './MotorcycleModel'")
    expect(source).not.toContain('<boxGeometry args={[1.6, 0.5, 0.6]}')
    expect(source).not.toContain('low engine glows imply the bike body')
  })

  it('is driven by narrative progress rather than an elapsed-time loop', () => {
    expect(source).toContain('progress.get()')
    expect(source).not.toContain('elapsedTime %')
  })
})
