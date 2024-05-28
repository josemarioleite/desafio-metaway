<template>
<div class="card-contact" @click="showModalDetail">
  <div class="card-contact__header">
    <v-avatar size="5rem" :style="{ backgroundColor: colors }">
      <span>{{ contact.pessoa.nome.substring(0, 1) }}</span>
    </v-avatar>
  </div>
  <div class="card-contact__aside">
    <span>{{ contact.pessoa.nome }}</span>
  </div>
  <div class="card-contact__footer">
    <span>Tipo: {{ traduzirContato(contact.tipoContato) }}</span>
    <span>{{ contact.tag }}</span>
  </div>

  <template>
    <CardModal ref="cardModal" />
  </template>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { Contato } from '../../models/contact.model'
import { generateColdColor, generateLightColor } from '../../services/utils'
import { TypeModal } from './ITypes'
import CardModal from './CardModal.vue'

interface Props {
  Contact: Contato,
  Type: TypeModal
}

const props = defineProps<Props>()
const contact = computed(() => props.Contact)
const type = computed(() => props.Type)
const colors = ref<string[]>([])

const cardModal = ref<typeof CardModal>()
const tipoContato: { [key: string]: string } = {
  EMAIL: 'E-mail',
  TELEFONE: 'Telefone',
  CELULAR: 'Celular'
}

function traduzirContato (tipo: string): string {
  return tipoContato[tipo.toUpperCase()]
}

function showModalDetail () {
  cardModal.value.showModal(true, contact.value, type.value)
}

defineOptions({
  name: 'Card-Contact',
  components: {CardModal}
})

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    colors.value.push(generateColdColor())
    colors.value.push(generateLightColor())
  }
})
</script>

<style lang="scss" scoped>
.card-contact:hover {
  cursor: pointer;
}

.card-contact {
  height: 220px;
  width: 150px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__header {
    span {
      font-size: 3rem;
    }
  }

  &__aside {
    font-size: 1.2rem;
    margin-top: 10px;
    width: 125px;
    height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      font-size: 1.3rem;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      font-size: .9rem;
    }
  }
}

.card-contact:hover .card-contact__aside span,
.card-contact:hover .card-contact__footer span {
  text-decoration: underline;
}
</style>