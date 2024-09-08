import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './components/HomePage.vue'
import AchievementsPage from './components/AchievementsPage.vue'
import EducationPage from './components/EducationPage.vue'
import StartWorkingPage from './components/StartWorkingPage.vue'
import NotificationsPage from './components/NotificationsPage.vue'
import LoginPage from './components/LoginPage.vue'

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
