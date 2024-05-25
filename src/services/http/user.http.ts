import { HttpCliente } from './base.http'
import { User, UserChangePassword } from '../../models/user.model'
import { SwalAlert } from '../utils'
import { AxiosResponse } from 'axios'

export class UserClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly getUser = async (idUser: number) => {
    try {
      const { data } = await this.instance.get(`usuario/buscar/${idUser}`)

      return data.object
    } catch (error) {
      return false
    }
  }

  public readonly updateUser = async (user: User) => {
    try {
      const result: AxiosResponse = await this.instance.put('usuario/atualizar', user)

      SwalAlert('Alterações feitas com sucesso', 'Ok')
      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly changePassword = async (userInfo: UserChangePassword): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('usuario/alterarSenha', userInfo)

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }

  public readonly getUsers = async (termo: string): Promise<AxiosResponse> => {
    try {
      const result: AxiosResponse = await this.instance.post('usuario/pesquisar', {termo})

      return result
    } catch (error: any) {
      const errorAxios = error.response as AxiosResponse

      return errorAxios
    }
  }
}
