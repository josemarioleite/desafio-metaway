import { defineStore } from 'pinia'
import { ContactClient } from '../services/http/contact.http'
import { SwalAlert, sortByIdDesc } from '../services/utils'
import { Contato, CreateEmptyContact } from '../models/contact.model'

const contactClient = new ContactClient()

export const ContactStore = defineStore('contactStore', {
  persist: true,
  state: () => ({
    contact: {} as Contato,
    favorites: [],
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
    async saveContact () {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.saveContact(this.contact)

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
    async favoriteContact (contato: Contato) {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.favoriteContact(contato)

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
    async getFavorites () {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.getFavorites()

        if (status === 200) {
          this.favorites = data
          resolve(true)
        } else {
          resolve(false)
        }

        this.setLoading(false)
      })
    },
    async deleteFavorite (idContact: number) {
      return new Promise(async (resolve) => {
        this.setLoading(true)
      
        const { data, status } = await contactClient.deleteContact(idContact)

        if (status === 200) {
          SwalAlert(data.message)
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
    setContact (value: Contato | null = null) {
      if (value) {
        return this.contact = value
      }

      return this.contact = CreateEmptyContact()
    }
  }
})
