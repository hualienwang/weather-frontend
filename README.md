# 天氣查詢系統

前端：Vue 3 + Vite  
後端：FastAPI + SQLModel + SQLite  
部署：Render

## 開發

```bash
# 前端
cd frontend
npm install
npm run dev

# 後端（另開終端）
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 部署到 Render.com

### 前端部署

前端項目已配置為可直接部署到 Render.com。請參考 `render.yaml` 和 `DEPLOYMENT_GUIDE.md` 文件獲取詳細的部署說明。

主要配置：
- 環境：Node.js
- 構建命令：`npm install && npm run build`
- 啟動命令：`npm run serve`
- 需要設置環境變量 `BACKEND_API_URL` 指向後端 API 的 URL

### 後端部署

後端項目需要單獨部署。請參考 GitHub 上的 `weather-backend` 倉庫。

## 技術棧

- 前端：Vue 3, Vite, JavaScript
- 服務器：Express.js (生產環境)
- API 代理：http-proxy-middleware
- 部署：Render.com
