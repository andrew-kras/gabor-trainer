import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    open: true
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/globals.styl')}"`
      }
    }
  },
})
