import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    path: '/',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },  
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New.vue')
  },
  {
    path: '/task/:id',
    name: 'Task',
    props: true,
    component: () => import('../views/Task.vue')
  }
],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
