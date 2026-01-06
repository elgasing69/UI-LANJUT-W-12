import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Completed from '@/views/Completed.vue'
import Statistics from '@/views/Statistics.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo, name: 'todo' },
    { path: '/completed', component: Completed, name: 'completed' },
    { path: '/statistics', component: Statistics, name: 'statistics' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`)
  next()
})

export default router