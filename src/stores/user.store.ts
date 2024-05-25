import { defineStore } from 'pinia'
import { User } from '../models/user.model'
import { UserClient } from '../services/http/user.http'
import { AuthStore } from './auth.store'
import { SwalAlert, formatDate, isValidEmail } from '../services/utils'

const userClient = new UserClient()

export const UserStore = defineStore('userStore', {
  persist: true,
  state: () => ({
    items: [],
    permissoes: [] as Array<string>,
    usuarioLogado: {} as User,
    isLoading: false
  }),
  actions: {
    async getUserById () {
      this.setLoading(true)
      
      const authStore = AuthStore()
      const data = await userClient.getUser(authStore.authAccess.id)

      this.permissoes = data.tipos
      this.usuarioLogado = data.usuario
      this.usuarioLogado.dataNascimento = formatDate(data.usuario.dataNascimento, false)

      this.setLoading(false)
    },
    async updateUser () {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const emailUserIsValid = isValidEmail(this.usuarioLogado.email)
        
        if (!emailUserIsValid) {
          SwalAlert('Este e-mail não é válido ou não está no formato correto')

          resolve(false)
        } else {
          const user: User = {
            id: this.usuarioLogado.id,
            dataNascimento: formatDate(this.usuarioLogado.dataNascimento, true),
            cpf: this.usuarioLogado.cpf,
            email: this.usuarioLogado.email,
            nome: this.usuarioLogado.nome,
            password: this.usuarioLogado.password,
            telefone: this.usuarioLogado.telefone,
            username: this.usuarioLogado.username
          }
    
          await userClient.updateUser(user)
        }

        await this.getUserById()
        resolve(true)
      })
    },
    async getAllUsers (termo: string) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await userClient.getUsers(termo)

        if (status === 200) {
          this.items = data
          this.setLoading(false)
          return resolve(true)
        }

        return resolve(false)
      })
    },
    setLoading (value: boolean) {
      return this.isLoading = value
    }
  }
})
