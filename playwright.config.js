import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  // The brand-world routes boot a full 3D/Spline stack; on a loaded box the
  // first paint can run long, so give each test headroom plus one retry.
  timeout: 60000,
  retries: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
  },
  projects: [
    { name: 'projector-1080p', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 } },
    { name: 'laptop-768p', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 } },
    { name: 'tablet', use: { ...devices['iPad Pro 11'], browserName: 'chromium' } },
  ],
})
