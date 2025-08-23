import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // PROBABLY NOT NEEDED, BUT ADDED FOR CONTEXT
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
