<template>
<v-dialog v-model="dialog" persistent :style="!smAndDown ? 'width: 450px;' : ''" :fullscreen="smAndDown">
  <v-card class="modal">
    <div class="modal__header">
      <span>Detalhes</span>
      <v-divider :thickness="2" class="border-opacity-50" color="black" />
    </div>

    <div class="modal__aside">
      <v-form>
        <v-container class="container">
          <v-row>
            <div class="modal__aside__img">
              <v-img
                :aspect-ratio="1"
                :src="photo"
                cover
                style="border-radius: 10px;"
              />
            </div>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <c-read Subtitle="Pessoa" :Content="contato.pessoa.nome" />
            </v-col>
            <v-col cols="12" md="6">
              <c-read Subtitle="Usuário" :Content="contato.usuario.nome" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="2">
              <c-read Subtitle="ID" :Content="contato.id" />
            </v-col>
            <v-col cols="12" md="2">
              <c-read Subtitle="Privado" :Content="contato.private ? 'Sim' : 'Não'" />
            </v-col>
            <v-col cols="12" md="3">
              <c-read Subtitle="Tipo do contato" :Content="contato.tipoContato" />
            </v-col>
            <v-col cols="12" md="5">
              <c-read Subtitle="Tag" :Content="contato.tag" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <c-read Subtitle="E-mail" :Content="contato.email" />
            </v-col>
            <v-col cols="12" md="6">
              <c-read Subtitle="Celular/Telefone" :Content="contato.telefone" />
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="typeModal === 'FAV'" cols="12">
              <v-btn @click="deleteFavorite" color="#DAA619">Desfavoritar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>

    <div class="modal__footer">
      <v-btn @click="closeModal" color="#B71C1C" prepend-icon="mdi-exit-to-app">
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>

        Fechar
      </v-btn>
    </div>
  </v-card>
</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Contato } from '../../models/contact.model'
import { PeopleClient } from '../../services/http/people.http'
import { ContactStore } from '../../stores/contact.store'
import { TypeModal } from './ITypes'
import { AxiosResponse } from 'axios'
import { useDisplay } from 'vuetify'
import { SwalConfirm } from '../../services/utils'

export default defineComponent({
  name: 'CardModal',
  data: () => ({
    photo: '',
    dialog: false,
    typeModal: {} as TypeModal,
    contato: {} as Contato
  }),
  setup () {
    const { smAndDown } = useDisplay()

    return { smAndDown }
  },
  methods: {
    async showModal (value: boolean, contato: Contato, type: TypeModal) {
      this.contato = contato
      this.typeModal = type

      await Promise.all([this.getPhoto()])

      if (this.dialog) this.closeModal()

      this.dialog = value
    },
    async getPhoto () {
      const peopleClient = new PeopleClient()

      const { data, status }: AxiosResponse = await peopleClient.getPhotoPeople(this.contato.pessoa.id)
      
      if (status === 200) {
        this.photo = URL.createObjectURL(data)
      }
    },
    async deleteFavorite () {
      const contactStore = ContactStore()

      SwalConfirm('Deseja realmente excluir dos favoritos ?')
        .then(async (res) => {
          if (res.isConfirmed) {
            await contactStore.deleteFavorite(this.contato.id)
              .then(async (res) => {
                if (!res) return

                await Promise.all([
                  await contactStore.getFavorites(),
                  await contactStore.getAll('')
                ])

                this.closeModal()
              })
          }
        })
    },
    closeModal () {
      this.dialog = false
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  min-width: 500px;
  height: 650px;
  border-radius: 10px;
  margin: 0;

  &__header {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;

    span {
      font-family: 'Dosis', sans-serif;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 10px;
    }
  }

  &__aside {
    display: flex;
    justify-content: center;
    height: 100%;

    &__img {
      display: flex;
      justify-content: center;
      height: 150px;
      width: 100%;
      margin-top: 10px;
      padding: 0 12px 0 12px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 75px;
  }
}

.container {
  width: 500px;
}

@media only screen and (max-width: 499px) {
  .modal {
    width: 100%;

    &__aside {
      display: flex;
      justify-content: center;
    }

    &__footer {
      padding-bottom: 10px;
    }
  }

  .container {
    width: 250px;
  }
}
</style>