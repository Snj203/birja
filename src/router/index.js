import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home-Page.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  // {
  //   path: '/tab1',
  //   name: 'tab1',
  //   component: () => import('../views/Tab1View.vue')
  // },
  // {
  //   path: '/tab2',
  //   name: 'tab2',
  //   component: () => import('../views/Tab2View.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path:'/tutors/me',
    name: 'tutor',
    component: () => import('../views/Tutor.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
