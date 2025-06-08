import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://117.72.79.1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // 保持/api前缀
      }
    }
  }
})
