import {defineConfig} from 'vite'
import {tmpdir} from 'os'
import {join} from 'path'

export default defineConfig({
  base: process.env.RENDER ? '/' : '/ST_KRAKOS/',
  cacheDir: join(tmpdir(), 'vite-cache-st-krakos'),
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignoruj niektóre ostrzeżenia, ale loguj je
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return
        }
        warn(warning)
      }
    },
    minify: 'esbuild'
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})
