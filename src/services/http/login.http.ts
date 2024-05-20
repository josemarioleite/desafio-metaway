import { HttpCliente } from './base.http'
import { Auth, AuthAccess } from '../../models/auth.model'

export class AuthClient extends HttpCliente {
  public constructor () {
    super()
  }

  public readonly authService = async (auth: Auth) => {
    try {
      const { data } = await this.instance.post<AuthAccess>('auth/login', auth) as any

      return data
    } catch (error) {
      return false
    }
  }
}
