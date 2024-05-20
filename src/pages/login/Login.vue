<template>
<div class="login">
  <div class="login__describe">
    <template>
      <span>My</span>
      <span>Diary</span>
    </template>
  </div>
  <div class="login__auth">
    <div class="login__auth__form">
      <span class="login__auth__form--title">Entry</span>
      <c-text v-model="username" label="Username" class="login__auth__form--input" :loading="isLoading" />
      <c-text v-model="password" label="Username" class="login__auth__form--input" :loading="isLoading" />
      <!-- <v-text-field v-model="username" variant="outlined" class="login__auth__form--input" label="username" :loading="isLoading" />
      <v-text-field v-model="password" variant="outlined" class="login__auth__form--input" label="password" :loading="isLoading" /> -->
      <v-btn color="primary" @click="login" :loading="isLoading">login</v-btn>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Auth } from '../../models/auth.model'
import { AuthStore } from '../../stores/auth.store'
// import { useQuasar } from 'quasar'

// const $q = useQuasar()
// const isMobile = ref($q.platform.is.mobile)

defineOptions({
  name: 'Login'
})

const username = ref<string>('marioleite')
const password = ref<string>('9876543210')

const authStore = AuthStore()
const isLoading = computed(() => authStore.isLoading)

async function login () {
  const authData: Auth = {
    username: username.value,
    password: password.value
  }

  await authStore.authApp(authData)
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;

  &__describe, &__auth {
    width: 50%;
    height: 100%;
  }

  &__describe {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #196FB4;

    span {
      font-size: 5rem;
      color: #fff;
    }
  }

  &__auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__form {
      height: 60vh;
      width: 60%;
      border: 1px solid #808080;
      border-radius: 10px;

      display: flex;
      // flex-direction: column;
    //   justify-content: center;
    //   align-items: center;
    //   gap: 15px;

    //   &--title {
    //     font-size: 2rem;
    //     color: #2196f3;
    //   }

    //   &--input {
    //     width: 90%;
    //   }
    }
  }
}

@media only screen and (max-width: 499px) {
  .login {
    display: flex;
    flex-direction: column;

    &__describe, &__auth {
      width: 100%;
    }

    &__auth__form {
      position: absolute;
      top: 20%;
      background: #FAFAFA;
      width: 85%;
    }
  }
}
</style>
