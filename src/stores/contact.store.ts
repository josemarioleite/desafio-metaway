import { defineStore } from 'pinia'
import { ContactClient } from '../services/http/contact.http'
import { SwalAlert, sortByIdDesc, isValidEmail } from '../services/utils'
import { Contato } from '../models/contact.model'

const contactClient = new ContactClient()

export const ContactStore = defineStore('contactStore', {
  persist: true,
  state: () => ({
    contact: {} as Contato,
    items: [],
    isLoading: false
  }),
  actions: {
    async getAll (termo: string) {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.getAllContacts(termo)

        if (status === 200) {
          this.items = sortByIdDesc(data) as any
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    async deleteContact (idContact: number) {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.deleteContact(idContact)

        if (status === 200) {
          SwalAlert(data.message, 'Ok')
          await this.getAll('')
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    async saveContact (contato: Contato) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        if (!isValidEmail(contato.email)) {
          SwalAlert('E-mail não é válido', 'Atenção')
          resolve(false)
        }
      
        const { data, status } = await contactClient.saveContact(contato)

        if (status === 200) {
          SwalAlert(data.message, 'Ok')
          await this.getAll('')
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    setLoading (value: boolean) {
      return this.isLoading = value
    }
  }
})
