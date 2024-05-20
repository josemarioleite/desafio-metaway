<template>
<v-layout>
  <Header v-if="isLogged">
    <template #content>
      <router-view />
    </template>
  </Header>
  <router-view v-else />
</v-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { AuthStore } from './stores/auth.store'
import Header from './components/template/Header.vue'

const authStore = AuthStore()
const isLogged = computed(() => authStore.isLogged)

defineOptions({
  components: { Header }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
