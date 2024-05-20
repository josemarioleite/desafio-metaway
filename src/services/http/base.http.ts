import axios, { AxiosInstance } from 'axios'

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

export abstract class HttpCliente {
  protected readonly instance: AxiosInstance

  public constructor () {
    const BASE_URL = 'https://demometaway.vps-kinghost.net:8485/api/'

    this.instance = axios.create({
      baseURL: BASE_URL,
    })
  }
}
