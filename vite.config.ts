import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    hmr: true,
    host: true,
    port: 3060,
    proxy: {
      // 使用代理解决跨域问题
      '/api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        target: 'http://localhost:3068/images-api'
      },
      // '/api': {
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      //   target: 'http://localhost:3080/api'
      // },
      '/passport': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/passport/, ''),
        target: 'https://passport.bilibili.com'
      }
    }
  }
})
