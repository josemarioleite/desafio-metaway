<template>
<div v-if="IsVisible" class="form" transition="scroll-x-transition">
  <aside class="form__aside">
    <span class="form__aside--subtitle">Dados</span>

    <v-form>
      <v-container>
        <v-row class="justify-center" style="margin-top: 10px">
          <v-col v-if="Type !== 'add'" cols="12" md="2">
            <c-text v-model="user.usuario.id" label="ID" :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.usuario.nome" label="Nome" :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.usuario.dataNascimento" label="Data de Nascimento" v-maska:[maskDate] :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.usuario.cpf" label="CPF" v-maska:[maskCPF] :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.usuario.telefone" label="Contato" :loading="isLoading" v-maska:[maskTelephone] />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="user.usuario.username" label="Usuário" :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="user.usuario.email" label="E-mail" :loading="isLoading" />
          </v-col>
          <v-col v-if="Type === 'add'" cols="12" md="2">
            <c-text v-model="user.usuario.password" label="Senha" :loading="isLoading" />
          </v-col>
          <v-col cols="12" md="2">
            <c-select
              v-model="user.tipos"
              :Items="optionsRole"
              Label="Permissão"
              item-value="value"
            />
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
import { watch, computed, reactive, ref } from 'vue'
import { ActionType } from './types'
import { UserStore } from '../../stores/user.store'
import { User } from '../../models/user.model'
import { SwalConfirm } from '../../services/utils'

const userStore = UserStore()

const maskDate = reactive({ mask: '##/##/####', eager: true })
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
const isLoading = computed(() => userStore.isLoading)
const user = computed(() => userStore.user)
const optionsRole = ref([
  { label: 'Administrador', value: ['ROLE_ADMIN'] },
  { label: 'Usuário', value: ['ROLE_USER'] }
])

async function save () {
  SwalConfirm('Tem certeza que deseja cadastrar esse usuário ?')
    .then(async (result) => {
      if (result.isConfirmed) {
        await userStore.saveUser(user.value)
          .then(async (res) => {
            if (res) {
              emit('show', false)
            }
          })
      }
    })
}

async function closeForm () {
  emit('show', false)
}

watch(isVisible, async function (value: any) {
  if (value && props.Type === 'update') {
    await userStore.getUserById(props.ItemUser.id)
  }

  if (value && props.Type === 'add') {
    userStore.setUserDefault()
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