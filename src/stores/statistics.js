import { defineStore } from "pinia"
import { useTodos } from "./todos"

export const useStatistics = defineStore('useStatistics', {
  state: () => ({
    totalCreated: 0,
    totalCompleted: 0,
    completionRate: 0,
    averageCompletionTime: 0,
    dailyStats: [],
    lastReset: new Date().toDateString()
  }),

  getters: {
    statisticsData: (state) => {
      const todosStore = useTodos()
      const totalTodos = todosStore.todos.length
      const completedTodos = todosStore.completedTodos.length
      const pendingTodos = todosStore.pendingTodos.length
      
      return {
        totalTodos,
        completedTodos,
        pendingTodos,
        completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
        productivity: completedTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0
      }
    },

    recentActivity: () => {
      const todosStore = useTodos()
      return todosStore.todos.slice(-5).reverse()
    }
  },

  actions: {
    updateStatistics() {
      const todosStore = useTodos()
      this.totalCreated = todosStore.todos.length
      this.totalCompleted = todosStore.completedTodos.length
      this.completionRate = this.totalCreated > 0 
        ? Math.round((this.totalCompleted / this.totalCreated) * 100) 
        : 0
    },

    recordDailyActivity() {
      const today = new Date().toDateString()
      if (this.lastReset !== today) {
        this.dailyStats = []
        this.lastReset = today
      }

      const todosStore = useTodos()
      const todayStat = {
        date: today,
        created: todosStore.todos.filter(todo => 
          new Date(todo.createdAt || Date.now()).toDateString() === today
        ).length,
        completed: todosStore.completedTodos.filter(todo => 
          new Date(todo.completedAt || Date.now()).toDateString() === today
        ).length
      }

      const existingIndex = this.dailyStats.findIndex(stat => stat.date === today)
      if (existingIndex > -1) {
        this.dailyStats[existingIndex] = todayStat
      } else {
        this.dailyStats.push(todayStat)
      }
    },

    resetStatistics() {
      this.totalCreated = 0
      this.totalCompleted = 0
      this.completionRate = 0
      this.averageCompletionTime = 0
      this.dailyStats = []
      this.lastReset = new Date().toDateString()
    },

    clearAllStatistics() {
      const todosStore = useTodos()
      todosStore.todos = []
      todosStore.nextId = 0
      this.resetStatistics()
    },

    deleteCompletedTodos() {
      const todosStore = useTodos()
      todosStore.todos = todosStore.todos.filter(todo => !todo.isCompleted)
      this.updateStatistics()
    },

    deleteOldStatistics(daysOld = 30) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysOld)
      
      this.dailyStats = this.dailyStats.filter(stat => 
        new Date(stat.date) > cutoffDate
      )
    }
  }
})
