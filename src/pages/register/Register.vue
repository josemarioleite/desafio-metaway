<template>
<div class="register">
  <span class="title-page">Meu Cadastro</span>

  <v-form class="register__form">
    <v-container>
      <v-row>
        <v-col md="3">
          <c-text v-model="usuarioLogado.id" label="ID" readonly :loading="isLoading" :clearable="false" />
        </v-col>
        <v-col md="3">
          <c-text v-model="permissaoUsuario" label="Permissão" readonly :loading="isLoading" :clearable="false" />
        </v-col>
        <v-col md="6">
          <c-text v-model="usuarioLogado.nome" label="Nome" :loading="isLoading" />
        </v-col>
        <v-col md="4">
          <c-text v-model.trim="usuarioLogado.cpf" label="CPF" :loading="isLoading" v-maska:[maskCPF] />
        </v-col>
        <v-col md="4">
          <c-text v-model="usuarioLogado.dataNascimento" label="Data de Nascimento" :loading="isLoading" v-maska:[maskDate] />
        </v-col>
        <v-col md="4">
          <c-text v-model="usuarioLogado.telefone" label="Contato" :loading="isLoading" v-maska:[maskTelephone] />
        </v-col>
        <v-col md="5">
          <c-text v-model="usuarioLogado.username" label="Usuário" :loading="isLoading" />
        </v-col>
        <v-col md="7">
          <c-text v-model="usuarioLogado.email" label="E-mail" :loading="isLoading" />
        </v-col>
      </v-row>
      <div class="register__form__btn">
        <v-btn @click="changePassword" color="black" :loading="isLoading">Alterar senha</v-btn>
        <v-btn @click="updateUser" color="primary" :loading="isLoading">Alterar dados</v-btn>
      </div>
    </v-container>
  </v-form>
  <ChangePassword ref="changePW" @updatePage="updatePage" />
</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { UserStore } from '../../stores/user.store'
import { vMaska } from 'maska'
import { SwalConfirm } from '../../services/utils'
import ChangePassword from './ChangePassword.vue'

const maskCPF = reactive({ mask: '###.###.###-##', eager: true })
const maskTelephone = reactive({ mask: '(##)# ####-####', eager: true })
const maskDate = reactive({ mask: '##/##/####', eager: true })

const userStore = UserStore()
const isLoading = computed(() => userStore.isLoading)
const usuarioLogado = computed(() => userStore.usuarioLogado)
const permissaoUsuario = computed(() => userStore.permissoes)

const changePW = ref(null)

async function updateUser () {
  SwalConfirm('Deseja realmente fazer a alteração')
    .then(async (result) => {
      if (result.isConfirmed) {
        await userStore.updateUser()
      }
    })
}

async function updatePage () {
  await userStore.getUserById()
}

function changePassword () {
  return changePW.value.showDialog(true)
}

defineOptions({
  name: 'Register',
  components: { ChangePassword }
})

onMounted (async () => {
  await updatePage()
})
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  &__form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 65%;

    &__btn {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }
}

@media only screen and (max-width: 499px) {
  .register {
    &__form {
      width: 100%;
    }
  }
}
</style>