<template>
<v-dialog v-model="show" width="auto" persistent>
  <v-card title="Alterar senha" class="dialog">
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
          <c-text v-model="password" label="Senha anterior" :rules="validPassword" style="margin-bottom: 10px;" />
          <c-text v-model="newPassword" label="Nova senha" :rules="validPassword" />
        </v-col>
      </v-row>
      <div class="dialog__btn">
        <v-btn text="salvar" color="success" @click="saveChanges" :loading="isLoading" />
        <v-btn text="fechar" color="red" @click="show = false" :loading="isLoading" />
      </div>
    </v-form>
  </v-card>
</v-dialog>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { AuthStore } from '../../stores/auth.store'
import { UserStore } from '../../stores/user.store'
import { SwalConfirm, SwalAlert } from '../../services/utils'
import { UserClient } from '../../services/http/user.http'

export default defineComponent({
  name: 'Change-Password',
  data: () => ({
    show: false,
    validPassword: [
      v => !!v || 'Campo obrigatório',
      v => (v && v.length >= 8) || 'Senha deve ter no mínimo 8 caracteres',
    ]
  }),
  setup () {
    const authStore = AuthStore()
    const password = ref('')
    const newPassword = ref('')
    const userStore = UserStore()
    
    const isLoading = computed(() => userStore.isLoading)
    const username = computed(() => authStore.authAccess.username)

    return { isLoading, password, newPassword, username, userStore }
  },
  methods: {
    cleanFields () {
      this.password = ''
      this.newPassword = ''
    },
    showDialog (value) {
      this.cleanFields()
      this.show = value
    },
    async validate () {
      const { valid } = await this.$refs.form.validate()

      return valid
    },
    async saveChanges () {
      if (await this.validate()) {
        SwalConfirm('Deseja realmente alterar a senha ?')
          .then(async (result) => {
            if (result.isConfirmed) {
              this.userStore.setLoading(true)

              const userInfo = {
                newPassword: this.newPassword,
                password: this.password,
                username: this.username
              }

              try {
                const userClient = new UserClient()
                const { status } = await userClient.changePassword(userInfo)

                if (status && status === 200) {
                  SwalAlert('Senha atualizada com sucesso', 'Ok')
                  this.showDialog(false)
                  this.$emit('updatePage')
                }
              } catch (err) {
                return
              } finally {
                this.userStore.setLoading(false)
              }
            }
          })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 300px;

  &__btn {
    display: flex;
    margin-top: 30px;
    gap: 30px;
  }
}
</style>