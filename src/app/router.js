import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AchievementsPage from '@/pages/AchievementsPage'
import EducationPage from '@/pages/EducationPage'
import StartWorkingPage from '@/pages/StartWorkingPage'
import NotificationsPage from '@/pages/NotificationsPage'
import LoginPage from '@/pages/LoginPage'

Vue.use(Router)

const routes = [
  { path: '/', component: HomePage },
  { path: '/achievements', component: AchievementsPage },
  { path: '/education', component: EducationPage },
  { path: '/startworking', component: StartWorkingPage },
  { path: '/notifications', component: NotificationsPage },
  { path: '/login', component: LoginPage },
]

const router = new Router({
  mode: 'history',
  routes,
})

export default router
