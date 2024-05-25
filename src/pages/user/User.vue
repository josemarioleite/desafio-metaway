<template>
<div class="user">
  <span class="title-page">Lista de Usuários (Em Desenvolvimento)</span>

  <UserForm
    :ItemUser="itemUser"
    :IsVisible="showForm"
    :Type="typeForm"
    @show="ShowForm"
  />

  <div class="user__table">
    <c-table
      :Headers="headers"
      :Items="items"
      :TotalItems="totalItems"
      :IsLoading="isLoading"
      :ShowSearch="true"
      :ShowDeleteButton="false"
      @editRow="editUser"
      class="user__table--component"
    />
  </div>

  <c-float-button v-if="!showForm" @click="addUser" />
</div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { UserStore } from '../../stores/user.store'
import { User } from '../../models/user.model'
import { ActionType } from './types'
import UserForm from './UserForm.vue'

const userStore = UserStore()

const items = computed(() => userStore.items)
let itemUser = {}
const typeForm = ref<ActionType>('add')
const totalItems = ref(0)
const isLoading = ref(false)
const showForm = ref(false)
const headers = ref([
  { title: 'ID', align: 'right', key: 'id' },
  { title: 'Usuário', align: 'left', key: 'username' },
  { title: 'E-mail', align: 'left', key: 'email' },
  { title: 'Nome', align: 'start', key: 'nome' },
  { title: 'CPF', align: 'center', key: 'cpf' },
  { title: 'Contato', align: 'left', key: 'telefone' },
  { title: 'Ação', align: 'center', key: 'action' }
])

function ShowForm (value: boolean = false) {
  showForm.value = value
}

function addUser () {
  itemUser = {}
  typeForm.value = 'add'

  ShowForm(true)
}

async function editUser (user: User) {
  ShowForm(false)

  typeForm.value = 'update'
  itemUser = user

  ShowForm(true)
}

defineOptions({
  name: 'User',
  components: { UserForm }
})

onMounted(async () => {
  await userStore.getAllUsers('')
})
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;

  &__table {
    display: flex;
    justify-content: center;
    width: 100%;

    &--component {
      height: 435px;
      width: 95%;
    }
  }
}
</style>