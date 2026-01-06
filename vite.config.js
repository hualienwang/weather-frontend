import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 獲取後端 API 的基礎 URL，默認為當前域名下的 /api 路徑
const backendApiUrl = process.env.VITE_API_URL || process.env.NODE_ENV === 'production' 
  ? '/api'  // 生產環境使用相對路徑
  : 'http://127.0.0.1:8000'  // 開發環境使用本地後端

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: backendApiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 確保在生產構建時不包含代理配置
    rollupOptions: {
      external: []
    }
  },
  // 添加環境變量支持
  envDir: '.',
  define: {
    'process.env': process.env
  }
})