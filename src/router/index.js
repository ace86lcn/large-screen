import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'

Vue.use(VueRouter)

const routes = [
  { path: '/', 
    name: 'index', 
    meta: { title: '摩云劳务' }, 
    component: Index
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.afterEach((to, from) => {
  let title = to.meta.title
  if (title) document.title = title
})

export default router
