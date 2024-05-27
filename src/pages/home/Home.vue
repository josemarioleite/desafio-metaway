<template>
<div class="home">
  <ListContacts Title="Favoritos" :Items="itemsFavorites" />
  <v-divider />
  <ListContacts Title="Contatos" :Items="itemsContacts" />
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { ContactStore } from '../../stores/contact.store'
import ListContacts from './ListCards.vue'

const $contactStore = ContactStore()
const itemsFavorites = computed(() => $contactStore.favorites)
const itemsContacts = computed(() => $contactStore.items)

defineOptions({
  name: 'Home',
  components: { ListContacts }
})

onMounted(async () => {
  await Promise.all([
    await $contactStore.getFavorites(),
    await $contactStore.getAll('')
  ])
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>