import { expect, test } from '@playwright/test'

test('canonical pitch traverses every section without runtime errors', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  for (const id of ['hero', 'zara', 'uniqlo', 'nike', 'harley', 'big-idea', 'rollout', 'kpis', 'cta']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await page.waitForTimeout(120)
    expect(await page.locator('canvas').count(), `#${id} should host at most one canvas`).toBeLessThanOrEqual(1)
  }
  await expect(page.locator('#cta')).toBeVisible()
  expect(errors, `${testInfo.project.name} page errors`).toEqual([])
})

test('compatibility routes still render', async ({ page }) => {
  for (const route of ['/?lite', '/?deck', '/?print']) {
    await page.goto(route)
    await expect(page.locator('body')).not.toBeEmpty()
  }
})
