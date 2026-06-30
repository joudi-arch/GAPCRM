import { describe, expect, it } from 'vitest'
import { bigIdeaContent, pitchSections, validatePitchContent } from './pitch'

describe('pitch content', () => {
  it('uses unique section ids and source ids for every factual claim', () => {
    const result = validatePitchContent()
    expect(result.duplicateIds).toEqual([])
    expect(result.unsourcedClaims).toEqual([])
  })

  it('keeps the fit thesis exact across presentation surfaces', () => {
    expect(bigIdeaContent.thesis).toBe('Make fit Gap’s identity—not its weakness.')
  })

  it('labels KPI values as proposal targets', () => {
    const kpis = pitchSections.find((section) => section.id === 'kpis')
    expect(kpis.items.every((item) => item.kind === 'proposal-target')).toBe(true)
  })
})
