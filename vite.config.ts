import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    include: ['ckeditor5-custom-build'],
    esbuildOptions: {
        target: "esnext",
    },
  },
  build:{
    commonjsOptions: {
      exclude: ['ckeditor5-custom-build']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
