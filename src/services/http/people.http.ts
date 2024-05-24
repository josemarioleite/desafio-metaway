import { FileInfo, People } from '../../models/people.model'
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

  public readonly deletePeople = async (idPeople: number): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.delete(`pessoa/remover/${idPeople}`)

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly updatePeople = async (people: People): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('pessoa/salvar', people)

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly savePeople = async (people: People, file: any): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('pessoa/salvar', people)

      if (result.status === 200) {
        const blob = new Blob([file], { type: file.type })
        const form = new FormData()
        form.append('foto', blob)

        await this.instance.post(`foto/upload/${result.data.object.id}`, form, {
          headers: {
            'Content-Type':'multipart/form-data'
          }
        })

        return result
      }
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }
}
