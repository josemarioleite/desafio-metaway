<template>
<v-dialog v-model="dialog" persistent max-width="400">
  <v-card class="modal">
    <div class="modal__header">
      <span>Detalhes</span>
    </div>

    <div class="modal__aside">
      <v-form style="width: 100%;">
        <v-container>
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

export default defineComponent({
  name: 'CardModal',
  data: () => ({
    dialog: false,
    contato: {} as Contato
  }),
  methods: {
    showModal (value: boolean, contato: Contato) {
      this.dialog = value
      this.contato = contato
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
  height: 550px;
  border-radius: 10px;
  margin: 0;

  &__header {
    height: 50px;
    display: flex;
    justify-content: center;
    margin-top: 10px;

    span {
      font-family: 'Dosis', sans-serif;
      font-size: 2rem;
    }
  }

  &__aside {
    display: flex;
    justify-content: center;
    height: 100%;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 75px;
  }
}
</style>