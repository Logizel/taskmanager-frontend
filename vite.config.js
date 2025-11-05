import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5173,
  },
  define: {
    // Pass VITE_API_URL to the app for API requests
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
})
