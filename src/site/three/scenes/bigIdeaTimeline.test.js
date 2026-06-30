import { describe, expect, it } from 'vitest'
import { getBigIdeaState } from './bigIdeaTimeline'

describe('getBigIdeaState', () => {
  it.each([
    [0.00, 'arrive'],
    [0.18, 'scan'],
    [0.43, 'profile'],
    [0.68, 'recommend'],
    [0.90, 'outcome'],
  ])('maps %s to %s', (progress, phase) => {
    expect(getBigIdeaState(progress).phase).toBe(phase)
  })

  it('clamps progress and all derived values', () => {
    expect(getBigIdeaState(-1).progress).toBe(0)
    expect(getBigIdeaState(2).progress).toBe(1)
    expect(
      Object.values(getBigIdeaState(0.5))
        .filter(Number.isFinite)
        .every((value) => value >= 0 && value <= 1),
    ).toBe(true)
  })

  it.each([
    [0.12, 'scan'],
    [0.36, 'profile'],
    [0.58, 'recommend'],
    [0.82, 'outcome'],
    [1, 'outcome'],
  ])('uses the next phase at boundary %s', (progress, phase) => {
    expect(getBigIdeaState(progress).phase).toBe(phase)
  })
})
