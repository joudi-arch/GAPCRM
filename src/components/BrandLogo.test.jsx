import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BrandLogo, { LOGO_ASSETS } from './BrandLogo'

describe('BrandLogo', () => {
  it.each(Object.keys(LOGO_ASSETS))('uses a verified asset for %s', (brand) => {
    const view = render(<BrandLogo brand={brand} />)
    expect(view.getByRole('img')).toHaveAttribute('src', LOGO_ASSETS[brand])
    expect(view.getByRole('img')).toHaveAccessibleName()
    view.unmount()
  })

  it('can color a single-color mark without redrawing it', () => {
    const view = render(<BrandLogo brand="nike" color="#CEFF00" />)
    expect(view.getByRole('img')).toHaveStyle({ backgroundColor: '#CEFF00' })
    view.unmount()
  })
})
