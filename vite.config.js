import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/formwork/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        studio: resolve(__dirname, 'studio.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
})
