<template>
  <div class="statistics-container">
    <h3>📊 Statistics Dashboard</h3>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h4>Total Tasks</h4>
        <div class="stat-number">{{ statisticsData.totalTodos }}</div>
      </div>
      
      <div class="stat-card">
        <h4>Completed</h4>
        <div class="stat-number completed">{{ statisticsData.completedTodos }}</div>
      </div>
      
      <div class="stat-card">
        <h4>Pending</h4>
        <div class="stat-number pending">{{ statisticsData.pendingTodos }}</div>
      </div>
      
      <div class="stat-card">
        <h4>Completion Rate</h4>
        <div class="stat-number">{{ statisticsData.completionRate }}%</div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: statisticsData.completionRate + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="sections">
      <div class="section">
        <h4>📈 Productivity Score</h4>
        <div class="productivity-meter">
          <div class="score">{{ statisticsData.productivity }}%</div>
          <div class="meter-bar">
            <div 
              class="meter-fill" 
              :class="getProductivityClass(statisticsData.productivity)"
              :style="{ width: statisticsData.productivity + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="section">
        <h4>🕐 Recent Activity</h4>
        <div class="activity-list">
          <div v-if="recentActivity.length === 0" class="no-activity">
            No recent activity
          </div>
          <div 
            v-for="todo in recentActivity" 
            :key="todo.id" 
            class="activity-item"
            :class="{ completed: todo.isCompleted }"
          >
            <span class="activity-text">{{ todo.text }}</span>
            <span class="activity-status">
              {{ todo.isCompleted ? '✅ Completed' : '⏳ Pending' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="refreshStats" class="refresh-btn">
        🔄 Refresh Statistics
      </button>
      <button @click="goToTodos" class="nav-btn">
        📝 View Todos
      </button>
      <button @click="goToCompleted" class="nav-btn">
        ✅ View Completed
      </button>
    </div>

    <div class="danger-zone">
      <h4>⚠️ Danger Zone</h4>
      <div class="danger-actions">
        <button @click="deleteCompletedTodos" class="danger-btn">
          🗑️ Delete All Completed Tasks
        </button>
        <button @click="clearAllData" class="danger-btn critical">
          💀 Clear All Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStatistics } from '@/stores/statistics'

export default {
  name: 'Statistics',
  computed: {
    ...mapState(useStatistics, [
      'statisticsData',
      'recentActivity'
    ])
  },
  methods: {
    ...mapActions(useStatistics, [
      'updateStatistics',
      'recordDailyActivity',
      'deleteCompletedTodos',
      'clearAllStatistics'
    ]),
    
    refreshStats() {
      this.updateStatistics()
      this.recordDailyActivity()
    },
    
    getProductivityClass(score) {
      if (score >= 80) return 'excellent'
      if (score >= 60) return 'good'
      if (score >= 40) return 'average'
      return 'low'
    },
    
    goToTodos() {
      this.$router.push('/')
    },
    
    goToCompleted() {
      this.$router.push('/completed')
    },
    
    deleteCompletedTodos() {
      if (confirm('Are you sure you want to delete all completed tasks? This action cannot be undone.')) {
        this.deleteCompletedTodos()
        this.refreshStats()
      }
    },
    
    clearAllData() {
      if (confirm('⚠️ WARNING: This will delete ALL todos and reset all statistics. This action cannot be undone. Are you absolutely sure?')) {
        this.clearAllStatistics()
        this.refreshStats()
      }
    }
  },
  
  mounted() {
    this.refreshStats()
  }
}
</script>

<style scoped>
.statistics-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h4 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.stat-number.completed {
  color: #4caf50;
}

.stat-number.pending {
  color: #ff9800;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 30px 0;
}

.section {
  background: #fafafa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.section h4 {
  margin: 0 0 15px 0;
  color: #333;
}

.productivity-meter {
  text-align: center;
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.meter-bar {
  width: 100%;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.meter-fill.excellent { background: #4caf50; }
.meter-fill.good { background: #8bc34a; }
.meter-fill.average { background: #ff9800; }
.meter-fill.low { background: #f44336; }

.activity-list {
  max-height: 200px;
  overflow-y: auto;
}

.no-activity {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item.completed {
  opacity: 0.7;
}

.activity-text {
  flex: 1;
  margin-right: 10px;
}

.activity-status {
  font-size: 12px;
  color: #666;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
}

.refresh-btn, .nav-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.refresh-btn {
  background: #2196f3;
  color: white;
}

.refresh-btn:hover {
  background: #1976d2;
}

.nav-btn {
  background: #4caf50;
  color: white;
}

.nav-btn:hover {
  background: #45a049;
}

.danger-zone {
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #f44336;
  border-radius: 8px;
  background: #ffebee;
}

.danger-zone h4 {
  margin: 0 0 15px 0;
  color: #d32f2f;
}

.danger-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.danger-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.danger-btn:hover {
  background: #d32f2f;
}

.danger-btn.critical {
  background: #d32f2f;
  font-weight: bold;
}

.danger-btn.critical:hover {
  background: #b71c1c;
}

@media (max-width: 768px) {
  .sections {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .actions {
    flex-direction: column;
  }
  
  .danger-actions {
    flex-direction: column;
  }
}
</style>
