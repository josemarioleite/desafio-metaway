<template>
<div v-if="Show" class="detail">
  <header class="detail__header">
    <span>Dados</span>
  </header>
  
  <aside class="detail__aside">
    <v-form>
      <v-row class="justify-center">
        <v-col v-if="contact.id > 0" cols="12" md="1">
          <c-text v-model="contact.id" label="ID" readonly :clearable="false" />
        </v-col>
        <v-col cols="12" md="4">
          <c-select
            v-model="contact.pessoa"
            :Items="itemsPeople"
            Label="Pessoa"
            item-title="nome"
            return-object
          />
        </v-col>
        <v-col cols="12" md="4">
          <c-select
            v-model="contact.usuario"
            :Items="itemsUser"
            Label="Usuário"
            item-title="nome"
            return-object
          />
        </v-col>
        <v-col cols="12" md="3">
          <c-text v-model="contact.tag" label="Tag" />
        </v-col>
      </v-row>
    </v-form>

    <v-row class="justify-center">
      <v-col cols="12" md="2">
        <c-select
          v-model="contact.privado"
          :Items="optionsPrivate"
          Label="Privado"
        />
      </v-col>
      <v-col cols="12" md="2">
        <c-select v-model="contact.tipoContato" :Items="optionsTipoContato" Label="Tipo do contato" />
      </v-col>
      <v-col cols="12" md="5">
        <c-text v-model="contact.email" label="E-mail" />
      </v-col>
      <v-col cols="12" md="2">
        <c-text v-model="contact.telefone" label="Celular/Telefone" v-maska:[maskTelephone] />
      </v-col>
    </v-row>
  </aside>

  <footer class="detail__footer">
    <v-btn @click="closeDetail" color="warning" density="comfortable" flat> fechar </v-btn>
    <v-btn @click="save" color="success" density="comfortable" flat> salvar </v-btn>
  </footer>
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive, watch } from 'vue'
import { PeopleStore } from '../../stores/people.store'
import { UserStore } from '../../stores/user.store'
import { ContactStore } from '../../stores/contact.store'
import { SwalAlert, SwalConfirm, isValidEmail } from '../../services/utils'
import { Contato, CreateEmptyContact } from '../../models/contact.model'

interface Props {
  Show: boolean
}

const maskTelephone = reactive({ mask: ['(##)#####-####', '(##)####-####'], eager: true })
const props = withDefaults(defineProps<Props>(), {
  Show: false
})

const isVisible = computed(() => props.Show)
const optionsTipoContato = ref([
{ label: 'E-mail', value: 'EMAIL' },
{ label: 'Celular', value: 'CELULAR' },
{ label: 'Telefone', value: 'TELEFONE' }
])
const optionsPrivate = ref([
  { label: 'Não', value: false },
  { label: 'Sim', value: true }
])

const userStore = UserStore()
const itemsUser = computed(() => userStore.items)

const peopleStore = PeopleStore()
const itemsPeople = computed(() => peopleStore.itemsStore)

const contactStore = ContactStore()
const contact = computed(() => contactStore.contact)

const emit = defineEmits(['show'])
const closeDetail = () => {
  emit('show', false)
}

function validFields (): boolean {
  const tipoContato = contact.value.tipoContato

  if (tipoContato === 'EMAIL') {
    const email = contact.value.email

    if (!isValidEmail(email)) {
      SwalAlert('E-mail não válido', 'Atenção')
      return false
    }
  }

  return true
}

const save = async () => {
  if (validFields()) {
    SwalConfirm('Podemos prosseguir ?')
      .then(async (result) => {
        if (result.isConfirmed) {
          await contactStore.saveContact()
            .then((res) => {
              if (res) emit('show', false)
            })
        }
      })
  }
}

watch(isVisible, function (value) {
  if (value) {
    if (!contact.value) {
      contact.value = CreateEmptyContact()
    }
  }
})

onMounted(async () => {
  await Promise.all([
    await userStore.getAllUsers(''),
    await peopleStore.getPeoples('')
  ])
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #77b8ee;
  width: 95%;
  border-radius: 10px;
  margin-bottom: 30px;

  &__header {
    display: flex;
    align-items: center;
    height: 50px;

    span {
      font-size: 1.2rem;
    }
  }

  &__aside {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    width: 95%;
    gap: 10px;
  }
}
</style>