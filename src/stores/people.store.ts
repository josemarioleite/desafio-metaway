import { defineStore } from 'pinia'
import { PeopleClient } from '../services/http/people.http'
import { sortByIdDesc } from '../services/utils'

const peopleClient = new PeopleClient()

export const PeopleStore = defineStore('peopleStore', {
  persist: true,
  state: () => ({
    photoPeople: '',
    totalItemsStore: 0,
    itemsStore: [],
    isLoading: false
  }),
  actions: {
    async getPhoto (idPeople: number) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await peopleClient.getPhotoPeople(idPeople)

        if (status === 200) { 
          this.photoPeople = URL.createObjectURL(data)
          this.setLoading(false)
          resolve(true)
        }
      })
    },
    async getPeoples (name: string) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await peopleClient.getPeoplesByName(name)

        if (status === 200) {
          this.itemsStore = sortByIdDesc(data) as any
          this.totalItemsStore = data.length
        }

        this.setLoading(false)
        resolve(true)
      })
    },
    setPhotoEmpty () {
      this.photoPeople = ''
    },
    setLoading (value: boolean) {
      return this.isLoading = value
    }
  }
})
