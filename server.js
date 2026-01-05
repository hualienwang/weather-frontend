import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// 從環境變量獲取後端 API URL，默認為 /api 路徑
const backendApiUrl = process.env.BACKEND_API_URL || process.env.VITE_API_URL || 'http://localhost:8000';

console.log('Backend API URL:', backendApiUrl);

// 設置 API 代理
app.use('/api', createProxyMiddleware({
  target: backendApiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // 移除 /api 前綴
  },
}));

// 提供靜態文件
app.use(express.static('dist'));

// 所有其他路由返回 index.html（用於前端路由）
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Proxying API requests to: ${backendApiUrl}`);
});