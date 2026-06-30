import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built dist/ opens by double-click (file://) and zips cleanly.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
    restoreMocks: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    // Route surfaces use named dynamic imports so their production chunks stay
    // independently inspectable while preserving content-hashed cache keys.
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000, // three.js is intentionally a lazy on-demand chunk
  },
})
