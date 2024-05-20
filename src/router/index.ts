import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { AuthStore } from '../stores/auth.store'
import { Home, Login, User, Contact, People, Register } from '../pages'

const routes: Array<RouteRecordRaw> = [
  { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true } },
  { path: '/contact', name: 'contact', component: Contact, meta: { requiresAuth: true } },
  { path: '/people', name: 'people', component: People, meta: { requiresAuth: true } },
  { path: '/register', name: 'register', component: Register, meta: { requiresAuth: true } },
  { path: '/', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to: any, from: any, next: any) => {
  const authStore = AuthStore()
  const isLogged = authStore.isLogged

  if (to.meta.requiresAuth && !isLogged) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
