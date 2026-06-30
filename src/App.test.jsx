import { describe, expect, it } from 'vitest'
import { getPresentationRoute } from './App'

describe('getPresentationRoute', () => {
  it.each([
    ['', 'site'],
    ['?lite', 'site'],
    ['?deck', 'deck'],
    ['?print', 'print'],
    ['?demo', 'demo'],
  ])('maps %s to %s', (search, expected) => {
    expect(getPresentationRoute(search)).toBe(expected)
  })
})
