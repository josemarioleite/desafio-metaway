<template>
<div>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <div class="header">
      <template v-for="(item, index) in Options" :key="index">
        <v-btn 
          v-if="item.show"
          variant="text"
          @click="goToPage(item.goTo)"
        > 
          {{ item.title }}
        </v-btn>
      </template>
    </div>
  </v-navigation-drawer>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { OptionsMain } from './IOptionsMain'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const $router = useRouter()

interface Props {
  Options: Array<OptionsMain>
}

defineProps<Props>()

function goToPage (page: string) {
  if (!page) {
    localStorage.clear()
    window.location.reload()
  }

  return $router.push({ name: page })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
</style>