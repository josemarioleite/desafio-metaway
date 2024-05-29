<template>
<div v-if="isVisibleForm" class="form" transition="scroll-x-transition">
  <aside class="form__aside">
    <span class="form__aside--subtitle">Dados</span>
    <v-form ref="vForm">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <div style="width: 100%; display: flex;">
              <v-img
                v-if="typeForm !== 'add'"
                :aspect-ratio="1"
                :src="photo"
                cover
                width="200"
                class="bg-white"
                style="border-radius: 10px;"
              />
              <div v-else class="file-input">
                <v-file-input
                  v-model="fileInput"
                  accept="image/*"
                  label="Sua foto"
                  :rules="[true || 'foto de perfil obrigatória']"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="9">
            <v-row class="justify-center" style="margin-top: 10px">
              <v-col cols="12" md="2" v-if="typeForm !== 'add'">
                <c-text v-model="itemPeople.id" label="ID" readonly :clearable="false" />
              </v-col>
              <v-col cols="12" md="6">
                <c-text v-model="itemPeople.nome" label="Nome" :rules="notNull" />
              </v-col>
              <v-col cols="12" md="4">
                <c-text v-model="itemPeople.cpf" label="CPF" v-maska:[maskCPF] :rules="cpfRules" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <span class="form__aside--subtitle">Localização</span>
      <v-container>
        <v-row class="justify-center" style="margin-top: 10px">
          <v-col cols="12" md="5">
            <c-text v-model="itemPeople.endereco.logradouro" label="Logradouro" :rules="notNull" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="itemPeople.endereco.bairro" label="Bairro" :rules="notNull" />
          </v-col>
          <v-col cols="12" md="2">
            <c-text v-model.number="itemPeople.endereco.numero" label="Número" :rules="number" />
          </v-col>
          <v-col cols="12" md="2">
            <c-text v-model="itemPeople.endereco.cep" label="CEP" v-maska:[maskCEP] :rules="notNull" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <c-text v-model="itemPeople.endereco.cidade" label="Cidade" :rules="notNull" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="itemPeople.endereco.estado" label="Estado" :rules="notNull" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="itemPeople.endereco.pais" label="País" :rules="notNull" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </aside>
  <footer class="form__btn">
    <v-btn @click="closeForm" color="warning" density="comfortable" flat> fechar </v-btn>
    <v-btn @click="save" color="success" density="comfortable" flat> salvar </v-btn>
  </footer>
</div>
</template>

<script lang="ts">
import { computed, ref, reactive, defineComponent, PropType } from 'vue'
import { ActionType } from './types'
import { PeopleStore } from '../../stores/people.store'
import { People, CreateEmptyPeople, FileInfo } from '../../models/people.model'

export default defineComponent({
  name: 'People-Form',
  props: {
    IsVisible: Boolean,
    ItemPeople: Object as PropType<People>,
    Type: {
      type: String as PropType<ActionType>,
      default: 'add'
    }
  },
  data: () => ({
    fileInput: null,
    itemPeople: ref<People>(CreateEmptyPeople()),
    notNull: [
      (v: string) => !!v || 'Campo Obrigatório',
      (v: string) => (v && v.length > 2) || 'Mínimo 3 caracteres'
    ],
    cpfRules: [
      (v: string) => !!v || 'Campo Obrigatório',
      (v: string) => (v && v.length > 13) || 'Preencha corretamente'
    ],
    number: [
      (v: number) => v !== null && v !== undefined || 'Campo Obrigatório',
      (v: number) => v !== 0 || 'O valor não pode ser zero'
    ]
  }),
  setup () {
    const peopleStore = PeopleStore()
    const photo = computed(() => peopleStore.photoPeople)

    const maskCPF = reactive({ mask: '###.###.###-##', eager: true })
    const maskCEP = reactive({ mask: '#####-##', eager: true })

    return { peopleStore, photo, maskCPF, maskCEP }
  },
  computed: {
    isVisibleForm (): boolean {
      return this.IsVisible
    },
    typeForm (): ActionType {
      return this.Type
    }
  },
  methods: {
    async validateFields () {
      const { valid } = await this.$refs.vForm.validate()

      return valid
    },
    async save () {
      if (await !this.validateFields()) return

      if (this.Type === 'update') {
        await this.peopleStore.updatePeople(this.itemPeople)
          .then(() => {
            this.$emit('show', false)
          })
        return
      }

      if (this.fileInput) {
        const file = this.fileInput as any as FileInfo
        const people = this.itemPeople as People

        await this.peopleStore.savePeople(people, file)
          .then(() => {
            return this.$emit('show', false)
          })

        return
      }
    },
    async closeForm () {
      this.itemPeople = CreateEmptyPeople()
      this.$emit('show', false)
    }
  },
  watch: {
    'isVisibleForm': function (value: boolean) {
      if (value && this.Type !== 'add') {
        this.itemPeople = this.ItemPeople as People
      } else {
        this.fileInput = null
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.form {
  width: 95%;
  background: #fdfdfd;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;

  &__aside {
    width: 100%;

    &--subtitle {
      font-size: 1.2rem;
    }
  }

  &__btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
  }
}

.file-input {
  padding-top: 15px;
  width: 100%;
}

@media only screen and (max-width: 499px) {
  .form__btn {
    justify-content: center;
  }

  .file-input {
    padding-top: 20px;
  }
}
</style>