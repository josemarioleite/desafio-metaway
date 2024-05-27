import { HttpCliente } from './base.http'
import { AxiosResponse } from 'axios'
import { SwalAlert } from '../utils'
import { Contato } from '../../models/contact.model'

export class ContactClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly getAllContacts = async (termo: string): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('contato/pesquisar', {termo})

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly deleteContact = async (idContact: number): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.delete(`contato/remover/${idContact}`)

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      SwalAlert(errorAxios.data.message, 'Erro')

      return errorAxios
    }
  }

  public readonly saveContact = async (contato: Contato): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('contato/salvar', contato)

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }
}
