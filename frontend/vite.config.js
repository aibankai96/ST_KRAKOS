import { defineConfig } from 'vite'
import { tmpdir } from 'os'
import { join } from 'path'

export default defineConfig({
  base: '/ST_KRAKOS/',
  cacheDir: join(tmpdir(), 'vite-cache-st-krakos'),
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
