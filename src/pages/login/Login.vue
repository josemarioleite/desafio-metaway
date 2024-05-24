<template>
<div class="login">
  <div class="login__form">
    <v-form>
      <span class="login__form--title">Faça o login</span>
      <c-text v-model="username" label="Usuário" :loading="isLoading" class="login__form--input" />
      <c-text v-model="password" label="Senha" :loading="isLoading" class="login__form--input" type="password" />
      <v-btn color="primary" @click="login" :loading="isLoading">login</v-btn>
    </v-form>
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { Auth } from '../../models/auth.model'
import { AuthStore } from '../../stores/auth.store'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Login'
})

const $router = useRouter()
const username = ref<string>('')
const password = ref<string>('')

const authStore = AuthStore()
const isLoading = computed(() => authStore.isLoading)
const isLogged = computed(() => authStore.isLogged)

async function login () {
  const authData: Auth = {
    username: username.value,
    password: password.value
  }

  await authStore.authApp(authData)
}

onMounted(() => {
  if (isLogged) {
    return $router.push({ name: 'home' })
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #3844eb, #4f25b1);

  &__form {
    border: 1px solid #808080;
    border-radius: 10px;
    width: 350px;
    height: 450px;
    background: #fff;
    
    display: flex;
    justify-content: center;
    align-items: center;

    &--input {
      width: 300px;
      height: 70px;
      margin-top: 10px;
    }

    &--title {
      color: #2a73c5;
      font-size: 1.8rem;
    }
  }
}
</style>
