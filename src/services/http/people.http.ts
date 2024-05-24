import { HttpCliente } from './base.http'
import { AxiosResponse } from 'axios'

export class PeopleClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly getPeoplesByName = async (nome: string): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('pessoa/pesquisar', {nome})

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly getPhotoPeople = async (idPeople: number): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.get(`foto/download/${idPeople}`, {
        responseType: 'blob'
      })

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }
}
