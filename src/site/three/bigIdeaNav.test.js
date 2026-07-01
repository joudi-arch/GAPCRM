import { beforeEach, describe, expect, it } from 'vitest'
import {
  BIG_IDEA_STAGE_COUNT,
  BIG_IDEA_STAGE_TARGETS,
  bigIdeaAtEnd,
  bigIdeaAtStart,
  bigIdeaNext,
  bigIdeaPrev,
  bigIdeaResetToEnd,
  bigIdeaResetToStart,
  getBigIdeaStage,
} from './bigIdeaNav'

describe('bigIdeaNav stage machine', () => {
  beforeEach(() => {
    bigIdeaResetToStart()
  })

  it('starts at the first stage', () => {
    expect(getBigIdeaStage()).toBe(0)
    expect(bigIdeaAtStart()).toBe(true)
    expect(bigIdeaAtEnd()).toBe(false)
  })

  it('advances one beat per next() and reports false at the end', () => {
    for (let i = 1; i < BIG_IDEA_STAGE_COUNT; i++) {
      expect(bigIdeaNext()).toBe(true)
      expect(getBigIdeaStage()).toBe(i)
    }
    expect(bigIdeaAtEnd()).toBe(true)
    // exhausted: hand off to the next slide instead of advancing further
    expect(bigIdeaNext()).toBe(false)
    expect(getBigIdeaStage()).toBe(BIG_IDEA_STAGE_COUNT - 1)
  })

  it('retreats one beat per prev() and reports false at the start', () => {
    bigIdeaResetToEnd()
    for (let i = BIG_IDEA_STAGE_COUNT - 2; i >= 0; i--) {
      expect(bigIdeaPrev()).toBe(true)
      expect(getBigIdeaStage()).toBe(i)
    }
    expect(bigIdeaAtStart()).toBe(true)
    expect(bigIdeaPrev()).toBe(false)
    expect(getBigIdeaStage()).toBe(0)
  })

  it('priming jumps straight to either edge', () => {
    bigIdeaResetToEnd()
    expect(getBigIdeaStage()).toBe(BIG_IDEA_STAGE_COUNT - 1)
    bigIdeaResetToStart()
    expect(getBigIdeaStage()).toBe(0)
  })

  it('exposes monotonically increasing targets within 0..1', () => {
    expect(BIG_IDEA_STAGE_TARGETS).toHaveLength(BIG_IDEA_STAGE_COUNT)
    BIG_IDEA_STAGE_TARGETS.forEach((value, i) => {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(1)
      if (i > 0) expect(value).toBeGreaterThan(BIG_IDEA_STAGE_TARGETS[i - 1])
    })
  })
})
