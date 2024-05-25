<template>
<div v-if="IsVisible" class="form" transition="scroll-x-transition">
  <aside class="form__aside">
    <span class="form__aside--subtitle">Dados</span>

    <v-form>
      <v-container>
        <v-row class="justify-center" style="margin-top: 10px">
          <v-col v-if="Type !== 'add'" cols="12" md="2">
            <c-text v-model="user.id" label="ID" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="user.nome" label="Nome" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.dataNascimento" label="Data de Nascimento" v-maska:[maskDate] />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.cpf" label="CPF" v-maska:[maskCPF] />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <c-text v-model="user.username" label="Usuário" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="user.email" label="E-mail" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="user.telefone" label="Contato" v-maska:[maskTelephone] />
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

<script lang="ts" setup>
import { watch, computed, ref, reactive } from 'vue'
import { ActionType } from './types'
import { UserStore } from '../../stores/user.store'
import { User, CreateEmptyUser } from '../../models/user.model'

const userStore = UserStore()

const maskDate = reactive({ mask: '####-##-##', eager: true })
const maskTelephone = reactive({ mask: '(##)#####-####', eager: true })
const maskCPF = reactive({ mask: '###.###.###-##', eager: true })

interface Props {
  ItemUser: User
  IsVisible: boolean
  Type: ActionType
}

const emit = defineEmits(['show'])
const props = withDefaults(defineProps<Props>(), { Type: 'add' })
const isVisible = computed(() => props.IsVisible)

let user = ref<User>(CreateEmptyUser())

async function save () {
  emit('show', false)
}

async function closeForm () {
  emit('show', false)
}

watch(isVisible, async function (value: any) {
  if (value && props.Type ) {
    user.value = props.ItemUser
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