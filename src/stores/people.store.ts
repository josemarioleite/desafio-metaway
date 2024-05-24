import { defineStore } from 'pinia'
import { PeopleClient } from '../services/http/people.http'
import { sortByIdDesc, SwalAlert } from '../services/utils'
import { People, FileInfo } from '../models/people.model'

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
    async deletePeople (idPeople: number) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await peopleClient.deletePeople(idPeople)

        if (status === 200) { 
          SwalAlert(data.message, 'Ok')
          await this.getPeoples('')
          resolve(true)
        }

        this.setLoading(false)
      })
    },
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
    async savePeople (people: People, file: FileInfo) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await peopleClient.savePeople(people, file)

        if (status === 200) {
          SwalAlert(data.message, 'Ok')
            .then(async (res) => {
              if (res.isConfirmed) {
                await this.getPeoples('')
              }
            })
        }

        this.setLoading(false)
        resolve(true)
      })
    },
    async updatePeople (people: People) {
      return new Promise(async (resolve) => {
        this.setLoading(true)

        const { data, status } = await peopleClient.updatePeople(people)

        if (status === 200) {
          SwalAlert(data.message, 'Ok')
            .then(async () => {
              await this.getPeoples('')
            })
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