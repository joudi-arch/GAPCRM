import { render, screen } from '@testing-library/react'
import { motionValue } from 'framer-motion'
import { describe, expect, it } from 'vitest'
import BigIdeaOverlay from './BigIdeaOverlay'

describe('BigIdeaOverlay', () => {
  it('keeps the complete recommendation visible without WebGL or motion', () => {
    render(<BigIdeaOverlay progress={motionValue(1)} reducedMotion />)

    expect(screen.getByRole('heading', { name: /make fit gap’s identity/i })).toBeVisible()
    expect(screen.getByText(/right fit.*fewer returns.*richer data/i)).toBeVisible()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('98%')).toBeVisible()
  })
})
