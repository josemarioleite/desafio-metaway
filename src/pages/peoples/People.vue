<template>
<div class="people">
  <span class="title-page">Lista de Pessoas</span>

  <PeopleForm
    v-show="showForm"
    :ItemPeople="itemPeople"
    :Type="typeForm"
    :IsVisible="showForm"
    @show="ShowForm"
  />

  <div class="people__table">
    <c-table
      :Headers="headers"
      :Items="items"
      :TotalItems="totalItems"
      :IsLoading="isLoading"
      :ShowSearch="true"
      @editRow="editPeople"
      @deleteRow="deletePeople"
    />
    <c-float-button v-if="!showForm" @click="addPeople" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { PeopleStore } from '../../stores/people.store'
import { People } from '../../models/people.model'
import { ActionType } from './types'
import { SwalConfirm } from '../../services/utils'
import PeopleForm from './PeopleForm.vue'

defineOptions({
  name: 'People',
  components: { PeopleForm }
})

const peopleStore = PeopleStore()
const totalItems = computed(() => peopleStore.totalItemsStore)
const items = computed(() => peopleStore.itemsStore)
const isLoading = computed(() => peopleStore.isLoading)

let itemPeople = {}

const typeForm = ref<ActionType>('add')
const showForm = ref(false)
const headers = ref([
  { title: 'ID', align: 'right', key: 'id' },
  { title: 'Nome', align: 'start', key: 'nome' },
  { title: 'CPF', align: 'center', key: 'cpf' },
  { title: 'Ação', align: 'center', key: 'action' }
])

function ShowForm (value: boolean) {
  showForm.value = value
}

function addPeople () {
  itemPeople = {}
  typeForm.value = 'add'
  peopleStore.setPhotoEmpty()
  ShowForm(true)
}

async function editPeople (people: People) {
  ShowForm(false)

  await peopleStore.getPhoto(people.id)
  typeForm.value = 'update'
  itemPeople = people

  ShowForm(true)
}

async function deletePeople (people: People) {
  SwalConfirm(`Deseja realmente deletar: ${people.nome} ?`, 'Cuidado')
    .then(async (result) => {
      if (result.isConfirmed) {
        await peopleStore.deletePeople(people.id)
      }
    })
}

onMounted(async () => {
  await peopleStore.getPeoples('')
})
</script>

<style lang="scss" scoped>
.people {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;

  &__table {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }

  &--float-btn {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
}
</style>