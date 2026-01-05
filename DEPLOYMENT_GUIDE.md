# 天氣查詢系統前端 - 部署指南

## 部署到 Render.com

### 前端項目部署

1. **準備 GitHub 倉庫**
   - 將前端代碼推送到 GitHub 倉庫
   - 確保包含 `render.yaml` 配置文件

2. **在 Render.com 上創建 Web Service**
   - 登錄 Render.com 帳戶
   - 點擊 "New +" 按鈕，選擇 "Web Service"
   - 連接您的 GitHub 倉庫
   - 選擇包含前端代碼的倉庫

3. **配置環境**
   - **環境**: Node
   - **分支**: main 或主分支名稱
   - **構建命令**: `npm install && npm run build`
   - **啟動命令**: `npm run serve`

4. **環境變量設置**
   在 Render.com 控制台中設置以下環境變量：
   - `BACKEND_API_URL`: 後端 API 的完整 URL（例如：`https://your-weather-backend.onrender.com`）

5. **部署**
   - 點擊 "Create Web Service"
   - Render 會自動構建並部署您的前端應用

### 後端項目部署

1. **部署後端 API**
   - 後端項目應部署在獨立的 Render 服務上
   - 參考 `weather-backend` 倉庫中的部署說明

2. **獲取後端 API URL**
   - 部署完成後，獲取後端服務的完整 URL
   - 例如：`https://your-weather-backend.onrender.com`

### 配置前端連接後端

1. **更新環境變量**
   - 在前端服務的 Render 配置中，設置 `BACKEND_API_URL` 為您的後端 URL

2. **驗證連接**
   - 部署完成後，訪問前端應用
   - 測試天氣查詢功能以確保與後端 API 的連接正常

## 項目配置說明

### render.yaml 配置
```yaml
services:
  - type: web
    name: weather-frontend
    env: node
    region: oregon
    buildCommand: npm install && npm run build
    startCommand: npm run serve
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: BACKEND_API_URL
        sync: false  # 需要在 Render 控制台手動設置
```

### 服務器配置 (server.js)
- 使用 Express 提供構建後的靜態文件
- 設置代理 `/api` 路徑到後端 API
- 處理前端路由（單頁應用）

### 開發 vs 生產環境
- **開發環境**: API 請求通過 Vite 代理轉發到本地後端
- **生產環境**: API 請求通過 Express 服務器代理轉發到配置的後端 URL

## 疑難排解

1. **API 請求失敗**
   - 檢查 `BACKEND_API_URL` 環境變量是否正確設置
   - 確認後端服務正在運行且可訪問

2. **構建失敗**
   - 檢查 `package.json` 中的依賴和腳本
   - 確保 `render.yaml` 中的構建命令正確

3. **靜態資源加載問題**
   - 確認 `vite.config.js` 中的構建配置
   - 檢查 `server.js` 中的靜態文件服務配置

## 維護和更新

- 當代碼推送到 GitHub 時，Render 會自動重新部署
- 要更新環境變量，請在 Render 控制台中修改
- 監控日誌以確保服務正常運行