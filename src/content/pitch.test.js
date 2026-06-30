import { describe, expect, it } from 'vitest'
import { bigIdeaContent, finalAsk, pitchSections, rolloutPhases, validatePitchContent } from './pitch'

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

  it('keeps the shareholder argument in decision order', () => {
    expect(pitchSections.map(({ id }) => id)).toEqual([
      'hero', 'gap-today', 'problem', 'gaps', 'insight', 'zara', 'uniqlo', 'nike', 'harley',
      'big-idea', 'rollout', 'kpis', 'why-now', 'cta',
    ])
  })

  it('names accountable rollout owners and a concrete 90-day ask', () => {
    expect(rolloutPhases.every(({ owner, deliverable, gate }) => owner && deliverable && gate)).toBe(true)
    expect(finalAsk).toMatch(/90-day/i)
    expect(finalAsk).toMatch(/Data \+ CRM/)
    expect(finalAsk).toMatch(/baseline/i)
  })
})
