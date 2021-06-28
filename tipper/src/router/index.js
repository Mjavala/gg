import Vue from 'vue'
import VueRouter from 'vue-router'
import Panel from '../components/Panel.vue'
import Config from '../components/Config.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/panel.html',
    name: 'Panel',
    component: Panel
  },
  {
    path: '/config.html',
    name: 'Config',
    component: Config
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
