import route from '../router'

import { defineStore } from 'pinia'
import { Auth, AuthAccess } from '../models/auth.model'
import { AuthClient } from '../services/http/login.http'
import { SwalAlert } from '../services/utils'

const authClient = new AuthClient()

export const AuthStore = defineStore('authStore', {
  persist: true,
  state: () => ({
    isLogged: false,
    isLoading: false,
    authAccess: {} as AuthAccess
  }),
  actions: {
    async authApp (auth: Auth) {
      this.setLoading(true)

      const data = await authClient.authService(auth)

      if (data) {
        this.authAccess = data
        this.isLogged = true

        route.push({ name: 'home' })
      } else {
        this.isLogged = false
      }

      this.setLoading(false)
    },
    setLoading (value: boolean) {
      return this.isLoading = value
    }
  }
})
