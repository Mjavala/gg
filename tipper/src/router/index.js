import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Onboard from '../components/Onboard.vue'
import Leaderboard from '../components/Leaderboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/onboard',
    name: 'Onboard',
    component: Onboard
  },
  {
    path: '/leaderboards',
    name: 'Leaderboards',
    component: Leaderboard
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
