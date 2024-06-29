import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'RegView',
      component: () => import('../views/RegView.vue')
    },
    {
      path: '/login',
      name: 'LogView',
      component: () => import('../views/LogView.vue')
    },
    {
      path: '/boss/:id',
      name: 'BossView',
      component: () => import('../views/BossView.vue')
    },
  ]
})

export default router
