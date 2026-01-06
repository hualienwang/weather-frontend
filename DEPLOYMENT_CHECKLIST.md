# 部署檢查清單

## 部署到 Render.com 前的檢查事項

### 1. 文件檢查
- [x] `render.yaml` 文件存在且配置正確
- [x] `server.js` 文件存在且配置正確
- [x] `vite.config.js` 文件存在且配置正確
- [x] `package.json` 包含正確的依賴和腳本
- [x] `DEPLOYMENT_GUIDE.md` 文件存在

### 2. 配置檢查
- [x] `render.yaml` 中的構建命令為 `npm ci --only=production && npm run build`
- [x] `render.yaml` 中的啟動命令為 `npm run serve`
- [x] `package.json` 中的 `serve` 腳本指向 `node server.js`
- [x] `server.js` 能正確處理環境變量 `BACKEND_API_URL`
- [x] `vite.config.js` 中的代理配置正確

### 3. 環境變量檢查
- [x] `BACKEND_API_URL` 環境變量在 Render.com 配置中設置
- [x] `PORT` 環境變量在 Render.com 配置中設置為 10000
- [x] `NODE_ENV` 環境變量在 Render.com 配置中設置為 production

### 4. 後端準備檢查
- [x] 後端服務已部署並運行（參考 GitHub 上的 weather-backend 倉庫）
- [x] 後端 API URL 已準備好，例如：https://your-weather-backend.onrender.com

### 5. 部署後測試
- [ ] 前端應用成功部署並能訪問
- [ ] API 請求能正確代理到後端
- [ ] 天氣查詢功能正常工作
- [ ] 所有靜態資源加載正常

## 常見問題排查

1. 如果構建失敗：
   - 檢查依賴是否正確安裝
   - 確認構建命令是否正確

2. 如果 API 請求失敗：
   - 檢查 `BACKEND_API_URL` 環境變量是否設置正確
   - 確認後端服務是否正常運行

3. 如果靜態資源加載失敗：
   - 檢查 Express 服務器是否正確提供 `dist` 目錄中的靜態文件