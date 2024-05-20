import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthStore } from '../stores/auth.store'
import { Home, Login } from '../pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to: any, from: any, next: any) => {
  const authStore = AuthStore()
  const isLogged = authStore.isLogged

  console.log(isLogged)

  if (to.meta.requiresAuth && !isLogged) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
