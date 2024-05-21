<template>
<div>
  <v-app-bar class="appBar" color="primary" prominent absolut>
    <div class="header">
      <template v-for="(item, index) in optionsMain" :key="index">
        <v-btn v-if="item.show" class="header--btn" variant="text" @click="goToPage(item.goTo)">{{ item.title }}</v-btn>
      </template>
    </div>
  </v-app-bar>

  <v-main>
    <slot name="content" />
  </v-main>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { AuthStore } from '../../stores/auth.store'
import { AuthAccess } from '../../models/auth.model'
import { useRouter } from 'vue-router'

interface OptionsMain {
  show: boolean
  title: string
  goTo: string | null
}

const $router = useRouter()
const authStore = AuthStore()
const authAccess = computed(() => {
  const data: AuthAccess = {
    id: authStore.authAccess.id,
    accessToken: authStore.authAccess.accessToken,
    username: authStore.authAccess.username,
    tipos: authStore.authAccess.tipos,
    tokenType: authStore.authAccess.tokenType
  }

  return data
})
const isAdmin = authAccess.value.tipos.includes('ROLE_ADMIN')
const optionsMain: Array<OptionsMain> = [
  { show: true, title: 'Home', goTo: 'home' },
  { show: isAdmin, title: 'Usuários', goTo: 'user' },
  { show: true, title: 'Pessoas', goTo: 'people' },
  { show: true, title: 'Contatos', goTo: 'contact' },
  { show: true, title: 'Cadastro', goTo: 'register' },
  { show: true, title: 'Sair', goTo: null }
]

function goToPage (page: string) {
  if (!page) {
    localStorage.clear()
    window.location.reload()
  }

  return $router.push({ name: page })
}
</script>

<style lang="scss" scoped>
.appBar {
  height: 50px;
}

.header {
  display: flex;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 50px;
  
  &--btn {
    width: 120px;
    font-size: .8rem;
  }
}
</style>