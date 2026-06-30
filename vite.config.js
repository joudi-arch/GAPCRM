import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built dist/ opens by double-click (file://) and zips cleanly.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1000, // three.js is intentionally a lazy on-demand chunk
  },
})
