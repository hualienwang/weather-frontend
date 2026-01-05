<template>
  <div class="container">
    <h1>🌤️ 天氣查詢系統</h1>

    <!-- 查詢區 -->
    <div class="search-box">
      <input
        v-model="city"
        @keyup.enter="search"
        placeholder="輸入城市名稱（如：Taipei, Tokyo, New York）"
        class="search-input"
      />
      <button @click="search" :disabled="loading" class="search-button">
        {{ loading ? '查詢中...' : '查詢天氣' }}
      </button>
    </div>

    <!-- 錯誤提示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 表格：歷史 + 當前結果 -->
    <div class="table-container">
      <table class="weather-table">
        <thead>
          <tr>
            <th>城市</th>
            <th>溫度 (°C)</th>
            <th>天氣狀況</th>
            <th>查詢時間</th>
          </tr>
        </thead>
        <tbody>
          <!-- 當前查詢結果（可選，也可只顯示歷史） -->
          <tr v-if="weather" class="current-result">
            <td>{{ weather.city }}</td>
            <td>{{ weather.temperature }}</td>
            <td>{{ weather.description }}</td>
            <td>剛剛</td>
          </tr>
          <!-- 歷史記錄 -->
          <tr v-for="item in history" :key="item.id" class="history-item">
            <td>{{ item.city }}</td>
            <td>{{ item.temperature }}</td>
            <td>{{ item.description }}</td>
            <td>{{ formatTime(item.timestamp) }}</td>
          </tr>
          <!-- 無資料 -->
          <tr v-if="!weather && history.length === 0">
            <td colspan="4" class="no-data">尚無查詢記錄</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const city = ref('')
    const weather = ref(null)
    const history = ref([])
    const error = ref('')
    const loading = ref(false)

    const search = async () => {
      if (!city.value.trim()) {
        error.value = '請輸入城市名稱'
        return
      }
      error.value = ''
      loading.value = true
      weather.value = null

      try {
        const res = await fetch(`/api/weather/${encodeURIComponent(city.value)}`)
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.detail || '查詢失敗')
        }
        weather.value = await res.json()
        await loadHistory()
      } catch (e) {
        error.value = e.message || '無法取得天氣資料'
        console.error(e)
      } finally {
        loading.value = false
        city.value = ''
      }
    }

    const loadHistory = async () => {
      try {
        const res = await fetch('/api/history')
        history.value = await res.json()
      } catch (e) {
        console.error('載入歷史失敗:', e)
      }
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      loadHistory()
    })

    return {
      city,
      weather,
      history,
      error,
      loading,
      search,
      formatTime
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, 'PingFang TC', sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.search-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.search-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  background-color: #fdf2f2;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
}

.table-container {
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.weather-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.weather-table th,
.weather-table td {
  padding: 14px 12px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.weather-table th {
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
}

.current-result {
  background-color: #e3f2fd;
}

.history-item:hover {
  background-color: #f5f5f5;
}

.no-data {
  color: #7f8c8d;
  font-style: italic;
}

/* 響應式：手機寬度 */
@media (max-width: 600px) {
  .search-box {
    flex-direction: column;
  }

  .search-input,
  .search-button {
    width: 100%;
  }

  .weather-table th,
  .weather-table td {
    padding: 10px 8px;
    font-size: 14px;
  }
}
</style>