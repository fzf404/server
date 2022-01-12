import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // yarn add @types/node --dev

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 设置 @ 指向 src 目录
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
