import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/auth_user/user_login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views//auth/auth_user/user_register.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/user/user_dashboard.vue'),
    },
    {
      path: '/file_upload',
      name: 'file upload',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
