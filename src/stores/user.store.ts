import { defineStore } from 'pinia'
import { User, UserDetail, CreateEmptyUser } from '../models/user.model'
import { UserClient } from '../services/http/user.http'
import { AuthStore } from './auth.store'
import { SwalAlert, formatDate, isValidEmail, sortByIdDesc } from '../services/utils'

const userClient = new UserClient()

export const UserStore = defineStore('userStore', {
  persist: true,
  state: () => ({
    items: [],
    permissoes: [] as Array<string>,
    user: {} as UserDetail,
    usuarioLogado: {} as User,
    isLoading: false
  }),
  actions: {
    async getDetailUserLogged () {
      this.setLoading(true)
      
      const authStore = AuthStore()
      const { data, status } = await userClient.getUser(authStore.authAccess.id)

      if (status === 200) {
        this.permissoes = data.tipos
        this.usuarioLogado = data.usuario
        this.usuarioLogado.dataNascimento = formatDate(data.usuario.dataNascimento, false)
      }

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

        await this.getDetailUserLogged()
        resolve(true)
      })
    },
    async getAllUsers (termo: string) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await userClient.getUsers(termo)

        if (status === 200) {
          this.items = sortByIdDesc(data) as any
          this.setLoading(false)
          return resolve(true)
        }

        return resolve(false)
      })
    },
    async saveUser (user: UserDetail) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await userClient.saveUser(user)

        if (status === 200) {
          SwalAlert(data.message, 'Ok')
            .then(() => {
              this.getAllUsers('')
            })
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    async getUserById (idUser: number) {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await userClient.getUser(idUser)

        if (status === 200) {
          this.user = data.object
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    setLoading (value: boolean) {
      return this.isLoading = value
    },
    setUserDefault () {
      this.user = CreateEmptyUser()
    }
  }
})
