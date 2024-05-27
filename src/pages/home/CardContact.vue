<template>
<div class="card-contact">
  <div class="card-contact__header">
    <v-avatar size="5rem" :style="{ background: colors }">
      <span>{{ contact.pessoa.nome.substring(0, 1) }}</span>
    </v-avatar>
  </div>
  <div class="card-contact__aside">
    <span>{{ contact.pessoa.nome }}</span>
  </div>
  <div class="card-contact__footer">
    <!-- <span>Tag: {{ contact.tag }}</span> -->
    <span>Tipo: {{ traduzirContato(contact.tipoContato) }}</span>
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { Contato } from '../../models/contact.model'
import { generateColdColor, generateLightColor } from '../../services/utils'

interface Props {
  Contact: Contato
}

const props = defineProps<Props>()
const contact = computed(() => props.Contact)
const colors = ref<string[]>([])

const tipoContato: { [key: string]: string } = {
    EMAIL: 'E-mail',
    TELEFONE: 'Telefone',
    CELULAR: 'Celular'
}

function traduzirContato (tipo: string): string {
  return tipoContato[tipo.toUpperCase()]
}

defineOptions({
  name: 'Card-Contact'
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
  height: 150px;
  width: 100px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__header {
    span {
      font-size: 3rem;
    }
  }

  &__aside {font-size: 1.2rem;
    margin-top: 10px;
    height: 75px;
    width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      font-size: 1.3rem;
    }
  }

  &__footer {
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