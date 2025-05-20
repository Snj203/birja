import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home-Page.vue'
import TutorDetails from '../views/TutorDetails.vue'
import AddTutor from '../views/AddTutor.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/tutor/:id', component: TutorDetails, props: true },
  { path: '/add', component: AddTutor }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
