<template>
    <h3>Completed ✅</h3>
    <div class="completed-actions">
      <button @click="deleteAllCompleted" class="delete-all-btn">
        🗑️ Delete All Completed
      </button>
    </div>
    <div>
      <ul>
        <li v-for="completedTodo in completedTodos" :key="completedTodo.id" style="margin: 8px 0" class="completed-item">
          <span class="todo-text">{{ completedTodo.text }}</span>
          <button @click="deleteTodo(completedTodo.id)" class="delete-btn">❌</button>
        </li>
      </ul>
      <div v-if="completedTodos.length === 0" class="empty-state">
        No completed tasks yet
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useTodos } from '@/stores/todos';

import HeaderBar from '@/components/Header.vue';
import FooterBar from '@/components/Footer.vue';

export default {
  components: {
    HeaderBar,
    FooterBar,
  },
  computed: {
    ...mapState(useTodos, [
      'completedTodos'
    ])
  },
  methods: {
    ...mapActions(useTodos, [
      'destroyTodo'
    ]),
    
    deleteTodo(id) {
      if (confirm('Are you sure you want to delete this completed task?')) {
        this.destroyTodo(id)
      }
    },
    
    deleteAllCompleted() {
      if (confirm('Are you sure you want to delete all completed tasks? This action cannot be undone.')) {
        const todosStore = useTodos()
        todosStore.todos = todosStore.todos.filter(todo => !todo.isCompleted)
      }
    }
  }
}
</script>

<style scoped>
.completed-actions {
  margin-bottom: 20px;
}

.delete-all-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-all-btn:hover {
  background: #d32f2f;
}

.completed-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.todo-text {
  flex: 1;
  margin-right: 10px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background: #ffebee;
}

.empty-state {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 40px 20px;
}
</style>