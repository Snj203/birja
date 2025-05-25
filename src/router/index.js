import {createRouter, createWebHistory} from 'vue-router'
import Board from "@/modules/board/Board.vue";

const routes = [
  {
    path: '/',
    name: 'main',
    component: Board
  },
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
  },
  {
    path:'/board',
    name: 'board',
    component: () => import('../modules/board/Board.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




export default router
