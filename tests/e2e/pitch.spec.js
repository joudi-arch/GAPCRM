import { expect, test } from '@playwright/test'

test('lite mode contains the full pitch without a canvas or overflow', async ({ page }) => {
  await page.goto('/?lite')
  await expect(page.getByRole('heading', { name: /brand that knows your fit/i })).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
  const dimensions = await page.locator('html').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }))
  expect(dimensions.scroll).toBe(dimensions.client)
})

test('sound control exposes state and a presentation-safe target', async ({ page }) => {
  await page.goto('/?lite')
  const sound = page.getByRole('button', { name: /enable ambient sound/i })
  await expect(sound).toHaveAttribute('aria-pressed', 'false')
  expect((await sound.boundingBox()).height).toBeGreaterThanOrEqual(44)
})
