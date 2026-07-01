import { expect, test } from '@playwright/test'

test('lite mode contains the full pitch without a canvas or overflow', async ({ page }) => {
  await page.goto('/?lite')
  await expect(page.getByRole('heading', { name: /brand that knows your fit/i })).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
  const dimensions = await page.locator('html').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }))
  expect(dimensions.scroll).toBe(dimensions.client)
})
