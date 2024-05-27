<template>
<div class="contact">
  <span class="title-page">Lista de Contatos</span>

  <Detail
    :Show="showDetail"
    @show="ShowForm"
  />

  <div class="contact__table">
    <c-table
      :Headers="headers"
      :Items="items"
      :TotalItems="totalItems"
      :IsLoading="isLoading"
      :ShowSearch="true"
      @editRow="editContact"
      @deleteRow="deleteContact"
    />
  </div>

  <c-float-button v-if="!showDetail" @click="addContact" />
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { ContactStore } from '../../stores/contact.store'
import { SwalConfirm } from '../../services/utils'
import { Contato } from '../../models/contact.model'
import Detail from './Detail.vue'

const contactStore = ContactStore()
const items = computed(() => contactStore.items)
const totalItems = computed(() => items.value.length)
const isLoading = computed(() => contactStore.isLoading)

const showDetail = ref(false)
const headers = ref([
  { title: 'ID', align: 'right', key: 'id' },
  { title: 'Tag', align: 'start', key: 'tag' },
  { title: 'Tipo do contato', align: 'start', key: 'tipoContato' },
  { title: 'E-mail', align: 'start', key: 'email' },
  { title: 'Celular/Telefone', align: 'start', key: 'telefone' },
  { title: 'Pessoa', align: 'start', key: 'pessoa', value: v => v.pessoa.nome },
  { title: 'Usuário', align: 'start', key: 'usuario', value: v => v.usuario.nome },
  { title: 'Ações', align: 'start', key: 'action' }
])

function ShowForm (value: boolean = false) {
  showDetail.value = value
}

function addContact () {
  contactStore.setContact(null)

  ShowForm(true)
}

function editContact (contato: Contato) {
  ShowForm(false)
  contactStore.setContact(contato)

  ShowForm(true)
}

const deleteContact = async ({id}: number) => {
  ShowForm(false)

  SwalConfirm('Deseja realmente deletar esse contato ?', 'Atenção')
    .then(async (result) => {
      if (result.isConfirmed) {
        await contactStore.deleteContact(id)
      }
    })
}

defineOptions({
  name: 'Contact',
  components: { Detail }
})

onMounted(async () => {
  await contactStore.getAll('')
})
</script>

<style lang="scss" scoped>
.contact {
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
}
</style>