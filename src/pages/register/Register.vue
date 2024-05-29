<template>
  <div class="register">
    <span class="title-page">Meu Cadastro</span>

    <v-form class="register__form" ref="vForm">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <c-text v-model="usuarioLogado.id" label="ID" readonly :loading="isLoading" :clearable="false" />
          </v-col>
          <v-col cols="12" md="3">
            <c-text v-model="permissaoUsuario" label="Permissão" readonly :loading="isLoading" :clearable="false" />
          </v-col>
          <v-col cols="12" md="6">
            <c-text v-model="usuarioLogado.nome" label="Nome" :loading="isLoading" :rules="nameUserRules" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="usuarioLogado.cpf" label="CPF" :loading="isLoading" v-maska:[maskCPF] :rules="cpfRules" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="usuarioLogado.dataNascimento" label="Data de Nascimento" :loading="isLoading" v-maska:[maskDate] :rules="dataNascimentoRules" />
          </v-col>
          <v-col cols="12" md="4">
            <c-text v-model="usuarioLogado.telefone" label="Contato" :loading="isLoading" v-maska:[maskTelephone] :rules="telefoneRules" />
          </v-col>
          <v-col cols="12" md="5">
            <c-text v-model="usuarioLogado.username" label="Usuário" :loading="isLoading" :rules="nameUserRules" />
          </v-col>
          <v-col cols="12" md="7">
            <c-text v-model="usuarioLogado.email" label="E-mail" :loading="isLoading" :rules="emailRules" />
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

<script>
import { defineComponent } from 'vue'
import { computed, reactive } from 'vue'
import { UserStore } from '../../stores/user.store'
import { SwalConfirm, isValidEmail } from '../../services/utils'
import ChangePassword from './ChangePassword.vue'

export default defineComponent({
  name: 'Register',
  components: { ChangePassword },
  data: () => ({
    nameUserRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length > 2) || 'Mínimo 3 caracteres'
    ],
    cpfRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length > 13) || 'Preencha corretamente'
    ],
    dataNascimentoRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length > 9) || 'Preencha corretamente'
    ],
    telefoneRules: [
      v => !!v || 'Campo Obrigatório',
      v => (v && v.length > 13) || 'Preencha corretamente'
    ],
    emailRules: [
      v => !!v || 'Campo Obrigatório',
      v => isValidEmail(v) || 'Preencha corretamente'
    ]
  }),
  setup () {
    const userStore = UserStore()

    const maskCPF = reactive({ mask: '###.###.###-##', eager: true })
    const maskTelephone = reactive({ mask: ['(##) #####-####', '(##) ####-####'], eager: true })
    const maskDate = reactive({ mask: '##/##/####', eager: true })

    const isLoading = computed(() => userStore.isLoading)
    const usuarioLogado = computed(() => userStore.usuarioLogado)
    const permissaoUsuario = computed(() => userStore.permissoes)

    return {
      maskCPF, maskTelephone, maskDate,
      userStore, isLoading, usuarioLogado, permissaoUsuario
    }
  },
  methods: {
    changePassword () {
      return this.$refs.changePW.showDialog(true)
    },
    async validFields () {
      const { valid } = await this.$refs.vForm.validate()

      return valid
    },
    async updatePage () {
      await this.userStore.getDetailUserLogged()
    },
    async updateUser () {
      if (await this.validFields()) {
        SwalConfirm('Deseja realmente fazer a alteração')
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.userStore.updateUser()
            }
          })
      }
    }
  },
  async mounted () {
    await this.updatePage()
  }
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
      margin-top: 10px;
    }
  }
}

@media only screen and (max-width: 499px) {
  .register {
    &__form {
      width: 100%;
    }

    &__form__btn {
      justify-content: center;
    }
  }
}
</style>