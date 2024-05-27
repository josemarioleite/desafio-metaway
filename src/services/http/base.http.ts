import axios, { AxiosInstance } from 'axios'
import { AuthStore } from '../../stores/auth.store'
import { SwalAlert } from '../utils'
import router from '../../router'

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

export abstract class HttpCliente {
  protected readonly instance: AxiosInstance

  public constructor () {
    const BASE_URL = `https://demometaway.vps-kinghost.net:8485/api/`

    this.instance = axios.create({ baseURL: BASE_URL })

    this.initializeConfig()
    this.verifyToken()
  }

  private initializeConfig () {
    this.instance.interceptors.request.use((config) => {
      const authStore = AuthStore()

      if (authStore.isLogged) {
        config.headers.Authorization = `Bearer ${authStore.authAccess.accessToken}`
        config.headers.Accept = 'application/json'
      }
      return config
    })
  }

  private async verifyToken () {
    await this.instance.interceptors.response.use(null, (reject) => {
      if (reject.response && reject.response.status === 401) {
        SwalAlert('Erro nas credenciais')
          .then(() => {
            localStorage.clear()
            window.location.reload()
          })
      }

      if (reject.response && reject.response.status === 400) {
        SwalAlert(reject.response.data.message, 'Requisição sem sucesso')
      }

      if (reject.response && reject.response.status === 500) {
        SwalAlert(reject.response.data.message, 'Erro Interno')
      }

      return reject
    })
  }
}
