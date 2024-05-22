<template>
<div>
  <template v-if="mobile">
    <HeaderMobile :Options="optionsMain" />
  </template>
  <template v-else>
    <v-app-bar class="appBar" color="primary" prominent absolut>

      <template v-if="!mobile">
        <div class="header">
          <template v-for="(item, index) in optionsMain" :key="index">
            <v-btn v-if="item.show" class="header--btn" variant="text" @click="goToPage(item.goTo)">{{ item.title }}</v-btn>
          </template>
        </div>
      </template>
    </v-app-bar>
  </template>

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
import { useDisplay } from 'vuetify'
import { OptionsMain } from './IOptionsMain'
import HeaderMobile from './HeaderMobile.vue'

defineOptions({
  name: 'Header',
  components: { HeaderMobile }
})

const { mobile } = useDisplay()
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

@media only screen and (max-width: 499px) {
  .header {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: flex-start;
    padding-top: 2px;
    // justify-content: center;
  }
}
</style>