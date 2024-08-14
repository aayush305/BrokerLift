import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import TaskList from '../views/TaskList.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tasks', component: TaskList },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
